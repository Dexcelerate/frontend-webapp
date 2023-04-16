/**
 * SwapFeed
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="SwapFeed" class="card card-swap">
			<div class="container">
				<input type="radio" name="swap_feed_tab" id="SwapFeed__Tab1" class="visually-hidden" autocomplete="off" checked>
				<input type="radio" name="swap_feed_tab" id="SwapFeed__Tab2" class="visually-hidden" autocomplete="off">
				<input type="radio" name="swap_feed_tab" id="SwapFeed__Tab3" class="visually-hidden" autocomplete="off">
				<input type="radio" name="swap_feed_tab" id="SwapFeed__Tab4" class="visually-hidden" autocomplete="off">

				<div id="SwapFeed__Header" class="header">
					<label for="SwapFeed__Tab1" class="tab">
						<div class="text-truncated">Trades</div>
					</label>

					<label for="SwapFeed__Tab2" class="tab">
						<div class="text-truncated">Holders</div>
					</label>

					<label for="SwapFeed__Tab3" class="tab">
						<div class="text-truncated">Liquidity</div>
					</label>

					<label for="SwapFeed__Tab4" class="tab">
						<div class="text-truncated">Details</div>
					</label>
				</div>

				<div id="SwapFeed__Body" class="body">
					<div id="SwapFeed__Panel1" class="panel">
						<table>
							<thead>
								<tr>
									<th>Time</th>
									<th>Value</th>
									<th>Traded</th>
									<th>Price</th>
									<th>Type</th>
									<th>Exchange</th>
									<th>Wallet</th>
								</tr>
							</thead>
							<tbody id="swaps-feed"></tbody>
						</table>
					</div>

					<div id="SwapFeed__Panel2" class="panel">
						<table>
							<thead>
								<tr>
									<th>Balance</th>
									<th>Percentage</th>
									<th>Address</th>
								</tr>
							</thead>
							<tbody id="holders-feed"></tbody>
						</table>
					</div>

					<div id="SwapFeed__Panel3" class="panel">
						<table>
							<thead>
								<tr>
									<th>Pair</th>
									<th class="dex-data">DEX</th>
									<th>Totals</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>

					<div id="SwapFeed__Panel4" class="panel">
						<div class="row row-1 d-flex w-100 p-6px text-green">
							<div class="text-white">Overall</div>
							<div id="overall-score-circle" class="circular-progress-bar ml-auto mr-6px" style="background: conic-gradient(#2daa4b 270deg, var(--c4) 0deg);"></div>
							<div id="overall-score">75/100</div>
						</div>

						<div class="row row-2 d-flex">
							<div class="col d-flex w-100 p-6px text-green">
								<button class="btn text-white" data-scrollto="SwapFeed__Financials">Financial</button>
								<div id="financial-score-circle" class="circular-progress-bar ml-auto mr-6px" style="background: conic-gradient(#2daa4b 252deg, var(--c4) 0deg);"></div>
								<div id="financial-score">70/100</div>
							</div>
							<div class="col d-flex w-100 p-6px text-red">
								<button class="btn text-white" data-scrollto="SwapFeed__Holders">Holders</button>
								<div id="holders-score-circle" class="circular-progress-bar ml-auto mr-6px" style="background: conic-gradient(#e90000 36deg, var(--c4) 0deg);"></div>
								<div id="holders-score">10/100</div>
							</div>
						</div>

						<div class="row row-3 d-flex">
							<div class="col d-flex w-100 p-6px text-red">
								<button class="btn text-white" data-scrollto="SwapFeed__Liquidity">Liquidity</button>
								<div id="liquidity-score-circle" class="circular-progress-bar ml-auto mr-6px" style="background: conic-gradient(#e90000 90deg, var(--c4) 0deg);"></div>
								<div id="liquidity-score">25/100</div>
							</div>
							<div class="col d-flex w-100 p-6px text-green">
								<button class="btn text-white" data-scrollto="SwapFeed__Contract">Contract</button>
								<div id="contract-score-circle" class="circular-progress-bar ml-auto mr-6px" style="background: conic-gradient(#2daa4b 302deg, var(--c4) 0deg);"></div>
								<div id="contracts-score">84/100</div>
							</div>
						</div>

						<div class="row row-4 d-none" id="audit-warning">
							<div class="alert-token d-flex align-items-center">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg fs-0">
									<path fill="#9d830f" d="M8.982 1.566A1.13 1.13 0 007.022 1.566L.165 13.233C-.292 14.011.256 15 1.145 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.982 1.566Z"/>
									<path fill="#cbaa14" d="M7.938 2.016A.13.13 0 018.002 2 .13.13 0 018.065 2.016.146.146 0 018.119 2.073L14.976 13.74C15.012 13.8 15.011 13.864 14.978 13.923A.163.163 0 0114.924 13.983.116.116 0 0114.858 14H1.146A.115.115 0 011.08 13.983.163.163 0 011.026 13.923.176.176 0 011.028 13.74L7.884 2.073A.147.147 0 017.938 2.016ZM8.982 1.566A1.13 1.13 0 007.022 1.566L.165 13.233C-.292 14.011.256 15 1.145 15H14.858C15.747 15 16.296 14.01 15.838 13.233L8.982 1.566ZM7.002 12A1 1 0 119.002 12 1 1 0 017.002 12ZM7.1 5.995A.905.905 0 118.9 5.995L8.55 9.502A.552.552 0 017.45 9.502L7.1 5.995Z"/>
								</svg>

								<div class="text">
									<div class="title text-white">Watch out! This token did not pass the safety audit.</div>
									<div class="subtitle">Please exercise extra caution before buying this token.</div>
								</div>
							</div>
						</div>

						<div id="SwapFeed__Financials" class="row row-double row-5">
							<div class="col col-content">
								<div class="header">
									<div class="title">Financials</div>
									<div class="subtitle mb-12px">Find out the token's buy/sell fees and its historical average price.</div>
								</div>

								<div class="buy-tax">
									<div class="d-flex">
										<div class="text-white">Buy Tax:</div>
										<div class="ml-4px" id="buy-fee-amount">0%</div>
									</div>

									<div class="thin-progress-bar green">
										<div id="buy-fee-bar" class="thin-progress-bar-fill" style="width:0%;"></div>
										<div class="thin-progress-bar-marker" style="left:33%;"></div>
										<div class="thin-progress-bar-marker" style="left:67%;"></div>
									</div>
								</div>

								<div class="sell-tax mt-12px">
									<div class="d-flex">
										<div class="text-white">Sell Tax:</div>
										<div class="ml-4px" id="sell-fee-amount">0%</div>
									</div>

									<div class="thin-progress-bar green">
										<div id="sell-fee-bar" class="thin-progress-bar-fill" style="width:0%;"></div>
										<div class="thin-progress-bar-marker" style="left:33%;"></div>
										<div class="thin-progress-bar-marker" style="left:67%;"></div>
									</div>
								</div>

							</div>

							<div class="col col-issues">
								<div class="header">
									<div class="title mb-12px">Issues</div>
								</div>
								<div class="issue issue-default">
									<div class="title text-white">No issues found in the financials audit.</div>
									<div class="subtitle">This token has no issues in the financials audit.</div>
								</div>
							</div>
						</div>

						<div id="SwapFeed__Holders" class="row row-double row-6">
							<div class="col col-content">
								<div class="header">
									<div class="title">Holders</div>
									<div class="subtitle mb-12px">Understand the wealth distribution and discover top 15 holders' addresses.</div>
								</div>

								<div class="d-flex">
									<div class="total-holders w-100">
										<div>Total Holders</div>
										<div class="text-white">0</div>
									</div>

									<div class="owner-wallet w-100">
										<div class="d-flex">
											<div>Owner Wallet</div>
											<a href="https://bscscan.com/" class="ml-4px" target="_blank" rel="nofollow">
												<img src="Base/graphics/raster/various/bscscan.png" class="icon-sm">
											</a>
											<button class="btn btn-has-icon ml-4px" onclick="copyTextToClipboard('dev', event, this)">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
													<path d="M0 2A2 2 0 012 0H10A2 2 0 0112 2V4H14A2 2 0 0116 6V14A2 2 0 0114 16H6A2 2 0 014 14V12H2A2 2 0 010 10V2ZM5 12V14A1 1 0 006 15H14A1 1 0 0015 14V6A1 1 0 0014 5H12V10A2 2 0 0110 12H5Z"/>
												</svg>
											</button>
										</div>
										<div class="text-white">0%</div>
									</div>

									<div class="circulating-supply w-100">
										<div>Circulating Supply</div>
										<div class="text-white"></div>
									</div>
								</div>

								<div class="top-holders">
									<div class="top-5-holders mt-12px">
										<div class="d-flex">
											<div class="text-white">Top 5 holders have:</div>
											<div class="ml-4px"><span id="top-5-holders">0%</span> of circulating supply</div>
										</div>

										<div class="thin-progress-bar green">
											<div id="top-5-holders-bar" class="thin-progress-bar-fill" style="width:0%;"></div>
											<div class="thin-progress-bar-marker" style="left:33%;"></div>
											<div class="thin-progress-bar-marker" style="left:67%;"></div>
										</div>
									</div>

									<div class="top-10-holders mt-12px">
										<div class="d-flex">
											<div class="text-white">Top 10 holders have:</div>
											<div class="ml-4px" id="top-10-holders">0%</div>
										</div>

										<div class="thin-progress-bar green">
											<div id="top-10-holders-bar" class="thin-progress-bar-fill" style="width:0%;"></div>
											<div class="thin-progress-bar-marker" style="left:33%;"></div>
											<div class="thin-progress-bar-marker" style="left:67%;"></div>
										</div>
									</div>
								</div>

								<div class="browse-holders mt-12px d-flex">
									<a href="https://bscscan.com" class="btn btn-has-icon text-white d-flex align-items-center ml-auto mt-12px">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M8.636 3.5A.5.5 0 008.136 3H1.5A1.5 1.5 0 000 4.5V14.5A1.5 1.5 0 001.5 16H11.5A1.5 1.5 0 0013 14.5V7.864A.5.5 0 0012 7.864V14.5A.5.5 0 0111.5 15H1.5A.5.5 0 011 14.5V4.5A.5.5 0 011.5 4H8.136A.5.5 0 008.636 3.5ZM16 .5A.5.5 0 0015.5 0H10.5A.5.5 0 0010.5 1H14.293L6.146 9.146A.5.5 0 106.854 9.854L15 1.707V5.5A.5.5 0 0016 5.5V.5Z"/>
										</svg>
										<div class="ml-4px mr-4px">Browse Holders</div>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M1 8A.5.5 0 011.5 7.5H13.293L10.146 4.354A.5.5 0 0110.854 3.646L14.854 7.646A.5.5 0 0114.854 8.354L10.854 12.354A.5.5 0 0110.146 11.646L13.293 8.5H1.5A.5.5 0 011 8Z"/>
										</svg>
									</a>
								</div>
							</div>

							<div class="col col-issues">
								<div class="header">
									<div class="title mb-12px">Issues</div>
								</div>

								<div class="issue issue-default" data-code="pass">
									<div class="title text-white">No issues found in the holders audit.</div>
									<div class="subtitle">This token has no issues in the holders audit.</div>
								</div>

								<div class="issue issue-alternative red d-none" data-code="dev-holder">
									<div class="title text-white">Owner wallet holds a very large percentage of tokens.</div>
									<div class="subtitle">Token owner could sell these tokens and significantly drop the price.</div>
								</div>

								<div class="issue issue-alternative orange d-none" data-code="top-5-holders">
									<div class="title text-white">Top 5 Holders Hold Much Supply</div>
									<div class="subtitle">If one of the holders sells, the price impact may be significant.</div>
								</div>

								<div class="issue issue-alternative orange d-none" data-code="top-10-holders">
									<div class="title text-white">Top 10 Holders Hold Much Supply</div>
									<div class="subtitle">If one of the holders sells, the price impact may be significant.</div>
								</div>
							</div>
						</div>

						<div id="SwapFeed__Liquidity" class="row row-double row-7 d-none">
							<div class="col col-content">
								<div class="header">
									<div class="title">Liquidity</div>
									<div class="subtitle mb-12px">Understand how much liquidity TKN has in total. Discover the top LP token holders.</div>
								</div>

								<div class="top-lp mt-12px mb-12px">
									<div class="mb-6px">TKN Top Liquidity Pool</div>

									<div class="top-lp-content">
										<div class="top-lp-image">
											<img src="${DATA.ERROR_IMG}" class="icon-md icon-round" onerror="error_img(this)">
											<img src="${DATA.ERROR_IMG}" class="icon-md icon-round" onerror="error_img(this)">
										</div>

										<div class="top-lp-info">
											<div class="pair d-flex">
												<div class="text-green text-truncated">Router</div>
												<div class="text-white ml-4px">|</div>
												<div class="ml-4px text-truncated" data-peg-text="true">${DATA.PEG}</div>
											</div>
											<div class="amounts d-flex">
												<div class="text-white text-truncated">0 <span data-peg-text="true">${DATA.PEG}</span></div>
												<div class="text-green text-truncated ml-4px">($0)</div>
											</div>
										</div>

										<div class="top-lp-link ml-auto d-flex align-items-center" id="main-lq-link">
											<a href="#" class="btn d-flex align-items-center">
												<img src="Base/graphics/raster/various/bscscan.png" class="icon-sm">
												<div class="text-white ml-4px">BscScan</div>
											</a>
										</div>
									</div>
								</div>

								<div class="unlocked-percentage mt-12px mb-12px">
									<div class="d-flex">
										<div class="text-white text-truncated">Unlocked percentage:</div>
										<div class="ml-4px">25%</div>
									</div>

									<div class="thin-progress-bar yellow">
										<div class="thin-progress-bar-fill" style="width:25%;"></div>
										<div class="thin-progress-bar-marker" style="left:50%;"></div>
									</div>
								</div>

								<div class="top-lp-token-holders mt-12px mb-12px">
									<div class="header">
										<div class="text-white text-truncated">Top LP Token Holders (15 Holders)</div>
										<div>A list of all the addresses holding top LP's tokens.</div>
									</div>

									<div class="table mt-12px mb-12px">
										<div class="row header">
											<div class="col">Address</div>
											<div class="col">LP Token Holdings</div>
										</div>

										<span id="lq-holders-list"></span>
									</div>
								</div>

								<div class="pagination d-flex align-items-center justify-content-center">
									<button class="btn btn-style btn-has-icon mr-6px" onclick="setLQHoldersPage(DATA.pages.lq_holders - 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
											<path d="M12 8A.5.5 0 0111.5 8.5H5.707L7.854 10.646A.5.5 0 017.146 11.354L4.146 8.354A.5.5 0 014.146 7.646L7.146 4.646A.5.5 0 117.854 5.354L5.707 7.5H11.5A.5.5 0 0112 8Z"></path>
										</svg>
									</button>

									<button class="btn btn-style active" onclick="setLQHoldersPage(0)">1</button>

									<button class="btn btn-style ml-6px mr-6px" onclick="setLQHoldersPage(1)">2</button>

									<button class="btn btn-style" onclick="setLQHoldersPage(2)">3</button>

									<button class="btn btn-style btn-has-icon ml-6px" onclick="setLQHoldersPage(DATA.pages.lq_holders + 1)">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
											<path d="M4 8A.5.5 0 014.5 7.5H10.293L8.146 5.354A.5.5 0 118.854 4.646L11.854 7.646A.5.5 0 0111.854 8.354L8.854 11.354A.5.5 0 018.146 10.646L10.293 8.5H4.5A.5.5 0 014 8Z"></path>
										</svg>
									</button>
								</div>

								<div class="browse-top-lp-holders mt-12px d-flex">
									<a href="#" class="btn btn-has-icon text-white d-flex align-items-center ml-auto mt-12px" target="_blank" rel="nofollow">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M8.636 3.5A.5.5 0 008.136 3H1.5A1.5 1.5 0 000 4.5V14.5A1.5 1.5 0 001.5 16H11.5A1.5 1.5 0 0013 14.5V7.864A.5.5 0 0012 7.864V14.5A.5.5 0 0111.5 15H1.5A.5.5 0 011 14.5V4.5A.5.5 0 011.5 4H8.136A.5.5 0 008.636 3.5ZM16 .5A.5.5 0 0015.5 0H10.5A.5.5 0 0010.5 1H14.293L6.146 9.146A.5.5 0 106.854 9.854L15 1.707V5.5A.5.5 0 0016 5.5V.5Z"/>
										</svg>
										<div class="ml-4px mr-4px">Browse Top LP Holders</div>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M1 8A.5.5 0 011.5 7.5H13.293L10.146 4.354A.5.5 0 0110.854 3.646L14.854 7.646A.5.5 0 0114.854 8.354L10.854 12.354A.5.5 0 0110.146 11.646L13.293 8.5H1.5A.5.5 0 011 8Z"/>
										</svg>
									</a>
								</div>
							</div>

							<div class="col col-issues">
								<div class="header">
									<div class="title mb-12px">Issues</div>
								</div>
								<div class="issue issue-default">
									<div class="title text-white">No issues found in the financials audit.</div>
									<div class="subtitle">This token has no issues in the financials audit.</div>
								</div>
							</div>
						</div>

						<div id="SwapFeed__Contract" class="row row-double row-8 d-none">
							<div class="col col-content">
								<div class="header">
									<div class="title">Contract</div>
									<div class="subtitle mb-12px">Understand what potential issues lie in the token's contract source code.</div>
								</div>

								<div class="code"></div>
							</div>

							<div class="col col-issues">
								<div class="header">
									<div class="title mb-12px">Issues</div>
								</div>
								<div class="issue issue-alternative orange">
									<div class="title text-white">Ownership not renounced</div>
									<div class="subtitle">Owners can exercise centralized control over the contract.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	elementify('Main').insertAdjacentHTML('beforeend', html);

})();

(() => {

	handle_scroll('SwapFeed__Panel1', 'stop_feed', () => {
		++DATA.pages.token;
		handleAction('token_history');
	});

})();

/*** Expand or contract feed ***/

