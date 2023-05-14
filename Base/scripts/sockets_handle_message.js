const MESSAGES = {
    ver: async (data) => {
        //console.log('ver', data)
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        if (DATA.version !== data.d.v) {
            DATA.version = data.d.v;

            if (DATA.conf.auth) {
                handleAction('slots');
            } else {
                /* Guest */
                handleAction('slot_copies');
                handleAction('synagogues');
            }

            if (DATA.token) {
                handleAction('token');
            }

            if (DATA.pair) {
                handleAction('pair');
            }
        } else {
            DATA.rooms = [DATA.room];

            if (DATA.token && DATA.token != DATA.ZERO && DATA.pair && DATA.pair != DATA.ZERO) {
                DATA.rooms.push(`${DATA.CHAIN}:${DATA.token}:${DATA.pair}`, `${DATA.CHAIN}:H:${DATA.token}`);
            }
        }

        handleAction('sub');
    },
    sub: async (data) => {
        //console.log("sub", data);
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        for (let room in data.d) {
            DATA.chats[room] = data.d[room].map((v) => JSON.parse(v));

            if (room === DATA.room) {
                DATA.chat = DATA.chats[room];
                set_chat(DATA.chat);
            }
        }

        handleAction('chats');
    },
    nonce: async (data) => {
        //console.log("data", data);
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.conf.nonce = data.d.n;
        await handleAction('sign');
        await handleAction('auth');
    },
    auth: async (data) => {
        //console.log("auth", data);
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        if (data.e) {
            return await handleAction('nonce');
        }

        store.set('auth', (DATA.conf.auth = data.d.a));

        await connect_ui();

        handleAction('slots');
        handleAction('copies');

        if (!DATA.wallet_started) {
            handleAction('wallet');
        }

        setTimeout(() => {
            get_chain_user();

            if (typeof DATA.last_operation === 'function') {
                DATA.last_operation();
                delete DATA.last_operation;
            }

            store.set('message', `{"a": "login", "u": "${DATA.UUID}"}`);
            store.del('message');
        }, 1000);
    },
    boost: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        let chain_id = selected_chain(),
            allowance = await contract(DATA.pay_token).allowance(DATA.conf.wallet, DATA.CHAINS[chain_id].SUBSCRIPTION);

        if (allowance < 1e25) {
            if (!(await sendChain(chain_id, DATA.pay_token, 'approve', DATA.CHAINS[chain_id].SUBSCRIPTION, DATA.MINUS_ONE).catch(wallet_error()))) {
                return;
            }
        }

        if (DATA.selected_discount) {
            /* DEFINITION: function burn(uint256 id, uint256 affiliate, address router, address[] memory path, uint256 helpers, uint256 quantity, uint256 sell_fee, bool safe) */
            await sendChain(
                chain_id,
                DATA.CHAINS[chain_id].DISCOUNTS,
                'burn(uint256,uint256,address,address[],uint256,uint256,uint256,bool)',
                _hex(DATA.selected_discount),
                _hex((DATA.conf.affiliate = data.d.AF)),
                data.d.R,
                data.d.path,
                _hex(0),
                _hex(DATA.boost_quantity),
                _hex((data.d.fee || 0) + 5),
                true
            ).catch(wallet_error());
        } else {
            /* DEFINITION: function subscribe(uint256 affiliate, address router, address[] memory path, uint256 helpers, uint256 quantity, uint256 sell_fee, address pool, bool safe) */
            await sendChain(
                chain_id,
                DATA.CHAINS[chain_id].SUBSCRIPTION,
                'subscribe',
                _hex((DATA.conf.affiliate = data.d.AF)),
                data.d.R,
                data.d.path,
                _hex(0),
                _hex(DATA.boost_quantity),
                _hex((data.d.fee || 0) + 5),
                DATA.ZERO,
                true
            ).catch(wallet_error());
        }

        setTimeout(() => {
            handleAction('wallet');
        }, 5000);

        setTimeout(() => {
            handleAction('wallet');
        }, 10000);
    },
    route: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        if (DATA.route_action === 'wallet_sell') {
            delete DATA.route_action;

            let chain_id = selected_chain();

            if (!data.d.path || !data.d.path.length) {
                return help_err('No path');
            }

            let [err, tx] = await checkChainValue(chain_id, DATA.CHAINS[chain_id].SWAP, 'checkBuy', 1e14, data.d.router, [...data.d.path].reverse(), _hex(data.d.fee || 25)).catch((e) => [e, null]);

            if (err) {
                console.error('!!', err, tx);
                return help_err('Trade verification failed');
            }

            if (
                DATA.wallet_token_sell_amount >
                (await contract(DATA.selected_token)
                    .allowance()
                    .catch((_) => 0))
            ) {
                if (-1 === (await sendChain(chain_id, DATA.selected_token, 'approve', DATA.CHAINS[chain_id].SWAP, _hex(DATA.wallet_token_sell_amount)).catch((e) => -1))) {
                    return;
                }
            }

            delete DATA.selected_token;

            if (DATA.wallet_token_sell_percent === 100) {
                return await sendChain(chain_id, DATA.CHAINS[chain_id].SWAP, 'sell(address,address[],uint256)', data.d.router, data.d.path, _hex(data.d.fee || 25)).catch(wallet_error());
            } else {
                return await sendChain(chain_id, DATA.CHAINS[chain_id].SWAP, 'trade', _hex(DATA.wallet_token_sell_amount), data.d.router, data.d.path, _hex(data.d.fee || 25)).catch(wallet_error());
            }
        }
    },
    updated: async (data) => {
        if (data.e) {
            help_err(data.e);
        } else if (data.d.sa === 'swap') {
            if (data.d.t === DATA.token) {
                DATA.cids = data.d.cids.map((v) => v.cid);
                DATA.settings.cid = data.d.cids[0].cid;

                if (DATA.buy_started) {
                    DATA.buy_started = false;
                    handleAction('buy');
                } else {
                    handleAction('pos');
                }
            }
        } else if (data.d.sa === 'copy') {
            if (data.d.cid) {
                DATA.copy_settings[data.d.s][data.d.D].cid = data.d.cid;
                handleAction('copies');
            } /* else handle grey eye vs +/- icons !? */
        }
    },
    pair: async (data) => {
        if (!data || !data.d || data.d.t !== DATA.token || data.d.p !== DATA.pair) {
            return; /* Wrong chain */
        }

        if (data.d.f === (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60) {
            await wait_for_chart_to_finish_drawing();
        }

        DATA.getting_pair = false;
        DATA.pages.token = 0;
        DATA.pages.liquidity = 0;
        DATA.page_offset.token = 0;
        DATA.page_offset.chart = 0;
        DATA.chart_to = (data.d.s.length && data.d.s[data.d.s.length - 1].time) || 0;
        DATA.chart_form = 0;
        DATA.token_data.s = data.d.S;
        DATA.token_data.h = data.d.h;
        DATA.scroll_events.stop_chart = data.d.s.length < DATA.page_limits.chart;
        DATA.scroll_events.stop_feed = data.d.S.length < DATA.page_limits.token;
        DATA.token_pair_idx = (DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r.findIndex((v) => v.address === DATA.pair)) || 0;
        DATA.token_pair_idx = (~DATA.token_pair_idx && DATA.token_pair_idx) || 0;

        elementify('swaps-feed').innerHTML = '';
        GetTokenImage(
            DATA.token_data.r &&
                DATA.token_data.r.length &&
                ((DATA.token === DATA.token_data.r[DATA.token_pair_idx].token0 && DATA.token_data.r[DATA.token_pair_idx].token1) || DATA.token_data.r[DATA.token_pair_idx].token0),
            undefined,
            document.querySelector('#Chart__Currency label img.secondary-token-icon').id
        );
        document.querySelector('#Chart__Currency label img.dex-icon').src =
            (DATA.token_data.r && DATA.token_data.r.length && get_dex_image(DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router])) || DATA.ERROR_IMG;
        reset_scroll_top();
        navigate();

        if (data.d.f === (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60) {
            set_candles(data.d.s);
            update_chart(true);
        }

        for (let i = 0; i < data.d.S.length; ++i) {
            add_swap_event_to_feed(data.d.S[i], true);
        }

        document.querySelectorAll('#Chart__Currency ul li button.lq-pair.active').forEach((el) => el.classList.remove('active'));
        document.querySelectorAll(`#Chart__Currency ul li button.lq-pair[data-pair="${DATA.pair}"]`).forEach((el) => el.classList.add('active'));

        save_settings('token');
    },
    affiliates_history: async (data) => {
        if (data.d) {
            DATA.affiliate_fees = DATA.affiliate_fees.concat(data.d.F);
            DATA.scroll_events.stop_affiliate = data.d.F < DATA.page_limits.affiliates;
            set_user_affiliat_jbu_fees();
        }
    },
    stats_history: async (data) => {
        if (data.d) {
            DATA.view_rank_history = DATA.view_rank_history.concat(data.d.RH);
            DATA.scroll_events.stop_stats = data.d.RH < DATA.page_limits.stats;
            set_user_chain_stats();
        }
    },
    chart_history: async (data) => {
        if (!DATA.scroll_events.stop_chart && data.d.p === DATA.pair && data.d.t === DATA.token && data.d.f === (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60) {
            if (data.d.s && data.d.s.length) {
                DATA.scroll_events.stop_chart = data.d.s.length < DATA.page_limits.chart;

                if (!DATA.chart_to || DATA.chart_to > data.d.s[data.d.s.length - 1].time) {
                    let is_last = !DATA.chart_to;

                    DATA.chart_to = data.d.s[data.d.s.length - 1].time || DATA.chart_to;
                    DATA.chart_from = 0;

                    await wait_for_chart_to_finish_drawing();
                    set_candles(data.d.s, !is_last);
                    update_chart(is_last);
                }
            } else {
                DATA.scroll_events.stop_chart = true;
            }
        }
    },
    token_history: async (data) => {
        if (data.d.p === DATA.pair) {
            if (data.d.S && data.d.S.length) {
                DATA.scroll_events.stop_feed = data.d.S.length < DATA.page_limits.token;

                for (let i = 0; i < data.d.S.length; ++i) {
                    add_swap_event_to_feed(data.d.S[i], true);
                }
            } else {
                DATA.scroll_events.stop_feed = true;
            }
        }
    },
    token: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        data.d = data.d || {};

        if (data.d.C) {
            DATA.token_code = data.d.C;
        }

        if (Object.keys(data.d.ABI).length) {
            set_method_ids({ ...data.d.ABI });
        }
        delete data.d.ABI; /* Otherwise it overwrites over 'ca' event */
        delete data.d.C; /* Otherwise it overwrites over 'ca' event */
        DATA.pages.token = 0;
        DATA.pages.liquidity = 0;
        DATA.page_offset.token = 0;
        DATA.page_offset.chart = 0;
        DATA.chart_to = Date.now();
        DATA.chart_from = 0;
        DATA.token_data = data.d;
        DATA.token_data.lqh = data.d.lqh;
        DATA.token_pair_idx = (data.d.p && data.d.r && data.d.r.length && data.d.r.findIndex((v) => v.address === data.d.p)) || 0;
        DATA.token_pair_idx = (~DATA.token_pair_idx && DATA.token_pair_idx) || 0;
        DATA.token_data.r = data.d.r.filter((v) => DATA.ROUTER_NAMES[v.router]);
        DATA.token_data.router = (DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r[DATA.token_pair_idx].router) || DATA.ROUTER;
        DATA.pair = (DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r[DATA.token_pair_idx].address) || DATA.ZERO;
        DATA.router = (DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r[DATA.token_pair_idx].router) || DATA.ZERO;
        elementify('swaps-feed').innerHTML = '';
        elementify('Root').classList.add('has-token');
        elementify('Root').classList.add('has-connection');
        add_liquidity_pairs();
        add_holders_to_feed();
        fill_ca_details();
        reset_scroll_top();

        (await set_token(undefined, true))(true);

        if (!DATA.initialized_chart) {
            DATA.initialized_chart = true;

            setTimeout(() => {
                /* See: https://jsfiddle.net/TradingView/fg7yez2s/ */

                DATA.chart_time_scale.subscribeVisibleLogicalRangeChange(() => {
                    if (DATA.chart_scroll_timer) {
                        clearTimeout(DATA.chart_scroll_timer);
                    }

                    DATA.chart_scroll_timer = setTimeout(async () => {
                        var logicalRange = DATA.chart_time_scale.getVisibleLogicalRange();
                        if (logicalRange !== null) {
                            var barsInfo = DATA.candlestickSeries.barsInLogicalRange(logicalRange);
                            if (barsInfo !== null && barsInfo.barsBefore < 10) {
                                /* var firstTime = getBusinessDayBeforeCurrentAt(data[0].time, 1); */
                                /* var lastTime = getBusinessDayBeforeCurrentAt(firstTime, Math.max(100, -barsInfo.barsBefore + 100)); */
                                handleAction('chart_history');
                            }
                        }

                        DATA.chart_scroll_timer = null;
                    }, 50);
                });

                DATA.chart.subscribeClick((param) => {
                    console.log(param);
                });
            }, 0);
        }

        let price = Big((DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r[DATA.token_pair_idx].price) || 0).mul(DATA.WPEG_PRICE),
            price_precision = 4;

        if (price.gt(0)) {
            if (price.lt(1)) {
                price_precision += Math.max(0, Math.ceil(Math.log(Big(1).div(price).pow(2)) / Math.log(10)));
            }

            price_precision = Math.min(Number(price_precision) || 16, 16);
        }

        DATA.candlestickSeries.applyOptions({
            priceFormat: {
                type: 'price',
                precision: price_precision,
                minMove: Big(10).pow(-price_precision).toNumber(),
            },
        });

        handleAction('pair');
        handleAction('pos');

        save_settings('token');
    },
    settings: async (data) => {
        /* Received settings from server, check if it has any values or if it's empty. */
        if (data.d && data.d.length) {
            let i = 0,
                j,
                cid,
                cids = [],
                settings,
                idx;

            for (; i < data.d.length; ++i) {
                settings = {};
                cid = Number(data.d[i].cid) || 0;
                if (cid) {
                    cids = cids.filter((v) => v != cid);
                    cids.push(cid);
                }

                settings = data.d[i];

                for (j in settings) {
                    if (typeof settings[j] === 'string' && Number(settings[j]) >= 0) {
                        if (Number(settings[j])) {
                            if (settings[j].includes('.')) {
                                settings[j] = settings[j].replace(/\.?0+$/, '');
                            }
                        } else {
                            settings[j] = 0;
                        }
                    }
                }

                settings.buy_gas_limit = (settings.buy_gas_limit || 0) / 1000000;
                settings.sell_gas_limit = (settings.sell_gas_limit || 0) / 1000000;
                settings.buy_gas_price = (settings.buy_gas_price || 0) / 1000000000;
                settings.sell_gas_price = (settings.sell_gas_price || 0) / 1000000000;
                settings.buy_gas_multiplier = (settings.buy_gas_multiplier || 0) / 1000;
                settings.sell_gas_multiplier = (settings.sell_gas_multiplier || 0) / 1000;
                settings.defender_gas_multiplier = (settings.defender_gas_multiplier || 0) / 1000;
                settings.frontrun_gas_multiplier = (settings.frontrun_gas_multiplier || 0) / 1000;

                settings.targets_triggers = settings.targets_triggers.map((v) => (`${v}`.includes('.') && `${v}`.replace(/\.?0+$/, '')) || Number(v) || 0);
                settings.targets_percents = settings.targets_percents.map((v) => (`${v}`.includes('.') && `${v}`.replace(/\.?0+$/, '')) || Number(v) || 0);

                settings.buy_method_ids = (settings.methods && settings.methods.filter((v, k) => settings.directions[k] === 1)) || [];
                settings.sell_method_ids = (settings.methods && settings.methods.filter((v, k) => settings.directions[k] === -1)) || (settings.is_defender && Object.values(DATA.token_abi)) || [];

                delete settings.methods;
                delete settings.directions;
                settings.is_defender_manual = false;

                idx = DATA.slots[DATA.CHAIN].findIndex((v) => v.address === data.d[i].slot);
                DATA.slots[DATA.CHAIN][idx].settings = JSON.parse(JSON.stringify(settings));

                if (!i) {
                    DATA.settings = DATA.slots[DATA.CHAIN][idx].settings;

                    save_settings('swap', false, true);

                    setTimeout(() => {
                        load_settings('ModalPositionSettings', DATA.settings);
                        set_method_ids(DATA.token_abi);
                    }, 0);
                }
            }

            DATA.cids = cids;
        } else {
            /* If message from server doesn't contain values then try to find settings to apply from client's localStorage. */
            load_settings(
                'ModalPositionSettings',
                (DATA.settings = JSON.parse(store.get(`${DATA.CHAIN}_${DATA.selected_slot}_settings`) || 'false') || {
                    ...DATA.default_settings,
                    buy_method_ids: [],
                    sell_method_ids: [],
                    kosher_strainer: [],
                    targets_percents: [],
                    targets_triggers: [],
                })
            );
        }
    },
    unsub: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        if (!DATA.sub_unsub_started && data.d === 'untoken') {
            DATA.pair = null;
            DATA.token = null;
            DATA.token_data = {};
            DATA.symbol = 'Token';

            console.log('clearing chart !!! (untoken)');
            await wait_for_chart_to_finish_drawing();

            DATA.candleBuffer = [];
            DATA.lastCandle = { ...CHART_DATA[0] };

            update_chart(true);

            document.querySelector('#Chart__Currency .name').innerText = DATA.symbol;
            document.querySelector('#Swap__OutputCurrency .symbol > div ').innerText = DATA.symbol;

            document.querySelectorAll('#ModalTokenOutput .list .item.active').forEach((activeItem) => {
                activeItem.classList.remove('active');
            });

            document.querySelector('#ModalTokenOutput input[type="text"]').value = '';
            document.querySelector('#Swap__OutputCurrency .image img').src = DATA.ERROR_IMG;
            document.querySelector('#Chart__Currency label img.main-token-icon').src = DATA.ERROR_IMG;
            document.querySelector('#Chart__Currency label img.secondary-token-icon').src = DATA.ERROR_IMG;
            document.querySelector('#Chart__Currency label img.dex-icon').src = DATA.ERROR_IMG;
            document.querySelector('#Chart__Currency label img.dex-icon').setAttribute('onerror', `error_img(this, '')`);

            elementify('swaps-feed').innerHTML = '';
            elementify('holders-feed').innerHTML = '';
            elementify('token-price-usd').innerHTML = '';
            document.querySelector('#Chart__Currency .price').innerHTML = '';
            document.querySelector('#SwapFeed__Panel3 table').innerHTML = '';

            elementify('Root').classList.remove('has-token');
            elementify('MobileHelper__Tab1').checked = 'checked';

            if (!DATA.conf.connected) {
                elementify('Root').classList.remove('has-connection');
            }

            save_settings('token', false, true);
        } else {
            delete DATA.sub_unsub_started;
        }
    },
    lq: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.scroll_events.stop_liquidity = data.d.length < DATA.page_limits.liquidity;
        DATA.token_data.r = data.d;
        update_liquidity_pairs();
    },
    buy: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        elementify('swap-buttons').classList.remove('loading');

        await handleAction('pos');
        setTimeout(() => {
            handleAction('pos');
        }, 1500);

        //TODO: Depracated
        /*for (let i = 12; i > 0; --i) {
			await handleAction('pos');
			await sleep(1);
		}*/
    },
    sell: async (data) => {
        set_current_positions((DATA.active_positions = []));

        await handleAction('pos');
        setTimeout(() => {
            handleAction('pos');
        }, 1500);

        elementify('swap-buttons').classList.remove('loading');
    },
    tsell: async (data) => {
        setTimeout(() => {
            handleAction('wallet');
        }, 5000);

        elementify('swap-buttons').classList.remove('loading');
    },
    copies: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        if (data.d) {
            let tmp = {};

            for (let i = data.d.length - 1, j, k; i >= 0; --i) {
                for (j in data.d[i]) {
                    if (j.endsWith('_gas_multiplier')) {
                        data.d[i][j] = (Number(data.d[i][j]) || 0) / 1000;
                    } else if (j.endsWith('_gas_limit')) {
                        data.d[i][j] = (Number(data.d[i][j]) || 0) / 1000000;
                    } else if (j.endsWith('_gas_price')) {
                        data.d[i][j] = (Number(data.d[i][j]) || 0) / 1000000000;
                    } else if (typeof data.d[i][j] === 'string') {
                        if (!isNaN(Number(data.d[i][j])) && !Number(data.d[i][j])) {
                            data.d[i][j] = 0;
                        } else if (data.d[i][j].includes('.')) {
                            data.d[i][j] = data.d[i][j].replace(/\.?0+$/, '');
                        }
                    } else if (['targets_triggers', 'targets_percents'].includes(j)) {
                        for (k = data.d[i][j].length - 1; k >= 0; --k) {
                            if (typeof data.d[i][j][k] === 'string') {
                                if (!isNaN(Number(data.d[i][j][k])) && !Number(data.d[i][j][k])) {
                                    data.d[i][j][k] = 0;
                                } else if (data.d[i][j][k].includes('.')) {
                                    data.d[i][j][k] = data.d[i][j][k].replace(/\.?0+$/, '');
                                }
                            }
                        }
                    }
                }

                tmp[data.d[i].address] = data.d[i];
            }

            DATA.copy_settings[DATA.selected_copy_slot] = tmp;

            /* DATA.copy_transactions = data.d.tx; */
            /* add_wallets(); */
            handleAction('slot_copies');
        }
    },
    pos: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        set_current_positions((DATA.active_positions = data.d.N || []));
        set_history_positions(data.d.H);

        if (!DATA.positions[DATA.CHAIN]) {
            DATA.positions[DATA.CHAIN] = {};
        }

        DATA.positions[DATA.CHAIN] = data.d;

        let current_token_positions = data.d.N.filter((v) => v.token === DATA.token),
            active_slots = get_active_slots();

        if (current_token_positions.filter((v) => ~active_slots.indexOf(v.slot)).length) {
            set_swap_button('Sell');
            handleAction('csettings');
        } else {
            set_swap_button('Buy');
        }

        set_main_sell_button_pids();

        save_settings('pos');
    },
    select: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.slots[data.d.c][DATA.slots[data.d.c].findIndex((v) => v.address === data.d.s)].selected = data.d.a;
        set_main_sell_button_pids();
        set_current_positions(DATA.active_positions);

        handleAction('settings');

        save_settings('slots');
    },
    unselect: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.slots[data.d.c][DATA.slots[data.d.c].findIndex((v) => v.address === data.d.s)].selected = data.d.a;
        set_main_sell_button_pids();
        set_current_positions(DATA.active_positions);

        if (get_active_slots().length) {
            handleAction('settings');
        }

        save_settings('slots');
    },
    slots: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        handle_consts(data.d);

        if (data.d.s && data.d.s.length) {
            DATA.selected_slot = DATA.slot = data.d.s[0].address;
        }

        handleAction('copies');
        handleAction('synagogues');

        let balances = {};

        for (let i = data.d.Y.length - 1; i >= 0; --i) {
            if (!balances[data.d.Y[i].wallet]) {
                balances[data.d.Y[i].wallet] = {};
            }

            balances[data.d.Y[i].wallet][data.d.Y[i].address] = data.d.Y[i];
        }

        let old_total_balances = {};

        (DATA.slots[DATA.CHAIN] || []).map((v) => {
            old_total_balances[v.address] = {
                balance: Big(v.balance).mul(DATA.ETHER),
            };
        });

        DATA.slots[DATA.CHAIN] = data.d.s.map((slot) => {
            slot.balance = Big(
                (Number((balances[slot.address] && balances[slot.address][DATA.WPEG] && balances[slot.address][DATA.WPEG].balance) || 0) && balances[slot.address][DATA.WPEG].balance) ||
                    (old_total_balances[slot.address] && old_total_balances[slot.address].balance) ||
                    0
            ).div(DATA.ETHER);
            slot.total_balance = Big(slot.balance);
            slot.balances = slot.balances || {};

            if (balances[slot.address]) {
                for (let token in balances[slot.address]) {
                    if ([DATA.IMAGINARY_PEG, DATA.WPEG].includes(token)) {
                        continue;
                    }

                    slot.balances[token] = {
                        d: balances[slot.address][token].decimals,
                        bl: Big(balances[slot.address][token].balance).div(get_decimals_power(balances[slot.address][token].decimals)),
                        p: Big((slot.balances[slot.address] && slot.balances[slot.address][token] && slot.balances[slot.address][token].price) || balances[slot.address][token].price || 0),
                    };

                    slot.total_balance = slot.total_balance.add(slot.balances[token].bl.mul(slot.balances[token].p).div(DATA.ETHER));
                }
            }

            if (!slot.history) {
                slot.history = [];
            }

            if (slot.history.length < 12) {
                slot.history = [...slot.history, ...Array.from(Array(12 - slot.history.length)).map((_) => 0)];
            }

            return slot;
        });

        if (DATA.wallet_slots_pagination_idx >= DATA.slots[DATA.CHAIN].length) {
            store.set(`${DATA.CHAIN}_wallet_slots_pagination_idx`, (DATA.wallet_slots_pagination_idx = DATA.slots[DATA.CHAIN].length - 1));
        }

        /* Check and if good then continute the token migration if new slots are found and there was a started migration */
        let keys = Object.keys(old_total_balances),
            new_keys = DATA.slots[DATA.CHAIN].map((v) => v.address);

        if (keys.length && new_keys.length && keys.length !== new_keys.length) {
            if (DATA.migration_started[DATA.CHAIN]) {
                let k = 0,
                    new_slots = [],
                    slot;

                for (slot = new_keys.length - 1; slot >= 0; --slot) {
                    if (!keys.includes[new_keys[slot]]) {
                        new_slots.push(new_keys[slot]);
                    }
                }

                for (slot in DATA.migration_started[DATA.selected_chain]) {
                    DATA.selected_slot = slot;
                    DATA.selected_migration_slot = new_slots[k++];
                    DATA.migration_tokens[DATA.selected_chain][DATA.selected_slot] = DATA.migration_started[DATA.selected_chain][slot].tokens;
                    await handleAction('migrate');
                }
            }
        }

        handleAction('settings');

        load_slots();
        load_wallet_slots();
        set_wallet_assets();
        set_wallet_chains_slots();
        set_header_wallet_slots();
        set_header_wallet_chains();

        save_settings('copy', false, true);
        save_settings('slots', false, true);
        save_settings('consts', false, true);
    },
    synagogues: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.synagogues = data.d.S;
        DATA.top3 = data.d.TOP;

        elementify('global-top3').innerHTML = get_global_top3();
        await set_non_synagogue();
        setTimeout(() => {
            if (!DATA.wallet_started) {
                handleAction('wallet');
            }
        }, 0);

        if (document.querySelector('#ModalProfile__Body .row-5')) {
            document.querySelector('#ModalProfile__Body .row-5').classList.remove('visually-hidden'); /* Unhide entire "Create Synagogue" section */
        }

        save_settings('synagogues', false, true);
    },
    synagogue: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        DATA.conf.total_synagogue_nodes = Number(data.d.N) || 0;
        DATA.conf.synagogue_last_txs = data.d.txs;
        DATA.conf.top_3 = data.d.TOP;

        set_synagogue_transactions();

        if (document.querySelector('#ModalProfile__Body .row-5')) {
            document.querySelector('#ModalProfile__Body .row-5').classList.add('visually-hidden'); /* Hide entire "Create Synagogue" section */
        }

        if (!DATA.wallet_started) {
            handleAction('wallet');
        } else {
            delete DATA.wallet_started;
        }
    },
    synagogize: async (data) => {
        handleAction('synagogue');
    },
    synagogized: async (data) => {
        let chain_id = selected_chain(),
            allowance = await contract(DATA.pay_token).allowance(DATA.conf.wallet, DATA.CHAINS[chain_id].SUBSCRIPTION);

        if (allowance < 1e25) {
            if (!(await sendChain(chain_id, DATA.pay_token, 'approve', DATA.CHAINS[chain_id].SUBSCRIPTION, DATA.MINUS_ONE).catch(wallet_error()))) {
                return;
            }
        }

        /* DEFINITION: function subscribe(uint256 affiliate, address router, address[] memory path, uint256 helpers, uint256 quantity, uint256 sell_fee, address pool, bool safe) */
        if (
            await sendChain(chain_id, DATA.CHAINS[chain_id].SUBSCRIPTION, 'subscribe', _hex((DATA.conf.affiliate = data.d.AF)), data.d.R, data.d.path, 0, _hex(1), _hex(data.d.fee || 1), DATA.selected_pool, true).catch(
                wallet_error()
            )
        ) {
            delete DATA.selected_pool;
            handleAction('synagogue');
        } else {
            return;
        }
    },
    deposit: async (data) => {
        /* DEFINITION: function deposit(address to, address router, address[] memory path, uint256 amountIn, uint256 sell_fee) */
        await send(DATA.DEPOSIT, 'deposit(address,address,address[],uint256,uint256)', DATA.deposit_slot, data.d.R, data.d.path, _hex(DATA.deposit_amount), _hex(data.d.fee || 1))
            .then(() => handleAction('slots'))
            .catch(console.log);
    },
    wallet_history: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        /* TODO: Append history... */
    },
    wallet: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        handle_consts(data.d);

        DATA.conf.assets = [
            ...data.d.Y.filter(
                (v) =>
                    ![DATA.IMAGINARY_PEG, DATA.WPEG].includes(v.address) &&
                    Big(v.balance || 0)
                        .mul(v.price || 0)
                        .mul(DATA.WPEG_PRICE)
                        .div(get_decimals_power((typeof DATA.decimals[v.address] === 'undefined' && 18) || DATA.decimals[v.address])) < 10000000
            ).map((v) => {
                v.balance = Big(v.balance).div(get_decimals_power(DATA.decimals[v.address]));
                return {
                    k: v.address,
                    bl: v.balance,
                    p: v.price,
                };
            }),
            ...((DATA.conf.assets && DATA.conf.assets.filter((v) => [DATA.IMAGINARY_PEG, DATA.WPEG].includes(v.k))) || []),
        ];

        let previous_nft_keys = {},
            now = Date.now(),
            i,
            j,
            expiry;

        for (i = (DATA.conf.N || []).length - 1; i >= 0; --i) {
            for (j in DATA.conf.N[i]) {
                previous_nft_keys[`${DATA.conf.N[i][j].type}-${DATA.conf.N[i][j].nft}-${DATA.CHAIN}-${j}-${DATA.conf.N[i][j].expiry || 0}`] = true;

                if (DATA.conf.N[i][j].type === 'JBS') {
                    previous_nft_keys[`user-servers-${DATA.conf.N[i][j].nft}-${DATA.CHAIN}-${j}-${DATA.conf.N[i][j].expiry || 0}`] = true;
                }

                if (DATA.conf.N[i][j].type === 'JBD') {
                    previous_nft_keys[`user-discounts-${DATA.conf.N[i][j].nft}-${DATA.CHAIN}-${j}-${DATA.conf.N[i][j].expiry || 0}`] = true;
                }
            }
        }

        DATA.wallet_started = true;
        DATA.pages.wallet = 0;
        DATA.scroll_events.stop_wallet = data.d.Y.length < DATA.page_limits.wallet;
        DATA.conf = { ...DATA.conf, ...data.d.i };
        DATA.view_uid = DATA.conf.uid;
        DATA.conf.followings = {};
        DATA.conf.favourites = {}; /* Maybe remove */
        DATA.previous_nft_keys = previous_nft_keys;
        DATA.conf.N = {};
        DATA.conf.pools = {};
        DATA.conf.pool =
            (data.d.P &&
                data.d.P.length &&
                data.d.P.filter((v) => v.pool !== DATA.ZERO && v.is_synagogue && new Date(v.expiry || 0) > Date.now() - 5000).length &&
                data.d.P.filter((v) => v.pool !== DATA.ZERO && v.is_synagogue && new Date(v.expiry || 0) > Date.now() - 5000)[0].pool) ||
            DATA.ZERO;

        for (i = data.d.FV.length - 1; i >= 0; --i) {
            if (!DATA.conf.favourites[data.d.FV[i].address]) {
                DATA.conf.favourites[data.d.FV[i].address] = [data.d.FV[i].chain];
            } else {
                DATA.conf.favourites[data.d.FV[i].address].push(data.d.FV[i].chain);
            }
        }

        for (i = data.d.FL.length - 1; i >= 0; --i) {
            DATA.conf.followings[data.d.FL[i].following] = true;
        }

        for (i = data.d.N.length - 1; i >= 0; --i) {
            for (j = data.d.N[i].amount - data.d.N[i].expiries.length - 1; j >= 0; --j) {
                if (!DATA.conf.N[data.d.N[i].type]) {
                    DATA.conf.N[data.d.N[i].type] = [{ id: data.d.N[i].nft, chain: DATA.CHAIN }];
                } else {
                    DATA.conf.N[data.d.N[i].type].push({ id: data.d.N[i].nft, chain: DATA.CHAIN });
                }

                if (data.d.N[i].type === 'JBS') {
                    DATA.conf.pools[data.d.N[i].nft] = data.d.P.splice(0, 1)[0] || { ip_hash: DATA.ZERO_HASH, chain: DATA.CHAIN };
                }
            }

            for (j = data.d.N[i].expiries.length - 1; j >= 0; --j) {
                if ((expiry = new Date(data.d.N[i].expiries.pop())) > now) {
                    expiry = new Date(Math.max(new Date(expiry), Date.now()));

                    if (!DATA.conf.N[data.d.N[i].type]) {
                        DATA.conf.N[data.d.N[i].type] = [{ id: data.d.N[i].nft, chain: DATA.CHAIN, expiry: expiry.getTime() }];
                    } else {
                        DATA.conf.N[data.d.N[i].type].push({ id: data.d.N[i].nft, chain: DATA.CHAIN, expiry: expiry.getTime() });
                    }

                    if (data.d.N[i].type === 'JBS') {
                        DATA.conf.pools[data.d.N[i].nft] = data.d.P.splice(0, 1)[0] || { ip_hash: DATA.ZERO_HASH, chain: DATA.CHAIN, expiry: expiry.getTime() };
                    }
                }
            }
        }

        for (i = data.d.P.length - 1; i >= 0; --i) {
            DATA.conf.pools[data.d.P[i].nft] = { ...(DATA.conf.pools[data.d.P[i].nft] || {}), ...data.d.P.pop() };
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

        set_nodes();
        set_original_wallet_assets();
        set_original_wallet_nfts();
        set_wallet_assets();

        handleAction('affiliates');
        handleAction('user');
        handleAction((DATA.conf.pool && DATA.conf.pool !== DATA.ZERO && 'synagogue') || 'synagogues');

        navigate();

        save_settings('conf', false, true);
        save_settings('consts', false, true);
    },
    user: async (data) => {
        DATA.view_user = data.d.i;
        DATA.view_user._rank = data.d.r;
        DATA.view_user.total_trades = 0;
        DATA.view_user.total_wager = 0;
        DATA.follow_stats = data.d.FS;
        DATA.view_rank_chart_history = data.d.H.map((v) => Big(v.v));
        DATA.view_rank_history = data.d.RH;
        DATA.view_rank = {};
        DATA.scroll_events.stop_stats = DATA.view_rank_history < DATA.page_limits.stats;

        for (i = data.d.R.length - 1; i >= 0; --i) {
            data.d.R[i].wins = Number(data.d.R[i].wins);
            data.d.R[i].losses = Number(data.d.R[i].losses);
            data.d.R[i].wager = Number(data.d.R[i].wager);
            DATA.view_rank[data.d.R[i].chain] = { ...data.d.R[i], chain: undefined };
            DATA.view_user.total_trades += data.d.R[i].wins + data.d.R[i].losses;
            DATA.view_user.total_wager += data.d.R[i].wager;
        }

        elementify('user-followers').innerHTML = data.d.FS.followers;
        elementify('user-following').innerHTML = data.d.FS.following;
        document.querySelector('[data-user-rank]').innerHTML = formatNumber(Number(data.d.r) || 0);

        if (DATA.view_chain === 'ALL') {
            document.querySelector('[data-user-global-rank]').innerHTML = formatNumber(Number(data.d.r) || 0);
            document.querySelector('[data-user-total-trades]').innerHTML = formatNumber(DATA.view_user.total_trades);
            document.querySelector('[data-user-total-wager]').innerHTML = formatFiat(DATA.view_user.total_wager);
            elementify('main-user-chain-level').innerText = get_level(DATA.view_user.total_wager);
        }

        set_user_name();
        set_user_rank();

        if (data.d.i.uid === DATA.conf.uid) {
            elementify('claim-container').classList.remove('d-none');

            DATA.conf.rank = DATA.view_rank;
            DATA.conf.rank_history = DATA.view_rank_history;
            DATA.conf.rank_chart_history = DATA.view_rank_chart_history;

            save_settings('conf', false, true);
        } else {
            document.querySelector('[data-action="claim"]').classList.add('d-none');
        }
    },
    slot_copies: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        handle_consts(data.d);

        parse_copied_txs(data.d.scs, data.d.P);

        DATA.copy_address_transactions = data.d.cs;
        set_address_transactions();

        save_settings('copy', false, true);
        save_settings('slots', false, true);
        save_settings('consts', false, true);
    },
    user_slot_copies: async (data) => {
        if (!data || !data.d) {
            return; /* Wrong chain */
        }

        handle_consts(data.d);

        parse_copied_txs(data.d.scs, data.d.P);

        /* DATA.copy_transactions[DATA.selected_slot] = data.d.scs;
		set_wallet_slot_transactions(); */

        save_settings('consts', false, true);
    },
    affiliates: async (data) => {
        if (data.d) {
            DATA.affiliate_fees = data.d.F || [];
            DATA.total_affiliate_fees = {};
            DATA.conf.nft_affiliates = data.d.FC;
            DATA.scroll_events.stop_affiliate = DATA.affiliate_fees < DATA.page_limits.affiliates;

            elementify('nft-affiliates').innerHTML = DATA.conf.nft_affiliates;

            for (let i = data.d.T.length - 1; i >= 0; --i) {
                if (data.d.T[i].is_same_pool) {
                    DATA.total_affiliate_fees.Y = Big(DATA.total_affiliate_fees.Y || 0).add(data.d.T[i].usd_fees);
                } else {
                    DATA.total_affiliate_fees[data.d.T[i].type] = Big(DATA.total_affiliate_fees[data.d.T[i].type] || 0).add(data.d.T[i].usd_fees);
                }
            }

            save_settings('conf', false, true);
        }

        set_affiliate_jbus();
        set_user_affiliat_jbu_fees();
        set_total_user_affiliat_jbu_fees();
    },
    uncopied: async (data) => {
        handleAction('copies');
    },
    send_nft: async (data) => {
        if (data.d.w) {
            DATA.selected_chain = data.d.c;
            DATA.selected_nft = data.d.n;
            send_nft(data.d.w, data.d.t);
        } else {
            help_err('No such user');
        }
    },
    wuid: async (data) => {
        if (data.d.w) {
            let jbu = 0;

            try {
                let [
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
                ] = await contract(DATA.USERS).getUser(data.d.w);

                jbu = chain_user_avatars[chain_user_avatar];
            } catch (e) {}

            DATA.view_chat_img.src = await get_user_image(jbu);

            delete DATA.view_chat_img;
        } else {
            help_err('No such user');
        }
    },
};

