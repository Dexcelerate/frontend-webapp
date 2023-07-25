/**
 * Wallet
 */

const update_range = (el, id) => {
	el.value = el.value.replace(/[^0-9.]/g, '');

	if (el.value.endsWith('.') || !Number(el.value)) {
		return;
	}

	let range = elementify(id),
		val = Math.max(0, Math.min(Number(el.value), Number(range.max)));

	range.value = val;
	el.value = val;


	/* document.querySelectorAll(`#${id}`).forEach(range => {
		let val = Math.max(0, Math.min(Number(el.value), Number(range.max)));

		range.value = val;
		el.value = val;
	}) */
};

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="Wallet" class="togglable d-none">
			<div class="lightbox" data-togglable="Wallet"></div>

			<div class="container">
				<input type="radio" name="wallet_tab" id="Wallet__Tab1" class="visually-hidden" autocomplete="off" checked>
				<input type="radio" name="wallet_tab" id="Wallet__Tab2" class="visually-hidden" autocomplete="off">
				<input type="radio" name="wallet_tab" id="Wallet__Tab3" class="visually-hidden" autocomplete="off">
				<input type="radio" name="wallet_tab" id="Wallet__Tab4" class="visually-hidden" autocomplete="off">

				<div id="Wallet__Header" class="header">
					<label for="Wallet__Tab1" class="btn btn-style w-100">
						<div class="text-truncated">Wallet</div>
					</label>

					<label for="Wallet__Tab2" class="btn btn-style w-100 ml-12px">
						<div class="text-truncated">Slots</div>
					</label>

					<label for="Wallet__Tab3" class="btn btn-style w-100 ml-12px">
						<div class="text-truncated">Boost</div>
					</label>

					<label for="Wallet__Tab4" class="btn btn-style w-100 ml-12px">
						<div class="text-truncated">NFT</div>
					</label>
				</div>

				<div id="Wallet__Body" class="body">
					<div id="Wallet__Panel1" class="panel"></div>

					<div id="Wallet__Panel2" class="panel"></div>

					<div id="Wallet__Panel3" class="panel"></div>

					<div id="Wallet__Panel4" class="panel"></div>
				</div>
			</div>
		</div>
	`;

	document.getElementById('Wallet').outerHTML = html;

})();

/*** Inject HTML - Panel 1 - Wallets ***/

(() => {

	const html = `
		<div class="wallets">
			<div id="Wallet__Wallet1" class="panelbox">
				<input type="radio" name="wallet_main_tab" id="Wallet__Wallet1__Tab1" class="visually-hidden" autocomplete="off" checked>

				<div id="Wallet__Wallet1__Panel1" class="panel panel-main">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-xxl bg">
						<path d="M0 3A2 2 0 012 1H15.5A.5.5 0 0115.5 2H15V4A1 1 0 0116 5V13.5A1.5 1.5 0 0114.5 15H2.5A2.5 2.5 0 010 12.5V3ZM1 4.732V12.5A1.5 1.5 0 002.5 14H14.5A.5.5 0 0015 13.5V5H2A1.99 1.99 0 011 4.732ZM1 3A1 1 0 002 4H14V2H2A1 1 0 001 3Z"></path>
					</svg>

					<div class="body">
						<div class="title">
							<div><a href="https://bscscan.com/address/${DATA.conf.wallet}" target="_blank">Wallet</a></div>
							<div>Balance</div>
						</div>

						<div class="balance" data-balance="${DATA.conf.balance || 0}">$${formatFiat(Big(DATA.conf.balance || 0).mul(DATA.WPEG_PRICE))}</div>

						<div class="actions d-flex">
							<button class="btn btn-has-icon" data-tooltip="List assets" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="-1" data-action="wallet-list-assets">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="-1" data-action="wallet-list-assets">
									<circle fill="#292929" cx="8" cy="8" r="8" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="-1" data-action="wallet-list-assets"/>
									<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM7 11.5A.5.5 0 017.5 11H8.5A.5.5 0 018.5 12H7.5A.5.5 0 017 11.5ZM5 8.5A.5.5 0 015.5 8H10.5A.5.5 0 0110.5 9H5.5A.5.5 0 015 8.5ZM3 5.5A.5.5 0 013.5 5H12.5A.5.5 0 0112.5 6H3.5A.5.5 0 013 5.5Z" data-tooltip-top data-tooltip-top data-wallet-slots-pagination-idx="-1" data-action="wallet-list-assets"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div id="Wallet__Wallet2" class="panelbox ml-12px">
				<input type="radio" id="Wallet__Wallet2__Tab1" class="visually-hidden" autocomplete="off" checked>

				<div id="Wallet__Wallet2__Panel1" class="panel panel-main">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-xxl bg">
						<path d="M1 1.5A1.5 1.5 0 012.5 0H14.5A1.5 1.5 0 0116 1.5V14.5A1.5 1.5 0 0114.5 16H2.5A1.5 1.5 0 011 14.5V13H.5A.5.5 0 01.5 12H1V8.5H.5A.5.5 0 01.5 7.5H1V4H.5A.5.5 0 01.5 3H1V1.5ZM2.5 1A.5.5 0 002 1.5V14.5A.5.5 0 002.5 15H14.5A.5.5 0 0015 14.5V1.5A.5.5 0 0014.5 1H2.5ZM13.5 6A.5.5 0 0114 6.5V9.5A.5.5 0 0113 9.5V6.5A.5.5 0 0113.5 6ZM4.828 4.464A.5.5 0 015.536 4.464L6.626 5.554A3.003 3.003 0 0110.102 5.554L11.192 4.464A.5.5 0 1111.899 5.172L10.809 6.262C11.549 7.299 11.549 8.702 10.809 9.738L11.899 10.828A.5.5 0 1111.192 11.536L10.102 10.446A3.002 3.002 0 016.626 10.446L5.536 11.536A.5.5 0 114.828 10.828L5.918 9.738A3.003 3.003 0 015.918 6.262L4.828 5.172A.5.5 0 014.828 4.464ZM6.95 6.586A2 2 0 109.778 9.414 2 2 0 006.95 6.586Z"/>
					</svg>

					<div class="body">
						<div class="title">
							<div>Slots</div>
							<div>Balance</div>
						</div>

						<div class="balance" data-balance="${DATA.conf.vault || 0}">$${formatFiat(Big(DATA.conf.vault || 0).mul(DATA.WPEG_PRICE))}</div>

						<div class="actions d-flex"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="slots" id="wallet-slots-container"></div>
		<div id="wallet-slot-assets-container"></div>
	`;

	elementify('Wallet__Panel1').insertAdjacentHTML('beforeend', html);

})();

(async () => {

	const boost = !store.get('closed_boost_wallet_popup') && `<div class="cta">
	<div class="col col-1">
		<ul class="circles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>

		<div class="graphic">BOOST</div>
	</div>

	<div class="col col-2 p-relative">
		<div class="text-fancy text-white">Ready for BOOST?</div>

		<div class="text-default mt-6px">Using Jewbot nodes, users can create, manage, and trade with people around the globe. <label for="Boost__Intro" class="text-white">CLICK HERE</label> for details!</div>
	</div>

	<button id="Boost__CtaBoxClose" class="btn btn-has-icon">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
			<rect fill="#191919" width="16" height="16" rx="100%"></rect>
			<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
		</svg>
	</button>
