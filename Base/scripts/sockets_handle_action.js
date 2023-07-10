const ACTIONS = {
    sign: async (action) => {
        DATA.conf.signed = await provider[DATA.CHAIN_ID]
            .getSigner()
            .signMessage(
                `By signing this transaction you agree to have an account stored on the Jewbot servers under your wallet address which will customize your experience. You will be able to sign in to this account from any device using the same wallet signature. ${DATA.conf.nonce}`
            )
            .catch(chain_error);
    },
    auth: async (action) => {
        if (DATA.conf.signed && DATA.conf.wallet) {
            let jbu = get_url_var('jbu'),
                affiliate = Number(jbu || get_url_var('affiliate')) || 0;

            if (DATA.prev_uid && affiliate == DATA.prev_uid) {
                affiliate = 0;
                jbu = 0;
            }

            await emit({
                a: action,
                d: {
                    s: DATA.conf.signed,
                    w: DATA.conf.wallet,
                    AF: affiliate,
                    _n: !!jbu,
                },
            });
        }
    },
    nonce: async (action) => {
        if (!(DATA.conf.auth = store.get('auth'))) {
            await emit({ a: action, d: { w: DATA.conf.wallet } });
        } else if (DATA.token) {
            await Promise.all([
                connect_ui(),
                get_chain_user(),
                (async () => {
                    (await set_token())(true);
                })(),
            ]);
        } else {
            await Promise.all([connect_ui(), get_chain_user()]);
        }
    },
    sub: async (action) => {
        if (typeof DATA.rooms === 'object' && DATA.rooms.length) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    r: DATA.rooms /* , pr: DATA.prev_room */,
                    f: DATA.room !== DATA.prev_room || !DATA.chat.length,
                },
            }); /* f - fetch history */
            DATA.rooms = [];
        }
    },
    untoken: async (action) => {
        if (typeof DATA.rooms === 'object' && DATA.rooms.length) {
            await emit({
                a: 'unsub',
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    r: DATA.rooms,
                },
            });
        }
    },
    pair: async (action) => {
        if (DATA.pair !== DATA.ZERO) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.token,
                    p: DATA.pair,
                    P: DATA.old_pair || DATA.IMAGINARY_PEG,
                    f: (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60,
                },
            });
            if (DATA.old_pair && DATA.old_pair !== DATA.ZERO && DATA.old_pair !== DATA.IMAGINARY_PEG) {
                DATA.rooms = [`${DATA.CHAIN}:${DATA.token}:${DATA.old_pair}`];
                DATA.sub_unsub_started = true;
                await handleAction('untoken');
            }
        }
    },
    copies: async (action) => {
        //DATA.selected_copy_slot = DATA.selected_copy_slot || DATA.ZERO;

        if (DATA.conf.auth && DATA.selected_copy_slot) {
            if (!DATA.copies_initialized) {
                DATA.copies_initialized = true;
                //DATA.selected_copy_slot = DATA.ZERO;
            }

            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: (DATA.selected_copy_slot === DATA.ZERO && DATA.IMAGINARY_PEG) || DATA.selected_copy_slot,
                },
            });
        }
    },
    pos: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    S: DATA.slots[DATA.CHAIN].map((v) => v.address),
                },
            });
        }
    },
    chat: async (action) => {
        if (DATA.conf.auth && DATA.chat_message) {
            let msg = DATA.chat_message;
            DATA.chat_message = '';
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    r: DATA.room,
                    m: msg,
                },
            });
        }
    },
    chats: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    boost: async (action) => {
        if (DATA.conf.auth && DATA.pay_token && ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.pay_token)) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain || DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    t: DATA.pay_token,
                },
            });
        }
    },
    slots: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    wallet: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    slot_copies: async (action) => {
        //DATA.selected_copy_slot = DATA.selected_copy_slot || DATA.ZERO;

        if (DATA.selected_copy_slot && ![DATA.WPEG].includes(DATA.selected_copy_slot)) {
            let addresses =
                (DATA.slot_copies_addresses && DATA.slot_copies_addresses.map((v) => Object.keys(DATA.copy_settings[v] || (DATA.copy_settings[v] = {}))).flat()) ||
                Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));

            addresses = addresses.filter((v) => ![DATA.WPEG, DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));

            if (addresses.length) {
                await emit({
                    a: action,
                    d: {
                        c: DATA.CHAIN,
                        w: DATA.conf.wallet || '',
                        a: DATA.conf.auth || '',
                        s: (DATA.selected_copy_slot === DATA.ZERO && DATA.IMAGINARY_PEG) || DATA.selected_copy_slot,
                        Ds: addresses,
                        D: ((!DATA.selected_copy_wallet || DATA.selected_copy_wallet === DATA.ZERO) && (DATA.selected_copy_wallet = addresses[0])) || DATA.selected_copy_wallet,
                    },
                });
            } else {
                DATA.copy_transactions[DATA.selected_copy_slot] = [];
                add_wallets();

                DATA.copy_address_transactions = [];
                set_address_transactions();
            }
        }
    },
    user_slot_copies: async (action) => {
        if (DATA.conf.auth && DATA.selected_copy_wallet && DATA.selected_copy_wallet !== DATA.ZERO) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                    D: DATA.selected_copy_wallet,
                },
            });
        }
    },
    fcopy: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                    D: DATA.selected_copy_wallet,
                    T: DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet].title,
                },
            });
        }
    },
    copy: async (action) => {
        if (DATA.conf.auth) {
            if (DATA.select_slot === DATA.ZERO) {
                return help_err('No slot!');
            }

            let settings = check_fields();

            //console.log('???', action, 'settings', settings);

            if (settings) {
                settings.kosher_strainer = settings.kosher_strainer.filter((v) => v);

                await emit({
                    a: action,
                    d: {
                        c: DATA.CHAIN,
                        w: DATA.conf.wallet,
                        a: DATA.conf.auth,
                        S: [(DATA.selected_slot === DATA.ZERO && DATA.IMAGINARY_PEG) || DATA.selected_slot],
                        ...settings,
                        cids: (settings.cid && [settings.cid]) || [DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet].cid],
                        cid: undefined,
                        _id: undefined,
                        D: undefined,
                        is_active: undefined,
                        balance: undefined,
                        buy_method_ids: [],
                        sell_method_ids: [],
                        slot: undefined,
                        buy_gas_limit: Math.floor(Number(settings.buy_gas_limit || 0) * 1000000) || undefined,
                        sell_gas_limit: Math.floor(Number(settings.sell_gas_limit || 0) * 1000000) || undefined,
                        buy_gas_price: Math.floor(Number(settings.buy_gas_price || 0) * 1000000000) || undefined,
                        sell_gas_price: Math.floor(Number(settings.sell_gas_price || 0) * 1000000000) || undefined,
                        buy_gas_multiplier: Math.floor(Number(settings.buy_gas_multiplier) * 1000) || undefined,
                        sell_gas_multiplier: Math.floor(Number(settings.sell_gas_multiplier) * 1000) || undefined,
                        defender_gas_multiplier: Math.floor(Number(settings.defender_gas_multiplier) * 1000),
                        frontrun_gas_multiplier: Math.floor(Number(settings.frontrun_gas_multiplier) * 1000),
                    },
                });

                return true;
            } else {
                return false;
            }
        }
    },
    update: async (action) => {
        if (DATA.conf.auth) {
            if (DATA.select_slot === DATA.ZERO) {
                return help_err('No slot!');
            }

            let settings = check_fields();

            //console.log('???', action, 'settings', settings);

            if (settings) {
                settings.kosher_strainer = settings.kosher_strainer.filter((v) => v);

                let slots = (DATA.slots[DATA.CHAIN] && get_active_slots()) || [];

                if (!slots.length) {
                    return help_err('Select a slot');
                }

                /* Sort the slots by cid so they'll match in the sql procedure's loop. */
                slots.sort((a, b) => {
                    let _a = DATA.cids.findIndex((v) => v == a.cid),
                        _b = DATA.cids.findIndex((v) => v == b.cid);

                    if (_a > _b) {
                        return 1;
                    } else if (_a < _b) {
                        return -1;
                    }

                    return 0;
                });

                await emit({
                    a: action,
                    d: {
                        c: DATA.CHAIN,
                        w: DATA.conf.wallet,
                        a: DATA.conf.auth,
                        S: slots,
                        cids: DATA.cids,
                        ...settings,
                        cid: undefined,
                        t: (![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token) && DATA.token) || undefined,
                        _id: undefined,
                        _buy_method_ids: undefined,
                        _sell_method_ids: undefined /* _buy & _sell methods are for local cache only */,
                        frontrun_gas_multiplier: undefined,
                        defender_max_tx_per_host: undefined,
                        slot: undefined,
                        is_defender_max_tx_per_host: undefined,
                        is_frontrun: undefined,
                        is_backtrun: undefined,
                        buy_gas_limit: Math.floor(Number(settings.buy_gas_limit || 0) * 1000000) || undefined,
                        sell_gas_limit: Math.floor(Number(settings.sell_gas_limit || 0) * 1000000) || undefined,
                        buy_gas_price: Math.floor(Number(settings.buy_gas_price || 0) * 1000000000) || undefined,
                        sell_gas_price: Math.floor(Number(settings.sell_gas_price || 0) * 1000000000) || undefined,
                        buy_gas_multiplier: Math.floor(Number(settings.buy_gas_multiplier || 0) * 1000),
                        sell_gas_multiplier: Math.floor(Number(settings.sell_gas_multiplier || 0) * 1000),
                        defender_gas_multiplier: Math.floor(Number(settings.defender_gas_multiplier || 0) * 1000),
                    },
                });

                return true;
            } else {
                return false;
            }
        }
    },
    toggle_copy: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    D: DATA.selected_copy_wallet,
                    s: DATA.selected_slot,
                },
            });
        }
    },
    uncopy: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    D: DATA.selected_copy_wallet,
                    s: DATA.selected_slot,
                },
            });
        }
    },
    token: async (action) => {
        if (DATA.token && ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.token,
                    p: DATA.pair || DATA.IMAGINARY_PEG,
                    pg: DATA.pages.token,
                    f: (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60,
                },
            });
        }
    },
    token_history: async (action) => {
        if (!DATA.updating_history_chart && !DATA.scroll_events.stop_feed && DATA.pair && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.pair)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.pair,
                    pg: DATA.pages.token,
                    off: DATA.page_offset.token,
                },
            });
        }
    },
    chart_history: async (action) => {
        if (
            !DATA.updating_history_chart &&
            !DATA.scroll_events.stop_chart &&
            DATA.token &&
            ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token) &&
            DATA.pair &&
            ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.pair)
        ) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.token,
                    p: DATA.pair,
                    F: DATA.chart_from,
                    T: DATA.chart_to,
                    f: (DATA.chart_time_frames[DATA.chart_time_frame] || 60) / 60,
                },
            });
        }
    },
    affiliates_history: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    pg: DATA.pages.affiliate,
                    N: DATA.selected_affiliate_jbu,
                },
            });
        }
    },
    stats_history: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    pg: DATA.pages.stats,
                    vchain: DATA.view_chain,
                    uid: DATA.view_uid,
                },
            });
        }
    },
    wallet_history: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    pg: DATA.pages.wallet,
                },
            });
        }
    },
    lq: async (action) => {
        if (DATA.token && ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token) && DATA.scroll_events.stop_liquidity) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.token,
                },
            });
        }
    },
    route: async (action) => {
        if (DATA.selected_token && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_token)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet || '',
                    a: DATA.conf.auth || '',
                    t: DATA.WPEG,
                    t0: DATA.selected_token,
                },
            });
        }
    },
    settings: async (action) => {
        if (DATA.conf.auth && DATA.token && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token)) {
            let slots = (DATA.slots[DATA.CHAIN] && get_active_slots()) || [];

            if (!slots.length && !(DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot))) {
                DATA.settings = JSON.parse(store.get(`${DATA.CHAIN}_settings`) || 'false');
                DATA.settings =
                    DATA.settings && Object.keys(DATA.settings).length
                        ? DATA.settings
                        : {
                              ...DATA.default_settings,
                              buy_method_ids: [],
                              sell_method_ids: [],
                              kosher_strainer: [],
                              targets_percents: [],
                              targets_triggers: [],
                          };
                load_settings('ModalPositionSettings', DATA.settings);
                return;
            }

            if (!slots.length) {
                slots = null;
            }

            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    t: DATA.token,
                    S: slots || [DATA.selected_slot],
                },
            });
        } else {
            DATA.settings = JSON.parse(store.get(`${DATA.CHAIN}_settings`) || 'false');
            DATA.settings =
                DATA.settings && Object.keys(DATA.settings).length
                    ? DATA.settings
                    : {
                          ...DATA.default_settings,
                          buy_method_ids: [],
                          sell_method_ids: [],
                          kosher_strainer: [],
                          targets_percents: [],
                          targets_triggers: [],
                      };
            load_settings('ModalPositionSettings', DATA.settings);
        }
    },
    csettings: async (action) => {
        if (DATA.conf.auth) {
            let cid = get_active_positions().map((v) => v.cid)[0];

            if (cid) {
                await emit({
                    a: action,
                    d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth, cid },
                });
            }
        }
    },
    affiliates: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.view_affiliate_chain || DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    N: DATA.selected_affiliate_jbu,
                },
            });
        }
    },
    anonymize: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    unanonymize: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.CHAIN, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    buy: async (action) => {
        if (DATA.conf.auth && DATA.token && ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.token)) {
            if (DATA.token === DATA.WPEG) {
                return help_err('Really ?!');
            }

            let trials = 5;
            while (--trials && !DATA.token_data.T) {
                await sleep(1);
            }

            if (!Number(DATA.amounts[DATA.CHAIN])) {
                return help_err('Select amount');
            }

            let slots = (DATA.slots[DATA.CHAIN] && get_active_slots()) || [];

            if (!slots.length) {
                return help_err('Select a slot');
            }

            elementify('swap-buttons').classList.add('loading');

            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    cid: DATA.cids[0],
                    t: DATA.token,
                    S: slots,
                    A: Big(DATA.amounts[DATA.CHAIN]).mul(DATA.ETHER).toString(),
                    p: (DATA.token_data && DATA.token_data.T && DATA.token_data.T.pair) || DATA.pair || DATA.ZERO,
                    r: (DATA.token_data && DATA.token_data.T && DATA.token_data.T.router) || DATA.ROUTER,
                    P:
                        (DATA.token_data &&
                            DATA.token_data.T &&
                            DATA.token_data.T.path &&
                            DATA.token_data.T.path
                                .map((v) => v.replace('0x', '000000000000000000000000'))
                                .join('')
                                .toLowerCase()) ||
                        '',
                },
            });
        }
    },
    sell: async (action) => {
        if (DATA.conf.auth) {
            if (DATA.pids.length) {
                if (DATA.selected_token === DATA.token) {
                    elementify('swap-buttons').classList.add('loading');
                }
                await emit({
                    a: action,
                    d: {
                        c: DATA.CHAIN,
                        w: DATA.conf.wallet,
                        a: DATA.conf.auth,
                        P: DATA.pids,
                        A: DATA.sell_percent || 100,
                    },
                });
            } else if (
                DATA.selected_token &&
                ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_token) &&
                DATA.selected_sell_slot &&
                ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_sell_slot)
            ) {
                if (DATA.selected_token === DATA.token) {
                    elementify('swap-buttons').classList.add('loading');
                }
                await emit({
                    a: 'tsell',
                    d: {
                        c: DATA.CHAIN,
                        w: DATA.conf.wallet,
                        a: DATA.conf.auth,
                        S: [DATA.selected_sell_slot],
                        t: DATA.selected_token,
                        A: DATA.sell_percent || 100,
                    },
                });
            }

            delete DATA.pids;
        }
    },
    user: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    uid: DATA.view_uid,
                    vchain: DATA.view_chain,
                },
            });
        }
    },
    follow: async (action) => {
        if (DATA.conf.auth && DATA.view_uid && DATA.view_uid !== DATA.ZERO && DATA.view_uid !== DATA.conf.uid) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    uid: DATA.view_uid,
                },
            });
        }
    },
    unfollow: async (action) => {
        if (DATA.conf.auth && DATA.view_uid && DATA.view_uid !== DATA.ZERO && DATA.view_uid !== DATA.conf.uid) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    uid: DATA.view_uid,
                },
            });
        }
    },
    stake: async (action) => {
        if (DATA.conf.auth && Number(DATA.selected_nft)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    N: DATA.selected_nft,
                },
            });
        }
    },
    unstake: async (action) => {
        if (DATA.conf.auth && Number(DATA.selected_nft)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    N: DATA.selected_nft,
                },
            });
        }
    },
    select: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                },
            });
        }
    },
    unselect: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                },
            });
        }
    },
    deposit: async (action) => {
        if (
            DATA.conf.auth &&
            DATA.deposit_slot &&
            ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.deposit_slot) &&
            DATA.deposit_amount.gt(0) &&
            DATA.deposit_token &&
            ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.deposit_token)
        ) {
            await emit({
                a: action,
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    A: DATA.deposit_amount.toString(),
                    t: DATA.deposit_token,
                    s: DATA.deposit_slot,
                },
            });
        }
    },
    toggle_copy_wallet_state: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: 'toggle',
                d: {
                    c: DATA.CHAIN,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                    D: DATA.selected_copy_wallet,
                    t: DATA.slot_toggle_is_spectator,
                },
            });
        }
    },
    slot_name: async (action) => {
        if (DATA.conf.auth && DATA.slot_name_address && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.slot_name_address)) {
            await emit({
                a: action,
                d: {
                    c: DATA.slot_name_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.slot_name_address,
                    T: DATA.slot_name,
                },
            });
        }
    },
    migrate: async (action) => {
        if (
            DATA.conf.auth &&
            DATA.selected_slot &&
            ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot) &&
            DATA.selected_migration_slot &&
            ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_migration_slot)
        ) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_migration_slot,
                    t: Object.keys(DATA.migration_tokens[DATA.selected_chain][DATA.selected_slot]),
                    F: DATA.selected_slot,
                    T: DATA.selected_migration_slot,
                },
            });
        }
    },
    sell_all: async (action) => {
        if (DATA.conf.auth && DATA.selected_slot && ![DATA.WPEG, DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.selected_slot)) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    s: DATA.selected_slot,
                },
            });
        }
    },
    send_nft: async (action) => {
        if (DATA.conf.auth && Number(DATA.send_nft_to) && Number(DATA.selected_nft)) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    n: DATA.selected_nft,
                    t: DATA.selected_nft_type,
                    T: DATA.send_nft_to,
                },
            });
        }
    },
    wuid: async (action) => {
        if (DATA.conf.auth && Number(DATA.view_chat_uid)) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    uid: DATA.view_chat_uid,
                },
            });
        }
        delete DATA.view_chat_uid;
    },
    synagogue: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.selected_chain, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }
    },
    synagogues: async (action) => {
        if (DATA.conf.auth && DATA.conf.pool && DATA.conf.pool !== DATA.ZERO) {
            return await emit({
                a: 'synagogue',
                d: { c: DATA.selected_chain, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
        }

        await emit({ a: action, d: { c: DATA.CHAIN } });
    },
    synagogize: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    t: elementify('synagogue-name').value.trim() || `Private Pool #${DATA.conf.uid}`,
                },
            });
        }
    },
    synagogized: async (action) => {
        if (DATA.conf.auth && DATA.pay_token && ![DATA.IMAGINARY_PEG, DATA.ZERO].includes(DATA.pay_token)) {
            await emit({
                a: action,
                d: {
                    c: DATA.selected_chain,
                    w: DATA.conf.wallet,
                    a: DATA.conf.auth,
                    t: DATA.pay_token,
                },
            });
        }
    },
    logout: async (action) => {
        if (DATA.conf.auth) {
            await emit({
                a: action,
                d: { c: DATA.selected_chain, w: DATA.conf.wallet, a: DATA.conf.auth },
            });
            delete DATA.sell_percent;
        }
    },
    ver: async (action) => {
        await emit({ a: action, d: {} });
    },
};

const handleAction = async (action) => {
    return await (ACTIONS[`${action}`] || (async () => {}))(action);
};
