/**
 * Modal Affiliates
 */

const get_affiliate_fee_type = (v) => {
	if (v.type === 'S') { /* Subscription/boost fees */
		if (v.is_same_pool) {
			return ['Y', 'Synagogoue'];
		} else {
			return ['S', 'Boost'];
		}
	} else if (v.type === 'R') { /* Server fees */
		if (v.is_same_pool) {
			return ['Y', 'Synagogoue'];
		} else {
			return ['R', 'Light Pool'];
		}
	} else if (v.type === 'A') { /* Affiliate fees */
		if (v.is_same_pool) {
			return ['Y', 'Synagogoue'];
		} else {
			return ['A', 'Affiliate'];
		}
	} else if (v.type === 'Y') { /* Affiliate fees */
		return ['Y', 'Synagogoue Pay'];
	}
};

const set_user_affiliat_jbu_fees = () => {
	elementify('user-affiliate-jbu-fees').innerHTML = `<thead>
	<tr>
		<th>User</th>
		<th>Type</th>
		<th>Reward</th>
	</tr>
</thead>` + (DATA.affiliate_fees.map(v => {
	let [type, _type] = get_affiliate_fee_type(v);

	return `<tbody data-affiliate-type="${type}">
	<tr>
		<td>
			<div class="d-flex align-items-center">
				<img id="${GetTokenImage(DATA.WPEG)}" src="${DATA.ERROR_IMG}" class="icon-sm mr-6px">
				<div>User #${v.uid}</div>
			</div>
		</td>
		<td>${_type}</td>
		<td title="${v.usd_fees.replace(/0+$/, '')}">$${formatFiat(v.usd_fees)}</td>
	</tr>
</tbody>`;
	}).join('') || '<tr><td colspan="10"><div class="item">No affiliates in this user.</div></td></tr>');

	remove_affiliate_loader();
};

const set_total_user_affiliat_jbu_fees = () => {
	let doc;

	for (let type in DATA.total_affiliate_fees) {
		doc = document.getElementById(`user-affiliates-${type}`);

		doc.innerHTML = `$${formatFiat(DATA.total_affiliate_fees[type] || 0)}`;

		if (doc.getAttribute('data-balance')) {
			doc.dataset.balance = Big(DATA.total_affiliate_fees[type] || 0).div(DATA.WPEG_PRICE || 1);
		}
	}
};

const get_affiliate_jbu = async (tokenId) => {
	let balance = Big(await contract(DATA.USERS_NFT).balances(tokenId)).div(DATA.ETHER);

	return `<div class="item${DATA.selected_affiliate_jbu === tokenId && ' active' || ''}" data-action="affiliate_jbu" data-affiliate-nft="${tokenId}">
	<img id="${GetTokenImage(DATA.CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-sm" data-action="affiliate_jbu" data-affiliate-nft="${tokenId}">
	<div class="username text-truncated ml-6px" data-action="affiliate_jbu" data-affiliate-nft="${tokenId}">JBU${tokenId}</div>
	<div class="useramount text-truncated ml-6px" data-balance="${balance}" data-action="affiliate_jbu" data-affiliate-nft="${tokenId}">$${formatFiat(balance.mul(DATA.WPEG_PRICE))}</div>
</div>`;
};

const set_affiliate_jbus = async () => {
	let promises = [];

	for (let i = (DATA.conf.N && DATA.conf.N.JBU && DATA.conf.N.JBU.length || 0) - 1; i >= 0; --i) {
		if (DATA.conf.N.JBU[i].chain === DATA.CHAIN) {
			promises.push(get_affiliate_jbu(DATA.conf.N.JBU[i].id));
		}
	}

	elementify('ModalAffiliates__Selector').querySelectorAll('ul .btn').forEach(button => {
		button.removeEventListener('click', add_affiliate_loader);
	});

	elementify('user-affiliate-JBUs').innerHTML = (await Promise.all(promises)).flat().join('');

	setTimeout(() => {
		/* loading selector click */

		elementify('ModalAffiliates__Selector').querySelectorAll('ul .btn').forEach(button => {
			button.addEventListener('click', add_affiliate_loader);
		});
	}, 0);
};

/*** Inject HTML ***/

