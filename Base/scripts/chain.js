var provider = {};

DATA.iface = new ethers.utils.Interface(DATA.ABI);
console.log("test");

const _hex = (num) => {
	try {
		return `0x${BigInt(num).toString(16)}`;
	} catch(e) {
		/* Old browser */
		return `0x${Number(num).toString(16)}`;
	}
};

const sha3 = (text) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text));

const init = async function () {
	Big.NE = -32;
console.log("test init");
	DATA.web3Modal = new window.Web3Modal.default({
		cacheProvider: true,
		providerOptions: {
			walletconnect: {
				package: window.WalletConnectProvider.default,
				options: {
					rpc: {
						1: 'https://main-light.eth.linkpool.io',
						56: 'https://bsc-dataseed.binance.org/',
						97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
						137: 'https://rpc-mainnet.matic.network',
						250: 'https://rpc.ftm.tools/',
						321: 'https://rpc-mainnet.kcc.network',
						1337: 'http://10.0.0.2:7545/',
						43114: 'https://api.avax.network/ext/bc/C/rpc'
					}
				}
			}
		}
	});

	if (store.get('logged')) {
		try {
			on_connect();
		} catch (e) {
			DATA.CHAIN_ID = 56;
			set_chain();
			set_terminal_message('Please connect your wallet');
			provider[DATA.CHAIN_ID] = new ethers.providers.JsonRpcProvider(DATA.RPC);

			if (DATA.token) {
				(await set_token())(true);
			}

			setTimeout(async () => {
				elementify('zero-pool-price').innerHTML = `$${formatFiat(DATA.server_price = await contract(DATA.SUBSCRIPTION).PLAN(DATA.ZERO))}`;
			}, 0);
		}
	} else {
		DATA.CHAIN_ID = 56;
		set_chain();
		set_terminal_message('Please connect your wallet');
		provider[DATA.CHAIN_ID] = new ethers.providers.JsonRpcProvider(DATA.RPC);

		if (DATA.token) {
			(await set_token())(true);
		}

		setTimeout(async () => {
			elementify('zero-pool-price').innerHTML = `$${formatFiat(DATA.server_price = await contract(DATA.SUBSCRIPTION).PLAN(DATA.ZERO))}`;
		}, 0);
	}

	DATA.loading = false;
};

const change_network = async function (chain) {
	if (chain === DATA.CHAIN) {
		return true;
	}
	

	if (!DATA.allowed_chains.includes(chain)) {
		help_err('Comming soon...');
		return true;
	}

	DATA.changing_network = true;

	let curr_net = DATA.CHAINS[DATA.CHAIN_IDS_MAP[chain]];

	try {
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ 'chainId': _hex(curr_net.CHAIN_ID) }],
		});

		handleAction('nonce');
	} catch (switchError) {
		/* console.log('!!', switchError); */

		/* This error code indicates that the chain has not been added to MetaMask. */
		if (switchError.code === 4902) {
			try {
				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [{
						chainId: _hex(curr_net.CHAIN_ID),
						chainName: curr_net.CHAIN,
						rpcUrls: [curr_net.RPC],
						blockExplorerUrls: [curr_net.EXPLORER],
						nativeCurrency: {
							name: curr_net.PEG,
							symbol: curr_net.PEG,
							decimals: curr_net.DECIMALS
						}
					}]
				});

				handleAction('nonce');
			} catch (e) {
				DATA.changing_network = false;
				return true;
			}
		}
	}

	DATA.changing_network = false;
};

const _update_price = async () => {
	if (DATA.updating_price) {
		return;
	}

	DATA.updating_price = true;

	let i = 0;
	while (true) {
		await Promise.all([
			update_price(i),
			update_balances(),
			update_slot_balances()
		]);
		await sleep(2);
		++i;
	}
};

const update_slot_balances = async () => {
	if (!provider[DATA.CHAIN_ID] || !DATA.conf.connected) {
		return;
	}

	let promises = [];

	for (let i = (DATA.slots[DATA.CHAIN] && DATA.slots[DATA.CHAIN].length || 0) - 1; i >= 0; --i) {
		promises.push((async (slot) => {
			let total_balance = Big(slot.total_balance || 0).sub(slot.balance);

			if (total_balance.lt(0)) {
				total_balance = Big(0);
			}

			try {
				slot.balance = Big(await contract(DATA.WPEG).balanceOf(slot.address).catch(_ => 0)).div(DATA.ETHER);
			} catch (e) {
				console.debug(e);
				slot.balance = Big(0);
			}

			slot.total_balance = total_balance.add(slot.balance);

			document.querySelectorAll(`.slot-total-balance-${DATA.CHAIN}-${slot.address}`).forEach(el => {
				el.dataset.balance = slot.total_balance.toString();
			});
		})(DATA.slots[DATA.CHAIN][i]));
	}

	await Promise.all(promises);

	save_settings('slots', false, true);
};

