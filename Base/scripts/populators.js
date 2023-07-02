function getChartConfig(id, history, borderColor, backgroundColor, offset) {
    if (!history) {
        history = [];
    }

    let _history = [],
        i = history.length - 1;

    if (!borderColor) {
        [borderColor, backgroundColor] = DATA.COLOR_RANGES[Number(stringToColour(id, '0x')) % DATA.COLOR_RANGES.length];
    }

    for (; i >= 0; --i) {
        if (i === history.length - 1) {
            _history.push(Number(history[i]));
        } else {
            _history.push(Number(history[i]) + _history[_history.length - 1]);
        }
    }

    for (i = 0; i < _history.length; ++i) {
        if (_history[i] < 0) {
            _history[i] = 0;
        }
    }

    if (DATA.charts[id]) {
        DATA.charts[id].destroy();
    }

    DATA.charts[id] = new Chart(document.getElementById(id), {
        type: 'line',
        data: {
            labels: Object.keys(_history),
            datasets: [{ data: _history }],
        },
        options: {
            layout: {
                padding: {
                    top: 32,
                    right: 6 + offset,
                },
            },
            elements: {
                line: {
                    fill: true,
                    borderWidth: 2,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                },
                point: {
                    radius: 0,
                    hoverRadius: 0,
                },
            },
            animation: false,
            plugins: {
                legend: false,
                tooltip: false,
            },
            scales: {
                y: { display: false },
                x: { display: false },
            },
        },
    });

    return DATA.charts[id];
}

const handle_holder = (data) => {
    if (DATA.token_data && DATA.token_data.i) {
        let holder = document.querySelector(`[data-holder="${data.D}"]`);
        if (holder) {
            holder.innerHTML = formatFiatNumber(Big(data.bl).div(10 ** DATA.token_data.i.decimals));
            document.querySelector(`[data-holder-percent="${data.D}"]`).innerHTML = `${Big(100)
                .mul((Number(DATA.token_data.i.total_supply) && data.bl) || 0)
                .div((Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply) || 1)
                .round(1)}%`;
        } else if (
            Big(100)
                .mul((Number(DATA.token_data.i.total_supply) && data.bl) || 0)
                .div((Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply) || 1)
                .gt(0.1)
        ) {
            add_holder_to_feed(data, true);
        }
    }
};

const get_t0_t1 = async (pair) => {
    let t0, t1, _t0, _t1;

    try {
        await Promise.all([
            (async () => {
                t0 = await get_symbol((_t0 = await contract(pair, undefined, undefined, true).token0()));
            })(),
            (async () => {
                t1 = await get_symbol((_t1 = await contract(pair, undefined, undefined, true).token1()));
            })(),
        ]);

        if (_t1 === DATA.WPEG || DATA.STABLE.includes(_t1)) {
            [t0, t1] = [t1, t0];
            [_t0, _t1] = [_t1, _t0];
        }

        return [t0, t1, _t0, _t1];
    } catch (e) {
        return [`W${DATA.PEG}`, '', DATA.ZERO, DATA.ZERO];
    }
};

const set_current_position = async (pos, now) => {
    let t0,
        t1,
        _t0,
        _t1,
        icon,
        term = '';

    await Promise.all([
        (async () => {
            [t0, t1, _t0, _t1] = await get_t0_t1(pos.pair);
        })(),
        (async () => {
            pos.balance = Big(await contract(pos.token).balanceOf(pos.slot)).div((typeof pos.decimals !== 'undefined' && Big(10).pow(pos.decimals)) || (await get_decimals_power(pos.token)));
        })(),
    ]);

    if (pos.token === DATA.token && DATA.slots[DATA.CHAIN].filter((v) => v.address === pos.slot && v.is_active && v.selected).length) {
        pos.enter_price = Big(pos.enter_price || 0);
        pos.peg = Big((Number(pos.peg) && pos.peg) || DATA.WPEG_PRICE);

        if (!pos.enter_price.eq(0) && !pos.enter_price.eq(DATA.token_price.div(DATA.WPEG_PRICE)) && pos.status !== 'p') {
            pos.ratio = Big(DATA.token_price.div(DATA.WPEG_PRICE)).div(pos.enter_price);
            term += `<br>[x${formatFiatNumberNoSpaces(pos.ratio)}] (${(pos.ratio.gt(1) && '+') || ''}${pos.ratio.mul(100).sub(100).toFixed(3)}%) ${pos.duration}`; /* [X${formatFiatNumberNoSpaces(Number(pos.ATH), 5)]]] */
        }
        if (pos.is_buy_at && Number(pos.buy_at) && pos.status === 'p') {
            term += `<br>BUY AT: $${formatFiatNumberNoSpaces(pos.buy_at)}`;
        }
        term += `<br>CURRENT PRICE: $${formatFiatNumberNoSpaces(DATA.token_price)}`;
        if (pos.enter_price.gt(0) && pos.status !== 'p') {
            term += `<br>ENTER PRICE:&nbsp;&nbsp;&nbsp;$${formatFiatNumberNoSpaces(pos.enter_price.mul(pos.peg))}`;
        }
        if (pos.is_stop_loss && Number(pos.stop_loss_trigger)) {
            term += `<br>${(pos.is_stop_loss_trailing && 'TRAILING ') || ''}STOP LOSS [x${formatFiatNumberNoSpaces(pos.stop_loss_trigger)}]: $${formatFiatNumberNoSpaces(
                Big(pos.stop_loss_trigger)
                    .mul((pos.is_stop_loss_trailing && Number(pos.ATH || 1)) || 1)
                    .mul((pos.enter_price.gt(0) && pos.enter_price) || DATA.token_price.div(DATA.WPEG_PRICE))
                    .mul(pos.peg)
            )}`;
        }
        if (pos.targets_triggers && pos.targets_triggers.length) {
            let multiplier = Big((pos.enter_price.gt(0) && pos.enter_price) || DATA.token_price.div(DATA.WPEG_PRICE)).mul(pos.peg);
            for (let i = 0; i < pos.targets_triggers.length; ++i) {
                if (pos.last_target <= i) {
                    term += `<br>T${i + 1} [x${pos.targets_triggers[i]}]: $${formatFiatNumberNoSpaces(multiplier.mul(pos.targets_triggers[i]))}`;
                }
            }
        }

        if (Big(pos.balance).eq(0)) {
            pos.balance = Big(((DATA.conf.plans || []).filter((v) => v[0] === ((DATA.view_chain === 'ALL' && DATA.CHAIN) || DATA.view_chain) && v[1] === 1).length && 0.997) || 0.99)
                .mul(pos.amount)
                .div(DATA.token_price)
                .div(DATA.ETHER);
        }

        term += `<br>BALANCE (PEG): ${formatFiatNumberNoSpaces(pos.balance.mul(DATA.token_price).div(DATA.WPEG_PRICE))} ${DATA.CHAINS[DATA.CHAIN_IDS_MAP[pos.chain || DATA.CHAIN]].PEG}`;
        term += `<br>BALANCE (${((pos.token === _t0 && t0) || t1).slice(0, 3)}): ${formatFiatNumberNoSpaces(pos.balance)} ${((pos.token === _t0 && t0) || t1).slice(0, 7)}`;
    }

    /* if (pos.have.gte(pos.bought.abs())) { */
    if (pos.is_price_bigger) {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-4px">
	<rect fill="#145423" width="16" height="16" rx="100%"/>
	<path fill="#2daa4b" d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM5.854 10.803A.5.5 0 115.146 10.096L9.243 6H6.475A.5.5 0 116.475 5H10.45A.5.5 0 0110.95 5.5V9.475A.5.5 0 119.95 9.475V6.707L5.854 10.803Z"></path>
</svg>`;
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-4px">
	<rect fill="#4d0000" width="16" height="16" rx="100%"></rect>
	<path fill="#e90000" d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM5.854 5.146A.5.5 0 105.146 5.854L9.243 9.95H6.475A.5.5 0 106.475 10.95H10.45A.5.5 0 0010.95 10.45V6.475A.5.5 0 109.95 6.475V9.243L5.854 5.146Z"></path>
</svg>`;
    }

    return [
        term.replace('<br>', ''),
        `<div class="item">
	<div class="row row-1 d-flex">
		<div class="pair d-flex">
			<img id="${GetTokenImage(_t1)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round mr-4px">

			<div class="text-truncated" data-token="${_t1}" data-action="token" data-pair="${pos.pair}" data-pair-router="${pos.router}">${t0}/${t1}</div>
		</div>

		<div class="price d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-4px">
				<rect fill="#333333" width="16" height="16" rx="100%"/>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5.5 9.511C5.576 10.465 6.33 11.208 7.682 11.296V12H8.282V11.291C9.682 11.193 10.5 10.445 10.5 9.359 10.5 8.372 9.874 7.863 8.755 7.599L8.282 7.487V5.57C8.882 5.638 9.264 5.966 9.356 6.42H10.408C10.332 5.501 9.544 4.782 8.282 4.704V4H7.682V4.719C6.487 4.836 5.672 5.555 5.672 6.572 5.672 7.472 6.278 8.044 7.285 8.279L7.682 8.377V10.411C7.067 10.318 6.66 9.981 6.568 9.511H5.5ZM7.677 7.345C7.087 7.208 6.767 6.929 6.767 6.509 6.767 6.039 7.112 5.687 7.682 5.584V7.344H7.677ZM8.369 8.538C9.086 8.704 9.417 8.973 9.417 9.448 9.417 9.99 9.005 10.362 8.282 10.43V8.518L8.369 8.538Z"/>
			</svg>

			<div class="text-truncated">$${formatFiat(pos.bought.abs())}</div>
		</div>
	</div>

	<div class="row row-2 mt-12px d-flex">
		<a href="${DATA.EXPLORER}/token/${pos.token}?a=${
            pos.slot
        }" target="_blank" rel="nofollow" class="time d-flex btn btn-has-icon" data-tooltip="${pos.created_at.toLocaleDateString()} ${pos.created_at.toLocaleTimeString()}" data-tooltip-right>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-4px">
				<rect fill="#333333" width="16" height="16" rx="100%"/>
				<path d="M8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8ZM8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5Z"></path>
			</svg>

			<div class="text-truncated" data-timer="${pos.created_at.getTime()}">${timeDifference(now || Date.now(), pos.created_at.getTime())}</div>
		</a>

		<div class="price d-flex">
			${icon} <div class="text-truncated" data-balance="${pos.balance.mul((DATA.token === pos.token && DATA.token_price) || pos.price).div(DATA.WPEG_PRICE)}">$${formatFiat(
            pos.balance.mul((DATA.token === pos.token && DATA.token_price) || pos.price)
        )}</div>
		</div>
	</div>

	<button class="btn btn-style mt-12px w-100" data-togglable="ModalSell" data-sell-slot="${pos.slot}" data-selected-token="${pos.token}" data-pids="${pos._id}">SELL</button>
</div>`,
    ];
};

