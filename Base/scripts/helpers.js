/**
 * Helpers
 */

const elementify = (id) => {
    if (DATA.elements[id]) {
        return DATA.elements[id];
    }

    return (DATA.elements[id] = document.getElementById(id));
};

const toChecksumAddress = function (address) {
    if (typeof address === 'undefined') {
        return '';
    }

    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error('Given address "' + address + '" is not a valid Ethereum address.');
    }

    address = address.toLowerCase().replace(/^0x/i, '');
    let addressHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(address)).replace(/^0x/i, ''),
        checksumAddress = '0x';

    for (let i = 0; i < address.length; i++) {
        /* If ith character is 8 to f then make it uppercase */
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }

    return checksumAddress;
};

const kosher_modes = {
    n: 'none',
    a: 'auto',
    m: 'mixed',
    c: 'custom',
};

const load_settings = (id, settings) => {
    let vals, el, _el, max_val, field;

    for (field in settings) {
        if (['_id', 'cid', 'slot'].includes(field)) {
            continue;
        }

        if (id === 'ModalPositionSettings') {
            if (['defender_max_tx_per_host', 'is_defender_max_tx_per_host', 'frontrun_gas_multiplier', 'is_frontrun'].includes(field)) {
                continue;
            }
        } else {
            if (['buy_at', 'is_buy_at', 'sell_at', 'is_sell_at'].includes(field)) {
                continue;
            }
        }

        if (`${settings[field]}` === 'null' && settings[field] !== 'null') {
            settings[field] = 0;
        }

        if (field === 'is_buy_method_ids' || field === 'is_sell_method_ids') {
            continue;
        } else if (field === 'kosher_mode') {
            if (settings[field] !== 'n') {
                document.querySelector(`#${id} #input_kosher_mode_${kosher_modes[settings[field]]}, #${id} #copy_input_kosher_mode_${kosher_modes[settings[field]]}`).checked = true;

                if (settings[field] !== 'a') {
                    document.querySelector(`#${id} #group_kosher_manual .input-group.text-area, #${id} #copy_group_kosher_manual .input-group.text-area`).classList.remove('d-none');
                } else {
                    document.querySelector(`#${id} #group_kosher_manual .input-group.text-area, #${id} #copy_group_kosher_manual .input-group.text-area`).classList.add('d-none');
                }
            } else {
                document.querySelector(`#${id} #input_kosher_mode_auto, #${id} #copy_input_kosher_mode_auto`).checked = true;
            }
        } else if (field === 'kosher_strainer') {
            document.querySelector(`#${id} textarea[id*="kosher_strainer"]`).value = settings[field].join('\n');
        } else if (field.startsWith('is_')) {
            el = document.querySelector(`#${id} #input_${field}, #${id} #${field}, #${id} #input_swap_${field}, #${id} #is_swap_${field}, #${id} #copy_input_${field}, #${id} #copy_${field}`);

            if (!el) {
                console.warn('!!!!', field);
                continue;
            }

            _el = document.querySelector(
                `#${id} #input_${field} ~ label[data-inner-text-alt], #${id} #${field} ~ label[data-inner-text-alt], #${id} #input_swap_${field} ~ label[data-inner-text-alt], #${id} #is_swap_${field} ~ label[data-inner-text-alt], #${id} #copy_input_${field} ~ label[data-inner-text-alt], #${id} #copy_${field} ~ label[data-inner-text-alt]`
            );
            if (_el) {
                vals = [_el.dataset.innerTextAlt, _el.innerText];
            } else {
                vals = [0];
            }

            if (settings[field]) {
                if (vals[0] === 'Automatic' || vals[0] === 'Manual' || vals[0] === 'Normal') {
                    el.checked = false;
                } else {
                    el.checked = true;
                }

                if (_el && (vals[0] === 'Manual' || vals[0] === 'Normal' || vals[0] === 'ON')) {
                    [_el.dataset.innerTextAlt, _el.innerText] = [_el.innerText, _el.dataset.innerTextAlt];
                }
            } else {
                if (vals[0] === 'Automatic' || vals[0] === 'Manual' || vals[0] === 'Normal') {
                    el.checked = true;
                } else {
                    el.checked = false;
                }

                if (_el && (vals[0] === 'Automatic' || vals[0] === 'OFF')) {
                    [_el.dataset.innerTextAlt, _el.innerText] = [_el.innerText, _el.dataset.innerTextAlt];
                }
            }

            if (field === 'is_kosher_manual') {
                if (settings[field]) {
                    document.querySelector(`#${id} #group_kosher_manual, #${id} #copy_group_kosher_manual`).classList.remove('d-none');
                } else {
                    document.querySelector(`#${id} #group_kosher_manual, #${id} #copy_group_kosher_manual`).classList.add('d-none');
                }

                if (el) {
                    el.checked = settings[field];
                }
            }

            if (field === 'is_defender_manual') {
                if (settings[field]) {
                    document.querySelector(`#${id} [id*="group"][id*="defender"]`).classList.remove('d-none');
                } else {
                    document.querySelector(`#${id} [id*="group"][id*="defender"]`).classList.add('d-none');

                    if (!settings['is_defender']) {
                        document.querySelectorAll(`#${id} [data-method-id]`).forEach((method_el) => {
                            method_el.classList.remove('green');
                            method_el.classList.remove('red');
                        });
                    }
                }

                if (el) {
                    el.checked = settings[field];
                }
            }

            if (field === 'is_strategy_manual') {
                if (settings[field]) {
                    document.querySelector(`#${id} [id*="group"][id*="strategy"]`).classList.remove('d-none');
                } else {
                    document.querySelector(`#${id} [id*="group"][id*="strategy"]`).classList.add('d-none');
                }

                if (el) {
                    el.checked = settings[field];
                }
            }
        } else if (typeof settings[field] === 'number' || typeof settings[field] === 'string') {
            el = document.querySelector(`#${id} #${field}, #${id} #input_${field}, #${id} #swap_${field}, #${id} #input_swap_${field}, #${id} #copy_${field}, #${id} #copy_input_${field}`);

            if (!el) {
                console.warn('!!!!', field);
                continue;
            }

            try {
                max_val = Number(el.dataset.valMax) || DATA.MAX_VAL;

                if (settings[field] > max_val) {
                    settings[field] = DATA[(id === 'ModalPositionSettings' && 'default_settings') || 'default_copy_settings'][field];
                }

                el.value = settings[field] || '';
            } catch (e) {
                console.error('!!!!', field);
            }
        }
    }

    document.querySelectorAll(`#${id} .target-settings`).forEach((el) => el.parentNode.removeChild(el));

    if (!settings.targets_triggers) {
        console.warn('?? targets_triggers:', settings);
        return;
    } else {
        settings.targets_triggers = settings.targets_triggers.slice(0, 10);
        settings.targets_percents = settings.targets_percents.slice(0, 10);
    }

    for (let i = 0, iEnd = settings.targets_triggers.length; i < iEnd; ++i) {
        if (id === 'ModalPositionSettings') {
            handleAddTargetButtonClick(null, settings.targets_triggers[i], settings.targets_percents[i]);
        } else {
            handleAddCopyTargetButtonClick(null, settings.targets_triggers[i], settings.targets_percents[i]);
        }
    }
};