const update_balances = async () => {
	if (!provider[DATA.CHAIN_ID]) {
		return false;
	}

	let user_balance,
		user_wpeg_balance,
		tmp;
		/* user_sub_wallet_balance, */

	if (!DATA.elements.wallet_balance) {
		DATA.elements.wallet_balance = document.querySelector('#Wallet__Wallet1__Panel1 .balance');
	}

	if (!DATA.elements.sub_wallet_balance) {
		DATA.elements.sub_wallet_balance = document.querySelector('#Wallet__Wallet2__Panel1 .balance');
	}

	if (!DATA.elements.main_sub_wallet_balance) {
		DATA.elements.main_sub_wallet_balance = document.querySelector('#Header__TogglesTop [data-togglable="Selector"] .balance');
	}

	if (!DATA.elements.selector_sub_wallet_balance) {
		DATA.elements.selector_sub_wallet_balance = document.querySelector(`#Selector__Panel1 [data-pay-chain="${DATA.CHAIN_ID}"] [data-balance]`);
	}

	if (!DATA.elements.wallet_sub_wallet_balance) {
		DATA.elements.wallet_sub_wallet_balance = document.querySelector(`#Wallet__Panel2 details[data-chain="${DATA.CHAIN}"] summary [data-balance]`);
	}

	await Promise.all([
		(async () => {
			try {
				user_balance = Big(DATA.conf.connected && (await provider[DATA.CHAIN_ID].getBalance(DATA.conf.wallet).catch(_ => 0)) || 0);
			} catch (e) {
				console.debug(e);
				user_balance = Big(0);
			}
		})(),
		(async () => {
			try {
				user_wpeg_balance = Big(DATA.conf.connected && (await contract(DATA.WPEG).balanceOf(DATA.conf.wallet).catch(_ => 0)) || 0);
			} catch (e) {
				console.debug(e);
				user_wpeg_balance = Big(0);
			}
		})(),
		(async () => {
			DATA.gas_price = await provider[DATA.CHAIN_ID].getGasPrice();
		})()
	]);

	DATA.conf.balance = DATA.conf.assets && DATA.conf.assets.length && DATA.conf.assets.reduce((a, n) => a.add(Big(n.bl || 0).mul(n.p || 0)), Big(0)) || user_balance.add(user_wpeg_balance).div(DATA.ETHER);
	if (DATA.elements.wallet_balance.dataset.balance !== DATA.conf.balance.toString()) {
		DATA.elements.wallet_balance.dataset.balance = DATA.conf.balance;
	}

	DATA.conf.vault = Big(0);

	if (DATA.elements.main_sub_wallet_balance.dataset.balance !== (tmp = Big(DATA.conf.vault).add(DATA.slots[DATA.CHAIN].reduce((a, b) => a.add(b.total_balance || 0), Big(0))).toString())) {
		DATA.elements.main_sub_wallet_balance.dataset.balance = (DATA.elements.sub_wallet_balance.dataset.balance = (DATA.elements.selector_sub_wallet_balance.dataset.balance = (DATA.elements.wallet_sub_wallet_balance.dataset.balance = tmp)));
	}

	if (!DATA.conf.assets) {
		DATA.conf.assets = [];
	}

	if (~(tmp = DATA.conf.assets.findIndex(v => v.k === DATA.WPEG))) {
		DATA.conf.assets.splice(tmp, 1);
	}

	if (user_wpeg_balance.gt(0)) {
		DATA.conf.assets.push({
			k: DATA.WPEG,
			bl: user_wpeg_balance.div(DATA.ETHER),
			p: '1',
			y: `W${DATA.PEG}`
		});
	}

	if (~(tmp = DATA.conf.assets.findIndex(v => v.k === DATA.IMAGINARY_PEG))) {
		DATA.conf.assets.splice(tmp, 1);
	}

	if (user_balance.gt(0)) {
		DATA.conf.assets.push({
			k: DATA.IMAGINARY_PEG,
			bl: user_balance.div(DATA.ETHER),
			p: '1',
			y: DATA.PEG
		});
	}

	DATA.conf.assets.sort((a, b) => {
		a = Big(a.bl || 0).mul(a.p || 0);
		b = Big(b.bl || 0).mul(b.p || 0);

		if (a.gt(b)) {
			return -1;
		} else if (a.lt(b)) {
			return 1;
		}

		return 0;
	});

	document.querySelectorAll(`.slot-currencies-container`).forEach(el => {
		if (
			(user_balance.gt(0) && !el.querySelector(`[data-pay-token="${DATA.IMAGINARY_PEG}"]`))
			|| (user_wpeg_balance.gt(0) && !el.querySelector(`[data-pay-token="${DATA.WPEG}"]`))
		) {
			setTimeout(async () => {
				await set_original_wallet_assets();
				await set_wallet_assets();
			}, 0);
		}
	});

	save_settings('conf', false, true);
};

