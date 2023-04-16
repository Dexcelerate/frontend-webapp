/**
 * Chart
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="Chart" class="card card-swap" data-token-address-verifiy="${DATA.token}">
			<div class="container">
				<div class="header">
					<div id="Chart__Currency" class="dropdown-has-title" data-dropdown>
						<input type="checkbox" id="Chart__Currency__Checkbox" class="visually-hidden">
						<label for="Chart__Currency__Checkbox" class="d-flex align-items-center justify-content-center">
							<img id="${GetTokenImage(DATA.token)}" src="${DATA.ERROR_IMG}" class="main-token-icon icon-md icon-round mr-12px">
							<img id="${GetTokenImage(DATA.token_data.r && DATA.token_data.r.length && (DATA.token === DATA.token_data.r[DATA.token_pair_idx].token0 && DATA.token_data.r[DATA.token_pair_idx].token1 || DATA.token_data.r[DATA.token_pair_idx].token0) || '')}" onerror="error_img(this, '${DATA.token_data.r && DATA.token_data.r.length && (DATA.token === DATA.token_data.r[DATA.token_pair_idx].token0 && DATA.token_data.r[DATA.token_pair_idx].token1 || DATA.token_data.r[DATA.token_pair_idx].token0) || ''}')" class="secondary-token-icon icon-md icon-round mr-12px">
							<img src="${DATA.token_data.r && DATA.token_data.r.length && get_dex_image(DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router]) || DATA.ERROR_IMG}" class="dex-icon icon-md icon-round" onerror="error_img(this)">
							<div class="name text-truncated text-white mr-6px"></div>
							<div class="price text-truncated"></div>
						</label>
						<ul class="list-unstyled">
							<div class="title pl-12px">SELECT A LIQUIDITY POOL</div>
							<div id="LiquidityPools" class="wrapper"></div>
						</ul>
					</div>

					<div id="Chart__Filters__Intervals" class="ml-auto" data-dropdown>
						<input type="checkbox" id="Chart__Filters__Intervals__Checkbox" class="visually-hidden">
						<label for="Chart__Filters__Intervals__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown="">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
								<path d="M8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8ZM8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5Z"></path>
							</svg>
							<div>1M</div>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
								<path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"></path>
							</svg>
						</label>
						<ul class="list-unstyled">
							<li>
								<button class="btn btn-style active">1M</button>
							</li>
							<li>
								<button class="btn btn-style">5M</button>
							</li>
							<li>
								<button class="btn btn-style">15M</button>
							</li>
							<li>
								<button class="btn btn-style">30M</button>
							</li>
							<li>
								<button class="btn btn-style">1H</button>
							</li>
						</ul>
					</div>
				</div>
				<div id="Chart__Container"></div>
			</div>
		</div>
	`;

	elementify('Main').insertAdjacentHTML('beforeend', html);

	document.querySelector('label[for="Chart__Currency__Checkbox"]').addEventListener('click', () => {
		if (DATA.is_lq_fetching) {
			return;
		}

		if (DATA.is_lq_open) {
			DATA.is_lq_open = false;
			return;
		}

		DATA.is_lq_fetching = true;
		DATA.is_lq_open = true;

		handleAction('lq');

		setTimeout(() => { DATA.is_lq_fetching = false }, 250);
	})

})();

/*** Chart  ***/

