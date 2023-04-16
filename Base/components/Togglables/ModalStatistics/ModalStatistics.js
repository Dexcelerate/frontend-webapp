/**
 * ModalStatistics
 */

/*** Inject HTML ***/

const set_user_chain_stats = async () => {
	let promises = [],
		i = 0;

	for (; i < DATA.view_rank_history.length; ++i) {
		promises.push((async (trade) => {
			return `<tbody>
	<tr class="text-${~trade.direction && 'red' || 'green'}">
		<td>${await get_symbol(trade.token)}</td>
		<td>${~trade.direction && 'SELL' || 'BUY'}</td>
		<td>$${formatFiat(Big(trade.usd_amount || 0))}</td>
		<td><a href="${DATA.CHAINS[DATA.CHAIN_IDS_MAP[DATA.view_chain !== 'ALL' && DATA.view_chain || DATA.CHAIN]].EXPLORER}/tx/${trade.hash}" target="_blank" ref="nofollow" class="btn">Details</a></td>
	</tr>
</tbody>`;
		})(DATA.view_rank_history[i]));
	}

	document.querySelectorAll('#user-chain-stats tbody').forEach(el => el.parentNode.removeChild(el));
	elementify('user-chain-stats').insertAdjacentHTML('beforeend', (await Promise.all(promises)).flat().join('') || '<tr><td colspan="4"><div class="item"> No stats in this slot</div></td></tr>');
};

const set_user_chains_stats = () => {
	let stats = '',
		chain_id;

	for (chain_id of DATA.CHAINS_ORDER) {
		stats += `<tbody>
	<tr>
		<td class="text-white">${uppercase_first(DATA.CHAINS[chain_id].CHAIN_ASSETS)}</td>
		<td>${DATA.view_rank && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN] && (Number(DATA.view_rank[DATA.CHAINS[chain_id].CHAIN].wins) + Number(DATA.view_rank[DATA.CHAINS[chain_id].CHAIN].losses)) || 0}</td>
		<td><span class="text-green">${DATA.view_rank && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN] && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN].wins || 0}</span> / <span class="text-red">${DATA.view_rank && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN] && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN].losses || 0}</span></td>
		<td><span class="text-green">$${formatFiat(DATA.view_rank && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN] && DATA.view_rank[DATA.CHAINS[chain_id].CHAIN].revenue || 0)}</td>
	</tr>
</tbody>`;
	}

	document.querySelectorAll('#user-chains-stats tbody').forEach(el => el.parentNode.removeChild(el));
	elementify('user-chains-stats').insertAdjacentHTML('beforeend', stats);

	if (DATA.view_chain === 'ALL') {
		elementify('user-chain-wager-amount').innerText = `$${formatFiat(DATA.view_user.total_wager || 0)}`;
		elementify('user-chain-wager-trades').innerText = formatNumber(DATA.view_user.total_trades || 0);
		elementify('user-chain-wager-level').innerText = get_level(DATA.view_user.total_wager || 0);
	} else {
		elementify('user-chain-wager-amount').innerText = `$${formatFiat(DATA.view_rank && DATA.view_rank[DATA.view_chain] && DATA.view_rank[DATA.view_chain].wager || 0)}`;
		elementify('user-chain-wager-trades').innerText = formatNumber(DATA.view_rank && DATA.view_rank[DATA.view_chain] && (Number(DATA.view_rank[DATA.view_chain].wins) + Number(DATA.view_rank[DATA.view_chain].losses)) || 0);
		elementify('user-chain-wager-level').innerText = get_level(DATA.view_rank && DATA.view_rank[DATA.view_chain] && DATA.view_rank[DATA.view_chain].wager || 0);
	}

	elementify('user-plan-status').innerText = (DATA.conf.plans || []).filter(v => v[0] === (DATA.view_chain === 'ALL' && DATA.CHAIN || DATA.view_chain) && v[1] === 1).length && 'Ultimate Trader' || (DATA.conf.connected && 'Trader' || 'Guest');
};