</div>` || '';

	let servers = '',
		chain_id;

	for (chain_id of DATA.CHAINS_ORDER) {
		servers = `${servers}<div class="boost">
		<button class="btn-add btn btn-style btn-has-icon" data-pay-chain="${chain_id}">
			<img id="${GetTokenImage(DATA.CHAINS[chain_id].WPEG)}" src="${DATA.ERROR_IMG}" class="icon-md" data-pay-chain="${chain_id}">
		</button>

		<button class="btn-count btn btn-style btn-has-icon">
			<div class="number" data-servers-chain="${chain_id}" data-count-number="0">0 == 1</div>

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<path d="M4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path>
			</svg>
		</button>
	</div>`;
	}

	const html = `<input type="checkbox" name="boost_currency_selector" id="Boost__Intro" class="visually-hidden" autocomplete="off">

<div class="intro d-none">
	<div class="panels">
		<input type="radio" name="boost_intro" id="Boost__Intro__1" class="visually-hidden" autocomplete="off" checked>

		<div class="panel">
			<img src="Base/graphics/raster/boost/boost-1.png">

			<div class="actions">
				<label for="Boost__Intro__1">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"></path>
					</svg>
				</label>

				<label for="Boost__Intro__2">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M4.646 1.646A.5.5 0 015.354 1.646L11.354 7.646A.5.5 0 0111.354 8.354L5.354 14.354A.5.5 0 014.646 13.646L10.293 8 4.646 2.354A.5.5 0 014.646 1.646Z"></path>
					</svg>
				</label>
			</div>
		</div>

		<input type="radio" name="boost_intro" id="Boost__Intro__2" class="visually-hidden" autocomplete="off">

		<div class="panel">
			<img src="Base/graphics/raster/boost/boost-2.gif">

			<div class="actions">
				<label for="Boost__Intro__1">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"></path>
					</svg>
				</label>

				<label for="Boost__Intro__3">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M4.646 1.646A.5.5 0 015.354 1.646L11.354 7.646A.5.5 0 0111.354 8.354L5.354 14.354A.5.5 0 014.646 13.646L10.293 8 4.646 2.354A.5.5 0 014.646 1.646Z"></path>
					</svg>
				</label>
			</div>
		</div>

		<input type="radio" name="boost_intro" id="Boost__Intro__3" class="visually-hidden" autocomplete="off">

		<div class="panel">
			<img src="Base/graphics/raster/boost/boost-3.gif">

			<div class="actions">
				<label for="Boost__Intro__2">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"></path>
					</svg>
				</label>

				<label for="Boost__Intro__3">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg">
						<path d="M4.646 1.646A.5.5 0 015.354 1.646L11.354 7.646A.5.5 0 0111.354 8.354L5.354 14.354A.5.5 0 014.646 13.646L10.293 8 4.646 2.354A.5.5 0 014.646 1.646Z"></path>
					</svg>
				</label>
			</div>

			<label for="Boost__Intro" class="btn btn-style mt-12px">GOT IT</label>
		</div>
	</div>
</div>

${boost}