const wrap_setting = (consts) => {
    if (Object.keys(consts).length > 1000) {
        let i,
            j = 0;
        for (i in consts) {
            if (j > 500) {
                delete consts[i];
            }

            ++j;
        }
    }

    return consts;
};

const save_settings = async (mode, is_rec, is_local) => {
    if (mode === 'consts') {
        store.set(`${DATA.CHAIN}_symbols`, JSON.stringify(wrap_setting({ ...DATA.symbols })));
        store.set(`${DATA.CHAIN}_decimals`, JSON.stringify(wrap_setting({ ...DATA.decimals })));
        store.set(`${DATA.CHAIN}_names`, JSON.stringify(wrap_setting({ ...DATA.ca_name })));
    } else if (mode === 'positions') {
        store.set(`${DATA.CHAIN}_positions`, DATA.gas_price.toString());
    } else if (mode === 'synagogues') {
        store.set(`${DATA.CHAIN}_synagogues`, JSON.stringify(DATA.synagogues));
        store.set(`${DATA.CHAIN}_top3`, JSON.stringify(DATA.top3));
    } else if (mode === 'copy' || mode === 'uncopy') {
        if (DATA.selected_slot !== DATA.ZERO) {
            /* For faster reload */
            DATA.copy_settings[DATA.ZERO] = DATA.copy_settings[DATA.selected_copy_slot];
        }

        //store.set(`${DATA.CHAIN}_copy_settings`, JSON.stringify(DATA.copy_settings));
        //store.set(`${DATA.CHAIN}_copy_wallet`, JSON.stringify(DATA.selected_copy_wallet || DATA.copy_wallet));
        //store.set(`${DATA.CHAIN}_copy_transactions`, JSON.stringify(DATA.copy_transactions));
        //store.set(`${DATA.CHAIN}_copy_address_transactions`, JSON.stringify(DATA.copy_address_transactions));

        if (DATA.selected_copy_wallet !== DATA.ZERO) {
          //  DATA.copy_transactions[DATA.ZERO] = DATA.copy_transactions[DATA.selected_copy_wallet];
        }

        if (!is_local && !is_rec) {
            let el = document.querySelector(`#Copy .wallet[data-slot="${DATA.selected_slot}"][data-wallet="${DATA.selected_copy_wallet}"] .header .name`);
            if (el) {
                el.innerText = elementify('copy_title').value;
            }
        }
    } else if (mode === 'slots') {
        store.set(`${DATA.CHAIN}_slot`, JSON.stringify(DATA.slot));
        store.set(`${DATA.CHAIN}_slots`, JSON.stringify(DATA.slots));
    } else if (mode === 'pos') {
        store.set(`${DATA.CHAIN}_pos`, JSON.stringify(DATA.positions));
    } else if (mode === 'token') {
        store.set(`${DATA.CHAIN}_token`, JSON.stringify(DATA.token_data));
    } else if (mode === 'conf') {
        store.set(`conf`, JSON.stringify(DATA.conf));
    } else if (mode === 'rooms') {
        store.set(`rooms`, JSON.stringify(DATA.rooms));
        store.set(`room`, JSON.stringify(DATA.room));
    } else if (mode === 'swap') {
        store.set(`${DATA.CHAIN}_${DATA.selected_slot}_settings`, JSON.stringify(DATA.settings));
        store.set('amounts', JSON.stringify(DATA.amounts));
    }

    if (!is_local && (mode === 'swap' || mode === 'copy')) {
        if (!DATA.conf.connected) {
            return on_connect(() => {
                save_settings(mode, true);
            });
        }

        handleAction((mode === 'copy' && 'copy') || 'update');
    }
};