(() => {

	let chains = '',
		chain_id;

	for (chain_id of DATA.CHAINS_ORDER) {
		chains += `<li>
	<button class="btn btn-style" data-view-chain="${DATA.CHAINS[chain_id].CHAIN}" data-action="user">
		<img id="${GetTokenImage(DATA.CHAINS[chain_id].CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-md mr-6px" data-view-chain="${DATA.CHAINS[chain_id].CHAIN}" data-action="user">
		<div data-view-chain="${DATA.CHAINS[chain_id].CHAIN}" data-action="user">${uppercase_first(DATA.CHAINS[chain_id].CHAIN_ASSETS)}</div>
	</button>
</li>`;
	}

	const html = `
		<div id="ModalStatistics" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalStatistics"></div>

			<div class="container">
				<div id="ModalStatistics__Header" class="header">
					<div class="text-white text-bold text-truncated">USER STATISTICS</div>

					<button type="button" class="btn btn-has-icon ml-auto mr-12px" data-togglable="ModalProfile" data-tooltip="User Profile" data-tooltip-left>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>
					</button>

					<button type="button" class="btn btn-has-icon lightbox" data-togglable="ModalStatistics">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalStatistics__Body" class="body">
					<div class="row-1">
						<div id="ModalStatistics__Selector" data-dropdown>
							<input type="checkbox" id="ModalStatistics__Selector__Checkbox" class="visually-hidden">

							<label for="ModalStatistics__Selector__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown>
								<div class="d-flex text-white">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
										<path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"/>
									</svg>
									<div>All Networks</div>
								</div>

								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
									<path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"/>
								</svg>
							</label>

							<ul class="list-unstyled">
								<div class="wrapper">
									<li>
										<button class="btn btn-style active">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
												<path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"/>
											</svg>
											<div>All Networks</div>
										</button>
									</li>

									${chains}
								</div>
							</ul>
						</div>
					</div>

					<div class="row-2">
						<div class="user">
							<img src="${DATA.ERROR_USER_IMG}" class="user-image" alt="JBU" onerror="error_user_img(this)" data-user-image="true">

							<div class="meta text-truncated">
								<div class="item d-flex">
									<div class="text-truncated">#<span data-user-rank="true">${formatNumber(Number(DATA.view_user._rank) || 0)}</span></div>
									<div class="text-white text-bold">RANK</div>
								</div>

								<div class="item d-flex">
									<div class="text-truncated" id="user-plan-status">${(DATA.conf.plans || []).filter(v => v[0] === (DATA.view_chain === 'ALL' && DATA.CHAIN || DATA.view_chain) && v[1] === 1).length && 'Ultimate Trader' || (DATA.conf.connected && 'Trader' || 'Guest')}</div>
									<div class="text-white text-bold">PLAN</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row-3">
						<div class="chart">
							<canvas id="ModalStatistics__Chart"></canvas>

							<div class="meta">
								<div class="title text-truncated">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
										<path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"/>
									</svg>

									<div>All Networks</div>
								</div>

								<div class="wagered d-flex">
									<div class="text-white">Wagered: </div>
									<div class="text-truncated ml-4px" id="user-chain-wager-amount">$${formatFiat(DATA.view_user.total_wager || 0)}</div>
								</div>

								<div class="trades d-flex">
									<div class="text-white">Trades: </div>
									<div class="text-truncated ml-4px" id="user-chain-wager-trades">${formatNumber(DATA.view_user.total_trades || 0)}</div>
								</div>

								<div class="rank d-flex">
									<div class="text-white">Level: </div>
									<div class="text-truncated ml-4px" id="user-chain-wager-level">${get_level(DATA.view_user.total_wager || 0)}</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row-4">
						<table id="user-chains-stats">
							<thead>
								<tr>
									<th>Network</th>
									<th>Trades</th>
									<th>Wins / Losses</th>
									<th>Revenue</th>
								</tr>
							</thead>
						</table>

						<table id="user-chain-stats" class="d-none">
							<thead>
								<tr>
									<th>Token</th>
									<th>Action</th>
									<th>Amount</th>
									<th>Details</th>
								</tr>
							</thead>
						</table>
					</div>

					<!-- <div class="row-5 d-none">
						<div class="pagination d-flex align-items-center justify-content-center">
							<button class="btn btn-style btn-has-icon mr-6px">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M12 8A.5.5 0 0111.5 8.5H5.707L7.854 10.646A.5.5 0 017.146 11.354L4.146 8.354A.5.5 0 014.146 7.646L7.146 4.646A.5.5 0 117.854 5.354L5.707 7.5H11.5A.5.5 0 0112 8Z"/>
								</svg>
							</button>

							<button class="btn btn-style active">1</button>

							<button class="btn btn-style ml-6px mr-6px">2</button>

							<button class="btn btn-style">3</button>

							<button class="btn btn-style btn-has-icon ml-6px">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M4 8A.5.5 0 014.5 7.5H10.293L8.146 5.354A.5.5 0 118.854 4.646L11.854 7.646A.5.5 0 0111.854 8.354L8.854 11.354A.5.5 0 018.146 10.646L10.293 8.5H4.5A.5.5 0 014 8Z"/>
								</svg>
							</button>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

(() => {

	set_user_chains_stats();
	set_user_chain_stats();

	document.querySelectorAll('.user-image').forEach(async (el) => {
		if (DATA.conf.JBU) {
			el.src = await get_nft_image(DATA.conf.JBU);
		} else {
			el.src = DATA.ERROR_USER_IMG;
		}
	});

})();

(() => {

	handle_scroll('ModalStatistics__Body', 'stop_stats', () => {
		++DATA.pages.stats;
		handleAction('stats_history');
	});

})();

/*** Body - Chain selector ***/

(() => {

	const selector = elementify('ModalStatistics__Selector');

	selector.querySelectorAll('ul .btn').forEach(button => {
		button.addEventListener('click', event => {
			selector.querySelector('label > div').innerHTML = button.innerHTML.replaceAll(' data-action="user"', '');
			selector.querySelector('.btn.active').classList.remove('active');
			button.classList.add('active');
			selector.querySelector('input[type="checkbox"]').checked = false;
			document.querySelector('#ModalStatistics .row-3 .meta .title').innerHTML = button.innerHTML.replaceAll(' data-action="user"', '');
			if (button.lastElementChild.innerText === 'All Networks') {
				document.querySelector('#ModalStatistics__Body .row-4 table:first-of-type').classList.remove('d-none');
				document.querySelector('#ModalStatistics__Body .row-4 table:last-of-type').classList.add('d-none');
				/* document.querySelector('#ModalStatistics__Body .row-5').classList.add('d-none'); */
			} else {
				document.querySelector('#ModalStatistics__Body .row-4 table:first-of-type').classList.add('d-none');
				document.querySelector('#ModalStatistics__Body .row-4 table:last-of-type').classList.remove('d-none');
				/* document.querySelector('#ModalStatistics__Body .row-5').classList.remove('d-none'); */
			}
		});
	});

})();

const set_user_rank = async () => {
	set_user_chains_stats();
	set_user_chain_stats();
	getChartConfig('ModalStatistics__Chart', DATA.view_rank_chart_history || [], undefined, undefined, -6);

	if (DATA.view_chain === 'ALL') {
		getChartConfig('ModalProfile__Statistics__Chart', DATA.view_rank_chart_history || [], 'rgba(134, 220, 46, 1)', 'rgba(134, 220, 46, 0.5)');

		let next_level = get_next_level_percent(DATA.view_chain);
		document.querySelectorAll('#menu-user-chain-level, #profile-user-chain-level').forEach(el => {
			el.dataset.progressValue = next_level;
			el.children[0].style.width = `${next_level}%`;
		});
	}
};