<div class="market">
	<div class="row-1">
		<div class="title ml-12px mt-4px mb-4px text-white">1. Select Boosts</div>

		<div class="boosts">
			${servers}
		</div>
	</div>

	<div class="row-2">
		<div class="title ml-12px mt-4px mb-4px text-white">2. Select Payment</div>

		<div class="selector">
			<input type="checkbox" name="boost_currency_selector" id="Boost__Currency__Selector" class="visually-hidden" autocomplete="off">

			<label for="Boost__Currency__Selector" class="btn btn-style btn-has-icon">
				<div class="text-truncated">Select currency</div>

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M1.646 4.646A.5.5 0 012.354 4.646L8 10.293 13.646 4.646A.5.5 0 0114.354 5.354L8.354 11.354A.5.5 0 017.646 11.354L1.646 5.354A.5.5 0 011.646 4.646Z"></path>
				</svg>
			</label>

			<div class="list d-none" id="boost-currencies-container"></div>
		</div>

		<div class="cards" id="boost-value-currencies-container"></div>
	</div>

	<div class="row-3">
		<div class="title ml-12px mt-4px mb-4px text-white">3. Checkout</div>

		<div class="panels">
			<input type="checkbox" id="Boost__Checkout__Discounts" class="visually-hidden" autocomplete="off">

			<div class="panel" data-action="boost">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-xxl bg" data-action="boost">
					<path d="M3.646 1.646A.5.5 0 014.354 1.646L10.354 7.646A.5.5 0 0110.354 8.354L4.354 14.354A.5.5 0 013.646 13.646L9.293 8 3.646 2.354A.5.5 0 013.646 1.646ZM7.646 1.646A.5.5 0 018.354 1.646L14.354 7.646A.5.5 0 0114.354 8.354L8.354 14.354A.5.5 0 017.646 13.646L13.293 8 7.646 2.354A.5.5 0 017.646 1.646Z" data-action="boost"/>
				</svg>

				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-xxl bg" data-action="boost">
					<path d="M8.354 1.646A.5.5 0 018.354 2.354L2.707 8 8.354 13.646A.5.5 0 017.646 14.354L1.646 8.354A.5.5 0 011.646 7.646L7.646 1.646A.5.5 0 018.354 1.646ZM12.354 1.646A.5.5 0 0112.354 2.354L6.707 8 12.354 13.646A.5.5 0 0111.646 14.354L5.646 8.354A.5.5 0 015.646 7.646L11.646 1.646A.5.5 0 0112.354 1.646Z" data-action="boost"/>
				</svg>

				<div class="name text-fancy text-truncated text-white p-relative" data-action="boost">BOOST</div>
				<div class="amount text-truncated text-white p-relative" id="zero-pool-price" data-action="boost">$${DATA.server_price}</div>

				<label for="Boost__Checkout__Discounts" data-action="toggle-boost-discounts" class="p-relative">Have a discount?</label>
			</div>

			<div class="panel d-none">
				<div class="header">
					<label for="Boost__Checkout__Discounts" class="btn btn-has-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
						</svg>
					</label>

					<div class="text-truncated text-white w-100 p-12px">Discounts</div>
				</div>

				<div class="cards" id="user-discounts"><div id="no-discounts">You currently have no discounts</div></div>
			</div>
		</div>
	</div>
</div>

<div class="inventory">
	<div class="title ml-12px mt-4px mb-4px text-white">My Boosts</div>

	<div class="cards" id="user-servers">
		<div class="item" id="no-nodes">You currently don't have any nodes</div>
	</div>