const get_url_var = function (key) {
    if (new RegExp(`(#|&|\\?)${key}=`).test(document.location.href)) {
        return document.location.href.replace(new RegExp(`(^.*(#|&|\\?)${key}=)|(&.*$)`, 'g'), '');
    }

    return '';
};

const error_user_img = (that) => {
    that.src = DATA.ERROR_USER_IMG;
};

const _get_token_image = async (token, chain) => {
    if (!token || token === DATA.ERROR_IMG) {
        return DATA.ERROR_IMG;
    }

    chain = chain || DATA.CHAIN;
    let symbol = await get_symbol(token, chain);

    if (TOKEN_IMAGES[chain] && TOKEN_IMAGES[chain][symbol]) {
        return (DATA.img_cache[chain][token] = `${DATA.TRUST_WALLET_CDN}${DATA.CHAINS[DATA.CHAIN_IDS_MAP[chain]].TRUST_WALLET_ASSETS}/assets/${TOKEN_IMAGES[chain][symbol]}/logo.png`);
    } else {
        return DATA.ERROR_IMG;
    }
};

const error_img = async (el, token, chain) => {
    el.src = await _get_token_image(token, chain);
};

const uppercase_first = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

let get_level = (xp) => {
    if (!DATA.conf.connected) {
        return 0;
    }

    return Math.ceil(Math.log(1.7 + xp) / Math.log(1.7)) - !DATA.conf.connected;
};