const set_history_position = async (pos, now) => {
    let [_, t1, _t0, _t1] = await get_t0_t1(pos.pair),
        status = ((pos.rev = pos.sold.mul(pos.last_price).mul(pos.peg).abs().sub(pos.bought.mul(pos.enter_price).mul(pos.peg))).gt(0) && 'green') || 'red';

    return `<div class="item">
	<div class="data">
		<div class="d-flex">
			<div class="d-flex" data-tooltip="${pos.created_at.toLocaleDateString()} ${pos.created_at.toLocaleTimeString()}" data-tooltip-right>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#333333" width="16" height="16" rx="100%"/>
					<path d="M8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8ZM8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5Z"></path>
				</svg>

				<div class="ml-6px mr-4px">Date:</div>
			</div>

			<a href="${DATA.EXPLORER}/token/${pos.token}?a=${pos.slot}" target="_blank" rel="nofollow" class="text-truncated text-${status}" data-timer="${pos.created_at.getTime()}">${timeDifference(
        now || Date.now(),
        pos.created_at.getTime()
    )}</a>
		</div>

		<div class="d-flex mt-12px">
			<div class="d-flex">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#333333" width="16" height="16" rx="100%"/>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z"></path>
				</svg>

				<div class="ml-6px mr-4px">Traded:</div>
			</div>

			<div class="text-truncated text-${status}">${formatFiatNumber((pos.sold.gt(0) && pos.sold) || pos.bought)} <span data-token="${_t1}" data-action="token" data-pair="${pos.pair}" data-pair-router="${
        pos.router
    }">${t1}</span></div>
		</div>

		<div class="d-flex mt-12px">
			<div class="d-flex">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#333333" width="16" height="16" rx="100%"/>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z"></path>
				</svg>

				<div class="ml-6px mr-4px">Initial:</div>
			</div>

			<div class="text-truncated text-${status}">$${formatFiatNumber(pos.bought.mul(pos.enter_price).mul(pos.peg))}</div>
		</div>

		<div class="d-flex mt-12px">
			<div class="d-flex">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#333333" width="16" height="16" rx="100%"/>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z"></path>
				</svg>

				<div class="ml-6px mr-4px">Final:</div>
			</div>

			<div class="text-truncated text-${status}">$${formatFiatNumber(pos.sold.mul(pos.last_price).mul(pos.peg).abs())}</div>
		</div>

		<div class="d-flex mt-12px">
			<div class="d-flex">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#333333" width="16" height="16" rx="100%"/>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5.5 9.511C5.576 10.465 6.33 11.208 7.682 11.296V12H8.282V11.291C9.682 11.193 10.5 10.445 10.5 9.359 10.5 8.372 9.874 7.863 8.755 7.599L8.282 7.487V5.57C8.882 5.638 9.264 5.966 9.356 6.42H10.408C10.332 5.501 9.544 4.782 8.282 4.704V4H7.682V4.719C6.487 4.836 5.672 5.555 5.672 6.572 5.672 7.472 6.278 8.044 7.285 8.279L7.682 8.377V10.411C7.067 10.318 6.66 9.981 6.568 9.511H5.5ZM7.677 7.345C7.087 7.208 6.767 6.929 6.767 6.509 6.767 6.039 7.112 5.687 7.682 5.584V7.344H7.677ZM8.369 8.538C9.086 8.704 9.417 8.973 9.417 9.448 9.417 9.99 9.005 10.362 8.282 10.43V8.518L8.369 8.538Z"/>
				</svg>

				<div class="ml-6px mr-4px">Revenue:</div>
			</div>

			<div class="text-truncated text-${status}">${(status === 'green' && '+') || (pos.rev.lt(0) && '-') || ''}<span>$${formatFiatNumber(pos.rev.abs())}</span></div>
		</div>
	</div>

	<button class="btn btn-style mt-12px w-100" data-action="share" data-selected-pos-id="${pos.pid}">SHARE</button>
</div>`;
};

const set_current_positions = (positions) => {
    if (DATA.set_current_positions_timeout) {
        clearTimeout(DATA.set_current_positions_timeout);
    }

    DATA.set_current_positions_timeout = setTimeout(async () => {
        let now = Date.now(),
            promises = [],
            _positions = {},
            i = 0;

        for (; i < positions.length; ++i) {
            /* if (!i && positions[i].status === 'p' && positions.length > 1) {
				continue;
			} */

            positions[i].traded = (positions[i].traded !== 'null' && positions[i].traded) || 0;
            positions[i].enter_price = (positions[i].enter_price !== 'null' && positions[i].enter_price) || 0;
            positions[i].last_price = (positions[i].last_price !== 'null' && positions[i].last_price) || 0;

            if (!_positions[positions[i].pid]) {
                _positions[positions[i].pid] = {
                    ...positions[i],
                    pid: positions[i].pid,
                    token: positions[i].token,
                    slot: positions[i].slot,
                    pair: positions[i].pair,
                    created_at: new Date(positions[i].created_at),
                    price: Big(positions[i].enter_price || 0).mul(positions[i].peg),
                    balance: Big(positions[i].balance || 0),
                    bought: Big(positions[i].traded || 0)
                        .mul(positions[i].enter_price || 0)
                        .mul(positions[i].peg),
                    sold: Big(0),
                };
            } else {
                _positions[positions[i].pid].price = Big(positions[i].last_price || 0).mul(positions[i].peg);

                if (['B', 'b'].includes(positions[i].status)) {
                    _positions[positions[i].pid].bought = _positions[positions[i].pid].bought.add(
                        Big(positions[i].traded || 0)
                            .mul(positions[i].last_price || 0)
                            .mul(positions[i].peg)
                    );
                } else if (['S', 's'].includes(positions[i].status)) {
                    _positions[positions[i].pid].sold = _positions[positions[i].pid].sold.add(
                        Big(positions[i].traded || 0)
                            .mul(positions[i].last_price || 0)
                            .mul(positions[i].peg)
                    );
                }
            }

            _positions[positions[i].pid].last_target = positions[i].last_target;
            _positions[positions[i].pid].balance = Big(positions[i].balance || _positions[positions[i].pid].balance || 0);
            _positions[positions[i].pid].duration = positions[i].duration || _positions[positions[i].pid].duration || '';

            if (positions[i].is_active) {
                _positions[positions[i].pid]._id = positions[i]._id; /* We only need the latest active position for sell() */
                _positions[positions[i].pid].is_price_bigger = Big(positions[i].last_price || 0).gte(_positions[positions[i].pid].price); /* .div(positions[i].peg || DATA.WPEG_PRICE).mul(DATA.WPEG_PRICE) */
            }
        }

        for (i in _positions) {
            _positions[i].have = _positions[i].balance.mul(_positions[i].price); /* .mul(DATA.WPEG_PRICE); */

            /* console.log(JSON.stringify(_positions[i], null, 4)); */

            if (_positions[i].have.lt(0)) {
                console.error('!! Negative balance:', i, ':', JSON.stringify(_positions[i], null, 4));
                _positions[i].have = Big(0);
            }

            promises.push(set_current_position(_positions[i], now));
        }

        let res = await Promise.all(promises);

        set_terminal_message();
        res.map((v) => v[0] && add_terminal_message(v[0]));

        elementify('ModalPositions__Panel1').innerHTML = res.map((v) => v[1]).join('') || '<div class="item">No active positions</div>';
    }, 50);
};

const set_history_positions = async (positions) => {
    let now = Date.now(),
        promises = [],
        i;

    for (i in positions) {
        positions[i].created_at = new Date(positions[i].created_at);
        positions[i].bought = Big(positions[i].bought || 0);
        positions[i].sold = Big(positions[i].sold || 0);
        positions[i].have = positions[i].sold.sub(positions[i].bought);
        positions[i].enter_price = (positions[i].enter_price !== 'null' && positions[i].enter_price) || 0;
        positions[i].last_price = (positions[i].last_price !== 'null' && positions[i].last_price) || 0;

        promises.push(set_history_position(positions[i], now));
    }

    elementify('ModalPositions__Panel2').innerHTML = (await Promise.all(promises)).flat().join('') || '<div class="item">No completed positions</div>';
};