(() => {

	if (!DATA.chartContainer) {
		DATA.chartContainer = elementify('Chart__Container');

		/* let computed = window.getComputedStyle(DATA.chartContainer); */

		DATA.chart = LightweightCharts.createChart(DATA.chartContainer, {
			/* width: parseInt(computed.width.slice(0, -2)), */
			/* height: parseInt(computed.height.slice(0, -2)), */

			layout: {
				background: { type: LightweightCharts.ColorType.Solid, color: '#191919' },
				/* fontFamily: document.location.hostname !== 'localhost' && 'inherit' || undefined, */
				textColor: '#999',
				fontSize: 14
			},
			grid: {
				vertLines: {
					color: '#262626',
					style: LightweightCharts.LineStyle.Solid,
				},
				horzLines: {
					color: '#262626',
					style: LightweightCharts.LineStyle.Solid,
				},
			},
			crosshair: {
				mode: LightweightCharts.CrosshairMode.Normal,
				vertLine: {
					style: LightweightCharts.LineStyle.Solid,
					labelBackgroundColor: '#404040',
					color: '#666',
				},
				horzLine: {
					style: LightweightCharts.LineStyle.Solid,
					labelBackgroundColor: '#404040',
					color: '#666',
				}
			},
			priceScale: {
				borderColor: '#404040'
			},
			timeScale: {
				tickMarkFormatter: (timestamp) => new Date(timestamp * 1000).toLocaleTimeString(),
				borderColor: '#404040',
				secondsVisible: true,
				timeVisible: true,
				rightOffset: 6,
				barSpacing: 8,
			},
			localization: {
				timeFormatter: (timestamp) => new Date(timestamp * 1000).toLocaleTimeString(),
			},
		});

		DATA.candlestickSeries = DATA.chart.addCandlestickSeries({
			upColor: '#2daa4b',
			wickUpColor: '#2daa4b',
			borderUpColor: '#2daa4b',
			downColor: '#e90000',
			wickDownColor: '#e90000',
			borderDownColor: '#e90000',
		});

		DATA.candlestickSeries.setData(CHART_DATA);

		DATA.chart.priceScale('right').applyOptions({
			scaleMargins: {
				top: 0.1,
				bottom: 0.1,
			}
		});

		DATA.chart_scroll_timer = null;
		DATA.chart_time_scale = DATA.chart.timeScale();

		new ResizeObserver(entries => {
			DATA.chart.applyOptions({
				width: entries[0].contentRect.width,
				height: entries[0].contentRect.height,
			});
		}).observe(DATA.chartContainer);
	}

	/*** Interval selector ***/

	const selector = elementify('Chart__Filters__Intervals');

	selector.querySelectorAll('ul .btn').forEach(button => {
		button.addEventListener('click', event => {
			selector.querySelector('label > div').innerHTML = button.innerHTML;
			selector.querySelector('.btn.active').classList.remove('active');
			button.classList.add('active');
			selector.querySelector('input[type="checkbox"]').checked = false;

			DATA.scroll_events.stop_chart = false;
			DATA.chart_time_frame = DATA.chart_time_frames_map.indexOf(button.innerHTML);
			DATA.chart_from = 0;
			DATA.chart_to = 0;

			handleAction('chart_history');
		});
	});

})();

const add_liquidity_pair = (pair, total_worth) => {
	if (!DATA.ROUTER_NAMES[pair.router]) {
		return;
	}

	let html = `<li>
	<button class="btn btn-style${pair.address === DATA.pair && ' active' || ''} lq-pair" data-pair="${pair.address}" data-pair-router="${pair.router}">
		<div class="col col-1">
			<img id="${GetTokenImage(DATA.CHAIN_ASSETS)}" class="icon-md" src="${DATA.ERROR_IMG}">
			<img src="${get_dex_image(DATA.ROUTER_NAMES[pair.router])}" class="icon-md icon-round" onerror="error_img(this)">
		</div>

		<div class="col col-2 ml-6px">
			<div class="pair d-flex">
				<div class="text-${pair[pair.is_reversed && 'token1' || 'token0'] === DATA.token && 'white' || 'default'}">${pair.is_reversed && pair.s1 || pair.s0}</div>
				<div class="text-default ml-2px mr-2px">/</div>
				<div class="text-${pair[pair.is_reversed && 'token0' || 'token1'] === DATA.token && 'white' || 'default'}">${pair.is_reversed && pair.s0 || pair.s1}</div>
			</div>
			<div class="liquidity d-flex">
				<div class="text-default">Liquidity:</div>
				<div class="text-white ml-2px">$${shortenLargeNumber(Number(Number(pair.total_supply_usd || 0).toFixed(1)), 1)}</div>
			</div>
		</div>

		<div class="col col-3 ml-6px">
			<div class="provider text-default">${DATA.ROUTER_NAMES[pair.router]} (${(100 * (pair.total_supply_usd || 0) / total_worth).toFixed(1).replace('.0', '')}%)</div>

			<div class="volume d-flex">
				<div class="text-default">Volume:</div>
				<div class="text-white ml-2px">$${shortenLargeNumber(Number(Number(pair.total_supply_usd || 0).toFixed(1)), 1)}</div>
			</div>
		</div>
	</button>
</li>`;

	document.querySelector('#Chart__Currency .wrapper').insertAdjacentHTML('afterbegin', html);

	html = `<tbody data-pair-address="${pair.address}" data-pair-router="${pair.router}">
	<tr>
		<td>
			<div class="d-flex align-items-center">
				<div>${shortenAddress(pair.address)}</div>
				<a href="${DATA.EXPLORER}/address/${pair.address}" class="ml-4px" target="_blank" rel="nofollow" onclick="event.stopPropagation()">
					<img id="${GetTokenImage(DATA.WPEG)}" src="${DATA.ERROR_IMG}" class="icon-sm">
				</a>
				<button class="btn btn-has-icon ml-4px" onclick="copyTextToClipboard('${pair.address}', event, this)">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
						<path d="M0 2A2 2 0 012 0H10A2 2 0 0112 2V4H14A2 2 0 0116 6V14A2 2 0 0114 16H6A2 2 0 014 14V12H2A2 2 0 010 10V2ZM5 12V14A1 1 0 006 15H14A1 1 0 0015 14V6A1 1 0 0014 5H12V10A2 2 0 0110 12H5Z"/>
					</svg>
				</button>
			</div>
		</td>
		<td class="dex-data">
			<div class="d-flex align-items-center justify-content-center">
				<img src="${get_dex_image(DATA.ROUTER_NAMES[pair.router])}" class="icon-sm icon-round" onerror="error_img(this)">
				<div class="name ml-4px">${DATA.ROUTER_NAMES[pair.router]}</div>
			</div>
		</td>
		<td>
			<div>$${formatFiat(Big(pair.total_supply_usd).mul(2))}</div>
			<div class="text-green">${formatFiat(Big(pair.total_supply_usd).mul(2).div(DATA.WPEG_PRICE.gt(0) && DATA.WPEG_PRICE || 1))} ${DATA.PEG}</div>
		</td>
	</tr>
	<tr>
		<td colspan="3">
			<div class="text-white">Unlocked 25% for 123 years</div>
			<div class="thin-progress-bar green">
				<div class="thin-progress-bar-fill" style="width:25%;"></div>
			</div>
			<div class="info mt-4px d-none">
				<ul>
					<li>Pooled ${pair.s0 || ('W' + DATA.PEG)}: ${formatFiat(pair.is_reversed ? pair.r1 / get_decimals_power(pair.d1) : pair.r0 / get_decimals_power(pair.d0))}</li>
					<li>Pooled ${pair.s1}: ${formatFiat(pair.is_reversed ? pair.r0 / get_decimals_power(pair.d0) : pair.r1 / get_decimals_power(pair.d1))}</li>
					<li>Total LP Tokens: ${formatFiat(pair.total_supply / DATA.ETHER)}</li>
				</ul>
			</div>
		</td>
	</tr>
</tbody>`;

	document.querySelector('#SwapFeed__Panel3 table').insertAdjacentHTML('afterbegin', html);
};