</div>`;

	elementify('Wallet__Panel3').insertAdjacentHTML('beforeend', html);

	setTimeout(set_original_wallet_assets, 0);

})();

(() => {

	handle_scroll('Wallet__Body', 'stop_wallet', () => {
		if (elementify('Wallet__Tab1').checked) {
			++DATA.pages.wallet;
			handleAction('wallet_history');
		}
	});

})();

/*** Panel 3 - Network selector ***/

(() => {

	/* decrease count on button click */

	document.querySelectorAll('#Wallet__Panel3 .market .row-1 .btn-add').forEach(addButton => {
		addButton.addEventListener('click', event => {
			let countButtonElement = addButton.nextElementSibling;
			let countButtonInteger = parseInt(countButtonElement.innerText);
			if (countButtonInteger < 1) {
				return;
			}
			++DATA.boost_quantity;
			countButtonElement.firstElementChild.innerText = --countButtonInteger;
			addButton.classList.add('active');
		});
	});

	/* reset count on click inside circle */

	document.querySelectorAll('#Wallet__Panel3 .market .row-1 .btn-count').forEach(countButton => {
		countButton.addEventListener('click', event => {
			DATA.boost_quantity = 0;
			countButton.firstElementChild.innerText = countButton.firstElementChild.dataset.countNumber;
			countButton.previousElementSibling.classList.remove('active');
		});
	});

})();

/*** Panel 3 - Boost CTA box close button ***/

(() => {

	if (!store.get('closed_boost_wallet_popup')) {
		elementify('Boost__CtaBoxClose').addEventListener('click', event => {
			event.currentTarget.parentElement.remove();
			store.set('closed_boost_wallet_popup', '1');
		});
	}

})();

/*** Inject HTML - Panel 4 ***/

(() => {

	const html = `
		<input type="checkbox" id="NFT__Panel2__Checkbox" class="visually-hidden">

		<div class="panel panel-1">
			<input type="checkbox" id="NFT__Highlight__Users" class="visually-hidden">
			<input type="checkbox" id="NFT__Highlight__Artifacts" class="visually-hidden">

			<div class="row row-1">
				<div class="title ml-12px">Users</div>
				<div class="cards" id="user-JBUs"></div>
			</div>

			<div class="row row-2">
				<div class="title ml-12px">Artifacts</div>
				<div class="cards" id="user-JBRs"></div>
			</div>

			<div class="row row-3">
				<div class="title ml-12px">Action Cards</div>
				<div class="cards" id="user-JBAs"></div>
			</div>

			<div class="row row-4">
				<div class="title ml-12px">Nodes</div>
				<div class="cards" id="user-JBSs"></div>
			</div>

			<div class="row row-4">
				<div class="title ml-12px">Discounts</div>
				<div class="cards" id="user-JBDs"></div>
			</div>


			<div class="row row-5">
				<div class="title ml-12px">Whales</div>
				<div class="cards" id="user-JBWs"></div>
			</div>
		</div>

		<div class="panel panel-2"></div>
	`;

	elementify('Wallet__Panel4').insertAdjacentHTML('beforeend', html);

})();

const set_original_wallet_nft = async (type, nft_id, chain, order) => {
	let main_type = type === 'user-servers' && 'JBS' || (type === 'user-discounts' && 'JBD' || type),
		key = `${type}-${nft_id}-${chain}-${order}`,
		expiry = DATA.conf.N[main_type][order] && DATA.conf.N[main_type][order].expiry || 0;

	if (!['JBS', 'JBU'].includes(main_type) && DATA.nft_divs_cache[key] && DATA.nft_divs_cache[key].expiry === `${expiry}`) {
		/* lazy_get_nft_image(main_type, nft_id, undefined, `${key}-${expiry}`); */
		return [`${key}-${expiry}`, false];
	}

	if (DATA.nft_divs_cache[key]) {
		document.querySelectorAll(`.${key}-${DATA.nft_divs_cache[key].expiry}`).forEach(el => el.remove());
	}

	DATA.nft_divs_cache[key] = {
		expiry: `${expiry}`,
		data: await (async () => {
			switch (type) {
				case 'JBU':
					return `<div class="card ${key}-${expiry}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" src="Base/graphics/raster/nfts/jb1.jpg">

	<input type="checkbox" id="NFT__Users__User${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}" data-action="activate-artifact-card" data-user-nft="${nft_id}">
		<label for="NFT__Highlight__Artifacts" class="btn btn-has-icon" data-tooltip="Burn" data-tooltip-top data-action="activate-artifact-card" data-user-nft="${nft_id}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="activate-artifact-card" data-user-nft="${nft_id}">
				<circle fill="#292929" cx="8" cy="8" r="8" data-action="activate-artifact-card" data-user-nft="${nft_id}"></circle>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM10.3321 3.2012C9.8469 3.6523 9.4063 4.1269 9.0171 4.6039 8.3773 3.7255 7.5828 2.832 6.6875 2 4.3848 4.1356 2.75 6.9219 2.75 8.6 2.75 11.5836 5.0985 14 8 14S13.25 11.5836 13.25 8.6C13.25 7.3531 12.0313 4.7773 10.3321 3.2012ZM9.8773 11.1852C9.3687 11.5391 8.7454 11.75 8.0679 11.75 6.3774 11.75 5 10.6313 5 8.8156 5 7.9102 5.5681 7.1131 6.7048 5.75 6.8689 5.9375 9.0223 8.689 9.0223 8.689L10.3965 7.1216C10.4931 7.2798 10.5809 7.4384 10.66 7.5879 11.3023 8.811 11.0328 10.3765 9.8773 11.1852Z" data-action="activate-artifact-card" data-user-nft="${nft_id}"/>
			</svg>
		</label>

		<label for="NFT__Users__User${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__Users__User${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>
	</div>
</div>`;

				case 'user-servers':
					if (!DATA.conf.pools[nft_id]) {
						return '';
					}

					expiry = new Date(expiry).getTime();
					return `<div class="card ${key}-${expiry}">
					<a href="https://bscscan.com/token/${DATA.CHAINS[DATA.CHAIN_IDS_MAP[DATA.conf.pools[nft_id].chain]].SERVERS_NFT}?a=${nft_id}" target="_blank">
	<img id="${lazy_get_nft_image(main_type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">
	<img id="${GetTokenImage(DATA.CHAINS[DATA.CHAIN_IDS_MAP[DATA.conf.pools[nft_id].chain]].CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-md">
</a>
	<div class="footer" data-nft="${nft_id}">
		<div class="text-white" data-reverse-timer="${expiry}">${timeDifference(expiry, Date.now())} left</div>
		${(DATA.conf.wallet === await contract(DATA.CHAINS[DATA.CHAIN_IDS_MAP[DATA.conf.pools[nft_id].chain]].SERVERS_NFT).ownerOf(nft_id).catch(_ => 0)) && `<button id="boost-unsubscribe-${nft_id}" class="btn btn-style" data-action="reduce" data-nft="${nft_id}" data-pool="${DATA.conf.pools[nft_id].ip_hash}">Unsubscribe</button>` || '<button class="btn btn-style disabled">Unsubscribed</button>'}
	</div>