const get_address_transaction = async (tx) => {
    tx.c = new Date(tx.c || (await get_block_time(tx.b)));

    let icon,
        title = DATA.selected_slot,
        i;

    for (i in DATA.copy_settings) {
        if (DATA.copy_settings[i][tx.w] && DATA.copy_settings[i][tx.w].title) {
            title = DATA.copy_settings[i][tx.w].title;
            break;
        }
    }

    if (!title) {
        title = shortenAddress(tx.w);
    }

    if (tx._s) {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<path fill="#404040" d="M16 8S13 2.5 8 2.5 0 8 0 8 3 13.5 8 13.5 16 8 16 8Z"></path>
	<path fill="#666666" d="M16 8S13 2.5 8 2.5 0 8 0 8 3 13.5 8 13.5 16 8 16 8ZM1.173 8A13.133 13.133 0 012.833 5.957C4.12 4.668 5.88 3.5 8 3.5 10.12 3.5 11.879 4.668 13.168 5.957A13.133 13.133 0 0114.828 8C14.77 8.087 14.706 8.183 14.633 8.288 14.298 8.768 13.803 9.408 13.168 10.043 11.879 11.332 10.119 12.5 8 12.5 5.88 12.5 4.121 11.332 2.832 10.043A13.134 13.134 0 011.172 8ZM8 5.5A2.5 2.5 0 108 10.5 2.5 2.5 0 008 5.5ZM4.5 8A3.5 3.5 0 1111.5 8 3.5 3.5 0 014.5 8ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z"></path>
</svg>`;
    } else if (tx._b) {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<circle fill="#145423" cx="8" cy="8" r="8"></circle>
	<path fill="#2daa4b" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V7.5H11.5A.5.5 0 0111.5 8.5H8.5V11.5A.5.5 0 017.5 11.5V8.5H4.5A.5.5 0 014.5 7.5H7.5V4.5A.5.5 0 018 4Z"></path>
</svg>`;
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<circle fill="#4d0000" cx="8" cy="8" r="8"></circle>
	<path fill="#e90000" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"></path>
</svg>`;
    }

    return `<div class="row" data-ref-address="${tx.w}">
	<div class="col">${icon}</div>

	<div class="time col" data-timer="${tx.c.getTime()}" data-tooltip="${tx.c.toLocaleDateString()} ${tx.c.toLocaleTimeString()}" data-tooltip-right>${timeDifference(Date.now(), tx.c.getTime())}</div>

	<div class="col text-truncated">${title}</div>

	<div class="col text-truncated"><a href="${DATA.EXPLORER}/tx/${tx.h}" target="_blank" rel="nofollow">${shortenAddress(tx.h)}</a></div>

	<div class="col text-truncated">
		<div class="image">
			<img id="${GetTokenImage(tx.orig)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round">
		</div>
		&nbsp;<span title="${tx.orig_amount.abs()}">${formatFiatNumber(tx.orig_amount.abs())}</span> <span data-token="${tx.orig}" data-action="token">${tx.orig_symbol}<span>
	</div>

	<div class="col text-truncated">
		<div class="image">
			<img id="${GetTokenImage(tx.k)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round">
		</div>
		&nbsp;<span title="${tx.balance.abs()}">${formatFiatNumber(tx.balance.abs())}</span> <span data-token="${tx.k}" data-action="token">${tx.token_symbol}<span>
	</div>
</div>`;
};

const get_user_token_balace_in_wpeg = async (tx) => {
    /* if (!DATA.last_slot_token_balace_in_wpeg[DATA.selected_slot]) {
		DATA.last_slot_token_balace_in_wpeg[DATA.selected_slot] = {};
	}

	if (DATA.last_slot_token_balace_in_wpeg[DATA.selected_slot][tx.k] && DATA.last_slot_token_balace_in_wpeg[DATA.selected_slot][tx.k].timestamp > Date.now() - 30000) {
		return DATA.last_slot_token_balace_in_wpeg[DATA.selected_slot][tx.k].balance;
	} */

    try {
        let price = Big(
            (
                await contract(tx.R)
                    .getAmountsOut(
                        await contract(tx.k)
                            .balanceOf(DATA.selected_copy_slot != '0x0000000000000000000000000000000000000000' ? DATA.selected_copy_slot : DATA.selected_slot)
                            .catch((_) => 0),
                        (tx._b && [...tx.known_tokens_order].reverse()) || tx.known_tokens_order
                    )
                    .catch((_) => Array.from({ length: tx.known_tokens_order.length }, (_) => 0))
            )[tx.known_tokens_order.length - 1]
        ).div(DATA.ETHER);

        if ((tx._b && DATA.STABLE.includes(tx.known_tokens_order[0])) || (!tx._b && DATA.STABLE.includes(tx.known_tokens_order[tx.known_tokens_order.length - 1]))) {
            price = price.div((DATA.WPEG_PRICE.gt(0) && DATA.WPEG_PRICE) || 1);
        }

        if (price.gt(10000)) {
            price = Big(0);
        }

        /* DATA.last_slot_token_balace_in_wpeg[DATA.selected_copy_slot || DATA.selected_slot][tx.k] = {
			balance: price,
			timestamp: Date.now()
		}; */

        return Big(price);
    } catch (e) {
        console.error(e, JSON.stringify(tx));

        /* DATA.last_slot_token_balace_in_wpeg[DATA.selected_copy_slot || DATA.selected_slot][tx.k] = {
			balance: Big(0),
			timestamp: Date.now()
		}; */

        // return DATA.last_slot_token_balace_in_wpeg[DATA.selected_copy_slot || DATA.selected_slot][tx.k].balance;
        return Big(0);
    }
};

const get_transaction = async (tx) => {
    if (!tx.known_tokens_order) {
        return ''; /* _get_transaction(tx); */
    }

    const arrow = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<path d="M4 8A.5.5 0 014.5 7.5H10.293L8.146 5.354A.5.5 0 118.854 4.646L11.854 7.646A.5.5 0 0111.854 8.354L8.854 11.354A.5.5 0 018.146 10.646L10.293 8.5H4.5A.5.5 0 014 8Z"/>
</svg>`;

    let icon,
        color,
        now = Date.now();

    if (tx._b) {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<circle fill="#145423" cx="8" cy="8" r="8"></circle>
	<path fill="#2daa4b" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V7.5H11.5A.5.5 0 0111.5 8.5H8.5V11.5A.5.5 0 017.5 11.5V8.5H4.5A.5.5 0 014.5 7.5H7.5V4.5A.5.5 0 018 4Z"></path>
</svg>`;
        color = 'green';
    } else {
        icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
	<circle fill="#4d0000" cx="8" cy="8" r="8"></circle>
	<path fill="#e90000" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z"></path>
</svg>`;
        color = 'red';
    }

    /* let first_token = tx.known_tokens[tx.known_tokens_order[0]], */
    /* 	last_token = tx.known_tokens[tx.known_tokens_order[tx.known_tokens_order.length - 1]]; */

    tx.c = (typeof tx.c === 'string' && new Date(tx.c)) || tx.c;

    await Promise.all([
        (async () => {
            tx.orig_symbol = /* tx.orig_symbol || */ await get_symbol(tx.orig);
        })(),
        (async () => {
            tx.token_symbol = /* tx.token_symbol || */ await get_symbol(tx.k);
        })(),
        (async () => {
            tx.p = /* tx.p || */ await get_user_token_balace_in_wpeg(tx);
        })(),
    ]);

    return `<div class="transaction">
	<div class="action">
		${icon}
		<a href="${DATA.EXPLORER}/tx/${
        tx.h
    }" target="_blank" rel="nofollow" class="time ml-6px" data-timer="${tx.c.getTime()}" data-tooltip="${tx.c.toLocaleDateString()} ${tx.c.toLocaleTimeString()}" data-tooltip-right>${timeDifference(
        now,
        tx.c.getTime()
    )}</a>
	</div>

	<div class="amounts">
		<div class="amount-1 fs-0">
			<div class="image">
				<img id="${GetTokenImage(tx.orig)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round">
			</div>
			<div class="amount ml-6px">${formatFiatNumber((tx.known_tokens[tx.known_tokens_order[(!tx._b && tx.known_tokens_order.length - 1) || 0]] || Big(0)).A.abs())}</div>
			<div class="symbol ml-6px" data-token="${tx.orig}" data-action="token">${tx.orig_symbol}</div>
		</div>

		<div class="amount-2">
			${arrow}
			<div class="image">
				<img id="${GetTokenImage(tx.k)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round">
			</div>
			<div class="amount text-truncated ml-6px">${formatFiatNumber((tx.known_tokens[tx.known_tokens_order[(tx._b && tx.known_tokens_order.length - 1) || 0]] || Big(0)).A.abs())}</div>
			<div class="symbol text-truncated ml-6px" data-token="${tx.k}" data-action="token">${tx.token_symbol}</div>
		</div>

		<div class="amount-3 fs-0">
			${arrow}
			<div class="amount">$${formatFiatNumber((tx.known_tokens[tx.known_tokens_order[(tx._b && tx.known_tokens_order.length - 1) || 0]] || Big(0)).au.abs())}</div>
		</div>

		<div class="amount-4 fs-0">
			${arrow}
			<div class="amount text-${color}" data-balance="${tx.p}">$${formatFiat(tx.p.mul(DATA.WPEG_PRICE))}</div>
		</div>
	</div>

	<div class="actions">
		<button class="btn btn-style w-100" data-togglable="ModalSell" data-slot="${DATA.selected_slot}" data-selected-token="${tx.k}" data-pids="">SELL</button>
	</div>
</div>`;
};

const parse_copied_txs = async (txs, helper_data) => {
    /* Zip */
    for (let i = txs.length - 1, j; i >= 0; --i) {
        for (j = helper_data.length - 1; j >= 0; --j) {
            if (helper_data[j].hash === txs[i].h) {
                txs[i].k = helper_data[j].token;
                txs[i].w = helper_data[j].address;
                txs[i].peg = helper_data[j].peg;
            }
        }
    }

    let ret = [],
        _transactions = {},
        _transactions_order = [],
        i = 0;

    for (; i < txs.length; ++i) {
        if (!txs[i].au) {
            continue;
        }

        if (_transactions[txs[i].h]) {
            if (_transactions[txs[i].h].known_tokens[txs[i].t0]) {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t0].A = _transactions[txs[i].h].known_tokens[txs[i].t0].A.add(txs[i].in);
                    _transactions[txs[i].h].known_tokens[txs[i].t0].au = _transactions[txs[i].h].known_tokens[txs[i].t0].au.add(txs[i].au);
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t0].A = _transactions[txs[i].h].known_tokens[txs[i].t0].A.sub(txs[i].ot);
                    _transactions[txs[i].h].known_tokens[txs[i].t0].au = _transactions[txs[i].h].known_tokens[txs[i].t0].au.sub(txs[i].au);
                }
            } else {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                        A: Big(txs[i].in),
                        au: Big(txs[i].au),
                    };
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                        A: Big(txs[i].ot),
                        au: Big(txs[i].au),
                    };
                }
            }

            if (_transactions[txs[i].h].known_tokens[txs[i].t1]) {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t1].A = _transactions[txs[i].h].known_tokens[txs[i].t1].A.add(txs[i].ot);
                    _transactions[txs[i].h].known_tokens[txs[i].t1].au = _transactions[txs[i].h].known_tokens[txs[i].t1].au.add(txs[i].au);
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t1].A = _transactions[txs[i].h].known_tokens[txs[i].t1].A.sub(txs[i].in);
                    _transactions[txs[i].h].known_tokens[txs[i].t1].au = _transactions[txs[i].h].known_tokens[txs[i].t1].au.sub(txs[i].au);
                }
            } else {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                        A: Big(txs[i].ot),
                        au: Big(txs[i].au),
                    };
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                        A: Big(txs[i].in),
                        au: Big(txs[i].au),
                    };
                }
            }

            _transactions[txs[i].h].k = txs[i].t1;

            let token = (_transactions[txs[i].h].known_tokens_order[0] === txs[i].t1 && txs[i].t0) || txs[i].t1,
                idx = _transactions[txs[i].h].known_tokens_order.indexOf(token);

            if (!~idx) {
                _transactions[txs[i].h].known_tokens_order.unshift(token);
            } /*  else {
				token = token === txs[i].t1 && txs[i].t0 || txs[i].t1;
				if (!_transactions[txs[i].h].known_tokens_order.indexOf(token)) {
					_transactions[txs[i].h].known_tokens_order.unshift(token);
				}
			} */
        } else {
            _transactions_order.push(txs[i].h);
            _transactions[txs[i].h] = {
                h: txs[i].h,
                w: txs[i].w,
                R: txs[i].R,
                k: txs[i].t1,
                c: txs[i].c,
                _b: txs[i]._b,
                known_tokens: {},
                known_tokens_order: [],
            };

            if (txs[i]._b) {
                _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                    A: Big(txs[i].in),
                    au: Big(txs[i].au),
                };

                _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                    A: Big(txs[i].ot),
                    au: Big(txs[i].au),
                };

                _transactions[txs[i].h].known_tokens_order = [txs[i].t0, txs[i].t1];
            } else {
                _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                    A: Big(txs[i].ot).mul(-1),
                    au: Big(txs[i].au).mul(-1),
                };

                _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                    A: Big(txs[i].in).mul(-1),
                    au: Big(txs[i].au).mul(-1),
                };

                _transactions[txs[i].h].known_tokens_order = [txs[i].t1, txs[i].t0];
            }
        }
    }

    for (i = 0; i < _transactions_order.length; ++i) {
        if (!DATA.copy_settings[DATA.selected_copy_slot]) {
            DATA.copy_settings[DATA.selected_copy_slot] = {};
        }

        _transactions[_transactions_order[i]]._s =
            (DATA.conf.connected && !DATA.copy_settings[DATA.selected_copy_slot][_transactions[_transactions_order[i]].w]) ||
            !DATA.copy_settings[DATA.selected_copy_slot][_transactions[_transactions_order[i]].w]._strategy_manual;

        _transactions[_transactions_order[i]].orig_amount = _transactions[_transactions_order[i]].known_tokens[_transactions[_transactions_order[i]].known_tokens_order[0]].A;
        _transactions[_transactions_order[i]].balance =
            _transactions[_transactions_order[i]].known_tokens[_transactions[_transactions_order[i]].known_tokens_order[_transactions[_transactions_order[i]].known_tokens_order.length - 1]].A;

        _transactions[_transactions_order[i]].orig = _transactions[_transactions_order[i]].known_tokens_order[0];
        _transactions[_transactions_order[i]].k = _transactions[_transactions_order[i]].known_tokens_order[_transactions[_transactions_order[i]].known_tokens_order.length - 1];

        ret.push(_transactions[_transactions_order[i]]);
    }

    DATA.copy_transactions[DATA.selected_copy_slot] = DATA.copy_transactions[DATA.selected_slot] = ret;
    return add_wallets();
};