let get_next_level_percent = (chain) => {
    let xp = (DATA.view_rank && DATA.view_rank[chain] && DATA.view_rank[chain].weger) || DATA.view_user.total_wager || 0,
        next_level_xp = Math.ceil(Math.pow(1.7, get_level(xp) + 1));

    return 100 - Math.floor((100 * (next_level_xp - xp)) / next_level_xp);
};

/*** Add active class to corresponding navigation element ***/

const navigate = () => {
    let navigationElement = (() => {
        let buttons = elementify('Header__Navigation').querySelectorAll('button');
        buttons.forEach((el) => el.classList.remove('active'));

        let jbu = Number(get_url_var('jbu')) || 0,
            affiliate = Number(get_url_var('affiliate')) || 0,
            token_link =
                `&chain=${DATA.CHAIN}` +
                ((DATA.pair && DATA.pair !== DATA.ZERO && DATA.pair !== DATA.IMAGINARY_PEG && `&pair=${DATA.pair}`) || '') +
                ((DATA.token && DATA.token !== DATA.ZERO && `&token=${DATA.token}`) || '');

        affiliate = DATA.conf.connected ? (DATA.conf.JBU && DATA.conf.uid && `&affiliate=${DATA.conf.uid}`) || '' : (jbu && `&jbu=${jbu}`) || (affiliate && `&affiliate=${affiliate}`) || '';

        switch (DATA.view) {
            case 'swap':
                if (DATA.token) {
                    window.history.replaceState({ token: DATA.token, pair: DATA.pair }, `JewBot - Swap ${DATA.symbol}/${DATA.PEG}`, `?view=${DATA.view}${token_link}${affiliate}`);
                } else {
                    window.history.replaceState({}, `JewBot - Swap`, `?view=${DATA.view}${affiliate}`);
                }
                return buttons[0];
            case 'copy':
                window.history.replaceState({ token: DATA.token, pair: DATA.pair }, `JewBot - Copy`, `?view=${DATA.view}${token_link}${affiliate}`);
                return buttons[1];
            case 'scan':
                window.history.replaceState({ token: DATA.token, pair: DATA.pair }, `JewBot - Scanner`, `?view=${DATA.view}${token_link}${affiliate}`);
                return buttons[2];
            case 'nft':
                window.history.replaceState({ token: DATA.token, pair: DATA.pair }, `JewBot - NFT`, `?view=${DATA.view}${token_link}${affiliate}`);
                return buttons[3];
            default:
                break;
        }
    })();

    if (navigationElement) {
        navigationElement.classList.add('active');
        /* setTimeout(() => elementify('Navigation').classList.add('d-none'), 0); */
    }

    let mobileNavigationElement = (() => {
        let buttons = elementify('Navigation__Body').querySelectorAll('button');
        buttons.forEach((el) => el.classList.remove('active'));

        switch (DATA.view) {
            case 'swap':
                return buttons[0];
            case 'copy':
                return buttons[1];
            case 'scan':
                return buttons[2];
            case 'nft':
                return buttons[3];
            default:
                break;
        }
    })();

    if (mobileNavigationElement) {
        mobileNavigationElement.classList.add('active');
    }
};

const get_decimals_power = (num) => {
    if (typeof num !== 'number') {
        return DATA.ETHER;
    }

    if (!DATA.decimal_powerss[num]) {
        DATA.decimal_powerss[num] = Big(10).pow(num);
    }

    return DATA.decimal_powerss[num];
};

const get_decimals = async (address, chain) => {
    if (address === DATA.WPEG) {
        return DATA.ETHER_BASE;
    }

    if (!DATA.decimals[address]) {
        try {
            DATA.decimals[address] = await contract(address, undefined, chain, true)
                .decimals()
                .catch((e) => DATA.ETHER_BASE);
        } catch (e) {}
    }

    return DATA.decimals[address] || DATA.ETHER_BASE;
};