const handle_message = async (data) => {
    if (!!data && typeof data !== 'string' && data.length) {
        try {
            /* https://stackoverflow.com/a/22675494/2124529 */
            data = JSON.parse(
                data
                    .map((_data) =>
                        String.fromCharCode.apply(
                            null,
                            new Uint16Array(
                                pako.inflate(
                                    new Uint8Array(
                                        atob(_data)
                                            .split('')
                                            .map((v) => v.charCodeAt(0))
                                    )
                                )
                            )
                        )
                    )
                    .join('')
            );
        } catch (err) {}
    } else if (data.length) {
        return data.map(handle_message);
    }

    //console.debug('>>', JSON.parse(JSON.stringify(data)));

    /* let _data = JSON.stringify(data),
		_key = sha3(`${data.e || data.a}`);

	console.debug('>>', JSON.parse(_data));

	if (DATA.responses_cache[_key] === _data) {
		return;
	}

	DATA.responses_cache[_key] = _data; */

    if (data.e) {
        if (data.e === 429) {
            return help_err('Please slow down');
        }

        let error = (DATA.error = typeof data.e === 'string' || typeof data.e === 'number' ? data.e : (typeof data.e === 'boolean' && on_disconnect()) || data.e.details[0].message);

        if (`${error}`.includes('chain" must be one of')) {
            DATA.view_rank_history = [];
            set_user_rank();
            remove_affiliate_loader();

            return change_network('BSC');
        }

        help_err(error.slice(0, 1).toUpperCase() + error.slice(1).replace('[, ', '['));
    }

    if (data.reload) {
        return (document.location = document.location.href);
    }
    return await (MESSAGES[`${data.a}`] || handle_error)(data);
};