const add_wallets = async () => {
    if (DATA.selected_slot === DATA.ZERO && DATA.slot !== DATA.ZERO) {
        DATA.selected_slot = DATA.slot;
    }

    let html = '',
        _html,
        tmp,
        promises = [],
        setting,
        slot_wallet_balance,
        i = DATA.copy_transactions[DATA.selected_slot] && DATA.copy_transactions[DATA.selected_slot] ? DATA.copy_transactions[DATA.selected_slot].length - 1 : -1;

    for (; i >= 0; --i) {
        promises.push(get_transaction(DATA.copy_transactions[DATA.selected_slot][i]));
    }
    if (!DATA.copy_settings_ordered[DATA.CHAIN] || DATA.copy_settings_ordered[DATA.CHAIN].length === 0) {
        DATA.copy_settings_ordered[DATA.CHAIN] = Object.keys(DATA.copy_settings[DATA.selected_copy_slot]).filter((v) => ![DATA.ZERO, DATA.IMAGINARY_PEG].includes(v));
    }

    for (i = 0; i < DATA.copy_settings_ordered[DATA.CHAIN].length; ++i) {
        setting = DATA.copy_settings[DATA.selected_copy_slot][DATA.copy_settings_ordered[DATA.CHAIN][i]];

        if (!setting || !Object.keys(setting).length || DATA.copy_settings_ordered[DATA.CHAIN][i] === DATA.ZERO) {
            continue;
        }

        _html = (!i && (await Promise.all(promises)).flat().join('')) || '<div class="transaction">Spectating...</div>';

        tmp = {};
        slot_wallet_balance = (DATA.copy_transactions[DATA.selected_copy_slot] || [])
            .filter((v) => v.w === setting.address)
            .reduce((a, n) => {
                let token = (n.k === DATA.WPEG && n.orig) || n.k;

                if (!tmp[token]) {
                    tmp[token] = true;
                    return (n._b && a.add(n.p)) || a.sub(n.p) || a;
                }

                return a;
            }, Big(0));

        html = `${html}<div class="wallet" data-slot="${setting.slot}" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}">
	<div class="header">
		<button class="btn btn-has-icon btn-toggle" data-action="set-first-wallet">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="set-first-wallet">
				<path d="M6.146 3.646A.5.5 0 006.146 4.354L9.793 8 6.146 11.646A.5.5 0 006.854 12.354L10.854 8.354A.5.5 0 0010.854 7.646L6.854 3.646A.5.5 0 006.146 3.646Z" data-action="set-first-wallet"></path>
				<path d="M3.646 6.146A.5.5 0 014.354 6.146L8 9.793 11.646 6.146A.5.5 0 0112.354 6.854L8.354 10.854A.5.5 0 017.646 10.854L3.646 6.854A.5.5 0 013.646 6.146Z" data-action="set-first-wallet"></path>
			</svg>
		</button>

		<div class="name text-white text-truncated"><a href="https://bscscan.com/address/${DATA.copy_settings_ordered[DATA.CHAIN][i]}" target="_blank">${
            `${setting.title}`.trim() || DATA.copy_settings_ordered[DATA.CHAIN][i]
        }</a></div>

		<div class="amount ml-6px mr-6px" data-balance="${slot_wallet_balance || 0}">$${formatFiat(Big(slot_wallet_balance || 0).mul(DATA.WPEG_PRICE))}</div>

		<div class="actions ml-auto">
			<button class="btn btn-has-icon" data-togglable="ModalDeleteWallet" data-tooltip="Delete" data-tooltip-left data-slot="${setting.slot}" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}">${
            DATA.CANCEL_SVG_BLACK
        }</button>

			<label class="checkbox-svg ml-6px" data-tooltip="${(!setting.is_spectator && 'Pause') || 'Enable'}" data-tooltip-alt="${(!setting.is_spectator && 'Enable') || 'Pause'}" data-tooltip-left data-slot="${
            setting.slot
        }" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}" data-action="toggle_copy_wallet_state">
				<input type="checkbox" class="slot-wallet-${DATA.selected_slot} visually-hidden" autocomplete="off" ${(!setting.is_spectator && 'checked') || ''}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${setting.slot}" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}" data-action="toggle_copy_wallet_state">
					<circle fill="#191919" cx="8" cy="8" r="8" data-slot="${setting.slot}" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}" data-action="toggle_copy_wallet_state"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${
                        setting.slot
                    }" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}" data-action="toggle_copy_wallet_state"></path>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${
                        setting.slot
                    }" data-wallet="${DATA.copy_settings_ordered[DATA.CHAIN][i]}" data-action="toggle_copy_wallet_state"></path>
				</svg>
			</label>

			<button class="btn btn-has-icon ml-6px" data-togglable="ModalCopyPositionSettings" data-tooltip="Settings" data-tooltip-left data-slot="${setting.slot}" data-wallet="${
            DATA.copy_settings_ordered[DATA.CHAIN][i]
        }" data-action="load-wallet-settings">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<circle fill="#191919" cx="8" cy="8" r="8"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 11A.5.5 0 014.5 10.5H11.5A.5.5 0 0111.5 11.5H4.5A.5.5 0 014 11ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8ZM4 5A.5.5 0 014.5 4.5H11.5A.5.5 0 0111.5 5.5H4.5A.5.5 0 014 5Z"></path>
				</svg>
			</button>
		</div>
	</div>

	<div class="body">${_html}</div>
</div>`;
    }

    document.querySelector('#Copy .wallets').innerHTML = html;
};

const analyze_transactions = async (el, txs, is_full) => {
    let _transactions = {},
        _transactions_order = [],
        last_hash = txs[txs.length - 1].h,
        promises = [],
        addresses =
            (DATA.slot_copies_addresses && DATA.slot_copies_addresses.map((v) => Object.keys(DATA.copy_settings[v] || (DATA.copy_settings[v] = {}))).flat()) || Object.keys(DATA.copy_settings[DATA.selected_copy_slot]),
        i = 0;

    for (; i < txs.length; ++i) {
        txs[i].w = (addresses.includes(txs[i].F) && txs[i].F) || txs[i].T;

        if (last_hash === txs[i].h) {
            break;
        }

        if (!txs[i].au) {
            continue;
        }

        if (_transactions[txs[i].h]) {
            if (_transactions[txs[i].h].known_tokens[txs[i].t0]) {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t0].A = _transactions[txs[i].h].known_tokens[txs[i].t0].A.add(txs[i].in);
                    _transactions[txs[i].h].known_tokens[txs[i].t0].au = _transactions[txs[i].h].known_tokens[txs[i].t0].au.add(txs[i].au);
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t0].A = _transactions[txs[i].h].known_tokens[txs[i].t0].A.sub(txs[i].ot);
                    _transactions[txs[i].h].known_tokens[txs[i].t0].au = _transactions[txs[i].h].known_tokens[txs[i].t0].au.sub(txs[i].au);
                }
            } else {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                        A: Big(txs[i].in),
                        au: Big(txs[i].au),
                    };
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                        A: Big(txs[i].ot),
                        au: Big(txs[i].au),
                    };
                }
            }

            if (_transactions[txs[i].h].known_tokens[txs[i].t1]) {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t1].A = _transactions[txs[i].h].known_tokens[txs[i].t1].A.add(txs[i].ot);
                    _transactions[txs[i].h].known_tokens[txs[i].t1].au = _transactions[txs[i].h].known_tokens[txs[i].t1].au.add(txs[i].au);
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t1].A = _transactions[txs[i].h].known_tokens[txs[i].t1].A.sub(txs[i].in);
                    _transactions[txs[i].h].known_tokens[txs[i].t1].au = _transactions[txs[i].h].known_tokens[txs[i].t1].au.sub(txs[i].au);
                }
            } else {
                if (txs[i]._b) {
                    _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                        A: Big(txs[i].ot),
                        au: Big(txs[i].au),
                    };
                } else {
                    _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                        A: Big(txs[i].in),
                        au: Big(txs[i].au),
                    };
                }
            }

            _transactions[txs[i].h].k = txs[i].t1;

            let token = (_transactions[txs[i].h].known_tokens_order[0] === txs[i].t1 && txs[i].t0) || txs[i].t1,
                idx = _transactions[txs[i].h].known_tokens_order.indexOf(token);

            if (!~idx) {
                _transactions[txs[i].h].known_tokens_order.unshift(token);
            } /*  else {
				token = token === txs[i].t1 && txs[i].t0 || txs[i].t1;
				if (!_transactions[txs[i].h].known_tokens_order.indexOf(token)) {
					_transactions[txs[i].h].known_tokens_order.unshift(token);
				}
			} */
        } else {
            _transactions_order.push(txs[i].h);
            _transactions[txs[i].h] = {
                h: txs[i].h,
                b: txs[i].b,
                w: txs[i].w,
                R: txs[i].R,
                k: txs[i].t1,
                c: txs[i].c,
                _b: txs[i]._b,
                known_tokens: {},
                known_tokens_order: [],
            };

            if (txs[i]._b) {
                _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                    A: Big(txs[i].in),
                    au: Big(txs[i].au),
                };

                _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                    A: Big(txs[i].ot),
                    au: Big(txs[i].au),
                };

                _transactions[txs[i].h].known_tokens_order = [txs[i].t0, txs[i].t1];
            } else {
                _transactions[txs[i].h].known_tokens[txs[i].t0] = {
                    A: Big(txs[i].ot).mul(-1),
                    au: Big(txs[i].au).mul(-1),
                };

                _transactions[txs[i].h].known_tokens[txs[i].t1] = {
                    A: Big(txs[i].in).mul(-1),
                    au: Big(txs[i].au).mul(-1),
                };

                _transactions[txs[i].h].known_tokens_order = [txs[i].t1, txs[i].t0];
            }
        }
    }

    for (i = 0; i < _transactions_order.length; ++i) {
        promises.push(
            (async (_i) => {
                if (!DATA.copy_settings[DATA.selected_copy_slot]) {
                    DATA.copy_settings[DATA.selected_copy_slot] = {};
                }

                _transactions[_transactions_order[_i]]._s =
                    (DATA.conf.connected && !DATA.copy_settings[DATA.selected_copy_slot][_transactions[_transactions_order[_i]].w]) ||
                    !DATA.copy_settings[DATA.selected_copy_slot][_transactions[_transactions_order[_i]].w]._strategy_manual;

                _transactions[_transactions_order[_i]].orig_amount = _transactions[_transactions_order[_i]].known_tokens[_transactions[_transactions_order[_i]].known_tokens_order[0]].A;
                _transactions[_transactions_order[_i]].balance =
                    _transactions[_transactions_order[_i]].known_tokens[_transactions[_transactions_order[_i]].known_tokens_order[_transactions[_transactions_order[_i]].known_tokens_order.length - 1]].A;

                _transactions[_transactions_order[_i]].orig = _transactions[_transactions_order[_i]].known_tokens_order[0];
                _transactions[_transactions_order[_i]].k = _transactions[_transactions_order[_i]].known_tokens_order[_transactions[_transactions_order[_i]].known_tokens_order.length - 1];

                if (is_full) {
                    return await get_transaction(_transactions[_transactions_order[_i]]);
                }

                if (await isLQ(_transactions[_transactions_order[_i]].k, _transactions[_transactions_order[_i]].token_symbol)) {
                    return;
                }

                await Promise.all([
                    (async () => {
                        _transactions[_transactions_order[_i]].orig_symbol = await get_symbol(_transactions[_transactions_order[_i]].orig);
                    })(),
                    (async () => {
                        _transactions[_transactions_order[_i]].token_symbol = await get_symbol(_transactions[_transactions_order[_i]].k);
                    })(),
                ]);

                return await get_address_transaction(_transactions[_transactions_order[_i]]);
            })(i)
        );
    }

    el.innerHTML = (await Promise.all(promises))
        .flat()
        .filter((v) => v)
        .join('');
};