</div>`;

				case 'JBS':
					if (!DATA.conf.pools[nft_id]) {
						return '';
					}

					let is_staked = DATA.conf.pools && DATA.conf.pools[nft_id] && DATA.conf.pools[nft_id].staked,
						is_synagogue = DATA.conf.pools && DATA.conf.pools[nft_id] && DATA.conf.pools[nft_id].is_synagogue;

					return `<div class="card ${key}-${expiry}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">

	<input type="checkbox" id="NFT__Nodes__Node${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}">
		${!is_synagogue && `<label class="checkbox-svg" data-tooltip="${is_staked && 'Unstake' || 'Stake'}" data-tooltip-alt="${is_staked && 'Stake' || 'Unstake'}" data-tooltip-top data-action="${is_staked && 'unstake' || 'stake'}" data-nft="${nft_id}">
			<input type="checkbox" class="visually-hidden" autocomplete="off" ${is_staked && 'checked="checked"' || ''}>

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="${is_staked && 'unstake' || 'stake'}" data-nft="${nft_id}">
				<circle fill="#292929" cx="8" cy="8" r="8" data-action="${is_staked && 'unstake' || 'stake'}" data-nft="${nft_id}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V7.5H11.5A.5.5 0 0111.5 8.5H8.5V11.5A.5.5 0 017.5 11.5V8.5H4.5A.5.5 0 014.5 7.5H7.5V4.5A.5.5 0 018 4Z" data-action="stake" data-nft="${nft_id}"/>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8Z" data-action="unstake" data-nft="${nft_id}"></path>
			</svg>
		</label>` || ''}

		<label for="NFT__Nodes__Node${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__Nodes__Node${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>
	</div>
</div>`;

				case 'JBA':
					return `<div class="card ${key}-${expiry}${(expiry) > 0 && ' active' || ''}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">

	<input type="checkbox" id="NFT__ActionCards__ActionCard${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}">
		 ${(expiry) > 0 && `<div class="clock">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-2px">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5ZM8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8Z"/>
			</svg>

			<div class="text-white text-truncated ml-6px" data-reverse-timer="${expiry}">${timeDifference(Number(expiry), Date.now())} left</div>
		</div>` || ''}

		${Number(expiry) === 0 && `<button class="btn btn-has-icon" data-tooltip="Burn" data-tooltip-top data-action="activate-action-card" data-nft="${nft_id}" data-expity="${expiry}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="activate-action-card" data-nft="${nft_id}">
				<circle fill="#292929" cx="8" cy="8" r="8" data-action="activate-action-card" data-nft="${nft_id}"></circle>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM10.3321 3.2012C9.8469 3.6523 9.4063 4.1269 9.0171 4.6039 8.3773 3.7255 7.5828 2.832 6.6875 2 4.3848 4.1356 2.75 6.9219 2.75 8.6 2.75 11.5836 5.0985 14 8 14S13.25 11.5836 13.25 8.6C13.25 7.3531 12.0313 4.7773 10.3321 3.2012ZM9.8773 11.1852C9.3687 11.5391 8.7454 11.75 8.0679 11.75 6.3774 11.75 5 10.6313 5 8.8156 5 7.9102 5.5681 7.1131 6.7048 5.75 6.8689 5.9375 9.0223 8.689 9.0223 8.689L10.3965 7.1216C10.4931 7.2798 10.5809 7.4384 10.66 7.5879 11.3023 8.811 11.0328 10.3765 9.8773 11.1852Z" data-action="activate-action-card" data-nft="${nft_id}"/>
			</svg>
		</button>

		<label for="NFT__ActionCards__ActionCard${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__ActionCards__ActionCard${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>` || ''}
	</div>
</div>`;

				case 'JBR':
					return `<div class="card ${key}-${expiry}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">

	<input type="checkbox" id="NFT__Artifacts__Artifact${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}" data-artifact-nft="${nft_id}">
		<label for="NFT__Highlight__Users" class="btn btn-has-icon" data-tooltip="Burn" data-tooltip-top data-action="activate-artifact-card" data-artifact-nft="${nft_id}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="activate-artifact-card" data-artifact-nft="${nft_id}">
				<circle fill="#292929" cx="8" cy="8" r="8" data-action="activate-artifact-card" data-artifact-nft="${nft_id}"></circle>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM10.3321 3.2012C9.8469 3.6523 9.4063 4.1269 9.0171 4.6039 8.3773 3.7255 7.5828 2.832 6.6875 2 4.3848 4.1356 2.75 6.9219 2.75 8.6 2.75 11.5836 5.0985 14 8 14S13.25 11.5836 13.25 8.6C13.25 7.3531 12.0313 4.7773 10.3321 3.2012ZM9.8773 11.1852C9.3687 11.5391 8.7454 11.75 8.0679 11.75 6.3774 11.75 5 10.6313 5 8.8156 5 7.9102 5.5681 7.1131 6.7048 5.75 6.8689 5.9375 9.0223 8.689 9.0223 8.689L10.3965 7.1216C10.4931 7.2798 10.5809 7.4384 10.66 7.5879 11.3023 8.811 11.0328 10.3765 9.8773 11.1852Z" data-action="activate-artifact-card" data-artifact-nft="${nft_id}"/>
			</svg>
		</label>

		<label for="NFT__Artifacts__Artifact${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__Artifacts__Artifact${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>
	</div>
</div>`;

				case 'JBD':
					return `<div class="card ${key}-${expiry}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">

	<input type="checkbox" id="NFT__Discounts__Discount${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}">
		<label for="NFT__Highlight__Artifacts" class="btn btn-has-icon" data-tooltip="Burn" data-tooltip-top data-action="boost" data-user-nft="${nft_id}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="boost" data-user-nft="${nft_id}">
				<circle fill="#292929" cx="8" cy="8" r="8" data-action="boost" data-user-nft="${nft_id}"></circle>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM10.3321 3.2012C9.8469 3.6523 9.4063 4.1269 9.0171 4.6039 8.3773 3.7255 7.5828 2.832 6.6875 2 4.3848 4.1356 2.75 6.9219 2.75 8.6 2.75 11.5836 5.0985 14 8 14S13.25 11.5836 13.25 8.6C13.25 7.3531 12.0313 4.7773 10.3321 3.2012ZM9.8773 11.1852C9.3687 11.5391 8.7454 11.75 8.0679 11.75 6.3774 11.75 5 10.6313 5 8.8156 5 7.9102 5.5681 7.1131 6.7048 5.75 6.8689 5.9375 9.0223 8.689 9.0223 8.689L10.3965 7.1216C10.4931 7.2798 10.5809 7.4384 10.66 7.5879 11.3023 8.811 11.0328 10.3765 9.8773 11.1852Z" data-action="boost" data-user-nft="${nft_id}"/>
			</svg>
		</label>

		<label for="NFT__Discounts__Discount${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__Discounts__Discount${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>
	</div>