const update_price = async (i) => {
	let price = Big((await (contract(DATA.ROUTER, undefined, undefined, true).getAmountsOut(_hex(DATA.ETHER), [DATA.WPEG, DATA.STABLE[0]])).catch(_ => [0, 0]))[1])
			.div(get_decimals_power(await get_decimals(DATA.STABLE[0])));

	document.querySelectorAll('[data-balance]').forEach(el => {
		let tmp;

		if (DATA.displayInFiat) {
			tmp = `$${formatFiat(Big(el.dataset.balance || 0).mul(price))}`;
		} else {
			tmp = formatFiatNumber(el.dataset.balance);
		}

		if (el.innerHTML !== tmp) {
			el.innerHTML = tmp;
		}
	});

	if (price.gt(0)) {
		DATA.WPEG_PRICE = price;
		store.set(`${DATA.CHAIN}_price`, price.toString());
	}

	if (typeof DATA.conf.nft_balance === undefined || (Number(DATA.conf.JBU) && i % 5 === 0)) {
		/* This is the balance of the PEG inside an NFT (tokenId) */
		DATA.conf.nft_balance = Big(await contract(DATA.USERS_NFT, undefined, undefined, true).getUserBalance(DATA.conf.JBU).catch(_ => 0)).div(DATA.ETHER);
		elementify('nft-balance').dataset.balance = (DATA.conf.nft_balance || 0).toString();

		save_settings('conf');

		if (DATA.token && DATA.token !== DATA.ZERO && DATA.token_data && DATA.token_data.i && DATA.token_data.i.total_supply) {
			DATA.token_data.i.total_supply = Big(await (contract(DATA.token, undefined, undefined, true)['totalSupply()']()).catch(_ => 0) || 0);
		}
	}

	document.querySelectorAll('[data-servers-chain]').forEach(async (el) => {
		if (el.dataset.serversChain != DATA.CHAIN_ID) {
			return;
		}

		try {
			el.innerHTML = el.dataset.countNumber = Big(await contract(DATA.SERVERS_NFT, undefined, undefined, true)['maxTotalSupply()']().catch(_ => 0) || 0)
				.sub(await contract(DATA.SERVERS_NFT, undefined, undefined, true)['totalSupply()']().catch(_ => 0) || 0)
				.sub(DATA.boost_quantity)
				.toNumber();
		} catch (e) {
			el.innerHTML = el.dataset.countNumber = 0;
		}
	});
};

const set_swap_button = (state) => {
	if (state === 'Sell') {
		elementify('Swap__SellButton').classList.remove('visually-hidden');
	} else {
		elementify('Swap__SellButton').classList.add('visually-hidden');
		let el = elementify('Swap__ConnectWalletButton');
		el.innerHTML = state || 'Connect Wallet';
		el.title = state;
		el.dataset.action = (state || 'connect').toLowerCase();
	}
};

const connect_ui = async () => {
	elementify('Root').classList.add('has-connection');

	DATA.conf.connected = !!DATA.conf.wallet;
	DATA.loading = false;

	store.set('logged', 'true');

	while (!elementify('Swap__ConnectWalletButton')) {
		await sleep(0.05);
	}

	elementify('login-logout-text').innerHTML = 'Logout';
	set_swap_button('Buy');
};