const set_wallet_slot_transactions = async () => {
    let container,
        trials = 150;

    while (--trials && !(container = document.querySelector(`.wallet[data-wallet="${DATA.selected_copy_wallet}"][data-slot="${DATA.selected_copy_slot}"] .body`))) {
        await sleep(0.01);
    }

    if (container) {
        if (!DATA.copy_transactions || !DATA.copy_transactions[DATA.selected_copy_slot] || !DATA.copy_transactions[DATA.selected_copy_slot].length) {
            container.innerHTML = '<div class="transaction">Spectating3...</div>';
        } else {
            analyze_transactions(container, DATA.copy_transactions[DATA.selected_copy_slot], true);
        }
    }
};

const set_address_transactions = async () => {
    let container = document.querySelector(`#Feed .body`);

    if (!DATA.copy_address_transactions || !DATA.copy_address_transactions.length) {
        container.innerHTML = '<div class="item">No transactions yet.</div>';
    } else {
        analyze_transactions(container, DATA.copy_address_transactions);
    }
};

/*** Inject HTML - Panel 1 - Slots ***/

const load_wallet_slot = (slot, i) => {
    /* console.log(slot) */

    let old = document.querySelector(`#Wallet__Slot${i} [slot-total-balance-${DATA.CHAIN}-${slot.address}]`),
        old_balance = 0;

    if (old) {
        old_balance = old.dataset.balance;
    }

    return `<div id="Wallet__Slot${i}" class="panelbox">
	<input type="radio" name="wallet_slot${i}_tab" id="Wallet__Slot${i}__Tab1" class="visually-hidden" autocomplete="off" checked>

	<div id="Wallet__Slot${i}__Panel1" class="panel panel-main">
		<div class="body">
			<div class="chart">
				<canvas id="Wallet__Slot${i}__Chart"></canvas>

				<div class="meta">
					<div class="title text-truncated slot-title-${DATA.CHAIN}-${slot.address}">${slot.title ? slot.title : `Slot ${i + 1}`}</div>

					<div class="balance text-truncated slot-total-balance-${DATA.CHAIN}-${slot.address}" data-balance="${Big((Number(old_balance) && old_balance) || slot.total_balance)}">$${formatFiat(
        Big((Number(old_balance) && old_balance) || slot.total_balance).mul(DATA.WPEG_PRICE)
    )}</div>
				</div>
			</div>

			<div class="actions">
				<button class="btn btn-has-icon" data-tooltip="List assets" data-tooltip-top data-wallet-slots-pagination-idx="${i}" data-action="wallet-list-assets">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="${i}" data-action="wallet-list-assets">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM7 11.5A.5.5 0 017.5 11H8.5A.5.5 0 018.5 12H7.5A.5.5 0 017 11.5ZM5 8.5A.5.5 0 015.5 8H10.5A.5.5 0 0110.5 9H5.5A.5.5 0 015 8.5ZM3 5.5A.5.5 0 013.5 5H12.5A.5.5 0 0112.5 6H3.5A.5.5 0 013 5.5Z" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="${i}" data-action="wallet-list-assets"></path>
					</svg>
				</button>

				<label for="Wallet__Slot${i}__Tab5" class="btn btn-has-icon ml-12px" data-tooltip="Deposit funds" data-tooltip-top>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
						<path d="M8 2A.5.5 0 018.5 2.5V8.293L10.646 6.146A.5.5 0 0111.354 6.854L8.354 9.854A.5.5 0 017.646 9.854L4.646 6.854A.5.5 0 115.354 6.146L7.5 8.293V2.5A.5.5 0 018 2ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 001.675 11L14.325 11A7 7 0 008 1ZM13.745 12 2.255 12C5 16 11 16.005 13.745 12Z"></path>
					</svg>
				</label>

				<label for="Wallet__Slot${i}__Tab3" class="btn btn-has-icon ml-12px" data-tooltip="Withdraw funds" data-tooltip-top data-action="set-max-slot-withdraw" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="set-max-slot-withdraw" data-slot-idx="${i}">
						<path d="M8 10A.5.5 0 008.5 9.5V3.707L10.646 5.854A.5.5 0 0011.354 5.146L8.354 2.146A.5.5 0 007.646 2.146L4.646 5.146A.5.5 0 105.354 5.854L7.5 3.707V9.5A.5.5 0 008 10ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 001.675 11L14.325 11A7 7 0 008 1ZM13.745 12 2.255 12C5 16 11 16.005 13.745 12Z" data-action="set-max-slot-withdraw" data-slot-idx="${i}"></path>
					</svg>
				</label>

				<!-- <label for="Wallet__Slot${i}__Tab4" class="btn btn-has-icon ml-12px" data-tooltip="Rebalance funds" data-tooltip-top data-action="reset-slot-ratio" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="reset-slot-ratio" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V6H10A.5.5 0 0110 7H8.5V8.5A.5.5 0 017.5 8.5V7H6A.5.5 0 016 6H7.5V4.5A.5.5 0 018 4ZM5.5 10.5A.5.5 0 016 10H10A.5.5 0 0110 11H6A.5.5 0 015.5 10.5Z" data-action="reset-slot-ratio" data-slot-idx="${i}"></path>
					</svg>
				</label> -->

				<label class="checkbox-svg ml-12px" data-tooltip="${slot.is_active ? 'Pause slot' : 'Enable slot'}" data-tooltip-alt="${slot.is_active ? 'Enable slot' : 'Pause slot'}" data-tooltip-top data-slot="${
        slot.address
    }" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
					<input type="checkbox" class="slot-${slot.address} visually-hidden" autocomplete="off" ${slot.is_active ? 'checked' : ''}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${
                            slot.address
                        }" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${
                            slot.address
                        }" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<input type="radio" name="wallet_slot${i}_tab" id="Wallet__Slot${i}__Tab5" class="visually-hidden" autocomplete="off">

	<div id="Wallet__Slot${i}__Panel5" class="panel panel-currency">
		<div class="head">
			<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Select currency</div>
		</div>

		<div class="body slot-currencies-container" data-slot="${slot.address}" data-slot-idx="${i}"></div>
	</div>

	<input type="radio" name="wallet_slot${i}_tab" id="Wallet__Slot${i}__Tab2" class="visually-hidden" autocomplete="off">

	<div id="Wallet__Slot${i}__Panel2" class="panel panel-transfer">
		<div class="head">
			<label for="Wallet__Slot${i}__Tab5" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Deposit funds</div>
		</div>

		<div class="body">
			<input type="text" class="form-control" placeholder="0.00" autocomplete="off" spellcheck="false" oninput="update_range(this, 'slot-${i}-deposit-range')">

			<div class="d-flex w-100">
				<input id="slot-${i}-deposit-range" type="range" min="0" max="${Big(DATA.conf.vault || 0).mul(DATA.WPEG_PRICE)}" step="0.001" value="0">

				<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="deposit" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="deposit" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="deposit" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<input type="radio" name="wallet_slot${i}_tab" id="Wallet__Slot${i}__Tab3" class="visually-hidden" autocomplete="off">

	<div id="Wallet__Slot${i}__Panel3" class="panel panel-transfer">
		<div class="head">
			<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Withdraw funds</div>
		</div>

		<div class="body">
			<input type="text" class="form-control" placeholder="0.00" autocomplete="off" spellcheck="false" oninput="update_range(this, 'slot-${i}-withdraw-range')">

			<div class="d-flex w-100">
				<input id="slot-${i}-withdraw-range" type="range" min="0" max="${Big(slot.balance).mul(DATA.WPEG_PRICE)}" step="0.001" value="0">

				<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="withdraw" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="withdraw" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="withdraw" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<!-- <input type="radio" name="wallet_slot${i}_tab" id="Wallet__Slot${i}__Tab4" class="visually-hidden" autocomplete="off">

	<div id="Wallet__Slot${i}__Panel4" class="panel panel-balance">
		<div class="head">
			<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Rebalance funds</div>
		</div>

		<div class="body">
			<div class="w-100">
				<div class="d-flex">
					<div class="text-default mr-4px">Native:</div>
					<div class="native" data-native-value="0">$0.00</div>
				</div>
				<div class="d-flex">
					<div class="text-default mr-4px">Wrapped:</div>
					<div class="wrapped" data-wrapped-value="0">$0.00</div>
				</div>
			</div>

			<div class="d-flex w-100">
				<input type="range" min="0" max="99" step="1" value="${slot.ratio || 0}">

				<label for="Wallet__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="rebalance_slot_ratio" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="rebalance_slot_ratio" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="rebalance_slot_ratio" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div> -->
</div>`;
};