</div>`;

				case 'user-discounts':
					let _fixed = 0, limit, _expiry, once, percent = 0, min_quantity, trials = 10;

					while (percent == 0 && _fixed == 0 && trials) {
						[_fixed, limit, _expiry, once, percent, min_quantity] = await contract(DATA.DISCOUNTS).tokenDiscounts(nft_id),
							discount = '0%',
							new_price = Big(DATA.server_price);

						if (percent > 0) {
							discount = `${Number(percent) / 10}%`;
							new_price = new_price.sub(new_price.mul(percent).div(1000));
						} else if (_fixed > 0) {
							discount = `$${_fixed}`;
							new_price = new_price.sub(_fixed);

							if (new_price.lt(0)) {
								new_price = 0;
							}
						} else {
							await sleep(1);
							--trials;
						}
					}

					return `<div class="card ${key}-${expiry}" data-pay-chain="${chain}" data-discount="${nft_id}" data-discounted="${new_price}">
	<img id="${lazy_get_nft_image(main_type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">
	<img id="${GetTokenImage(DATA.CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-md">

	<div class="footer" data-nft="${nft_id}">
		<div>${uppercase_first(DATA.CHAINS[DATA.CHAIN_IDS_MAP[chain]].CHAIN_ASSETS)}</div>
		<div>${discount} OFF</div>
	</div>
</div>`;

				case 'JBW':
					return `<div class="card ${key}-${expiry}">
	<img id="${lazy_get_nft_image(type, nft_id, undefined, `${key}-${expiry}`)}" onerror="error_img(this)">

	<input type="checkbox" id="NFT__Whales__Whale${nft_id}-${order}" class="visually-hidden">

	<div class="footer" data-nft="${nft_id}">
		<label for="NFT__Whales__Whale${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Send" data-tooltip-top>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M1 8A7 7 0 1015 8 7 7 0 001 8ZM16 8A8 8 0 110 8 8 8 0 0116 8ZM4.5 7.5A.5.5 0 004.5 8.5H10.293L8.146 10.646A.5.5 0 008.854 11.354L11.854 8.354A.5.5 0 0011.854 7.646L8.854 4.646A.5.5 0 108.146 5.354L10.293 7.5H4.5Z"/>
			</svg>
		</label>

		<div class="input-group">
			<input type="text" class="form-control" placeholder="User ID" autocomplete="off" spellcheck="false" id="send-${type}-${nft_id}-${order}-to">
		</div>

		<label for="NFT__Whales__Whale${nft_id}-${order}" class="btn btn-has-icon" data-tooltip="Cancel" data-tooltip-bottom data-action="clear-selected-nfts">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<circle fill="#292929" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
			</svg>
		</label>

		<button class="btn btn-has-icon" data-tooltip="Confirm" data-tooltip-top data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}">
				<circle fill="#333333" cx="8" cy="8" r="8" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="send_nft" data-nft="${nft_id}" data-nft-type="${type}" data-nft-order="${order}"/>
			</svg>
		</button>
	</div>
</div>`;
			}
		})()
	};

	return [`${key}-${expiry}`, DATA.nft_divs_cache[key].data];
};

function discount_click (event) {
	let card = event.target,
		trials = 5;

	while (trials && !card.classList.contains('card')) {
		card = card.parentNode;
		--trials;
	}

	if (card.classList.contains('active')) {
		card.classList.remove('active');
		delete DATA.selected_discount;
		elementify('zero-pool-price').innerHTML = `$${formatFiat(DATA.server_price)}`;
	} else {
		card.parentNode.querySelectorAll('.card').forEach(el => el.classList.remove('active'));
		card.classList.add('active');
		DATA.selected_discount = card.dataset.discount;
		elementify('zero-pool-price').innerHTML = `$${formatFiat(card.dataset.discounted)}`;
	}
}

function remove_artifact_card_from_user (event) {
	let card = event.target,
		trials = 5;

	while (trials && !card.classList.contains('card')) {
		card = card.parentNode;
		--trials;
	}

	let highlightArtifactsCheckbox = elementify('NFT__Highlight__Artifacts');

	if (highlightArtifactsCheckbox.checked) {
		card.remove();
		highlightArtifactsCheckbox.checked = false;
	}
}

function remove_artifact_card_from_artifact_part_1(event) {
	DATA.artifact_card = labelBurnArtifact.parentElement.parentElement;
}

function remove_artifact_card_from_artifact_part_2(event) {
	let highlightUsersCheckbox = elementify('NFT__Highlight__Users');

	if (DATA.artifact_card && highlightUsersCheckbox.checked) {
		DATA.artifact_card.remove();
		highlightUsersCheckbox.checked = false;
	}
}

function remove_artifact_card_from_artifact_part_1(event) {
	let labelBurnArtifact = event.target,
		trials = 5;

	while (trials && !labelBurnArtifact.dataset && !labelBurnArtifact.dataset.tooltip && labelBurnArtifact.dataset.tooltip !== 'Burn') {
		labelBurnArtifact = labelBurnArtifact.parentNode;
		--trials;
	}

	DATA.artifact_card = labelBurnArtifact.parentElement.parentElement;
}

function remove_artifact_card_from_artifact_part_2(event) {
	let highlightUsersCheckbox = elementify('NFT__Highlight__Users');

	if (DATA.artifact_card && highlightUsersCheckbox.checked) {
		DATA.artifact_card.remove();
		highlightUsersCheckbox.checked = false;
	}
}

function nft_click_in_description(event) {
	let footer,
		trials = 5;

	while (trials && !(footer || event.target).classList.contains('footer')) {
		footer = (footer || event.target).parentNode;
		--trials;
	}

	if (!footer) {
		footer = event.target;
	}

	let nftPanel2 = document.querySelector('#Wallet__Panel4 .panel-2');
	let nftPanel2Checkbox = elementify('NFT__Panel2__Checkbox');

	if (elementify('NFT__Highlight__Users').checked || elementify('NFT__Highlight__Artifacts').checked) {
		return; /* bail if burn mode is on */
	}
	if (footer === event.target) {
		nftPanel2.innerHTML = `<label for="NFT__Panel2__Checkbox" class="btn btn-has-icon">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
		<circle fill="#292929" cx="8" cy="8" r="8"></circle>
		<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
	</svg>