const fetch_account_data = async function (last_operation) {
	let tmp_provider = new ethers.providers.Web3Provider(DATA.provider);
	DATA.CHAIN_ID = (await tmp_provider.getNetwork()).chainId;
	provider[DATA.CHAIN_ID] = tmp_provider;
console.log("fetch_account_data 1");
	set_chain();
	console.log("fetch_account_data 2");
	if (DATA.INIT_CHAIN && DATA.INIT_CHAIN !== DATA.CHAIN) {
		delete DATA.INIT_CHAIN;
		if (!(await change_network(DATA.INIT_CHAIN))) {
			return;
		}
	}
	console.log("fetch_account_data 3");
	update_price();

	try {
		/* https://eips.ethereum.org/EIPS/eip-1102 */
		DATA.accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	} catch (e) {
		DATA.accounts = await ethereum.enable();
	}
	console.log("fetch_account_data 4");
	DATA.conf.wallet = toChecksumAddress(DATA.accounts[0]);

	document.querySelectorAll('[data-peg-text]').forEach(el => { el.dataset.pegText = DATA.PEG });
	document.querySelectorAll('img.peg').forEach(el => { GetTokenImage(DATA.WPEG, undefined, el.id) });
	document.querySelectorAll('#Selector__Panel1 .btn').forEach(el => {
		if (el.querySelector('.text-truncated:last-child').innerText === DATA.CHAIN) {
			el.classList.add('active')
		} else {
			el.classList.remove('active');
		}
	});
	console.log("fetch_account_data 5");
	set_terminal_message();

	setTimeout(async () => {
		elementify('zero-pool-price').innerHTML = `$${formatFiat(DATA.server_price = await contract(DATA.SUBSCRIPTION).PLAN(DATA.ZERO))}`;
	}, 0);
	console.log("fetch_account_data 6");
	console.log("DATA", DATA);
	if (DATA.account_changed) {
		store.del('auth');
		DATA.conf = { connected: true, wallet: DATA.conf.wallet };
		DATA.copy_transactions = {'0x0000000000000000000000000000000000000000': []};
		DATA.copy_settings = {'0x0000000000000000000000000000000000000000': {}};
		DATA.copy_settings_ordered = {};
		DATA.copy_wallet = '0x0000000000000000000000000000000000000000';
		DATA.slot = DATA.ZERO;
		DATA.slots = {};
		DATA.positions = {};
		DATA.synagogues = [];
		DATA.copy_address_transactions = [];
		DATA.view_rank_history = [];
		set_user_rank();
		remove_affiliate_loader();
		load_slots();
		load_wallet_slots();
		set_wallet_assets();
		set_wallet_chains_slots();
		set_header_wallet_slots();
		set_header_wallet_chains();

		save_settings('copy', false, true);
		save_settings('slots', false, true);
		save_settings('positions', false, true);
		save_settings('synagogues', false, true);
		save_settings('pos', false, true);

		delete DATA.wallet_started;
		DATA.account_changed = false;
	}

	setTimeout(() => {
		handleAction('nonce');
	}, 0);

	DATA.last_operation = last_operation;

	elementify('swap-buttons').classList.remove('loading');

	store.set('last_chain', DATA.CHAIN);
};

const wallet_error = (callback) => {
	return (e) => {
		let err = `${e && e.data && e.data.message || e}`.toLowerCase();

		if (typeof callback === 'function') {
			callback(e, err);
		}

		if (err.includes('user denied') || err.includes('user rejected')) {
			return;
		}

		if (err.includes('gas required exceeds allowance')) {
			return help_err('You don\'t have enough balance.');
		}

		console.error(e);

		return 0;
	};
};

const chain_error = e => {
	console.warn(e);
	DATA.conf = { connected: false, vault: Big(0), balance: Big(0) };
	/* elementify('Root').classList.remove('has-connection'); */
	/* if (typeof e === 'undefined') {
	help_err('Your wallet is loged out!');
	}  */

	elementify('login-logout-text').innerHTML = 'Login';
	elementify('ModalPositions__Panel1').innerHTML = '<div class="item">No active positions</div>';
	elementify('ModalPositions__Panel2').innerHTML = '<div class="item">No completed positions</div>';
	set_swap_button();
	elementify('swap-buttons').classList.remove('loading');

	return false;
};