const select_slot = async (_idx) => {
    store.set(`${DATA.CHAIN}_wallet_slots_pagination_idx`, (DATA.wallet_slots_pagination_idx = _idx));

    if (~_idx && DATA.slots[DATA.CHAIN].length > _idx) {
        DATA.selected_slot = DATA.slots[DATA.CHAIN][_idx].address;
        await set_wallet_assets(false, DATA.slots[DATA.CHAIN][_idx].title || `Slot ${_idx + 1}`);
        document.getElementById(`Wallet__Slot${_idx}`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    } else {
        await set_wallet_assets(true, 'WALLET ASSETS');
        elementify('Wallet__Wallet1').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
};

const load_wallet_slots = async () => {
    /*** Panel 1 - Range input in transfer panels ***/

    document.querySelectorAll('#Wallet__Panel1 .panel-transfer input[type="range"]').forEach((inputRange) => {
        inputRange.removeEventListener('input', range_input_in_transfer_panels);
    });

    /*** Panel 1 - Range input in balance panels ***/

    document.querySelectorAll('#Wallet__Panel1 .panel-balance input[type="range"]').forEach((inputRange) => {
        inputRange.removeEventListener('input', range_input_in_balance_panels);
    });

    elementify('wallet-slots-container').innerHTML = `${sorted_slots().map(load_wallet_slot).join('')}
	<div id="Wallet__Slot__Create" class="panelbox">
		<input type="radio" name="wallet_slot_create_tab" id="Wallet__Slot__Create__Tab1" class="visually-hidden" autocomplete="off" checked data-action="create-slot" data-chain="${DATA.CHAIN}">

		<div id="Wallet__Slot__Create__Panel1" class="panel panel-main">
			<div class="body">
				<label for="Wallet__Slot__Create__Tab3" class="btn btn-has-icon d-flex h-100 w-100">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg mx-auto my-auto">
						<path d="M8 2A.5.5 0 018.5 2.5V7.5H13.5A.5.5 0 0113.5 8.5H8.5V13.5A.5.5 0 017.5 13.5V8.5H2.5A.5.5 0 012.5 7.5H7.5V2.5A.5.5 0 018 2Z"/>
					</svg>
				</label>
			</div>
		</div>

		<input type="radio" name="wallet_slot_create_tab" id="Wallet__Slot__Create__Tab3" class="visually-hidden" autocomplete="off" data-action="create-slot" data-chain="${DATA.CHAIN}">

		<div id="Wallet__Slot__Create__Panel3" class="panel panel-transfer">
			<div class="body">
				<div class="w-100 d-flex">
					<label for="Wallet__Slot__Create__Tab1" class="element-loader"></label>
				</div>
			</div>
		</div>
	</div>`;

    setTimeout(() => {
        /*** Panel 1 - Range input in transfer panels ***/

        document.querySelectorAll('#Wallet__Panel1 .panel-transfer input[type="range"]').forEach((inputRange) => {
            inputRange.addEventListener('input', range_input_in_transfer_panels);
        });

        /*** Panel 1 - Range input in balance panels ***/

        document.querySelectorAll('#Wallet__Panel1 .panel-balance input[type="range"]').forEach((inputRange) => {
            inputRange.addEventListener('input', range_input_in_balance_panels);
        });

        DATA.slots[DATA.CHAIN].map((v, k) => getChartConfig(`Wallet__Slot${k}__Chart`, v.history));
    }, 0);
};

/*** Inject HTML - Panel 1 - Assets ***/

const set_wallet_asset = async (is_origin, token, amounts, chain) => {
    return `<div class="item">
	<div class="name">
		<div data-token="${token}" data-action="token" data-togglable="Wallet">${await get_symbol(token, chain)}</div>
	</div>
	<div class="price">
		<div data-balance="${Big(amounts.bl || 0).mul(amounts.p || 0)}">$${formatFiat(
        Big(amounts.bl || 0)
            .mul(amounts.p || 0)
            .mul(DATA.WPEG_PRICE)
    )}</div>
	</div>
	<div class="balance">
		<div>${formatFiatNumber(amounts.bl)}</div>
	</div>
	<div class="actions">
		<button class="btn btn-style" data-togglable="ModalSell" data-sell-slot="${(is_origin && DATA.ZERO) || DATA.selected_slot || DATA.slot}" data-selected-token="${token}" data-pids="${amounts.pids || ''}">SELL</button>
	</div>
</div>`;
};

const set_wallet_assets = async (is_origin, title) => {
    if (typeof is_origin === 'undefined') {
        is_origin = !~DATA.wallet_slots_pagination_idx;
    }

    if (typeof title === 'undefined') {
        title =
            (~DATA.wallet_slots_pagination_idx &&
                DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx] &&
                (DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx].title || `Slot ${DATA.wallet_slots_pagination_idx + 1}`)) ||
            'WALLET ASSETS';
    }

    let promises = [];

    if (!DATA.slots[DATA.CHAIN].length || (is_origin && document.body.classList.contains('initialized'))) {
        if (DATA.conf.assets) {
            DATA.conf.assets.filter((asset) => {
                promises.push(set_wallet_asset(is_origin, asset.k, asset));
            });
        }
    } else if (DATA.slots[DATA.CHAIN].length && DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx]) {
        for (let token in DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx].balances) {
            promises.push(set_wallet_asset(is_origin, token, DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx].balances[token], undefined, true));
        }
    }

    elementify('wallet-slot-assets-container').innerHTML = `<div class="assets">
	<div class="head">
		<div id="Wallet__AssetsSelector" class="selector">
			<button class="btn btn-has-icon" data-action="list-assets-left">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="list-assets-left">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</button>

			<div class="title">${title}</div>

			<button class="btn btn-has-icon" data-action="list-assets-right">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="list-assets-right">
					<path d="M4.646 1.646A.5.5 0 015.354 1.646L11.354 7.646A.5.5 0 0111.354 8.354L5.354 14.354A.5.5 0 014.646 13.646L10.293 8 4.646 2.354A.5.5 0 014.646 1.646Z" data-action="list-assets-right"/>
				</svg>
			</button>
		</div>

		<div class="item">
			<div class="symbol">
				<div>Symbol</div>
			</div>

			<div class="price">
				<div>Price</div>
			</div>

			<div class="balance">
				<div>Balance</div>
			</div>

			<div class="actions">Actions</div>
		</div>
	</div>

	<div class="body">${(await Promise.all(promises)).flat().join('') || '<div class="item">No assets in this slot.</div>'}</div>
</div>`;
};

/*** Inject HTML - Panel 2 ***/

const set_wallet_slot = (slot, i, chain) => {
    let old = document.getElementById(`#Wallet__Panel2 [slot-total-balance-${chain}-${slot.address}]`),
        old_balance = 0;

    if (old) {
        old_balance = old.dataset.balance;
    }

    return `<div class="slot" data-chain="${chain}" data-slot="${slot.address}">
	<button class="name btn text-left" data-chain="${chain}" data-slot-idx="${i}">
		<div class="text-truncated slot-title-${DATA.CHAIN}-${slot.address}">${slot.title ? slot.title : `Slot ${i + 1}`}</div>
	</button>
	<div class="balance text-truncated slot-total-balance-${chain}-${slot.address}" data-balance="${Big((Number(old_balance) && old_balance) || slot.total_balance)}">$${formatFiat(
        Big((Number(old_balance) && old_balance) || slot.total_balance).mul(DATA.WPEG_PRICE)
    )}</div>

	<div class="actions">
		<button class="btn btn-has-icon" data-tooltip="Destroy slot" data-tooltip-left data-migrate-slot="${slot.address}" data-action="set-migration-slot" data-migrate-slot="">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-migrate-slot="${slot.address}" data-action="set-migration-slot" data-migrate-slot="">
				<circle fill="#333333" cx="8" cy="8" r="8" data-migrate-slot="${slot.address}" data-action="set-migration-slot" data-migrate-slot=""></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z" data-migrate-slot="${
                    slot.address
                }" data-action="set-migration-slot" data-migrate-slot=""></path>
			</svg>
		</button>

		<label class="checkbox-svg ml-6px" data-tooltip="${slot.is_active ? 'Pause slot' : 'Enable slot'}" data-tooltip-alt="${slot.is_active ? 'Enable slot' : 'Pause slot'}" data-slot="${
        slot.address
    }" data-tooltip-left data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
			<input type="checkbox" class="slot-${slot.address} visually-hidden" autocomplete="off" ${slot.is_active ? 'checked' : ''}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
				<circle fill="#333333" cx="8" cy="8" r="8" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${
                    slot.address
                }" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"></path>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${
                    slot.address
                }" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"></path>
			</svg>
		</label>

		<button class="btn btn-has-icon ml-6px" data-tooltip="Sell assets" data-tooltip-left>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#333333" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11.354 4.646A.5.5 0 0010.646 4.646L4.646 10.646A.5.5 0 005.354 11.354L11.354 5.354A.5.5 0 0011.354 4.646Z"></path>
			</svg>
		</button>

		<button class="btn btn-has-icon ml-6px" data-tooltip="Send assets" data-tooltip-left data-chain="${chain}" data-slot="${slot.address}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-chain="${chain}" data-slot="${slot.address}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-chain="${chain}" data-slot="${slot.address}"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z" data-chain="${chain}" data-slot="${
        slot.address
    }"></path>
			</svg>
		</button>
	</div>
</div>`;
};

const set_wallet_chain_slots = (chain_id, chain, chain_assets, slots, is_first) => {
    let balance = Big((chain === DATA.CHAIN && DATA.conf.vault) || 0).add(slots.reduce((a, b) => a.add(b.total_balance), Big(0))),
        _slots =
            slots.map((v, k) => set_wallet_slot(v, k, chain)).join('') ||
            `<div class="slot btn w-100 text-left"><div class="name text-truncated" data-action="create-slot" data-chain="${chain}" data-pay-chain="${chain_id}">Create Slot</div></div>`;

    return `<details ${(is_first && 'open') || 'class="mt-12px"'} data-chain="${chain}">
	<summary>
		<img id="${GetTokenImage(chain_assets)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round">
		<div class="ml-6px text-white">${uppercase_first(chain_assets)}</div>
		<div class="ml-auto text-white text-truncated" data-balance="${balance}">$${formatFiat(balance.mul(DATA.WPEG_PRICE))}</div>
	</summary>

	<div class="slots">${_slots}</div>
</details>`;
};