</label>

<div class="box box-nft">
	<a href="https://bscscan.com/token/0xd1878a51d5b9ff76cb7c5527627b905db6f4287e?a=${footer.dataset.nft}" target="_blank"><img src="${footer.parentElement.querySelector('img').src}" onerror="error_img=(this)" class="icon-xxl"></a>
</div>

<div class="box box-name mt-12px text-white text-center">Name of the NFT</div>

<div class="box box-details mt-12px text-white">
	<ul>
		<li>Lorem ipsum dolor sit amet.</li>
		<li>Beatae fugiat libero ipsam quibusdam.</li>
		<li>Pariatur cumque dolorem impedit rem explicabo.</li>
	</ul>
</div>

<div class="box box-duration mt-12px text-white text-center"><a href="https://${DATA.BASE_URL}/?jbu=${footer.dataset.nft}" target="_blank" onclick="copyTextToClipboard('https://${DATA.BASE_URL}/?jbu=${footer.dataset.nft}', event, this)">${DATA.BASE_URL}/?jbu=${footer.dataset.nft}</a></div>

<div class="box-sell mt-12px">
	<input type="checkbox" id="NFTSellEnabled" class="visually-hidden">

	<label for="NFTSellEnabled" class="btn btn-style w-100">Sell</label>

	<div class="box">
		<div class="multiple-input-groups">
			<div class="input-group has-addon">
				<input type="text" class="form-control" placeholder="0">
				<div class="addon">$</div>
			</div>

			<div class="input-group">
				<button class="btn btn-style">Confirm Sell</button>
			</div>
		</div>
	</div>
</div>`;
		nftPanel2Checkbox.checked = nftPanel2Checkbox.checked ? false : true;
	}
}
/*
function burn_action_nft(event) {
	let burnButton = event.target,
		trials = 5;

	while (trials && !burnButton.dataset && !burnButton.dataset.tooltip && burnButton.dataset.tooltip !== 'Burn') {
		burnButton = burnButton.parentNode;
		--trials;
	}

	let htmlClock = `<div class="clock">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0 mr-2px">
		<circle fill="#292929" cx="8" cy="8" r="8"></circle>
		<path d="M8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5ZM8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8Z"/>
	</svg>

	<div class="text-white text-truncated ml-6px" data-reverse-timer="${burnButton.dataset.expiry}">${timeDifference(Number(burnButton.dataset.expiry), Date.now())} left</div>
</div>`;

	let footerElement = burnButton.parentElement;
	footerElement.insertAdjacentHTML('beforebegin', htmlClock);
	let cardElement = burnButton.parentElement.parentElement;
	cardElement.classList.add('active');
	let cardsElement = burnButton.parentElement.parentElement.parentElement;
	cardsElement.prepend(cardElement);
}
 */
const set_user_name = async () => {
	document.querySelectorAll('[data-username]').forEach(el => {
		el.innerText = DATA.view_user.title || ((DATA.view_user.uid || (DATA.conf.N?.JBU?.length && DATA.conf.N.JBU[0].id)) && `User #${(DATA.conf.N?.JBU?.length && DATA.conf.N.JBU[0].id) ?? DATA.view_user.uid}`) || 'Guest';
	});

	document.querySelectorAll('[data-user-image]').forEach(async (el) => {
		if (DATA.view_user.JBU || DATA.conf.JBU) {
			el.src = await get_user_image(DATA.view_user.JBU || DATA.conf.JBU);
		} else {
			el.src = DATA.ERROR_USER_IMG;
		}
	});
};