const get_symbol = async (address, chain) => {
    if (address === DATA.IMAGINARY_PEG) {
        return DATA.PEG;
    }

    if (address === DATA.WPEG) {
        return `W${DATA.PEG}`;
    }

    if (!DATA.symbols[address]) {
        try {
            DATA.symbols[address] = (
                await contract(address, undefined, chain, true)
                    .symbol()
                    .catch((e) => '')
            )
                .slice(0, 32)
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/[\\'"]/g, '');
        } catch (e) {}
    }

    return DATA.symbols[address] || 'Token';
};

const get_user_image = async (nft_id) => {
    if (!nft_id) {
        return DATA.ERROR_USER_IMG;
    }

    return await get_nft_image('JBU', nft_id);
};

const lazy_get_nft_image = (type, nft_id, chain_id, id) => {
    if (Number(nft_id) > 0) {
        setTimeout(
            ((_id) => {
                return async () => {
                    let trials = 50,
                        tmp;

                    while (!(tmp = document.getElementById(_id)) && trials--) {
                        await sleep(0.1);
                    }

                    if (tmp) {
                        tmp.src = await get_nft_image(type, nft_id, chain_id);
                    } else {
                        console.log('!! NOT FOUND:', _id);
                    }
                };
            })(id),
            0
        );
    }

    return id;
};

const get_nft_image = async (type, nft_id, chain_id) => {
    if (!type || !nft_id) {
        return `Base/graphics/raster/nfts/jb1.jpg`;
    }

    if (!DATA.IMG_CACHE.nft[type]) {
        DATA.IMG_CACHE.nft[type] = {};
    }

    if (!DATA.IMG_LOAD_CACHE.nft[type]) {
        DATA.IMG_LOAD_CACHE.nft[type] = {};
    }

    if (!DATA.NFT_CACHE[type]) {
        DATA.NFT_CACHE[type] = {};
    }

    if (DATA.IMG_CACHE.nft[type][nft_id]) {
        return DATA.IMG_CACHE.nft[type][nft_id];
    }

    while (DATA.IMG_LOAD_CACHE.nft[type][nft_id]) {
        await sleep(0.1);
    }

    if (DATA.IMG_CACHE.nft[type][nft_id]) {
        return DATA.IMG_CACHE.nft[type][nft_id];
    }

    DATA.IMG_LOAD_CACHE.nft[type][nft_id] = true;

    while (!DATA.NFT_CACHE[type][nft_id] && !provider[DATA.CHAIN_ID]) {
        await sleep(0.05);
    }

    let json_file =
        DATA.NFT_CACHE[type][nft_id] ||
        (await contract(DATA.CHAINS[chain_id || DATA.CHAIN_ID][DATA.NFT_TYPES_MAP[type]])
            .tokenURI(_hex(nft_id))
            .catch((_) => null));

    if (json_file) {
        let json = DATA.NFT_CACHE[type][nft_id] || (DATA.NFT_CACHE[type][nft_id] = await (await fetch(json_file.replace('ipfs://', DATA.IPFS_IMG_CDN)).catch((_) => null)).json().catch((_) => null));

        store.set('NFTS', JSON.stringify(DATA.NFT_CACHE));

        if (json) {
            return new Promise((resolve) => {
                let img = new Image();

                img.crossOrigin = 'Anonymous';

                img.onload = function () {
                    let canvas = document.createElement('CANVAS'),
                        ctx = canvas.getContext('2d');

                    canvas.height = this.naturalHeight;
                    canvas.width = this.naturalWidth;
                    ctx.drawImage(this, 0, 0);

                    DATA.IMG_CACHE.nft[type][nft_id] = canvas.toDataURL('base64');
                    delete DATA.IMG_LOAD_CACHE.nft[type][nft_id];
                    resolve(DATA.IMG_CACHE.nft[type][nft_id]);
                };

                img.onerror = async function () {
                    DATA.IMG_CACHE.nft[type][nft_id] = `Base/graphics/raster/nfts/jb1.jpg`;
                    delete DATA.IMG_LOAD_CACHE.nft[type][nft_id];
                    resolve(DATA.IMG_CACHE.nft[type][nft_id]);
                };

                img.src = json.image.replace('ipfs://', DATA.IPFS_IMG_CDN);
            });
        }
    }

    DATA.IMG_CACHE.nft[type][nft_id] = `Base/graphics/raster/nfts/jb1.jpg`;
    delete DATA.IMG_LOAD_CACHE.nft[type][nft_id];

    return DATA.IMG_CACHE.nft[type][nft_id];
};

const get_dex_image = (router_name) => {
    /* return `https://raw.githubusercontent.com/freaker2k7/CoinGeckoImages/main/images-exchanges/${router_name.toLowerCase()}.png`; */
    return DATA.DEX_IMG_CDN + `${router_name}`.toLowerCase() + '.png';
};

const get_token_image = (token, chain) => {
    if (!token) {
        return DATA.ERROR_IMG;
    }

    chain = chain || DATA.CHAIN;

    if (!DATA.img_cache[chain]) {
        DATA.img_cache[chain] = {};
    }

    if (DATA.img_cache[chain][token]) {
        return DATA.img_cache[chain][token];
    }

    if (DATA.CROSS_MAP[chain] && DATA.CROSS_MAP[chain][token]) {
        return (DATA.img_cache[chain][token] = `${DATA.TOKEN_IMG_CDN}${DATA.CROSS_MAP[chain][token]}/info/logo.png`);
    } else {
        for (let _chain in DATA.CHAINS) {
            if (DATA.CHAINS[_chain].WPEG === token || DATA.CHAINS[_chain].CHAIN_ASSETS === token || DATA.CHAINS[_chain].CHAIN === token) {
                return (DATA.img_cache[chain][token] = `${DATA.TOKEN_IMG_CDN}${DATA.CHAINS[_chain].CHAIN_ASSETS}/info/logo.png`);
            }
        }
    }

    return (DATA.img_cache[chain][token] = `${DATA.TOKEN_IMG_CDN}${(DATA.CHAIN_IDS_MAP[chain] && DATA.CHAINS[DATA.CHAIN_IDS_MAP[chain]].CHAIN_ASSETS) || DATA.CHAIN_ASSETS}/assets/${token}/logo.png`);
};

const get_block_time = async (block) => {
    if (!DATA.block_times[block]) {
        try {
            DATA.block_times[block] = (await provider[DATA.CHAIN_ID].getBlock(block)).timestamp * 1000;
        } catch (e) {
            return 0;
        }
    }
    return DATA.block_times[block];
};

const isLQ = async (address, symbol) => {
    if (typeof DATA.is_lq[address] === 'undefined') {
        if ((DATA.is_lq[address] = (symbol || (await get_symbol(address))).endsWith('-LP'))) {
            try {
                DATA.is_lq[address] = await contract(address, undefined, undefined, true)
                    .token0()
                    .catch((e) => DATA.ZERO);
            } catch (e) {
                DATA.is_lq[address] = false;
            }
        }
    }
    return DATA.is_lq[address];
};

var stringToColour = function (str, prefix) {
    var hash = 0;
    str = `${str}`;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = prefix || '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xff;
        colour += ('00' + value.toString(16)).slice(-2);
    }
    return colour;
};