const on_connect = async function (last_operation) {
	elementify('swap-buttons').classList.add('loading');

	try {
		DATA.provider = await DATA.web3Modal.connect().catch(e => false);
	} catch (e) {
		DATA.loading = false;
		return;
	}

	if (!DATA.provider) {
		return chain_error();
	}

	DATA.provider.on('chainChanged', fetch_account_data);
	DATA.provider.on('accountsChanged', () => {
		DATA.account_changed = true;
		DATA.prev_uid = DATA.conf.uid;
		fetch_account_data();
	});
	DATA.provider.on('error', chain_error);

	if (DATA.initialized_chart) {
		DATA.conf = { connected: false, vault: Big(0), balance: Big(0) };
	} else {
		DATA.conf.connected = false;
	}
	setTimeout(async () => await fetch_account_data(last_operation), 0);
};

const on_disconnect = async function (is_msg) {
	if (DATA.provider && DATA.provider.disconnect) {
		await DATA.provider.disconnect();
		await DATA.web3Modal.clearCachedProvider();
		DATA.provider = null;
	}

	chain_error('logout');

	store.del('logged');
	store.del(); /* Try to clear localStorage where possible */

	navigate();

	if (!is_msg) {
		store.set('message', `{"a": "logout", "u": "${DATA.UUID}"}`);
		store.del('message');
		await handleAction('logout');
	}

	setTimeout(() => {
		document.location.href = document.location.href;
	}, 0);
};

var get_provider = (chain, is_rpc) => {
	if (!is_rpc && (!chain || chain === DATA.CHAIN)) {
		return provider[DATA.CHAIN_ID];
	}

	if (typeof DATA.web3_helpers[chain] === 'undefined') {
		DATA.web3_helpers[chain] = new ethers.providers.JsonRpcProvider(DATA.CHAINS[DATA.CHAIN_IDS_MAP[chain]].RPC);
	}

	return DATA.web3_helpers[chain];
};

var contract = (token, abi, chain, is_rpc) => {
	let _id = `${chain || DATA.CHAIN}-${token}`;

	/* if (typeof DATA.CONTRACTS[_id] === 'undefined') { */
		DATA.CONTRACTS[_id] = new ethers.Contract(token, abi || DATA.ABI, get_provider(chain || DATA.CHAIN, is_rpc));
	/* } */

	return DATA.CONTRACTS[_id];
};

/* setInterval(() => $('.dots').each(function(k) { $(this).html(['.', '..', '...'][Math.floor(Date.now() / 1000) % 3]); }), 900); */

const send = async (token, func, ...args) => {
	return await sendValueChain(DATA.CHAIN_ID, token, func, 0, ...args);
};

const sendValue = async (token, func, value, ...args) => {
	return await sendValueChain(DATA.CHAIN_ID, token, func, value, ...args);
};

const sendChain = async (chain_id, token, func, ...args) => {
	return await sendValueChain(chain_id, token, func, 0, ...args);
};

const checkChain = async (chain_id, token, func, ...args) => {
	return await checkChainValue(chain_id, token, func, 0, ...args);
};

const checkChainValue = async (chain_id, token, func, value, ...args) => {
	if (!provider[chain_id]) {
		return [await change_network(DATA.CHAINS[chain_id].CHAIN), null];
	}

	let tx = {
		'from': DATA.conf.wallet,
		'to': token,
		'gasPrice': await provider[chain_id].getGasPrice(),
		'nonce': await provider[chain_id].getTransactionCount(DATA.conf.wallet),
		'data': DATA.iface.encodeFunctionData(func, args),
		'chainId': chain_id /* await provider[chain_id].getNetwork().chainId */
	};

	if (value) {
		tx.value = _hex(value);
	}

	try {
		tx.gasLimit = _hex(Big(1.2).mul(await provider[chain_id].estimateGas(tx)).round());
	} catch(e) {
		return [e, null];
	}

	return [null, tx];
};

const sendValueChain = (chain_id, token, func, value, ...args) => {
	return new Promise(async (resolve, reject) => {
		let [err, tx] = await checkChainValue(chain_id, token, func, value, ...args);

		if (err) {
			return reject(err);
		}

		try {
			/* TODO: Check https://www.npmjs.com/package/@ethersproject/hardware-wallets */
			/* ... https://docs.ethers.io/v5/api/other/hardware/#hw-ledger */

			let transaction = await provider[chain_id].getSigner().sendTransaction(tx),
				receipt = await transaction.wait();

			if (receipt.status) {
				return resolve(transaction.hash);
			}

			return reject(transaction.hash);
		} catch(err) {
			console.error(err);
			return reject(err);
		}
	});
};