const set_original_wallet_nfts = async () => {
	let promises = [],
		results = {},
		type, i;

	document.querySelectorAll('#Wallet__Panel3 .market .row-3 .cards .card').forEach(card => {
		card.removeEventListener('click', discount_click);
	});

	document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-2 .cards .card').forEach(artifactCard => {
		artifactCard.removeEventListener('click', remove_artifact_card_from_user);
	});

	document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-2 label[data-tooltip="Burn"]').forEach(labelBurnArtifact => {
		labelBurnArtifact.removeEventListener('click', remove_artifact_card_from_artifact_part_1);
	});

	document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-1 .cards .card').forEach(userCard => {
		userCard.removeEventListener('click', remove_artifact_card_from_artifact_part_2);
	});

	document.querySelectorAll('#Wallet__Panel4 .card .footer').forEach(footer => {
		footer.removeEventListener('click', nft_click_in_description);
	});

	/* document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-3 button[data-tooltip="Burn"]').forEach(burnButton => {
		burnButton.removeEventListener('click', burn_action_nft);
	}); */

	/* This is for cleanup, because we can't override types that are not in the map! */
	for (type in DATA.NFT_TYPES_MAP) {
		if (!DATA.conf.N[type]) {
			DATA.conf.N[type] = [];
		}
	}

	let current_nft_keys = {};

	for (type in DATA.conf.N) {
		if (!results[type]) {
			results[type] = true;
			/* elementify(`user-${type}s`).innerHTML = ''; */
		}

		if (type === 'JBS' && !results['user-servers']) {
			results['user-servers'] = true;
			if (DATA.conf.N['JBS'].length) {
				if (document.getElementById('no-nodes')) {
					document.getElementById('no-nodes').remove();
				}
			} else {
				elementify('user-servers').innerHTML = `<div class="item" id="no-nodes">You currently don't have any nodes</div>`;
			}
		}

		if (type === 'JBD' && !results['user-discounts']) {
			results['user-discounts'] = true;
			if (DATA.conf.N['JBD'].length) {
				if (document.getElementById('no-discounts')) {
					document.getElementById('no-discounts').remove();
				}
			} else {
				elementify('user-discounts').innerHTML = `<div id="no-discounts">You currently have no discounts</div>`;
			}
		}

		for (i = DATA.conf.N[type].length - 1; i >= 0; --i) {
			promises.push((async (_type, _nft_id, _chain, _i) => {
				let [key, tmp] = await set_original_wallet_nft(_type, _nft_id, _chain, _i);
				current_nft_keys[key] = true;
				if (tmp) {
					elementify(`user-${_type}s`).insertAdjacentHTML('beforeend', tmp);
				}
			})(type, DATA.conf.N[type][i].id, DATA.conf.N[type][i].chain, i));

			if (type === 'JBS') {
				promises.push((async (_type, _nft_id, _chain, _i) => {
					let [key, tmp] = await set_original_wallet_nft('user-servers', _nft_id, _chain, _i);
					current_nft_keys[key] = true;
					if (tmp) {
						elementify('user-servers').insertAdjacentHTML('beforeend', tmp);
					}
				})(type, DATA.conf.N['JBS'][i].id, DATA.conf.N['JBS'][i].chain, i));
			}

			if (type === 'JBD') {
				promises.push((async (_type, _nft_id, _chain, _i) => {
					let [key, tmp] = await set_original_wallet_nft('user-discounts', _nft_id, _chain, _i);
					current_nft_keys[key] = true;
					if (tmp) {
						elementify('user-discounts').insertAdjacentHTML('beforeend', tmp);
					}
				})(type, DATA.conf.N['JBD'][i].id, DATA.conf.N['JBD'][i].chain, i));
			}
		}
	}

	await Promise.all(promises);

	for (let key in DATA.previous_nft_keys) {
		if (!current_nft_keys[key] && document.getElementById(key)) {
			document.getElementById(key).remove();
		}
	}

	let elements;

	for (type in { JBA: true, JBU: true, JBR: true, JBD: true, JBS: true, JBW: true, server: true, discount: true }) {
		elements = elementify(`user-${type}s`).querySelectorAll('.card');
		for (i = elements.length - 1; i >= 0; --i) {
			if (!current_nft_keys[elements[i].getAttribute('class').split(' ')[1]]) {
				elements[i].remove();
			}
		}
	}

	DATA.previous_nft_keys = current_nft_keys;

	setTimeout(() => {
		/*** Panel 3 - Discount selector ***/

		document.querySelectorAll('#Wallet__Panel3 .market .row-3 .cards .card').forEach(card => {
			card.addEventListener('click', discount_click);
		});

		/*** Panel 4 - In burn mode make nft card disappear after select  ***/

		/* remove artifact card initiated from user */

		document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-2 .cards .card').forEach(artifactCard => {
			artifactCard.addEventListener('click', remove_artifact_card_from_user);
		});

		/* remove artifact card initiated from artifact */

		document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-2 label[data-tooltip="Burn"]').forEach(labelBurnArtifact => {
			labelBurnArtifact.addEventListener('click', remove_artifact_card_from_artifact_part_1);
		});

		document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-1 .cards .card').forEach(userCard => {
			userCard.addEventListener('click', remove_artifact_card_from_artifact_part_2);
		});

		/*** Panel 4 - On click of NFT image inside of card open NFT description ***/

		document.querySelectorAll('#Wallet__Panel4 .card .footer').forEach(footer => {
			footer.addEventListener('click', nft_click_in_description);
		});

		/*** Panel 4 - On click of Action Card "Burn" button add clock and put card to first position ***/

		/* document.querySelectorAll('#Wallet__Panel4 .panel-1 .row-3 button[data-tooltip="Burn"]').forEach(burnButton => {
			burnButton.addEventListener('click', burn_action_nft);
		}); */
	}, 0);
};