/**
 * HTML to element
 */
function htmlToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

function formatFiatNumberNoSpaces(amount) {
    return formatFiatNumber(amount).replace(/ |&nbsp;|&thinsp;| /g, '');
}

function formatFiatNumber(amount) {
    if (Number(amount) > 1e6) {
        return shortenLargeNumber(amount, 0);
    }

    if (Number(amount) < 1) {
        return formatNumber(amount);
    }

    return formatFiat(amount).replace(/\.00$/, '');
}

/**
 * Format fiat
 */
function formatFiat(amount, max) {
    if (Number(amount) <= (max || 0.001)) {
        return '0.00';
    }

    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(amount);
}

const subNumbers = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089'];

const printSubNumbers = (num) => {
    return (
        ' ' +
        `${num}`
            .split('')
            .map((v) => subNumbers[Number(v)])
            .join('') +
        ' '
    );
};

/**
 * Format number
 */
function formatNumber(amount) {
    if (Number(amount) < 0) {
        return '0';
    }

    let num = Big(amount).toString(),
        clean_num_len = num.replace(/[^0-9]/g, '').length,
        parts = num.split('.'),
        res = num;

    if (clean_num_len > 8) {
        if (parts.length > 1) {
            if (parts[0].length === 8) {
                res = parts[0];
            } else if (parts[0].length < 8) {
                let decimal_parts = parts[1].split(/^(0+)/);

                if (decimal_parts.length === 1 || decimal_parts[1].length < 3) {
                    res = num.slice(0, 9);
                } else {
                    res = parts[0] + '.0' + printSubNumbers(decimal_parts[1].length - 1) + decimal_parts[2].slice(0, 8 - parts[0].length);
                }
            }
        }
    }

    res = res.replace(/\.0+$/, '');

    if (Number(amount) >= 1000) {
        res = res.split('.');
        return `${formatFiat(res[0]).replace(/\.00$/, '')}${(res[1] && res[0].length < 8 && '.' + res[1]) || ''}`;
    }

    return res;
}