const set_wallet_chains_slots = async () => {
    let html = '',
        chain_id,
        is_first = true;

    for (chain_id of DATA.CHAINS_ORDER) {
        html = `${html}${set_wallet_chain_slots(
            chain_id,
            DATA.CHAINS[chain_id].CHAIN,
            DATA.CHAINS[chain_id].CHAIN_ASSETS,
            DATA.slots[DATA.CHAINS[chain_id].CHAIN] || (DATA.slots[DATA.CHAINS[chain_id].CHAIN] = []),
            is_first
        )}`;

        if (is_first) {
            is_first = false;
        }
    }

    elementify('Wallet__Panel2').innerHTML = html;

    setTimeout(() => {
        /*** Panel 2 - Slot name changer ***/

        document.querySelectorAll('#Wallet__Panel2 .slot button.name').forEach((nameButton) => {
            nameButton.addEventListener('click', (event) => {
                const nameChanger = htmlToElement(`
					<div class="name-changer d-flex w-100">
						<input type="text" class="form-control" placeholder="Slot name" autocomplete="off" spellcheck="false" value="${DATA.slots[nameButton.dataset.chain][nameButton.dataset.slotIdx].title}">

						<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-left>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
								<circle fill="#333333" cx="8" cy="8" r="8"></circle>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z"></path>
							</svg>
						</button>

						<button class="btn btn-has-icon ml-6px" data-tooltip="Cancel" data-tooltip-left>${DATA.CANCEL_SVG}</button>
					</div>
				`);

                nameChanger.querySelector('button[data-tooltip="Confirm"]').addEventListener('click', (event) => {
                    if (nameChanger.firstElementChild.value.trim()) {
                        nameButton.firstElementChild.innerText =
                            DATA.slot_name =
                            DATA.slots[(DATA.slot_name_chain = nameButton.dataset.chain)][nameButton.dataset.slotIdx].title =
                                nameChanger.firstElementChild.value.trim();

                        DATA.slot_name_address = DATA.slots[DATA.slot_name_chain][nameButton.dataset.slotIdx].address;

                        nameChanger.remove();

                        document.querySelectorAll(`.slot-title-${DATA.slot_name_chain}-${DATA.slot_name_address}`).forEach((el) => {
                            el.innerText = DATA.slot_name;
                        });

                        handleAction('slot_name');
                        save_settings('slots', false, true);
                    } else {
                        event.currentTarget.blur();
                    }
                });

                nameChanger.querySelector('button[data-tooltip="Cancel"]').addEventListener('click', (event) => {
                    nameChanger.remove();
                });

                nameButton.parentElement.prepend(nameChanger);
            });
        });

        /*** Panel 2 - Action destroy slot ***/

        document.querySelectorAll('#Wallet__Panel2 .slot .actions button:nth-of-type(1)').forEach((destroyButton) => {
            destroyButton.addEventListener('click', (e) => {
                let helper;

                while (!(helper || e.target).classList.contains('slot')) {
                    helper = (helper || e.target).parentNode;
                }

                if (!helper) {
                    helper = e.target;
                }

                const confirmation = htmlToElement(`<div class="confirmation d-flex w-100" data-chain="${helper.dataset.chain}" data-slot="${destroyButton.dataset.migrateSlot}">
	<div class="text-white text-truncated w-100">
		Destroy slot?
		<button class="btn btn-has-icon d-inline-block destroy-help" data-togglable="ModalHelp" data-help="This action is irreversible!<br>This will actually destroy the slot on chain!">
			${DATA.ERROR_IMG_HTML}
		</button>
	</div>

	<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-left data-action="destroy" data-chain="${helper.dataset.chain}" data-slot="${destroyButton.dataset.migrateSlot}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="destroy" data-chain="${helper.dataset.chain}" data-slot="${destroyButton.dataset.migrateSlot}">
			<circle fill="#333333" cx="8" cy="8" r="8" data-action="destroy" data-chain="${helper.dataset.chain}" data-slot="${destroyButton.dataset.migrateSlot}"></circle>
			<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="destroy" data-chain="${helper.dataset.chain}" data-slot="${destroyButton.dataset.migrateSlot}"></path>
		</svg>
	</button>

	<button class="btn btn-has-icon ml-6px" data-tooltip="Cancel" data-tooltip-left>${DATA.CANCEL_SVG}</button>
</div>`);

                confirmation.querySelector('button[data-tooltip="Cancel"]').addEventListener('click', (event) => {
                    confirmation.remove();
                });
                destroyButton.parentElement.parentElement.prepend(confirmation);
            });
        });

        /*** Panel 2 - Action sell assets ***/

        document.querySelectorAll('#Wallet__Panel2 .slot .actions button:nth-of-type(2)').forEach((sellAllButton) => {
            sellAllButton.addEventListener('click', (e) => {
                let helper;

                while (!(helper || e.target).classList.contains('slot')) {
                    helper = (helper || e.target).parentNode;
                }

                if (!helper) {
                    helper = e.target;
                }

                const confirmation = htmlToElement(`
				<div class="confirmation d-flex w-100">
					<div class="text-white text-truncated w-100">Sell all assets?</div>

					<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-left data-chain="${helper.dataset.chain}" data-slot="${helper.dataset.slot}" data-action="sell_all">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-chain="${helper.dataset.chain}" data-slot="${helper.dataset.slot}" data-action="sell_all">
							<circle fill="#333333" cx="8" cy="8" r="8" data-chain="${helper.dataset.chain}" data-slot="${helper.dataset.slot}" data-action="sell_all"></circle>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-chain="${helper.dataset.chain}" data-slot="${helper.dataset.slot}" data-action="sell_all"></path>
						</svg>
					</button>

					<button class="btn btn-has-icon ml-6px" data-tooltip="Cancel" data-tooltip-left>${DATA.CANCEL_SVG}</button>
				</div>
			`);
                confirmation.querySelector('button[data-tooltip="Confirm"]').addEventListener('click', (event) => {
                    confirmation.remove();
                });
                confirmation.querySelector('button[data-tooltip="Cancel"]').addEventListener('click', (event) => {
                    confirmation.remove();
                });
                sellAllButton.parentElement.parentElement.prepend(confirmation);
            });
        });

        /*** Panel 2 - Action send assets ***/

        document.querySelectorAll('#Wallet__Panel2 .slot .actions button:nth-of-type(3)').forEach((sendAssetsButton) => {
            sendAssetsButton.addEventListener('click', async (event) => {
                let promises = [];

                DATA.selected_chain = event.target.dataset.chain;
                DATA.selected_slot = event.target.dataset.slot;

                for (let i in DATA.slots[DATA.selected_chain]) {
                    if (DATA.selected_slot !== DATA.slots[DATA.selected_chain][i].address) {
                        continue;
                    }

                    for (let token in DATA.slots[DATA.selected_chain][i].balances) {
                        promises.push(
                            (async (_token) => {
                                return `<div class="token-selector-item">
	<div class="name text-truncated">${await get_symbol(token)}</div>

	<label class="checkbox-svg mr-6px" data-tooltip="Select token" data-tooltip-alt="Deselect token" data-tooltip-left>
		<input type="checkbox" class="visually-hidden" autocomplete="off" data-migrate-token="${_token}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
			<rect fill="#333333" rx="3" ry="3" width="16" height="16"></rect>
			<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3Z"></path>
			<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z"></path>
		</svg>
	</label>
</div>`;
                            })(token)
                        );
                    }
                }

                let tokens = (await Promise.all(promises)).flat().join('');

                const assetSelector = htmlToElement(`<div class="token-selector">
	<div class="token-selector-item">
		<div class="title text-white text-bold text-truncated">SELECT TOKENS</div>

		<div class="actions d-flex">
			<label class="checkbox-svg ml-6px" data-tooltip="Select all" data-tooltip-alt="Deselect all" data-tooltip-left>
				<input type="checkbox" class="visually-hidden input-checkbox-select-deselect" autocomplete="off">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<circle fill="#333333" cx="8" cy="8" r="8"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5 8A.5.5 0 015.5 7.5H12.5A.5.5 0 0112.5 8.5H5.5A.5.5 0 015 8ZM5 5.5A.5.5 0 015.5 5H12.5A.5.5 0 0112.5 6H5.5A.5.5 0 015 5.5ZM5 10.5A.5.5 0 015.5 10H12.5A.5.5 0 0112.5 11H5.5A.5.5 0 015 10.5ZM4 5.5A.5.5 0 113 5.5.5.5 0 014 5.5ZM4 8A.5.5 0 113 8 .5.5 0 014 8ZM4 10.5A.5.5 0 113 10.5.5.5 0 014 10.5Z"></path>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5 8A.5.5 0 015.5 7.5H12.5A.5.5 0 0112.5 8.5H5.5A.5.5 0 015 8ZM5 5.5A.5.5 0 015.5 5H12.5A.5.5 0 0112.5 6H5.5A.5.5 0 015 5.5ZM5 10.5A.5.5 0 015.5 10H12.5A.5.5 0 0112.5 11H5.5A.5.5 0 015 10.5ZM4 5.5A.5.5 0 113 5.5.5.5 0 014 5.5ZM4 8A.5.5 0 113 8 .5.5 0 014 8ZM4 10.5A.5.5 0 113 10.5.5.5 0 014 10.5Z"></path>
				</svg>
			</label>

			<button class="btn btn-has-icon ml-6px" data-tooltip="Confirm" data-tooltip-left data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}">
					<circle fill="#333333" cx="8" cy="8" r="8" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}"></path>
				</svg>
			</button>

			<button class="btn btn-has-icon ml-6px" data-tooltip="Cancel" data-tooltip-left data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}">
					<circle fill="#333333" cx="8" cy="8" r="8" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z" data-chain="${DATA.selected_chain}" data-slot="${DATA.selected_slot}"></path>
				</svg>
			</button>
		</div>
	</div>

	${tokens}
</div>`);

                assetSelector.querySelector('button[data-tooltip="Cancel"]').addEventListener('click', (e) => {
                    if (DATA.migration_tokens[e.target.dataset.chain]) {
                        delete DATA.migration_tokens[e.target.dataset.chain][e.target.dataset.slot];
                    }
                    assetSelector.remove();
                });

                /* took from input.js */
                assetSelector.querySelectorAll('label[data-tooltip-alt]').forEach((label) => {
                    if (label.dataset.tooltip && label.dataset.tooltipAlt) {
                        const checkbox = label.firstElementChild;
                        checkbox.addEventListener('click', (event) => {
                            let el;

                            while (!(el || event.target).classList.contains('token-selector')) {
                                el = (el || event.target).parentNode;
                            }

                            el = el.querySelector('.token-selector-item [data-chain][data-slot]');

                            if (!DATA.migration_tokens[el.dataset.chain]) {
                                DATA.migration_tokens[el.dataset.chain] = {};
                            }

                            if (!DATA.migration_tokens[el.dataset.chain][el.dataset.slot]) {
                                DATA.migration_tokens[el.dataset.chain][el.dataset.slot] = {};
                            }

                            if (label.dataset.tooltip === 'Select token') {
                                DATA.migration_tokens[el.dataset.chain][el.dataset.slot][checkbox.dataset.migrateToken] = true;
                            } else {
                                delete DATA.migration_tokens[el.dataset.chain][el.dataset.slot][checkbox.dataset.migrateToken];
                            }

                            [label.dataset.tooltip, label.dataset.tooltipAlt] = [label.dataset.tooltipAlt, label.dataset.tooltip];
                        });
                    }
                });

                assetSelector.querySelector('.input-checkbox-select-deselect').addEventListener('change', (event) => {
                    assetSelector.querySelectorAll('input[type="checkbox"]').forEach((tokenCheckbox) => {
                        if (!tokenCheckbox.classList.contains('input-checkbox-select-deselect')) {
                            let el;

                            while (!(el || event.target).classList.contains('token-selector')) {
                                el = (el || event.target).parentNode;
                            }

                            el = el.querySelector('.token-selector-item [data-chain][data-slot]');

                            if (!DATA.migration_tokens[el.dataset.chain]) {
                                DATA.migration_tokens[el.dataset.chain] = {};
                            }

                            if (!DATA.migration_tokens[el.dataset.chain][el.dataset.slot]) {
                                DATA.migration_tokens[el.dataset.chain][el.dataset.slot] = {};
                            }

                            if ((tokenCheckbox.checked = !!event.currentTarget.checked)) {
                                DATA.migration_tokens[el.dataset.chain][el.dataset.slot][tokenCheckbox.dataset.migrateToken] = true;
                            } else {
                                delete DATA.migration_tokens[el.dataset.chain][el.dataset.slot][tokenCheckbox.dataset.migrateToken];
                            }
                        }
                    });
                });

                sendAssetsButton.parentElement.parentElement.parentElement.prepend(assetSelector);

                /* show slot selector after click on "Confirm" */
                assetSelector.querySelector('button[data-tooltip="Confirm"]').addEventListener('click', (e) => {
                    let _chain = e.target.dataset.chain,
                        _slot = e.target.dataset.slot;

                    assetSelector.remove();

                    let slots = DATA.slots[_chain]
                        .map(
                            (slot, k) =>
                                (slot.address !== _slot &&
                                    `<div class="slot-selector-item">
	<div class="name text-truncated">${slot.title || `Slot ${k + 1}`}</div>

	<label class="checkbox-svg mr-6px" data-tooltip="Select slot" data-tooltip-alt="Deselect slot" data-tooltip-left data-action="set-migration-slot" data-migrate-slot="${slot.address}">
		<input type="radio" name="wallet_slots_selector_radio" class="visually-hidden" autocomplete="off">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="set-migration-slot" data-migrate-slot="${slot.address}">
			<rect fill="#333333" rx="3" ry="3" width="16" height="16" data-action="set-migration-slot" data-migrate-slot="${slot.address}"></rect>
			<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3Z" data-action="set-migration-slot" data-migrate-slot="${slot.address}"></path>
			<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="set-migration-slot" data-migrate-slot="${
                slot.address
            }"></path>
		</svg>
	</label>
</div>`) ||
                                ''
                        )
                        .join('');

                    const slotSelector = htmlToElement(`<div class="slot-selector">
	<div class="slot-selector-item">
		<div class="title text-white text-bold text-truncated">SELECT SLOT</div>

		<div class="actions d-flex">
			<button class="btn btn-has-icon ml-6px" data-tooltip="Confirm" data-tooltip-left data-action="migrate" data-chain="${_chain}" data-slot="${_slot}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="migrate" data-chain="${_chain}" data-slot="${_slot}">
					<circle fill="#333333" cx="8" cy="8" r="8" data-action="migrate" data-chain="${_chain}" data-slot="${_slot}"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="migrate" data-chain="${_chain}" data-slot="${_slot}"></path>
				</svg>
			</button>

			<button class="btn btn-has-icon ml-6px" data-tooltip="Cancel" data-tooltip-left data-chain="${_chain}" data-slot="${_slot}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-chain="${_chain}" data-slot="${_slot}">
					<circle fill="#333333" cx="8" cy="8" r="8" data-chain="${_chain}" data-slot="${_slot}"></circle>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z" data-chain="${_chain}" data-slot="${_slot}"></path>
				</svg>
			</button>
		</div>
	</div>

	${slots}

	<div class="slot-selector-item">
		<div class="name text-truncated">NEW SLOT</div>

		<label class="checkbox-svg mr-6px" data-tooltip="Select slot" data-tooltip-alt="Deselect slot" data-tooltip-left data-action="set-migration-slot" data-migrate-slot="${DATA.ZERO}">
			<input type="radio" name="wallet_slots_selector_radio" class="visually-hidden" autocomplete="off">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="set-migration-slot" data-migrate-slot="${DATA.ZERO}">
				<rect fill="#333333" rx="3" ry="3" width="16" height="16" data-action="set-migration-slot" data-migrate-slot="${DATA.ZERO}"></rect>
				<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3Z" data-action="set-migration-slot" data-migrate-slot="${DATA.ZERO}"></path>
				<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="set-migration-slot" data-migrate-slot="${DATA.ZERO}"></path>
			</svg>
		</label>
	</div>
</div>`);
                    slotSelector.querySelector('button[data-tooltip="Confirm"]').addEventListener('click', (event) => {
                        slotSelector.remove();
                    });

                    slotSelector.querySelector('button[data-tooltip="Cancel"]').addEventListener('click', (event) => {
                        if (DATA.migration_tokens[e.target.dataset.chain]) {
                            delete DATA.migration_tokens[e.target.dataset.chain][e.target.dataset.slot];
                        }

                        slotSelector.remove();
                    });

                    sendAssetsButton.parentElement.parentElement.parentElement.prepend(slotSelector);
                });
            });
        });
    }, 0);
};