(() => {

	const rootElement = elementify('Root');

	document.querySelectorAll('#SwapFeed__Header label').forEach(label => {
		label.addEventListener('click', event => {
			const radio = document.getElementById(label.getAttribute('for'));
			if (radio.checked) {
				if (rootElement.classList.contains('has-expanded-feed')) {
					rootElement.classList.remove('has-expanded-feed');
				} else {
					rootElement.classList.add('has-expanded-feed');
				}
			}
		});
	});

})();


/*** Expand or contract liquidity info ***/

(() => {

	document.querySelectorAll('#SwapFeed__Panel3 tbody').forEach(tbody => {
		tbody.addEventListener('click', event => {
			tbody.querySelector('tr:last-child td .info').classList.toggle('d-none');
		});
	});

})();

/*** On click scroll to details section ***/

(() => {

	document.querySelectorAll('#SwapFeed__Panel4 button[data-scrollto]').forEach(btn => {
		btn.addEventListener('click', event => {
			document.getElementById(btn.dataset.scrollto).scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

})();

(async () => {
	let now, new_time;

	while (true) {
		now = Date.now();

		document.querySelectorAll('[data-timer]').forEach(el => {
			new_time = timeDifference(now, Number(el.dataset.timer));

			if (el.innerHTML !== new_time) {
				el.innerHTML = new_time;
			}
		});

		document.querySelectorAll('[data-reverse-timer]').forEach(el => {
			if (Number(el.dataset.reverseTimer)) {
				new_time = timeDifference(Math.max(now, Number(el.dataset.reverseTimer)), now);

				if (el.innerHTML !== new_time) {
					el.innerHTML = new_time;
				}
			}
		});

		await sleep(1);
	}

})();

const setLQHoldersPage = (page) => {
	if (page > -1 && page < Math.ceil(DATA.token_data.lqh.length / DATA.lq_holders_step)) {
		document.querySelectorAll('#SwapFeed__Liquidity .pagination button').forEach(v => { v.classList.remove('active') });
		document.querySelector(`#SwapFeed__Liquidity .pagination button:nth-child(${page + 2})`).classList.add('active');
		elementify('lq-holders-list').querySelectorAll('.row.item').forEach(v => { v.classList.add('d-none') });
		elementify('lq-holders-list')
			.querySelectorAll(`#lq-holder-item-${[0, 1, 2, 3, 4].map(v => v + page * DATA.lq_holders_step).join(',#lq-holder-item-')}`)
			.forEach(v => v.classList.remove('d-none'));

		DATA.pages.lq_holders = page;
	}
};

const add_swap_event_to_feed = (data, is_history) => {
	if (data.R !== DATA.router) {
		return;
	}

	if (is_history) {
		DATA.chart_data.unshift(data);
	} else {
		DATA.chart_data.push(data);
	}

	let swap_time = new Date(Math.min(new Date(data.c), Date.now()));

	if (!data.A) {
		if (data.t0 === DATA.token) {
			data._b = !data._b;
			data.pu = data._pu;
			data.A = data.a0;
		} else {
			data.A = data.a1;
		}

		if (Big(data.A).eq(0)) {
			data.val = data.orig_pu = data.pu = Big(0);
		} else {
			data.orig_pu = data.pu;
			data.val = Big(data.orig_pu);
			data.pu = data.val.div(data.A);
		}
	}

	elementify('swaps-feed').insertAdjacentHTML(is_history && 'beforeend' || 'afterbegin', `<tr class="text-${data._b && 'green' || 'red'}">
	<td><span data-timer="${swap_time.getTime()}" data-tooltip="${swap_time.toLocaleDateString()} ${swap_time.toLocaleTimeString()}" data-tooltip-right>${timeDifference(Date.now(), swap_time.getTime())}<span></td>
	<td>$${formatFiat(data.val)}</td>
	<td>${formatNumber(data.A)}</td>
	<td>$${formatNumber(data.pu)}</td>
	<td>${data._b && 'Bought' || 'Sold'}</td>
	<td>${DATA.ROUTER_NAMES[data.R] || '???'}</td>
	<td><a href="${DATA.EXPLORER}/tx/${data.h}" target="_blank" rel="nofollow">${shortenAddress(data.w)}</a></td>
</tr>`);
};

const add_holder_to_feed = (data, is_bottom) => {
	elementify('holders-feed').insertAdjacentHTML(is_bottom && 'beforeend' || 'afterbegin', `<tr>
	<td data-holder="${data.D}">${formatNumber(Big(data.bl).div(10 ** (DATA.token_data.i && DATA.token_data.i.decimals || DATA.ETHER_BASE)))}</td>
	<td data-holder-percent="${data.D}">${Big(100).mul(DATA.token_data.i && DATA.token_data.i.total_supply && data.bl || 0).div(Number(DATA.token_data.i && DATA.token_data.i.total_supply || 1) && DATA.token_data.i && DATA.token_data.i.total_supply || 1).round(1)}%</td>
	<td><a href="${DATA.EXPLORER}/token/${DATA.token}?a=${data.D}" target="_blank" rel="nofollow">${shortenAddress(data.D)}</a></td>
</tr>`);
};

const add_holders_to_feed = () => {
	elementify('holders-feed').innerHTML = '';

	for (let i = DATA.token_data.h.length - 1; i >= 0; --i) {
		add_holder_to_feed(DATA.token_data.h[i]);
	}
};

const reset_bar_color = (el) => {
	el.classList.remove('green');
	el.classList.remove('yellow');
	el.classList.remove('red');
};

const get_bar_color = (percent) => ['green', 'yellow', 'red'][Math.floor(percent / 33.4)];

const add_liquidity_holder = (holder, i) => {
	let percent = Math.min(100, Big(100).mul(DATA.token_data.lq_total_supply && holder.bl || 0).div(DATA.token_data.lq_total_supply || 1).round(2).toNumber()),
		html = `<div id="lq-holder-item-${i}" class="row item${(DATA.lq_holders_step * DATA.pages.lq_holders > i || i > DATA.lq_holders_step * (DATA.pages.lq_holders + 1)) && ' d-none' || ''}">
	<div class="col d-flex align-items-center">
		<div class="text-white">${shortenAddress(holder.D)}</div>
		<a href="${DATA.EXPLORER}/token/${DATA.token_data.r[DATA.token_pair_idx].address}?a=${holder.D}" class="ml-4px" target="_blank" rel="nofollow">
			<img src="Base/graphics/raster/various/bscscan.png" class="icon-sm">
		</a>
		<button class="btn btn-has-icon ml-4px" onclick="copyTextToClipboard('${holder.D}', event, this)">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
				<path d="M0 2A2 2 0 012 0H10A2 2 0 0112 2V4H14A2 2 0 0116 6V14A2 2 0 0114 16H6A2 2 0 014 14V12H2A2 2 0 010 10V2ZM5 12V14A1 1 0 006 15H14A1 1 0 0015 14V6A1 1 0 0014 5H12V10A2 2 0 0110 12H5Z"></path>
			</svg>
		</button>
	</div>
	<div class="col">
		<div class="text-white text-truncated">${formatFiat(Big(holder.bl).div(DATA.ETHER))} (${percent}% of total supply)</div>
		<div class="thin-progress-bar ${get_bar_color(percent)}">
			<div class="thin-progress-bar-fill" style="width:${percent}%;"></div>
		</div>
	</div>
</div>`;

	elementify('lq-holders-list').insertAdjacentHTML('afterbegin', html);
};

const fill_ca_details = () => {
	if (!DATA.token_data.i) {
		return;
	}

	elementify('buy-fee-amount').innerHTML = `${DATA.token_data.i.buy_fee}%`;
	elementify('buy-fee-bar').style.width = `${DATA.token_data.i.buy_fee}%`;
	reset_bar_color(elementify('buy-fee-bar').parentNode);
	elementify('buy-fee-bar').parentNode.classList.add(get_bar_color(DATA.token_data.i.buy_fee));
	elementify('sell-fee-amount').innerHTML = `${DATA.token_data.i.sell_fee}%`;
	elementify('sell-fee-bar').style.width = `${DATA.token_data.i.sell_fee}%`;
	reset_bar_color(elementify('sell-fee-bar').parentNode);
	elementify('sell-fee-bar').parentNode.classList.add(get_bar_color(DATA.token_data.i.sell_fee));

	elementify('SwapFeed__Holders').querySelector('.total-holders .text-white').innerHTML = `${DATA.token_data.H}`;
	elementify('SwapFeed__Holders').querySelector('.owner-wallet a').href = `${DATA.EXPLORER}/address/${DATA.token_data.i.dev}`;
	elementify('SwapFeed__Holders').querySelector('.owner-wallet button').setAttribute('onclick', `copyTextToClipboard('${DATA.token_data.i.dev}', event, this)`);

	document.querySelector('.browse-holders a').href = `${DATA.EXPLORER}/token/${DATA.token}#holders`;
	elementify('SwapFeed__Holders').querySelectorAll('.issue').forEach(v => v.classList.add('d-none'));

	if (DATA.token_data.lqh.length) {
		document.querySelector('.top-lp-token-holders').classList.remove('d-none');
		document.querySelector('.top-lp-token-holders .text-white').innerHTML = `Top LP Token Holders (${DATA.token_data.lqh.length} Holders)`;
	} else {
		document.querySelector('.top-lp-token-holders').classList.add('d-none');
	}

	if (DATA.token_data.r.length) {
		elementify('SwapFeed__Liquidity').classList.remove('d-none');
		elementify('SwapFeed__Liquidity').querySelector('.top-lp-info .amounts .text-white').innerHTML = `${formatFiat(Big(DATA.token_data.r[DATA.token_pair_idx].total_supply_usd).mul(2).div(DATA.WPEG_PRICE.gt(0) && DATA.WPEG_PRICE || 1))} ${DATA.PEG}`;
		elementify('SwapFeed__Liquidity').querySelector('.top-lp-info .amounts .text-green').innerHTML = `($${formatFiat(Big(DATA.token_data.r[DATA.token_pair_idx].total_supply_usd).mul(2))})`;
		elementify('SwapFeed__Liquidity').querySelector('.top-lp-info .pair .text-green').innerHTML = DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router];
		document.querySelector('#main-lq-link a').href = `${DATA.EXPLORER}/token/${DATA.pair}`;
		document.querySelector('.browse-top-lp-holders a').href = `${DATA.EXPLORER}/token/${DATA.pair}#holders`;
		GetTokenImage(DATA.CHAIN_ASSETS, undefined, document.querySelector('.top-lp-image img:first-child').id);
		document.querySelector('.top-lp-image img:last-child').src = get_dex_image(DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router]);

		let lqs = DATA.token_data.r.map(v => v.address),
			top_percent = Math.min(100, DATA.token_data.h.filter(v => !lqs.includes(v)).slice(0, 5).reduce((a, b) => a.add(b.bl), Big(0)).mul(100).div(Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply || DATA.ETHER.mul(DATA.ETHER)).round(2).toNumber());
		elementify('top-5-holders').innerHTML = `${top_percent}%`;
		elementify('top-5-holders-bar').style.width = `${top_percent}%`;
		reset_bar_color(elementify('top-5-holders-bar').parentNode);
		elementify('top-5-holders-bar').parentNode.classList.add(get_bar_color(top_percent));

		top_percent = Math.min(100, DATA.token_data.h.filter(v => !lqs.includes(v)).slice(0, 10).reduce((a, b) => a.add(b.bl), Big(0)).mul(100).div(Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply || DATA.ETHER.mul(DATA.ETHER)).round(2).toNumber());
		elementify('top-10-holders').innerHTML = `${top_percent}%`;
		elementify('top-10-holders-bar').style.width = `${top_percent}%`;
		reset_bar_color(elementify('top-10-holders-bar').parentNode);
		elementify('top-10-holders-bar').parentNode.classList.add(get_bar_color(top_percent));

		document.querySelectorAll('#SwapFeed__Liquidity .pagination button').forEach(v => {
			v.classList.add('d-none');
			v.classList.remove('active');
		});

		document.querySelector(`#SwapFeed__Liquidity .pagination button:nth-child(2)`).classList.add('active');
		for (let i = 0; i < Math.ceil(DATA.token_data.lqh.length / DATA.lq_holders_step); ++i) {
			document.querySelector(`#SwapFeed__Liquidity .pagination button:nth-child(${i + 2})`).classList.remove('d-none');
		}
		if (DATA.token_data.lqh.length > DATA.lq_holders_step) {
			document.querySelector(`#SwapFeed__Liquidity .pagination button:nth-child(1)`).classList.remove('d-none');
			document.querySelector(`#SwapFeed__Liquidity .pagination button:nth-child(5)`).classList.remove('d-none');
		}

		(async () => {
			elementify('SwapFeed__Liquidity').querySelector('.top-lp-info .pair div:last-child').innerHTML =
				DATA.token_data.r[DATA.token_pair_idx].token0 === DATA.WPEG && DATA.PEG || (await get_symbol(DATA.token_data.r[DATA.token_pair_idx].token0)).replace(/[^0-9a-zA-Z]/g, '');
		})();

		(async () => {
			elementify('lq-holders-list').innerHTML = '';
			DATA.token_data.lq_total_supply = await contract(DATA.token_data.r[DATA.token_pair_idx].address)['totalSupply()']().catch(_ => 0);
			DATA.pages.lq_holders = 0;

			while (typeof DATA.token_data.lq_total_supply === 'undefined') {
				await sleep(0.01);
			}

			for (let i = DATA.token_data.lqh.length - 1; i >= 0; --i) {
				add_liquidity_holder(DATA.token_data.lqh[i], i);
			}
		})();
	} else {
		elementify('SwapFeed__Liquidity').classList.add('d-none');
	}

	handle_contract(DATA.token_code);

	(async () => {
		DATA.token_data.i.total_supply = await contract(DATA.token)['totalSupply()']();
		let owner_percent = Math.min(100, 100 * (await contract(DATA.token).balanceOf(DATA.token_data.i.dev)) / DATA.token_data.i.total_supply);
		elementify('SwapFeed__Holders').querySelector('.owner-wallet .text-white').innerHTML = `${formatFiat(owner_percent)}%`;
		elementify('SwapFeed__Holders').querySelector('.circulating-supply .text-white').innerHTML = `${formatFiat(Big(DATA.token_data.i.total_supply).div(get_decimals_power(DATA.token_data.i && DATA.token_data.i.decimals || DATA.ETHER_BASE)))} ${DATA.token_data.i.symbol && DATA.token_data.i.symbol !== 'TOKEN' && DATA.token_data.i.symbol || await get_symbol(DATA.token)}`;

		let lqs = DATA.token_data.r.map(v => v.address),
			top_5_percent = Math.min(100, DATA.token_data.h.filter(v => !lqs.includes(v)).slice(0, 5).reduce((a, b) => a.add(b.bl), Big(0)).mul(100).div(Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply || DATA.ETHER.mul(DATA.ETHER)).round(2).toNumber()),
			top_10_percent = Math.min(100, DATA.token_data.h.filter(v => !lqs.includes(v)).slice(0, 10).reduce((a, b) => a.add(b.bl), Big(0)).mul(100).div(Number(DATA.token_data.i.total_supply) && DATA.token_data.i.total_supply || DATA.ETHER.mul(DATA.ETHER)).round(2).toNumber());

		elementify('top-5-holders').innerHTML = `${top_5_percent}%`;
		elementify('top-5-holders-bar').style.width = `${top_5_percent}%`;
		reset_bar_color(elementify('top-5-holders-bar').parentNode);
		elementify('top-5-holders-bar').parentNode.classList.add(get_bar_color(top_5_percent));

		elementify('top-10-holders').innerHTML = `${top_10_percent}%`;
		elementify('top-10-holders-bar').style.width = `${top_10_percent}%`;
		reset_bar_color(elementify('top-10-holders-bar').parentNode);
		elementify('top-10-holders-bar').parentNode.classList.add(get_bar_color(top_10_percent));

		let err = false;

		if (owner_percent > 5) {
			elementify('SwapFeed__Holders').querySelector('.issue[data-code="dev-holder"]').classList.remove('d-none');
			err = true;
		}

		if (top_5_percent > 67) {
			elementify('SwapFeed__Holders').querySelector('.issue[data-code="top-5-holders"]').classList.remove('d-none');
			err = true;
		}

		if (top_10_percent > 67) {
			elementify('SwapFeed__Holders').querySelector('.issue[data-code="top-10-holders"]').classList.remove('d-none');
			err = true;
		}

		if (!err) {
			elementify('SwapFeed__Holders').querySelector('.issue[data-code="pass"]').classList.remove('d-none');
		}
	})();
};