function shortenLargeNumber(num, digits) {
    var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        decimal;

    for (var i = units.length - 1; i >= 0; i--) {
        decimal = Math.pow(1000, i + 1);

        if (num <= -decimal || num >= decimal) {
            return +(num / decimal).toFixed(digits) + units[i];
        }
    }

    return num;
}

function shortenAddress(address) {
    return (address && `${address.slice(0, 4)}&hellip;${address.slice(-3)}`) || '0x';
}

function fallbackCopyTextToClipboard(text, el, old_tooltip_data) {
    var textArea = document.createElement('textarea');
    textArea.value = text;

    /* Avoid scrolling to bottom */
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);

        if (old_tooltip_data) {
            setTimeout(() => {
                el.dataset.tooltip = old_tooltip_data;
            }, 1000);
        } else {
            setTimeout(() => {
                el.removeAttribute('data-tooltip');
            }, 1000);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text, ev, el) {
    if (ev) {
        ev.stopPropagation();
    }

    let old_tooltip_data = el.dataset && el.dataset.tooltip;

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text, el, old_tooltip_data);
        return;
    }
    navigator.clipboard.writeText(text).then(
        function () {
            console.log('Async: Copying to clipboard was successful!');
            if (old_tooltip_data) {
                setTimeout(() => {
                    el.dataset.tooltip = old_tooltip_data;
                }, 1000);
            } else {
                setTimeout(() => {
                    el.removeAttribute('data-tooltip');
                }, 1000);
            }
        },
        function (err) {
            console.error('Async: Could not copy text: ', err);
        }
    );
}

const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const msPerMinute = 60 * 1000,
    msPerHour = msPerMinute * 60,
    msPerDay = msPerHour * 24,
    msPerMonth = msPerDay * 30,
    msPerYear = msPerDay * 365;

const timeDifference = (current, previous) => {
    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return `${Math.floor(elapsed / 1000)} sec`;
    } else if (elapsed < msPerHour) {
        return `${Math.floor(elapsed / msPerMinute)} min`;
    } else if (elapsed < msPerDay) {
        if (elapsed / msPerHour < 2) {
            return '1 hour';
        }
        return `${Math.floor(elapsed / msPerHour)} hours`;
    } else if (elapsed < msPerMonth) {
        if (elapsed / msPerDay < 2) {
            return '1 day';
        }
        return `${Math.floor(elapsed / msPerDay)} days`;
    } else if (elapsed < msPerYear) {
        if (elapsed / msPerMonth < 2) {
            return '1 month';
        }
        return `${Math.floor(elapsed / msPerMonth)} months`;
    } else {
        if (elapsed / msPerYear < 2) {
            return '1 year';
        }
        return `${Math.floor(elapsed / msPerYear)} years`;
    }
};

const get_active_slots = () => {
    return DATA.slots[DATA.CHAIN].filter((v) => v.selected && v.is_active).map((v) => v.address);
};

const get_active_positions = () => {
    let slots = get_active_slots();
    return DATA.positions[DATA.CHAIN].N.filter((v) => v.is_active && slots.includes(v.slot) && v.token === DATA.token);
};