/*** Inject HTML - Panel 3 ***/

const set_original_wallet_asset = async (data, i) => {
    let bl = Big(data.bl).mul(data.p || 0),
        slot_deposit = `<div class="currency">
	<div class="text-truncated" data-pay-slot="SLOT_PLACEHOLDER" data-pay-slot-idx="SLOT_IDX_PLACEHOLDER" data-action="prepare_deposit" data-pay-token="${data.k}">${await get_symbol(
            data.k
        )} <span data-balance="${bl}">$${formatFiat(bl.mul(DATA.WPEG_PRICE))}</span></div>
	<label for="LABEL_PLACEHOLDER" class="btn btn-has-icon ml-12px" data-tooltip="Select" data-tooltip-left data-pay-slot="SLOT_PLACEHOLDER" data-pay-slot-idx="SLOT_IDX_PLACEHOLDER" data-action="prepare_deposit" data-pay-token="${
        data.k
    }">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-pay-slot="SLOT_PLACEHOLDER" data-pay-slot-idx="SLOT_IDX_PLACEHOLDER" data-action="prepare_deposit" data-pay-token="${data.k}">
			<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-pay-slot="SLOT_PLACEHOLDER" data-pay-slot-idx="SLOT_IDX_PLACEHOLDER" data-action="prepare_deposit" data-pay-token="${
                data.k
            }"/>
		</svg>
	</label>
</div>`;

    if (data.k === DATA.IMAGINARY_PEG) {
        return ['', '', slot_deposit, '', async (_i) => ''];
    }

    return [
        `<input type="radio" name="boost_currency" id="Boost__Currency__${i}" class="visually-hidden" autocomplete="off" data-pay-token="${data.k}">
<label for="Boost__Currency__${i}" class="item" data-pay-token="${data.k}" data-action="choose-boost-pay-item">
	<div class="name text-truncated" data-pay-token="${data.k}" data-action="choose-boost-pay-item">${await get_symbol(data.k)}</div>
	<div class="amount text-truncated ml-4px" data-pay-token="${data.k}" data-action="choose-boost-pay-item" data-balance="${bl}">$${formatFiat(bl.mul(DATA.WPEG_PRICE))}</div>
</label>`,
        `<label for="Boost__Currency__${i}" class="card" data-pay-token="${data.k}" data-action="choose-boost-pay-card">
	<div class="name text-truncated w-80" data-pay-token="${data.k}" data-action="choose-boost-pay-card">${await get_symbol(data.k)}</div>
	<div class="amount text-truncated w-80" data-pay-token="${data.k}" data-action="choose-boost-pay-card" data-balance="${bl}">$${formatFiat(bl.mul(DATA.WPEG_PRICE))}</div>
</label>`,
        slot_deposit,
        `<input type="radio" name="nftpack_currency" id="NFTPackCurrencySelector__Currency${i}" class="visually-hidden" autocomplete="off" data-pay-token="${data.k}">
<label for="NFTPackCurrencySelector__Currency${i}" class="item" data-pay-token="${data.k}" data-action="choose-nft-pack-pay-item">
	<div class="name text-truncated" data-pay-token="${data.k}" data-action="choose-nft-pack-pay-item">${await get_symbol(data.k)}</div>
	<div class="amount text-truncated ml-4px" data-pay-token="${data.k}" data-balance="${bl}" data-action="choose-nft-pack-pay-item">$${formatFiat(bl.mul(DATA.WPEG_PRICE))}</div>
</label>`,
        async (_i) => `<input type="radio" name="synagogue_currency" id="SynagogueCurrencySelector${_i}__Currency${i + 1}" class="visually-hidden" autocomplete="off" data-pay-token="${data.k}">
<label for="SynagogueCurrencySelector${_i}__Currency${i + 1}" class="item" data-pay-token="${data.k}" data-action="choose-synagogue-pay-item">
	<div class="name text-truncated" data-pay-token="${data.k}" data-action="choose-synagogue-pay-item">${await get_symbol(data.k)}</div>
	<div class="amount text-truncated ml-4px" data-pay-token="${data.k}" data-action="choose-synagogue-pay-item" data-balance="${bl}">$${formatFiat(bl.mul(DATA.WPEG_PRICE))}</div>
</label>`,
    ];
};

const set_original_wallet_assets = async () => {
    let synagogues = document.querySelectorAll('.synagogue-pay-token'),
        iEnd = (DATA.conf.assets || (DATA.conf.assets = [])).length,
        i = 0,
        promises = [],
        section_0 = '',
        section_1 = '',
        section_2 = '',
        section_3 = '',
        section_4 = {};

    for (; i < iEnd; ++i) {
        promises.push(set_original_wallet_asset(DATA.conf.assets[i], i));
    }

    await Promise.all(
        (
            await Promise.all(promises)
        ).map(async (v) => {
            section_0 = `${section_0}${v[0]}`;
            section_1 = `${section_1}${v[1]}`;
            section_2 = `${section_2}${v[2]}`;
            section_3 = `${section_3}${v[3]}`;

            let _promises = [],
                s = 0;

            for (; s < synagogues.length; ++s) {
                if (!section_4[s]) {
                    section_4[s] = [];
                }

                _promises.push(
                    (async (func, _i) => {
                        section_4[_i].push(await func(_i));
                    })(v[4], s)
                );
            }

            await Promise.all(_promises);
        })
    );

    elementify('boost-currencies-container').innerHTML = section_0;
    elementify('boost-value-currencies-container').innerHTML = section_1;
    /* elementify('main-wallet-currencies-container').innerHTML = section_2; */
    document.querySelectorAll('.slot-currencies-container').forEach((el) => {
        el.innerHTML = section_2
            .replaceAll('SLOT_PLACEHOLDER', el.dataset.slot)
            .replaceAll('SLOT_IDX_PLACEHOLDER', el.dataset.slotIdx)
            .replaceAll('LABEL_PLACEHOLDER', (el.dataset.isCopySlot && `Copy__Slot${el.dataset.slotIdx}__Tab2`) || `Wallet__Slot${el.dataset.slotIdx}__Tab2`);
    });
    //elementify('wallet-assets-for-nft-packs').innerHTML = section_3;

    for (i = 0; i < synagogues.length; ++i) {
        if (section_4[i]) {
            synagogues[i].innerHTML = section_4[i].join('');
        }
    }
};