(() => {

	handle_scroll('LiquidityPools', 'stop_liquidity', () => {
		++DATA.pages.liquidity;
		handleAction('lq');
	});

})();

const add_liquidity_pairs = () => {
	document.querySelector('#Chart__Currency .price').innerHTML = '';
	document.querySelector('#Chart__Currency .wrapper').innerHTML = '';
	document.querySelector('#SwapFeed__Panel3 table').innerHTML = '';

	let total_worth = 0, i;

	for (i = DATA.token_data.r.length - 1; i >= 0; --i) {
		total_worth += Number(DATA.token_data.r[i].total_supply_usd);
	}

	for (i = DATA.token_data.r.length - 1; i >= 0; --i) {
		add_liquidity_pair(DATA.token_data.r[i], total_worth);
	}

	document.querySelector('#SwapFeed__Panel3 table').insertAdjacentHTML('afterbegin', '<thead><tr><th>Pair</th><th class="dex-data">DEX</th><th>Totals</th></tr></thead>');

	/* Close & select action */
	document.querySelectorAll(`[data-pair]`).forEach(pair => {
		pair.addEventListener('click', (e) => {
			elementify('Chart__Currency__Checkbox').checked = false;
			DATA.old_pair = DATA.pair;
			DATA.pair = pair.dataset.pair;
			DATA.router = DATA.token_data.router = pair.dataset.pairRouter;
			handleAction('pair');
		}, false);
	});

	document.querySelectorAll('#SwapFeed__Panel3 tbody').forEach(tbody => {
		tbody.addEventListener('click', event => {
			let info = tbody.querySelector('tr:last-child td .info');
			info.classList.toggle('d-none');

			if (!info.classList.contains('d-none')) {
				(async (pair_address) => {
					let infos = info.querySelectorAll('li'),
						pair = DATA.token_data.r.filter(v => v.address === pair_address)[0];

					await Promise.all([
						(async () => {
							infos[0].innerHTML = `Pooled ${pair.s0 || ('W' + DATA.PEG)}: ${formatFiat((await contract(pair.token0, undefined, undefined, true).balanceOf(pair_address)) / get_decimals_power(pair.d0))}`;
						})(),
						(async () => {
							infos[1].innerHTML = `Pooled ${pair.s1}: ${formatFiat((await contract(pair.token1, undefined, undefined, true).balanceOf(pair_address)) / get_decimals_power(pair.d1))}`;
						})(),
						(async () => {
							infos[2].innerHTML = `Total LP Tokens: ${formatFiat((await contract(pair_address, undefined, undefined, true)['totalSupply()']()) / DATA.ETHER)}`;
						})(),
					]);
				})(tbody.dataset.pairAddress);
			}
		});
	});
};

const update_liquidity_pairs = () => {
	let pairs_map = {};

	for (let i = DATA.token_data.r.length - 1; i >= 0; --i) {
		pairs_map[DATA.token_data.r[i].address] = DATA.token_data.r[i].total_supply_usd;
	}

	document.querySelectorAll('#Chart__Currency .wrapper [data-pair]').forEach(el => {
		el.querySelector('.liquidity .text-white').innerHTML = `$${shortenLargeNumber(Number(Number(pairs_map[el.dataset.pair]).toFixed(1)), 1)}`;
	});
};