const set_main_sell_button_pids = () => {
    elementify('Swap__SellButton').querySelector('[data-action="sell"]').dataset.pids = get_active_positions()
        .map((v) => v._id)
        .join(',');
};

const add_terminal_message = (msg, skip) => {
    msg = `<div id="terminal-msg">[${new Date().toLocaleTimeString('en-GB')}] ${msg || `Connected to the ${uppercase_first(DATA.CHAIN_ASSETS)} network`}</div>`;
    if (!skip) {
        elementify('terminal-container').innerHTML += msg;
    }
    return msg;
};

const set_terminal_message = (msg) => {
    elementify('terminal-container').innerHTML = add_terminal_message(msg, true);
};

const handle_scroll = (id, stopper, callback, percent) => {
    let feed_list_view = elementify(id),
        feed_list_view_timeout = null,
        tsX,
        tsY;

    const touchstartCallBack = (ev) => {
        /* calculating start-touch position */
        tsX = ev.touches[0].clientX;
        tsY = ev.touches[0].clientY;
    };

    const touchendCallBack = (ev) => {
        /* calculating end-touch position and enable/disable moredata */
        let teX = ev.changedTouches[0].clientX,
            teY = ev.changedTouches[0].clientY;

        if (Math.abs(tsX - teX) <= Math.abs(tsY - teY)) {
            scrollCallback(ev);
        }
    };

    const scrollCallback = (ev) => {
        if (DATA.scroll_events[stopper]) {
            return;
        }

        if (feed_list_view.scrollTop + feed_list_view.offsetHeight >= feed_list_view.scrollHeight * (percent || 0.6)) {
            /* 60 percent load by default */
            if (feed_list_view_timeout) {
                clearTimeout(feed_list_view_timeout);
            }

            feed_list_view_timeout = setTimeout(callback, 50);
        }
    };

    if (DATA.is_mobile) {
        feed_list_view.addEventListener('touchstart', touchstartCallBack);
        feed_list_view.addEventListener('touchend', touchendCallBack);
    } else {
        feed_list_view.addEventListener('scroll', scrollCallback);
    }
};

const reset_scroll_top = () => {
    elementify('SwapFeed__Panel1').scrollTop = 0;
    elementify('SwapFeed__Panel2').scrollTop = 0;
    elementify('SwapFeed__Panel3').scrollTop = 0;
    elementify('SwapFeed__Panel4').scrollTop = 0;
};

const check_action_click = (ev, id) => {
    if (ev.key === 'Enter') {
        document.getElementById(id).click();
    }
};

const GetTokenImage = (token, chain, id) => {
    id = id || `img-id-${`${Math.random()}`.slice(2)}`;

    (async () => {
        if (DATA.IMG_CACHE.token[token]) {
            return setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).src = DATA.IMG_CACHE.token[token];
                }
            }, 0);
        }

        while (DATA.IMG_LOAD_CACHE.token[token]) {
            await sleep(0.1);
        }

        if (DATA.IMG_CACHE.token[token]) {
            return setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).src = DATA.IMG_CACHE.token[token];
                }
            }, 0);
        }

        DATA.IMG_LOAD_CACHE.token[token] = true;

        let img = new Image(),
            state = 0;

        img.crossOrigin = 'Anonymous';

        img.onload = function () {
            if (!document.getElementById(id)) {
                delete DATA.IMG_LOAD_CACHE.token[token];
                return;
            }

            let canvas = document.createElement('CANVAS'),
                ctx = canvas.getContext('2d');

            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);

            document.getElementById(id).src = DATA.IMG_CACHE.token[token] = canvas.toDataURL('base64');
            delete DATA.IMG_LOAD_CACHE.token[token];
        };

        img.onerror = async function () {
            if (state) {
                document.getElementById(id).src = DATA.ERROR_IMG;
                delete DATA.IMG_LOAD_CACHE.token[token];
            } else {
                state = 1;
                img.src = await _get_token_image(token, chain);
            }
        };

        img.src = get_token_image(token, chain);
    })();

    return id;
};