(() => {

	let chains = '',
		chain_id;

	for (chain_id of DATA.CHAINS_ORDER) {
		chains += `<li data-action="affiliate_chain" data-affiliate-chain="${DATA.CHAINS[chain_id].CHAIN}">
	<button class="btn btn-style" data-action="affiliate_chain" data-affiliate-chain="${DATA.CHAINS[chain_id].CHAIN}">
		<img id="${GetTokenImage(DATA.CHAINS[chain_id].CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-md mr-6px" data-action="affiliate_chain" data-affiliate-chain="${DATA.CHAINS[chain_id].CHAIN}">
		<div data-action="affiliate_chain" data-affiliate-chain="${DATA.CHAINS[chain_id].CHAIN}">${uppercase_first(DATA.CHAINS[chain_id].CHAIN_ASSETS)}</div>
	</button>
</li>`;
	}

	const html = `
		<div id="ModalAffiliates" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalAffiliates"></div>

			<div class="container">
				<div id="ModalAffiliates__Header" class="header">
					<div class="text-white text-bold text-truncated">AFFILIATE STATISTICS</div>

					<button type="button" class="btn btn-has-icon ml-auto mr-12px" data-togglable="ModalProfile" data-tooltip="User Profile" data-tooltip-left>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
						</svg>
					</button>

					<button type="button" class="btn btn-has-icon lightbox" data-togglable="ModalAffiliates">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalAffiliates__Body" class="body">
					<div class="row-1">
						<div id="ModalAffiliates__Selector" class="dropdown-has-title" data-dropdown>
							<input type="checkbox" id="ModalAffiliates__Selector__Checkbox" class="visually-hidden">

							<label for="ModalAffiliates__Selector__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown>
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
								<div class="title text-center">SELECT A NETWORK</div>

								<div class="wrapper">
									<li data-action="affiliate_chain" data-affiliate-chain="ALL">
										<button class="btn btn-style active" data-action="affiliate_chain" data-affiliate-chain="ALL">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0" data-action="affiliate_chain" data-affiliate-chain="ALL">
												<path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z" data-action="affiliate_chain" data-affiliate-chain="ALL"/>
											</svg>
											<div data-action="affiliate_chain" data-affiliate-chain="ALL">All Networks</div>
										</button>
									</li>

									${chains}
								</div>
							</ul>
						</div>
					</div>

					<div class="row-2">
						<div class="boxes">
							<div class="box box-users">
								<div class="header">Top Users</div>

								<div class="body" id="user-affiliate-JBUs"></div>
							</div>

							<div class="box" data-action="affiliate_jbu_filter" data-affiliate-type="A">
								<div class="name text-truncated w-100" data-action="affiliate_jbu_filter" data-affiliate-type="A">Affiliate Fees</div>

								<div class="amount text-truncated w-80" data-action="affiliate_jbu_filter" data-affiliate-type="A" id="user-affiliates-A" data-balance="0">$0.00</div>
							</div>

							<div class="box" data-action="affiliate_jbu_filter" data-affiliate-type="S">
								<div class="name text-truncated w-100" data-action="affiliate_jbu_filter" data-affiliate-type="S">Boost Fees</div>

								<div class="amount text-truncated w-80" data-action="affiliate_jbu_filter" data-affiliate-type="S" id="user-affiliates-S" data-balance="0">$0.00</div>
							</div>

							<div class="box" data-action="affiliate_jbu_filter" data-affiliate-type="R">
								<div class="name text-truncated w-100" data-action="affiliate_jbu_filter" data-affiliate-type="R">Lite Pool Fees</div>

								<div class="amount text-truncated w-80" data-action="affiliate_jbu_filter" data-affiliate-type="R" id="user-affiliates-R" data-balance="0">$0.00</div>
							</div>

							<div class="box" data-action="affiliate_jbu_filter" data-affiliate-type="Y">
								<div class="name text-truncated w-100" data-action="affiliate_jbu_filter" data-affiliate-type="Y">Synagogoue Fees</div>

								<div class="amount text-truncated w-80" data-action="affiliate_jbu_filter" data-affiliate-type="Y" id="user-affiliates-Y">$0.00</div>
							</div>
						</div>
					</div>

					<div id="affiliates-fee-container" class="row-3">
						<table id="user-affiliate-jbu-fees">
							<thead>
								<tr>
									<th>User</th>
									<th>Type</th>
									<th>Reward</th>
								</tr>
							</thead>
						</table>
					</div>

					<!-- <div class="row-4">
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

	handle_scroll('affiliates-fee-container', 'stop_affiliate', () => {
		++DATA.pages.affiliate;
		handleAction('affiliates_history');
	});

})();

/*** Body - Chain selector ***/

(() => {

	const selector = elementify('ModalAffiliates__Selector');

	selector.querySelectorAll('ul .btn').forEach(button => {
		button.addEventListener('click', event => {
			selector.querySelector('label > div').innerHTML = button.innerHTML.replaceAll(' data-action="affiliate_chain"', '');
			selector.querySelector('.btn.active').classList.remove('active');
			button.classList.add('active');
			selector.querySelector('input[type="checkbox"]').checked = false;
		});
	});

})();

const add_affiliate_loader = () => {
	document.querySelector('#ModalAffiliates__Body .row-3 table').classList.add('loading');

	let header = document.querySelector('#ModalAffiliates__Body .row-3 table thead');
	if (header) {
		header.insertAdjacentHTML('afterend', '<tbody class="loader"><tr><td colspan="3"><div class="loader item">No affiliates in this user.</div></td></tr></tbody>'); /* Loader */
	}
};

const remove_affiliate_loader = () => {
	let loader_container = document.querySelector('#ModalAffiliates__Body .row-3 table'),
		loader = loader_container.querySelector('tbody.loader');

	if (loader) {
		loader.remove();
		loader_container.classList.remove('loading');
	}
};

(() => {

	/* loading on box click */

	const boxes = document.querySelectorAll('#ModalAffiliates__Body .boxes .box:not(.box-users)');
	boxes.forEach(box => {
		box.addEventListener('click', event => {
			if (box.classList.contains('active')) {
				box.classList.remove('active');
			} else {
				boxes.forEach(box => {
					if (box.classList.contains('active')) {
						box.classList.remove('active');
					}
				});
				box.classList.add('active');
			}
		});
	});

})();
