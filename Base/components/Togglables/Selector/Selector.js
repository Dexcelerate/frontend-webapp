/**
 * Selector
 */

/*** Inject HTML - Base ***/

(() => {

	const html = `
		<div id="Selector" class="togglable d-none">
			<div class="lightbox" data-togglable="Selector"></div>

			<div class="container">
				<input type="radio" name="selector_tab" id="Selector__Tab1" class="visually-hidden" autocomplete="off" checked>
				<input type="radio" name="selector_tab" id="Selector__Tab2" class="visually-hidden" autocomplete="off">

				<div id="Selector__Header" class="header">
					<label for="Selector__Tab1" class="btn btn-style w-100">
						<div class="text-truncated">Chains</div>
					</label>

					<label for="Selector__Tab2" class="btn btn-style w-100 ml-12px">
						<div class="text-truncated">Slots</div>
					</label>
				</div>

				<div id="Selector__Body" class="body">
					<div id="Selector__Panel1" class="panel"></div>

					<div id="Selector__Panel2" class="panel"></div>
				</div>

				<div id="Selector__Footer" class="footer">
					<label class="checkbox-ios-switch">
						<input type="checkbox" id="Selector__SwitchFiat" class="visually-hidden" autocomplete="off" checked>

						<div>
							<div class="ml-6px">Display in fiat</div>
						</div>
					</label>

					<label class="checkbox-ios-switch mt-12px">
						<input type="checkbox" id="Selector__SwitchZero" class="visually-hidden" autocomplete="off">

						<div>
							<div class="ml-6px">Hide zero balances</div>
						</div>
					</label>
				</div>
			</div>
		</div>
	`;

	document.getElementById('Selector').outerHTML = html;

	setTimeout(() => {
		set_header_wallet_chains();
		set_header_wallet_slots();
	}, 0);

})();

/*** Inject HTML - Panel 1 ***/

const set_header_wallet_chains = () => {
	let chains = '',
		chain_id,
		balance;

	for (chain_id of DATA.CHAINS_ORDER) {
		if (!DATA.slots[DATA.CHAINS[chain_id].CHAIN]) {
			DATA.slots[DATA.CHAINS[chain_id].CHAIN] = [];
		}

		balance = Big(chain_id === DATA.CHAIN_ID && DATA.conf.vault || 0).add(DATA.slots[DATA.CHAINS[chain_id].CHAIN].reduce((a, b) => a.add(b.total_balance), Big(0)));

		chains = `${chains}<button class="btn ${chain_id == DATA.CHAIN_ID && 'active' || ''}" data-pay-chain="${chain_id}">
	<div class="text-truncated" data-balance="${balance}" data-pay-chain="${chain_id}">$${formatFiat(balance.mul(DATA.WPEG_PRICE))}</div>
	<img id="${GetTokenImage(DATA.CHAINS[chain_id].CHAIN_ASSETS)}" src="${DATA.ERROR_IMG}" class="icon-md icon-round mr-6px" data-pay-chain="${chain_id}">
	<div class="text-truncated" data-pay-chain="${chain_id}">${DATA.CHAINS[chain_id].CHAIN}</div>
</button>`;
	}

	document.getElementById('Selector__Panel1').outerHTML = `<div id="Selector__Panel1" class="panel">${chains}</div>`;

};

/*** Inject HTML - Panel 2 ***/

const fiat_crypto_wallet_assets_switcher = (event) => {
	DATA.displayInFiat = !DATA.displayInFiat;

	update_price();

	store.get('displayInFiat', `${DATA.displayInFiat}`);
};

const zero_checkbox_event = (event) => {
	DATA.hideZeroBalances = DATA.hideZeroBalances ? false : true;

	elementify('Selector__Panel1').querySelectorAll('[data-balance="0"]').forEach(balance => {
		balance.parentElement.classList.toggle('d-none');
	});

	elementify('Selector__Panel2').querySelectorAll('[data-balance="0"]').forEach(balance => {
		balance.parentElement.parentElement.classList.toggle('d-none');
	});
};

const set_header_wallet_slots = () => {
	let html = '';

	DATA.slots[DATA.CHAIN].forEach((slot, i) => {
		let old = document.querySelector(`#Selector__Panel2 [slot-total-balance-${DATA.CHAIN}-${slot.address}]`),
			old_balance = 0;

		if (old) {
			old_balance = old.dataset.balance;
		}

		html = html.concat(`
			<div class="slot">
				<button class="btn">
					<div class="text-truncated slot-total-balance-${DATA.CHAIN}-${slot.address}" data-balance="${Big(Number(old_balance) && old_balance || slot.total_balance)}">$${formatFiat(Big(Number(old_balance) && old_balance || slot.total_balance).mul(DATA.WPEG_PRICE))}</div>
					<div class="text-truncated slot-title-${DATA.CHAIN}-${slot.address}">${slot.title || `Slot ${i + 1}`}</div>
				</button>

				<label class="checkbox-svg mr-6px" data-tooltip="${slot.selected && 'Deselect slot' || 'Select slot'}" data-tooltip-alt="${slot.selected && 'Select slot' || 'Deselect slot'}" data-tooltip-left data-action="${slot.selected && 'unselect' || 'select'}" data-slot="${slot.address}">
					<input type="checkbox" class="visually-hidden" autocomplete="off" ${slot.selected && 'checked' || ''}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="${slot.selected && 'unselect' || 'select'}" data-slot="${slot.address}">
						<rect fill="#333333" rx="3" ry="3" width="16" height="16" data-action="${slot.selected && 'unselect' || 'select'}" data-slot="${slot.address}"/>
						<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3Z" data-action="${slot.selected && 'unselect' || 'select'}" data-slot="${slot.address}"/>
						<path d="M13 1Q15 1 15 3V13Q15 15 13 15H3Q1 15 1 13V3Q1 1 3 1ZM3 0Q0 0 0 3V13Q0 16 3 16H13Q16 16 16 13V3Q16 0 13 0H3ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="${slot.selected && 'unselect' || 'select'}" data-slot="${slot.address}"/>
					</svg>
				</label>

				<label class="checkbox-svg" data-tooltip="${slot.is_active && 'Pause slot' || 'Enable slot'}" data-tooltip-alt="${slot.is_active && 'Enable slot' || 'Pause slot'}" data-tooltip-left data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
					<input type="checkbox" class="slot-${slot.address} visually-hidden" autocomplete="off" ${slot.is_active && 'checked' || ''}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
						<circle fill="#333333" cx="8" cy="8" r="8" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
					</svg>
				</label>
			</div>
		`);
	});

	html = '<div id="Selector__Panel2" class="panel">' + html + `<div class="slot"><div class="btn w-100 text-left" data-action="create-slot" data-chain="${DATA.CHAIN}" data-pay-chain="${DATA.CHAIN_ID}">Create Slot</div></div></div>`;

	document.getElementById('Selector__Panel2').outerHTML = html;

	setTimeout(() => {
		/*** Footer - Checkbox display in fiat ***/

		let fiat_checkbox = elementify('Selector__SwitchFiat');

		fiat_checkbox.removeEventListener('change', fiat_crypto_wallet_assets_switcher);
		fiat_checkbox.addEventListener('change', fiat_crypto_wallet_assets_switcher);

		/*** Footer - Checkbox hide zero balances ***/

		let zero_checkbox = elementify('Selector__SwitchZero');

		zero_checkbox.addEventListener('change', zero_checkbox_event);
		zero_checkbox.addEventListener('change', zero_checkbox_event);
	}, 0);
};
