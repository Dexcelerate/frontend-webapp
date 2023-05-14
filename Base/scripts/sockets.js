const init_sockets = async () => {
  if (!DATA.server_ip) {
    DATA.server_ip = await fetch(`${DATA.IP_API}${DATA.CHAIN || 'BSC'}`).catch(() => {
      DATA.server_ip = null;
      store.del(`${DATA.CHAIN}_server_ip`);
    });

    if (!DATA.server_ip) {
      return help_err('Something is wrong');
    }

    DATA.server_ip = (await DATA.server_ip.json().catch((_) => {})).FCALL;

    if (!DATA.server_ip) {
      return help_err('No IP');
    }

    DATA.server_ip = `wss://${DATA.server_ip}:3611`;
    store.set(`${DATA.CHAIN}_server_ip`, DATA.server_ip);
  }

  DATA.socket = io(DATA.server_ip, { path: '/', transports: ['websocket', 'polling'] });

  /* Listen for messages */
  DATA.socket.on('error', handle_error);
  DATA.socket.on('connect', handle_connect);
  DATA.socket.on('disconnect', handle_disconnect);
  DATA.socket.on('message', handle_message);
  DATA.socket.on('tick', handle_tick);
  DATA.socket.on('chat', handle_chat);
  DATA.socket.on('hold', handle_holder);
  DATA.socket.on('glob', handle_global_action);
  DATA.socket.on('ca', _handle_contract);

  DATA.socket_timeout = setTimeout(handle_disconnect, 1500);
};

const handle_global_action = (data) => {
  //console.log('>>', data);

  if (data.e) {
    if (data.a === 'pos') {
      for (let id in data.e) {
        if (DATA.pids && DATA.pids.includes(id)) {
          add_terminal_message(data.e[id]);
        } else {
          help_err(data.e[id]);
        }
      }
      return;
    }
  }

  handleAction(data.a);
};

const _handle_contract = (CA) => {
  set_method_ids(CA.ABI || {});

  if (CA.C && CA.C !== 'NO_CA') {
    handle_contract(CA.C);
  }
};

const selected_chain = () => DATA.CHAIN_IDS_MAP[DATA.selected_chain] || DATA.CHAIN_ID;

const handle_contract = (ca) => {
  if ((DATA.token_code = ca)) {
    elementify('audit-warning').classList.add('d-none');
    elementify('SwapFeed__Contract').classList.remove('d-none');
    elementify('SwapFeed__Contract').querySelector('.code').innerHTML = DATA.token_code;
  } else {
    elementify('audit-warning').classList.remove('d-none');
    elementify('SwapFeed__Contract').classList.add('d-none');
    elementify('SwapFeed__Contract').querySelector('.code').innerHTML = '';
  }
};

const emit = async (data) => {
  while (!DATA.socket || !DATA.socket.connected) {
    await sleep(0.05);
  }

  await DATA.socket.send(data);
};

const handle_consts = (data) => {
  if (data.Y) {
    for (let i = data.Y.length - 1; i >= 0; --i) {
      if (!DATA.JBNFTS.includes(data.Y[i].address)) {
        if (typeof data.Y[i].decimals !== 'undefined' && typeof DATA.decimals[data.Y[i].address] === 'undefined') {
          DATA.decimals[data.Y[i].address] = data.Y[i].decimals;
        }

        if (data.Y[i].symbol && data.Y[i].symbol !== 'TOKEN' && !DATA.symbols[data.Y[i].symbol]) {
          DATA.symbols[data.Y[i].address] = data.Y[i].symbol;
        }
      } else {
        data.Y.splice(i, 1);
      }
    }
  }
};

const handle_connect = () => {
  DATA.server_ip_initialized = true;
  clearTimeout(DATA.socket_timeout);
};

const handle_disconnect = async () => {
  DATA.server_ip = null;
  store.del(`${DATA.CHAIN}_server_ip`);

  //if (!DATA.server_ip_initialized) {
  await init_sockets();
  //}

  DATA.server_ip_initialized = true;
};

const handle_error = (data) => {
  if (DATA.socket && DATA.socket.readyState === 1) {
    try {
      return emit({ a: 'err', d: `Unknown response: ${JSON.stringify(data)}` });
    } catch (e) {}

    emit({ a: 'err', d: `Unknown response: ${data}` });
  }
};

const get_chain_user = async () => {
  let chain_user_last_payment,
    chain_user_affiliate,
    chain_user_no_fee,
    chain_user_avatar,
    chain_user_plan,
    chain_user_sell_fee,
    chain_user_price,
    chain_user_addr,
    chain_user_pool,
    chain_user_router,
    chain_user_avatars,
    chain_user_path,
    chain_user_safe,
    chain_user_stop,
    chain_user_exists;

  await Promise.all([
    (async () => {
      DATA.conf.total_synagogue_nodes = Number(await contract(DATA.SERVERS_NFT).balanceOf(DATA.conf.wallet));
    })(),
    (async () => {
      try {
        [
          chain_user_last_payment,
          chain_user_affiliate,
          chain_user_no_fee,
          chain_user_avatar,
          chain_user_plan,
          chain_user_sell_fee,
          chain_user_price,
          chain_user_addr,
          chain_user_pool,
          chain_user_router,
          chain_user_avatars,
          chain_user_path,
          chain_user_safe,
          chain_user_stop,
          chain_user_exists,
        ] = await contract(DATA.USERS).getUser(DATA.conf.wallet);
      } catch (e) {
        return false;
      }
    })(),
  ]);

  if (chain_user_exists) {
    /* console.log(DATA.conf.wallet !== chain_user_addr); */

    if (DATA.conf.wallet !== chain_user_addr) {
      return on_disconnect();
    }

    if (!DATA.conf.plans || !DATA.conf.plans[0] || !DATA.conf.plans[0][0]) {
      DATA.conf.plans = [[DATA.CHAIN, 0]];
    }

    let idx = DATA.conf.plans.findIndex((v) => v[0] === DATA.CHAIN);

    if (~idx) {
      DATA.conf.plans[idx][1] = Number(chain_user_plan);
    } else {
      DATA.conf.plans.push([DATA.CHAIN, Number(chain_user_plan)]);
    }

    DATA.conf.JBU = Number(chain_user_avatars[chain_user_avatar]);
    DATA.conf.is_no_fee = chain_user_no_fee;
    DATA.conf.last_payment = new Date(chain_user_last_payment * 1000);
    DATA.conf.from_pool = chain_user_pool;

    navigate();
  }
};

const send_nft = async (to, nft_type) => {
  try {
    to = toChecksumAddress(to);
    let chain_id = DATA.CHAIN_IDS_MAP[DATA.selected_chain] || DATA.CHAIN_ID,
      tokenId = DATA.selected_nft;

    delete DATA.selected_nft;

    if (['JBU', 'JBW', 'JBS'].includes(nft_type)) {
      /* ERC721 */
      return await sendChain(chain_id, DATA.CHAINS[chain_id][DATA.NFT_TYPES_MAP[nft_type]], 'tranferFrom', DATA.conf.wallet, to, _hex(tokenId)).catch(console.error);
    } else {
      /* ERC1155 */
      return await sendChain(chain_id, DATA.CHAINS[chain_id][DATA.NFT_TYPES_MAP[nft_type]], 'safeTransferFrom', DATA.conf.wallet, to, _hex(tokenId), _hex(1), '0x00').catch(console.error);
    }
  } catch (e) {}

  return false;
};
