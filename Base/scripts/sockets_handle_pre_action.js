const PRE_ACTIONS = {
    connect: async (element) => {
        if (!DATA.conf.connected || !DATA.conf.auth) {
            on_connect();
            return '-';
        }

        return '-';
    },
    token: async (element) => {
        if (element.dataset.token == DATA.IMAGINARY_PEG) {
            return '-';
        }

        let token = element.dataset.token || element.dataset.tokenAddress || document.querySelector('#ModalTokenOutput__Body input.form-control').value,
            prev_token = elementify('Chart').dataset.tokenAddressVerifiy,
            is_same = token === prev_token;

        if (!token) {
            return '-';
        }

        try {
            document.querySelector('#ModalTokenOutput__Body input.form-control').value = token;
            elementify('Chart').dataset.tokenAddressVerifiy = token;

            if (element.dataset.token) {
                DATA.symbol = element.innerText || DATA.symbol;
            }

            if (token) {
                token = token.split('#')[0].split('/').slice(-1)[0];

                if (!token.startsWith('0x')) {
                    token = `0x${token}`;
                }

                DATA.token = toChecksumAddress(token);
                elementify('Root').classList.add('has-token');
                elementify('Root').classList.add('has-connection');
            } else {
                elementify('Root').classList.remove('has-token');
                elementify('MobileHelper__Tab1').checked = 'checked';
            }
        } catch (e) {
            console.debug('!! Bad address:', token.split('/').slice(-1)[0], e);
            return '-';
        }

        if (DATA.view !== 'swap') {
            bootstrap('swap', false, true);
        }

        if (is_same) {
            return '-';
        }

        DATA.rooms = [`${DATA.CHAIN}:${prev_token}:${DATA.pair}`, `${DATA.CHAIN}:H:${prev_token}`];
        DATA.sub_unsub_started = true;
        await handleAction('untoken');

        DATA.getting_pair = false;
        DATA.pair = DATA.IMAGINARY_PEG;
        DATA.pages.token = 0;
        reset_scroll_top();

        handleAction('settings');
    },
    'reset-settings': async (element) => {
        load_settings('ModalPositionSettings', (DATA.settings = { ...DATA.default_settings, buy_method_ids: [], sell_method_ids: [], kosher_strainer: [], targets_percents: [], targets_triggers: [] }));
    },
    'save-settings': async (element) => {
        save_settings('swap');
    },
    'reset-copy-settings': async (element) => {
        load_settings(
            'ModalCopyPositionSettings',
            DATA.selected_slot &&
                (DATA.selected_copy_wallet || DATA.copy_wallet || (DATA.selected_copy_wallet = DATA.ZERO)) &&
                (DATA.copy_settings[DATA.selected_copy_slot] || (DATA.copy_settings[DATA.selected_copy_slot] = {})) &&
                (DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet] = {
                    ...DATA.default_copy_settings,
                    buy_method_ids: [],
                    sell_method_ids: [],
                    kosher_strainer: [],
                    targets_percents: [],
                    targets_triggers: [],
                })
        );
    },
    'save-copy-settings': async (element) => {
        save_settings('copy');
    },
    'toggle-synagogue-node': async (element) => {
        if ((DATA.selected_nodes[DATA.selected_nft] = !DATA.selected_nodes[DATA.selected_nft])) {
            document.querySelector(`.card[data-nft="${DATA.selected_nft}"][data-action="toggle-synagogue-node"]`).classList.add('active');
        } else {
            document.querySelector(`.card[data-nft="${DATA.selected_nft}"][data-action="toggle-synagogue-node"]`).classList.remove('active');
        }

        return '-';
    },
    'set-migration-slot': async (element) => {
        DATA.selected_migration_slot = element.dataset.migrateSlot;
        return '-';
    },
    'toggle-boost-discounts': async (element) => {
        /* This is needed because the container also has a toggle input. */
        return '-';
    },
    migrate: async (element) => {
        let tokens = Object.keys(DATA.migration_tokens[DATA.selected_chain][DATA.selected_slot]);

        if (!DATA.migration_tokens || !DATA.migration_tokens[DATA.selected_chain] || !tokens || !tokens.length) {
            help_err('No tokens selected');
            return '-';
        }

        if (DATA.selected_migration_slot === DATA.ZERO) {
            if (!DATA.migration_started[DATA.selected_chain]) {
                DATA.migration_started[DATA.selected_chain] = {};
            }

            DATA.migration_started[DATA.selected_chain][DATA.selected_slot] = { tokens: DATA.migration_tokens[DATA.selected_chain][DATA.selected_slot] };

            try {
                let chain_id = selected_chain();
                let tx_hash = await sendChain(chain_id, DATA.CHAINS[chain_id].SUBSCRIPTION, 'slot', _hex(1), _hex(DATA.conf.affiliate)); /* helpers, affiliate */
                let receipt = await provider.getTransactionReceipt(tx_hash);
                let slots = receipt.logs && receipt.logs.filter((v) => v.topics[0] === DATA.SLOT_TOPIC).map((v) => toChecksumAddress(v.topics[1].slice(-40)));
                DATA.selected_migration_slot = slots[0];
            } catch (e) {
                console.error('!! Slot creation error on migration:', e);
                return '-';
            }
        }

        if (tokens.length === 1) {
            await send(DATA.selected_slot, 'migrateTo(address,address)', DATA.selected_migration_slot, tokens[0]);
        } else {
            for (let i = tokens.length - 1; i >= 0; i -= DATA.MAX_OPS_PER_TX) {
                await send(DATA.selected_slot, 'migrateTo(address,address[],bool)', DATA.selected_migration_slot, tokens.slice(Math.max(0, i - DATA.MAX_OPS_PER_TX), i + 1), false);
            }
        }
    },
    'set-max-slot-deposit': async (element) => {
        let panel;

        while (!(panel || element).classList.contains('panelbox')) {
            panel = (panel || element).parentNode;
        }

        let balance = Big(DATA.conf.vault || 0).sub(Big(21000).mul(DATA.gas_price).div(DATA.ETHER));

        if (balance.lt(0)) {
            balance = Big(0);
        }

        element = panel.querySelector('.panel:nth-of-type(2) input[type="range"]');

        element.max = balance.mul(DATA.WPEG_PRICE).toFixed(3);
        element.value = 0;

        panel.querySelector('.panel:nth-of-type(2) input[type="text"]').value = '0.00';

        return '-';
    },
    'set-max-slot-withdraw': async (element) => {
        let panel;

        while (!(panel || element).classList.contains('panelbox')) {
            panel = (panel || element).parentNode;
        }

        let balance = Big(DATA.slots[DATA.CHAIN][element.dataset.slotIdx].balance);

        if (balance.lt(0)) {
            balance = Big(0);
        }

        element = panel.querySelector('.panel:nth-of-type(3) input[type="range"]');

        element.max = balance.mul(DATA.WPEG_PRICE).toFixed(3);
        element.value = 0;

        panel.querySelector('.panel:nth-of-type(3) input[type="text"]').value = '0.00';

        return '-';
    },
    prepare_deposit: async (element) => {
        //console.log('==============pre-action prepare_deposit =====================', element);

        DATA.deposit_prep[DATA.pay_slot] = DATA.pay_token;
        //console.log('DATA.pay_token', DATA.pay_token);

        while (!element.classList.contains('currency')) {
            element = element.parentNode;
        }
        //console.log('element after while loop??', element);

        //console.log("element.querySelector('[data-balance]').dataset.balance", element.querySelector('[data-balance]').dataset.balance);

        //console.log('(DATA.pay_token === DATA.IMAGINARY_PEG && Big(21000).mul(DATA.gas_price).div(DATA.ETHER)', DATA.pay_token === DATA.IMAGINARY_PEG && Big(21000).mul(DATA.gas_price).div(DATA.ETHER));

        let deposit_balance = Big(element.querySelector('[data-balance]').dataset.balance || 0).sub((DATA.pay_token === DATA.IMAGINARY_PEG && Big(21000).mul(DATA.gas_price).div(DATA.ETHER)) || 0);
        //console.log('deposit_balance', deposit_balance);

        if (deposit_balance.lt(0)) {
            //console.log('deposit_balance lt 0');
            deposit_balance = Big(0);
            //console.log('deposit_balance', deposit_balance);
        }

        let range_element = document.getElementById(element.parentNode.parentNode.id.replace('Panel5', 'Panel2')).querySelector('input[type="range"]');
        //console.log('range_element', range_element);

        range_element.max = deposit_balance.mul(DATA.WPEG_PRICE).toFixed(3);
        //console.log('range_element.max', deposit_balance.mul(DATA.WPEG_PRICE).toFixed(3));
        range_element.value = 0;

        document.getElementById(element.parentNode.parentNode.id.replace('Panel5', 'Panel2')).querySelector('input[type="text"]').value = '0.00';
    },
    deposit: async (element) => {
        var parentDivEl = element.closest('div');
        var inputAmountEl = parentDivEl.getElementsByTagName('input')[0];
        //console.log('inputAmountEl', inputAmountEl);
        //console.log('inputAmountEl.value', inputAmountEl.value);

        if (!parentDivEl || !inputAmountEl) {
            help_error('Unknown error occurred trying to get the deposit value. This problem has been reported and will be looked into.');
            console.error('sockets_handle_pre_action.js action(deposit) ', 'parentDivEl', parentDivEl, 'inputAmountEl', inputAmountEl);
            return;
        }

        DATA.deposit_slot = DATA.slots[DATA.CHAIN][element.dataset.slotIdx].address;
        DATA.deposit_token = DATA.deposit_prep[DATA.pay_slot]; /* In case there're more than 1 slot and the user started selected more than 1 deposits. */
        DATA.deposit_amount = Big(inputAmountEl.value).mul(DATA.ETHER).div(DATA.WPEG_PRICE).round();

        /*console.log('DATA.deposit_slot', DATA.deposit_slot);
        console.log('DATA.deposit_token', DATA.deposit_token);

        console.log('===formula===');
        console.log('inputAmountEl.value', inputAmountEl.value);
        console.log('*');
        console.log('DATA.ETHER', DATA.ETHER);
        console.log('/');
        console.log('DATA.WPEG_PRICE', DATA.WPEG_PRICE);
        console.log('round()');

        console.log('results======= deposit_amount', DATA.deposit_amount);
        console.log('DATA.slots[DATA.CHAIN][element.dataset.slotIdx].address', DATA.slots[DATA.CHAIN][element.dataset.slotIdx].address);

        //console.log('DATA.deposit_slot'.DATA.deposit_slot);
        //console.log('DATA.deposit_token', DATA.deposit_token);
        console.log('DAATA.deposit_amount', DATA.deposit_amount);*/

        if (DATA.deposit_token === DATA.IMAGINARY_PEG) {
            //console.log('DATA.deposit_token === DATA.IMAGINARY_PEG === TRUE');
            try {
                //console.log("try sendValue(DATA.DEPOSIT, 'deposit(address)', DATA.deposit_amount, DATA.deposit_slot)");
                // console.log('DATA.DEPOSIT', DATA.DEPOSIT);

                await sendValue(DATA.DEPOSIT, 'deposit(address)', DATA.deposit_amount, DATA.deposit_slot);
            } catch (e) {
                console.log('error trying to run sendValue()');
                console.error(e);
                DATA.deposit_amount = Big(0);
            }

            return '-';
        } else if (DATA.deposit_token === DATA.WPEG) {
            console.log('DATA.deposit_token === DATA.WPEG === TRUE');

            try {
                //console.log('DATA.DEPOSIT', DATA.DEPOSIT);
                // console.log('await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT))', await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT));

                //console.log('if(DATA.deposit_amount.gt(await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT)))', DATA.deposit_amount.gt(await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT)));

                if (DATA.deposit_amount.gt(await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT))) {
                    // console.log('if(DATA.deposit_amount.gt(await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT))) IS TRUE');

                    // console.log('DATA.deposit_amount', DATA.deposit_amount);

                    //  console.log("calling send(DATA.WPEG, 'approve', DATA.DEPOSIT, _hex(DATA.deposit_amount))", '_hex(DATA.deposit_amount)', _hex(DATA.deposit_amount));

                    await send(DATA.WPEG, 'approve', DATA.DEPOSIT, _hex(DATA.deposit_amount));
                }

                //console.log('AFTER if if(DATA.deposit_amount.gt(await contract(DATA.WPEG).allowance(DATA.conf.wallet, DATA.DEPOSIT))) IS TRUE');
                // console.log("calling send(DATA.DEPOSIT, 'deposit(address,uint256)', DATA.deposit_slot, _hex(DATA.deposit_amount)");
                await send(DATA.DEPOSIT, 'deposit(address,uint256)', DATA.deposit_slot, _hex(DATA.deposit_amount));
            } catch (e) {
                console.error(e);
                DATA.deposit_amount = Big(0);
            }

            return '-';
        }
        /*console.log('got to the bottom of the function');
        console.log('formula ===');
        console.log('DATA.deposit_amount', DATA.deposit_amount);
        console.log('/');
        console.log('DATA.conf.assets.find((v) => v.k === DATA.deposit_token).p', DATA.conf.assets.find((v) => v.k === DATA.deposit_token).p);
        console.log('round()');
        console.log('===');

        console.log(
            'DATA.deposit_amount = DATA.deposit_amount.div(DATA.conf.assets.find((v) => v.k === DATA.deposit_token).p).round() == DATA.deposit_amount',
            DATA.deposit_amount.div(DATA.conf.assets.find((v) => v.k === DATA.deposit_token).p).round()
        );*/

        DATA.deposit_amount = DATA.deposit_amount.div(DATA.conf.assets.find((v) => v.k === DATA.deposit_token).p).round();

        //console.log('allowance = ', await contract(DATA.deposit_token).allowance(DATA.conf.wallet, DATA.DEPOSIT));

        /*console.log(
            'CHECKIGN IF DATA.deposit_amount.gt(await contract(DATA.deposit_token).allowance(DATA.conf.wallet, DATA.DEPOSIT)) IS TRUE ',
            DATA.deposit_amount.gt(await contract(DATA.deposit_token).allowance(DATA.conf.wallet, DATA.DEPOSIT))
        );*/

        if (DATA.deposit_amount.gt(await contract(DATA.deposit_token).allowance(DATA.conf.wallet, DATA.DEPOSIT))) {
            //console.log('DATA.deposit_amount.gt(await contract(DATA.deposit_token).allowance(DATA.conf.wallet, DATA.DEPOSIT)) IS TRUE');
            //console.log("RUNNING send(DATA.deposit_token, 'approve', DATA.DEPOSIT, _hex(DATA.deposit_amount))");
            //console.log('_hex', _hex(DATA.deposit_amount));
            await send(DATA.deposit_token, 'approve', DATA.DEPOSIT, _hex(DATA.deposit_amount));
        }
    },
    withdraw: async (element) => {
        let panel;

        while (!(panel || element).classList.contains('panelbox')) {
            panel = (panel || element).parentNode;
        }

        let amount = Big(panel.querySelector('.panel:nth-of-type(4) input[type="text"]').value).div(DATA.WPEG_PRICE).mul(DATA.ETHER).round(),
            balance = Big(panel.querySelector('.panel:nth-of-type(4) input[type="range"]').max).div(DATA.WPEG_PRICE).mul(DATA.ETHER).round(),
            slot = DATA.slots[DATA.CHAIN][element.dataset.slotIdx];

        if (amount.gt(balance.mul(999).div(1000))) {
            amount = Big(await contract(DATA.WPEG).balanceOf(slot.address)); /* Get 100% if selected more than 99.9% (after back price calc.). */
        }

        await send(slot.address, 'withdraw(uint256)', _hex(amount));
    },
    'set-maxes-for-withdraw': async (element) => {
        let withdraw_balance = Big(DATA.conf.vault || 0).sub(Big(21000).mul(DATA.gas_price).div(DATA.ETHER));

        if (withdraw_balance.lt(0)) {
            withdraw_balance = Big(0);
        }

        element = document.querySelector('#Wallet__Wallet2__Panel4 input[type="range"]');

        element.max = withdraw_balance.mul(DATA.WPEG_PRICE).toFixed(3);
        element.value = 0;

        document.querySelector('#Wallet__Wallet2__Panel4 input[type="text"]').value = '0.00';

        return '-';
    },
    'remove-slot-address': async (element) => {
        if (DATA.selected_slot !== DATA.ZERO) {
            handleAction('uncopy');
        }

        if (DATA.copy_transactions[DATA.selected_slot]) {
            delete DATA.copy_transactions[DATA.selected_slot];
        }

        DATA.copy_address_transactions = DATA.copy_address_transactions.filter((v) => v.w !== DATA.selected_copy_wallet);
        delete DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet];

        DATA.copy_settings_ordered[DATA.CHAIN].splice(DATA.copy_settings_ordered[DATA.CHAIN].indexOf(DATA.selected_copy_wallet), 1);

        let keys = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]);
        DATA.selected_copy_wallet = DATA.copy_wallet = (keys.length && DATA.copy_settings[DATA.selected_copy_slot][keys[0]].address) || DATA.ZERO;

        save_settings('uncopy');
    },
    'save-slots': async (element) => {
        save_settings('slots');
    },
    'remove-slot': async (element) => {
        DATA.slots[DATA.CHAIN].splice(DATA.slots[DATA.CHAIN].map((v) => v.address).indexOf(DATA.selected_slot), 1);
        save_settings('slots');
    },
    'create-slot': async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        if (DATA.slot_creation_stated) {
            return '-';
        }

        DATA.slot_creation_stated = true;

        let chain_id = selected_chain();
        await sendChain(chain_id, DATA.CHAINS[chain_id].SUBSCRIPTION, 'slot', _hex(1), _hex(DATA.conf.affiliate))
            .then(() => {
                DATA.slot_creation_stated = false;
            })
            .catch(
                wallet_error(() => {
                    DATA.slot_creation_stated = false;
                    elementify('Wallet__Slot__Create__Tab1').checked = true;
                    elementify('Wallet__Slot__Create__Tab3').checked = false;
                })
            ); /* helpers, affiliate */

        return '-';
    },
    chat: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                handleAction('chat');
            });
            return '-';
        }

        let footer,
            trials = 5;

        while (trials && !(footer || element).classList.contains('footer')) {
            footer = (footer || element).parentNode;
            --trials;
        }

        if (!footer) {
            footer = element;
        }

        DATA.chat_message = footer.querySelector('#Chat__TextInput').innerText.slice(0, 1024);
        footer.querySelector('#Chat__TextInput').innerText = '';

        handleAction('chat');
    },
    toggle_copy_wallet_state: async (element) => {
        if (!DATA.conf.connected) {
            setTimeout(() => {
                document
                    .querySelectorAll(`label[data-action="toggle_copy_wallet_state"] input.slot-${DATA.selected_slot}, label[data-action="toggle_copy_wallet_state"] input.slot-wallet-${DATA.selected_slot}`)
                    .forEach((el) => {
                        el.checked = false;
                    });
            }, 0);
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        DATA.selected_copy_wallet = element.dataset.wallet;

        if (!DATA.copy_settings[DATA.selected_copy_slot]) {
            DATA.copy_settings[DATA.selected_copy_slot] = {};
        }

        let idx = DATA.slots[DATA.CHAIN].findIndex((v) => v.address === DATA.selected_slot);
        if (!~idx) {
            return '-';
        }

        if (DATA.selected_copy_wallet === DATA.ZERO) {
            DATA.slot_toggle_is_spectator = !(DATA.slots[DATA.CHAIN][idx].is_active = !DATA.slots[DATA.CHAIN][idx].is_active);

            for (let i in DATA.copy_settings[DATA.selected_copy_slot]) {
                DATA.copy_settings[DATA.selected_copy_slot][i].is_active = DATA.slots[DATA.CHAIN][idx].is_active;
            }

            setTimeout(() => {
                document
                    .querySelectorAll(`label[data-action="toggle_copy_wallet_state"] input.slot-${DATA.selected_slot}, label[data-action="toggle_copy_wallet_state"] input.slot-wallet-${DATA.selected_slot}`)
                    .forEach((el) => {
                        el.checked = !DATA.slot_toggle_is_spectator;
                    });
            }, 0);

            save_settings('slots', false, true);
        } else {
            DATA.slot_toggle_is_spectator = DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet].is_spectator = !DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet].is_spectator;

            if (!DATA.slot_toggle_is_spectator && !DATA.slots[DATA.CHAIN][idx].is_active) {
                document.querySelectorAll(`label[data-action="toggle_copy_wallet_state"] input.slot-${DATA.selected_slot}`).forEach((el) => {
                    el.checked = true;
                });
                DATA.slots[DATA.CHAIN][idx].is_active = true;
            }
        }

        save_settings('copy', false, true);
    },
    'load-wallet-settings': async (element) => {
        DATA.selected_copy_wallet = element.dataset.wallet;

        if (!DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet]) {
            DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet] = {
                ...DATA.default_copy_settings,
                buy_method_ids: [],
                sell_method_ids: [],
                kosher_strainer: [],
                targets_percents: [],
                targets_triggers: [],
            };
        }

        elementify('copy-address-copier').setAttribute('onclick', `copyTextToClipboard('${DATA.selected_copy_wallet}', event, this)`);
        load_settings('ModalCopyPositionSettings', DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet]);
    },
    reduce: async (element) => {
        if (DATA.conf.JBU) {
            let chain_id = selected_chain();

            await sendChain(chain_id, DATA.CHAINS[chain_id].USERS, 'reduce', [_hex(element.dataset.nft)]).catch(wallet_error()); /* tokenIds */
            element = document.getElementById(`boost-unsubscribe-${element.dataset.nft}`); /* NOT elementify() */
            delete element.dataset.action;
            delete element.dataset.pool;
            delete element.dataset.nft;
            element.dataset.disabled = 'true';
            element.innerHTML = 'Unsubscribed';
            element.classList.add('disabled');
        }

        return '-';
    },
    claim: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        if (DATA.conf.JBU) {
            let chain_id = selected_chain();

            await sendChain(chain_id, DATA.CHAINS[chain_id].USERS_NFT, 'claim', _hex(DATA.conf.JBU)).catch(
                wallet_error((e, err) => {
                    console.log('???', err);

                    if (err.includes('execution reverted: o')) {
                        help_err("You don't have a user NFT");
                    } else if (err.includes('execution reverted: b')) {
                        help_err('Nothing to withdraw');
                    } else if (err.includes('execution reverted: s')) {
                        help_err('You can withdraw once a week');
                    }
                })
            );
        }

        return '-';
    },
    destroy: async (element) => {
        if (DATA.conf.JBU) {
            await sendChain(selected_chain(), DATA.selected_slot, 'migrateTo(address,address[],bool)', DATA.selected_slot, [], true).catch(wallet_error());
        }
        return '-';
    },
    'activate-action-card': async (element) => {
        if (DATA.selected_nft) {
            let chain_id = DATA.CHAIN_IDS_MAP[DATA.selected_chain] || DATA.CHAIN_ID,
                tokenId = DATA.selected_nft;

            delete DATA.selected_nft;

            /* DEFINITION: function burn(uint256 id) */
            await sendChain(chain_id, DATA.CHAINS[chain_id].ACTIONS_NFT, 'burn(uint256)', _hex(tokenId)).catch(wallet_error()); /* tokenId */
        }

        return '-';
    },
    'clear-selected-nfts': async (element) => {
        delete DATA.selected_artifact_nft;
        delete DATA.selected_user_nft;
        delete DATA.selected_nft;
    },
    'activate-artifact-card': async (element) => {
        if (element.dataset.userNft) {
            DATA.selected_user_nft = element.dataset.userNft;
        } else if (DATA.conf.N && DATA.conf.N.JBU && DATA.conf.N.JBU.length === 1) {
            DATA.selected_user_nft = DATA.conf.N.JBU[0].id;
        }

        if (element.dataset.artifactNft) {
            DATA.selected_artifact_nft = element.dataset.artifactNft;
        }

        if (DATA.selected_artifact_nft && DATA.selected_user_nft) {
            let chain_id = DATA.CHAIN_IDS_MAP[DATA.selected_chain] || DATA.CHAIN_ID,
                tokenId = DATA.selected_artifact_nft,
                userTokenId = DATA.selected_user_nft;

            delete DATA.selected_artifact_nft;
            delete DATA.selected_user_nft;

            /* DEFINITION: function burn(uint256 id, uint256 userTokenId) */
            await sendValueChain(chain_id, DATA.CHAINS[chain_id].ARTIFACTS_NFT, 'burn(uint256,uint256)', Big(96000).mul(DATA.gas_price), _hex(tokenId), _hex(userTokenId)).catch(wallet_error()); /* tokenId */
        }

        return '-';
    },
    mint: async (element) => {
        /* JBU: */
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        if (!DATA.conf.JBU) {
            await sendChain(selected_chain(), DATA.SUBSCRIPTION, 'mint', _hex(DATA.conf.affiliate)).catch((e) => {
                console.error(e);
                return false;
            });
        }

        return '-';
    },
    synagogize: async (element) => {
        /* Create a synagogue */
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        let nodes = Object.keys(DATA.selected_nodes);
        if (!nodes.length) {
            help_err('Choose at least one node.');
            return '-';
        }

        if (
            !(await sendChain(selected_chain(), DATA.SUBSCRIPTION, 'setPlan', _hex(elementify('synagogue-monthly-price').value), _hex(elementify('synagogue-max-minyan').value), true, nodes).catch((e) => {
                console.error(e);
                return false;
            }))
        ) {
            return '-';
        }
    },
    synagogized: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        if (!DATA.pay_token) {
            help_err('Select a token to pay with.');
            return '-';
        }

        DATA.selected_pool = element.dataset.pool;
    },
    boost: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        if (!DATA.pay_token) {
            help_err('Select a token to pay with.');
            return '-';
        }

        if (!DATA.boost_quantity) {
            help_err('Choose at least one node.');
            return '-';
        }
    },
    send_nft: async (element) => {
        DATA.selected_nft_type = element.dataset.nftType;
        DATA.send_nft_to = document.getElementById(`send-${DATA.selected_nft_type}-${DATA.selected_nft}-${element.dataset.nftOrder}-to`).value;

        if (await send_nft(DATA.send_nft_to, DATA.selected_nft_type)) {
            return '-';
        }

        if (!(DATA.send_nft_to = Number(DATA.send_nft_to)) || DATA.send_nft_to < 0) {
            help_err("Provide a user's ID");
            return '-';
        }
    },
    'wallet-list-assets': async (element) => {
        await select_slot(Number(element.dataset.walletSlotsPaginationIdx));
        element.blur();
    },
    'list-assets-left': async (element) => {
        if (DATA.wallet_slots_pagination_idx > -1) {
            await select_slot(DATA.wallet_slots_pagination_idx - 1);
        } else {
            await select_slot(DATA.slots[DATA.CHAIN].length - 1);
        }
        document.querySelector('#Wallet__AssetsSelector button:first-of-type').blur();
    },
    'list-assets-right': async (element) => {
        if (DATA.wallet_slots_pagination_idx < DATA.slots[DATA.CHAIN].length - 1) {
            await select_slot(DATA.wallet_slots_pagination_idx + 1);
        } else {
            await select_slot(-1);
        }
        document.querySelector('#Wallet__AssetsSelector button:last-of-type').blur();
    },
    'list-copy-slot': async (element) => {
        document.querySelectorAll('button[data-action="list-copy-slot"]').forEach((el) => el.classList.remove('active'));
        DATA.selected_copy_slot = element.dataset.slot;
        document.querySelector(`button[data-action="list-copy-slot"][data-slot="${DATA.selected_copy_slot}"]`).classList.add('active');

        //DATA.slot_copies_addresses = DATA.slots[DATA.CHAIN].map((v) => v.address).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));

        /*
        console.log("element.dataset.slot;", element.dataset.slot)
        if (DATA.slot_copies_addresses && DATA.slot_copies_addresses.length === 1 && DATA.slot_copies_addresses.includes(DATA.selected_slot)) {
            DATA.slot_copies_addresses = DATA.slots[DATA.CHAIN].map((v) => v.address).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));
            DATA.copy_settings_ordered[DATA.CHAIN] = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));
            DATA.selected_copy_slot = element.dataset.slot; //DATA.ZERO;
        } else {
            DATA.slot_copies_addresses = [(DATA.selected_copy_slot = element.dataset.slot)];
            document.querySelector(`button[data-action="list-copy-slot"][data-slot="${DATA.selected_copy_slot}"]`).classList.add('active');
        }*/

        if (!DATA.copy_settings[DATA.selected_copy_slot]) {
            DATA.copy_settings[DATA.selected_copy_slot] = {};
        }

        await handleAction('user_slot_copies');
        await handleAction('copies');

        if (DATA.copy_settings[DATA.selected_copy_slot]) {
            DATA.copy_wallet = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v))[0];
            DATA.selected_copy_wallet = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v))[0];

            DATA.copy_settings_ordered[DATA.CHAIN] = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));
        }

        return 'copies';
    },
    'set-first-wallet': async (element) => {
        /* Traverse up the elements parents until we get to the wallet element that contains the data attribute we need. */
        while (!element.classList.contains('wallet')) {
            element = element.parentNode;
        }

        let wallets = document.querySelector('#Copy .wallets');

        /* if (DATA.selected_copy_wallet !== element.dataset.wallet) { */
        DATA.selected_copy_wallet = DATA.copy_wallet = element.dataset.wallet;
        handleAction('user_slot_copies');
        /* } */

        /* If element is already first in list then just collapse the details, otherwise prepend it to the list. */
        if (element == wallets.firstElementChild) {
            //console.log("already first, collapse");
            element.classList.toggle('collapsed');
        } else {
            //console.log("not first, remove collapsed class and prepend to list");
            element.classList.remove('collapsed');
            wallets.prepend(element);
        }
        //console.log("element", element);
        //lement = document.querySelectorAll(`.wallets [data-wallet='${DATA.selected_copy_wallet}']`)
        // console.log("element", element);

        // console.log("DATA.selected_copy_wallet", DATA.selected_copy_wallet)
        // console.log("element.dataset.wallet", element.dataset.wallet)
        console.log('DATA.copy_settings_ordered[DATA.CHAIN]', DATA.copy_settings_ordered[DATA.CHAIN]);
        await sleep(0.1);

        DATA.copy_settings_ordered[DATA.CHAIN].sort((a) => {
            //console.log("a", a);
            if (a === element.dataset.wallet) {
                return -1;
            }
            //console.log("a return 0");
            return 0;
        });
        console.log('DATA.copy_settings_ordered[DATA.CHAIN]', DATA.copy_settings_ordered[DATA.CHAIN]);

        load_slots();
        element.blur();

        return '-';
    },
    follow: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        DATA.conf.followings[element.dataset.viewUid] = true;
        setTimeout(() => {
            element.dataset.action = 'unfollow';
            element.innerText = 'Unfollow';

            save_settings('conf', false, true);
        }, 0);

        save_settings('conf', false, true);
    },
    unfollow: async (element) => {
        delete DATA.conf.followings[element.dataset.viewUid];
        setTimeout(() => {
            element.dataset.action = 'follow';
            element.innerText = 'Follow';

            save_settings('conf', false, true);
        }, 0);

        save_settings('conf', false, true);
    },
    anonymize: async (element) => {
        if (!DATA.conf.connected) {
            on_connect(() => {
                _handleAction(element);
            });
            return '-';
        }

        setTimeout(() => {
            element.dataset.action = 'unanonymize';
            save_settings('conf', false, true);
        }, 0);
    },
    unanonymize: async (element) => {
        setTimeout(() => {
            element.dataset.action = 'anonymize';
            save_settings('conf', false, true);
        }, 0);
    },
    select: async (element) => {
        setTimeout(() => {
            document.querySelectorAll(`[data-slot="${DATA.selected_slot}"][data-action="select"]`).forEach((el) => {
                el.dataset.action = 'unselect';
            });
        }, 0);
    },
    unselect: async (element) => {
        setTimeout(() => {
            document.querySelectorAll(`[data-slot="${DATA.selected_slot}"][data-action="unselect"]`).forEach((el) => {
                el.dataset.action = 'select';
            });
        }, 0);
    },
    buy: async (element) => {
        if (!DATA.cids.length || !DATA.cids.filter((v) => v).length) {
            DATA.buy_started = await handleAction('update');
            return '-';
        }

        setTimeout(() => {
            set_swap_button('Sell');
        }, 0);
    },
    sell: async (element) => {
        if (element.dataset.mainSell) {
            DATA.sell_percent = 100;
            setTimeout(() => {
                set_swap_button('Buy');
            }, 0);
        } else if (DATA.wallet_slots_pagination_idx === -1 && (!DATA.pids || !DATA.pids.length)) {
            DATA.wallet_token_sell_percent = DATA.sell_percent;
            DATA.wallet_token_sell_amount = await contract(DATA.selected_token)
                .balanceOf(DATA.conf.wallet)
                .catch((_) => 0);
            DATA.route_action = 'wallet_sell';

            if (Number(DATA.wallet_token_sell_amount) == 0) {
                help_err('No balance');
                return '-';
            }

            return 'route';
        }
    },
    affiliate_jbu: async (element) => {
        let nft = element.dataset.affiliateNft;

        if (nft === DATA.selected_affiliate_jbu) {
            nft = '';
            DATA.selected_affiliate_jbu = 0;
        } else {
            DATA.selected_affiliate_jbu = nft;
        }

        add_affiliate_loader();

        return 'affiliates';
    },
    affiliate_chain: async (element) => {
        DATA.selected_affiliate_jbu = 0;
        DATA.view_affiliate_chain = element.dataset.affiliateChain;

        add_affiliate_loader();

        return 'affiliates';
    },
    affiliate_jbu_filter: async (element) => {
        let type = element.dataset.affiliateType;

        if (type === DATA.selected_affiliate_type) {
            type = '';
            delete DATA.selected_affiliate_type;
        } else {
            DATA.selected_affiliate_type = type;
        }

        if (type) {
            document.querySelectorAll('#user-affiliate-jbu-fees [data-affiliate-type]').forEach((el) => el.classList.add('visually-hidden'));
            document.querySelectorAll(`#user-affiliate-jbu-fees [data-affiliate-type="${type}"]`).forEach((el) => el.classList.remove('visually-hidden'));
        } else {
            document.querySelectorAll('#user-affiliate-jbu-fees [data-affiliate-type]').forEach((el) => el.classList.remove('visually-hidden'));
        }
        return '-';
    },
    affiliates: async (element) => {
        add_affiliate_loader();
    },
    'choose-boost-pay-item': async (element) => {
        let label,
            selectorLabelDivElement = document.querySelector('label[for="Boost__Currency__Selector"]').firstElementChild;

        while (!(label || element).classList || !(label || element).classList.contains('item')) {
            label = (label || element).parentNode;
        }

        label = label || element;

        selectorLabelDivElement.classList.add('text-white');
        selectorLabelDivElement.innerText = label.querySelector('.name').innerText;
        selectorLabelDivElement.parentElement.parentElement.parentElement.querySelectorAll('.card').forEach((el) => el.classList.remove('active'));
        selectorLabelDivElement.parentElement.parentElement.parentElement.querySelector(`.card[data-pay-token="${element.dataset.payToken}"]`).classList.add('active');

        elementify('Boost__Currency__Selector').checked = false;
    },
    'choose-boost-pay-card': async (element) => {
        let card,
            selectorLabelDivElement = document.querySelector('label[for="Boost__Currency__Selector"]').firstElementChild;

        while (!(card || element).classList || !(card || element).classList.contains('card')) {
            card = (card || element).parentNode;
        }

        card = card || element;

        selectorLabelDivElement.classList.add('text-white');
        selectorLabelDivElement.innerText = card.querySelector('.name').innerText;
        selectorLabelDivElement.parentElement.parentElement.parentElement.querySelectorAll('.card').forEach((el) => el.classList.remove('active'));
        card.classList.add('active');

        elementify('Boost__Currency__Selector').checked = false;
    },
    'choose-nft-pack-pay-item': async (element) => {
        let label,
            nftSelectorLabelDivElement = document.querySelector('label[for="NFTPackCurrencySelector"]').firstElementChild;

        while (!(label || element).classList || !(label || element).classList.contains('item')) {
            label = (label || element).parentNode;
        }

        label = label || element;

        nftSelectorLabelDivElement.classList.add('text-white');
        nftSelectorLabelDivElement.innerText = label.querySelector('.name').innerText;

        elementify('NFTPackCurrencySelector').checked = false;
    },
    'choose-synagogue-pay-item': async (element) => {
        let label,
            selectorLabelDivElement = null;

        while (!(label || element).classList || !(label || element).classList.contains('item')) {
            label = (label || element).parentNode;
        }

        label = label || element;

        while (!(selectorLabelDivElement || label).querySelector('label.btn[for*="SynagogueCurrencySelector"]')) {
            selectorLabelDivElement = (selectorLabelDivElement || label).parentNode;
        }

        selectorLabelDivElement = selectorLabelDivElement.querySelector('label.btn[for*="SynagogueCurrencySelector"]');

        selectorLabelDivElement.classList.add('text-white');
        selectorLabelDivElement.innerText = label.querySelector('.name').innerText;

        selectorLabelDivElement.previousElementSibling.checked = false;
    },
    wallet_and_slots: async (element) => {
        handleAction('wallet');
        handleAction('slots');

        return '-';
    },
};

const _handleAction = async (element) => {
    return handleAction((await (PRE_ACTIONS[element.dataset.action] || (async () => {}))(element)) || element.dataset.action);
};
