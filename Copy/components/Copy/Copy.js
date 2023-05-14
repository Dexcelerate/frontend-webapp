/**
 * Copy
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="Copy" class="card card-copy">
			<div class="container">
				<div class="wallets"></div>
				<div class="slots"></div>
			</div>
		</div>

		<div id="Feed" class="card card-copy">
			<div class="container">
				<div class="table">
					<div class="header">
						<div class="row">
							<div class="col">
								<button class="btn btn-has-icon" data-togglable="ModalAddWallet" data-tooltip="Add wallet" data-tooltip-right>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
										<circle fill="#191919" cx="8" cy="8" r="8"></circle>
										<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V7.5H11.5A.5.5 0 0111.5 8.5H8.5V11.5A.5.5 0 017.5 11.5V8.5H4.5A.5.5 0 014.5 7.5H7.5V4.5A.5.5 0 018 4Z"></path>
									</svg>
								</button>

								<div class="title ml-4px">Transaction stream</div>
							</div>

							<div class="col">Time</div>

							<div class="col">Name</div>

							<div class="col">TX</div>

							<div class="col">&nbsp;Token 1</div>

							<div class="col">&nbsp;Token 2</div>
						</div>
					</div>

					<div class="body"></div>
				</div>
			</div>
		</div>
	`;

	elementify('Main').insertAdjacentHTML('beforeend', html);

})();

/*** Inject HTML - Slots ***/

const load_slot = (slot, i) => {
	let old = document.querySelector(`Copy__Slot${i} [slot-total-balance-${DATA.CHAIN}-${slot.address}]`),
		old_balance = 0;

	if (old) {
		old_balance = old.dataset.balance;
	}

	return `<div id="Copy__Slot${i}" class="panelbox">
	<input type="radio" name="copy_slot_${i}tab" id="Copy__Slot${i}__Tab1" class="visually-hidden" autocomplete="off" checked>
	<div id="Copy__Slot${i}__Panel1" class="panel panel-main">
		<div class="body">
			<div class="chart">
				<canvas id="Copy__Slot${i}__Chart"></canvas>

				<div class="meta">
					<div class="title text-truncated slot-title-${DATA.CHAIN}-${slot.address}"><a href="https://bscscan.com/address/${slot.address}" target="_blank" title="${slot.address}">${slot.title ? slot.title : `Slot ${i + 1}`}</a></div>
					<div class="balance text-truncated slot-total-balance-${DATA.CHAIN}-${slot.address}" data-balance="${Big(Number(old_balance) && old_balance || slot.total_balance)}">$${formatFiat(Big(Number(old_balance) && old_balance || slot.total_balance).mul(DATA.WPEG_PRICE))}</div>
				</div>
			</div>

			<div class="actions">
				<button class="btn btn-has-icon${slot.address === DATA.selected_copy_slot && ' active' || ''}" data-tooltip="List wallets" data-tooltip-top data-action="list-copy-slot" data-slot="${slot.address}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="list-copy-slot" data-slot="${slot.address}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM7 11.5A.5.5 0 017.5 11H8.5A.5.5 0 018.5 12H7.5A.5.5 0 017 11.5ZM5 8.5A.5.5 0 015.5 8H10.5A.5.5 0 0110.5 9H5.5A.5.5 0 015 8.5ZM3 5.5A.5.5 0 013.5 5H12.5A.5.5 0 0112.5 6H3.5A.5.5 0 013 5.5Z" data-action="list-copy-slot" data-slot="${slot.address}"></path>
					</svg>
				</button>

				<label for="Copy__Slot${i}__Tab5" class="btn btn-has-icon ml-12px" data-tooltip="Deposit funds" data-tooltip-top>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
						<path d="M8 2A.5.5 0 018.5 2.5V8.293L10.646 6.146A.5.5 0 0111.354 6.854L8.354 9.854A.5.5 0 017.646 9.854L4.646 6.854A.5.5 0 115.354 6.146L7.5 8.293V2.5A.5.5 0 018 2ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 001.675 11L14.325 11A7 7 0 008 1ZM13.745 12 2.255 12C5 16 11 16.005 13.745 12Z"></path>
					</svg>
				</label>

				<label for="Copy__Slot${i}__Tab3" class="btn btn-has-icon ml-12px" data-tooltip="Withdraw funds" data-tooltip-top data-action="set-max-slot-withdraw" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="set-max-slot-withdraw" data-slot-idx="${i}">
						<path d="M8 10A.5.5 0 008.5 9.5V3.707L10.646 5.854A.5.5 0 0011.354 5.146L8.354 2.146A.5.5 0 007.646 2.146L4.646 5.146A.5.5 0 105.354 5.854L7.5 3.707V9.5A.5.5 0 008 10ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 001.675 11L14.325 11A7 7 0 008 1ZM13.745 12 2.255 12C5 16 11 16.005 13.745 12Z" data-action="set-max-slot-withdraw" data-slot-idx="${i}"></path>
					</svg>
				</label>

				<!-- <label for="Copy__Slot${i}__Tab4" class="btn btn-has-icon ml-12px" data-tooltip="Rebalance funds" data-tooltip-top data-action="reset-slot-ratio" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="reset-slot-ratio" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 4A.5.5 0 018.5 4.5V6H10A.5.5 0 0110 7H8.5V8.5A.5.5 0 017.5 8.5V7H6A.5.5 0 016 6H7.5V4.5A.5.5 0 018 4ZM5.5 10.5A.5.5 0 016 10H10A.5.5 0 0110 11H6A.5.5 0 015.5 10.5Z" data-action="reset-slot-ratio" data-slot-idx="${i}"></path>
					</svg>
				</label> -->

				<label class="checkbox-svg ml-12px" data-tooltip="${slot.is_active ? 'Pause slot' : 'Enable slot'}" data-tooltip-alt="${slot.is_active ? 'Enable slot' : 'Pause slot'}" data-tooltip-top data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
					<input type="checkbox" class="slot-${slot.address} visually-hidden" autocomplete="off" ${slot.is_active ? 'checked' : ''}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${slot.address}" data-wallet="${DATA.ZERO}" data-action="toggle_copy_wallet_state"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<input type="radio" name="copy_slot_${i}tab" id="Copy__Slot${i}__Tab5" class="visually-hidden" autocomplete="off">

	<div id="Copy__Slot${i}__Panel5" class="panel panel-currency">
		<div class="head">
			<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Select currency</div>
		</div>

		<div class="body slot-currencies-container" data-slot="${slot.address}" data-slot-idx="${i}" data-is-copy-slot="true"></div>
	</div>

	<input type="radio" name="copy_slot_${i}tab" id="Copy__Slot${i}__Tab2" class="visually-hidden" autocomplete="off">

	<div id="Copy__Slot${i}__Panel2" class="panel panel-transfer">
		<div class="head">
			<label for="Copy__Slot${i}__Tab5" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Deposit funds</div>
		</div>

		<div class="body">
			<input type="text" class="form-control" placeholder="0.00" autocomplete="off" spellcheck="false" oninput="update_range(this, 'copy-slot-${i}-deposit-range')">

			<div class="d-flex w-100">
				<input id="copy-slot-${i}-deposit-range" type="range" min="0" max="${Big(slot.balance).mul(DATA.WPEG_PRICE)}" step="0.001" value="0">

				<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="deposit" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="deposit" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="deposit" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<input type="radio" name="copy_slot_${i}tab" id="Copy__Slot${i}__Tab3" class="visually-hidden" autocomplete="off">

	<div id="Copy__Slot${i}__Panel3" class="panel panel-transfer">
		<div class="head">
			<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"/>
				</svg>
			</label>

			<div>Withdraw funds</div>
		</div>

		<div class="body">
			<input type="text" class="form-control" placeholder="0.00" autocomplete="off" spellcheck="false" oninput="update_range(this, 'copy-slot-${i}-withdraw-range')">

			<div class="d-flex w-100">
				<input id="copy-slot-${i}-withdraw-range" type="range" min="0" max="${Big(slot.balance).mul(DATA.WPEG_PRICE)}" step="0.001" value="0">

				<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="withdraw" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="withdraw" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="withdraw" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div>

	<!-- <input type="radio" name="copy_slot_${i}tab" id="Copy__Slot${i}__Tab4" class="visually-hidden" autocomplete="off">

	<div id="Copy__Slot${i}__Panel4" class="panel panel-balance">
		<div class="head">
			<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon">
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

				<label for="Copy__Slot${i}__Tab1" class="btn btn-has-icon ml-12px" data-tooltip="Confirm" data-tooltip-left data-action="rebalance_slot_ratio" data-slot-idx="${i}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-action="rebalance_slot_ratio" data-slot-idx="${i}">
						<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM10.604 6.146A.5.5 0 0110.604 6.854L7.604 9.854A.5.5 0 016.896 9.854L5.396 8.354A.5.5 0 116.104 7.646L7.25 8.793 9.896 6.146A.5.5 0 0110.604 6.146Z" data-action="rebalance_slot_ratio" data-slot-idx="${i}"/>
					</svg>
				</label>
			</div>
		</div>
	</div> -->
</div>`;
};

function range_input_in_transfer_panels (e) {
	e.target.parentElement.parentElement.querySelector('input[type="text"]').value = DATA.displayInFiat ? formatFiat(e.target.value) : e.target.value;
}

function range_input_in_balance_panels (e) {
	const nativeBalance = e.target.parentElement.parentElement.querySelector('.native');
	const wrappedBalance = e.target.parentElement.parentElement.querySelector('.wrapped');
	const n = Big(nativeBalance.dataset.nativeValue).mul(e.target.value || 0).div(100);
	const w = Big(wrappedBalance.dataset.wrappedValue).mul(100 - Number(e.target.value || 0)).div(100);
	nativeBalance.textContent = DATA.displayInFiat ? '$' + formatFiat(n.mul(DATA.WPEG_PRICE)) : Number(n).toFixed(5);
	wrappedBalance.textContent = DATA.displayInFiat ? '$' + formatFiat(w.mul(DATA.WPEG_PRICE)) : Number(w).toFixed(5);
}

const sorted_slots = () => {
	let tmp = JSON.parse(JSON.stringify(DATA.slots[DATA.CHAIN] || (DATA.slots[DATA.CHAIN] = [])));

	tmp.sort((a, b) => {
		a = new Date(a.created_at);
		b = new Date(b.created_at);

		if (a < b) {
			return -1;
		} else if (a > b) {
			return 1;
		}

		return 0;
	});

	return tmp;
};

const load_slots = async () => {
	document.querySelectorAll('#Copy .slots .panel-transfer input[type="range"]').forEach(inputRange => {
		inputRange.removeEventListener('input', range_input_in_transfer_panels);
	});

	/*** Range input in balance panels ***/

	document.querySelectorAll('#Copy .slots .panel-balance input[type="range"]').forEach(inputRange => {
		inputRange.removeEventListener('input', range_input_in_balance_panels);
	});

	document.querySelector('#Copy .slots').innerHTML = `${sorted_slots().map(load_slot).join('')}

<div id="Copy__Slot__Create" class="panelbox">
	<input type="radio" name="Copy_slot_create_tab" id="Copy__Slot__Create__Tab1" class="visually-hidden" autocomplete="off" checked data-action="create-slot" data-chain="${DATA.CHAIN}">

	<div id="Copy__Slot__Create__Panel1" class="panel panel-main">
		<div class="body">
			<label for="Copy__Slot__Create__Tab3" class="btn btn-has-icon d-flex h-100 w-100">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg mx-auto my-auto">
					<path d="M8 2A.5.5 0 018.5 2.5V7.5H13.5A.5.5 0 0113.5 8.5H8.5V13.5A.5.5 0 017.5 13.5V8.5H2.5A.5.5 0 012.5 7.5H7.5V2.5A.5.5 0 018 2Z"/>
				</svg>
			</label>
		</div>
	</div>

	<input type="radio" name="Copy_slot_create_tab" id="Copy__Slot__Create__Tab3" class="visually-hidden" autocomplete="off" data-action="create-slot" data-chain="${DATA.CHAIN}">

	<div id="Copy__Slot__Create__Panel3" class="panel panel-transfer">
		<div class="body">
			<div class="w-100 h-100 d-flex">
				<label for="Copy__Slot__Create__Tab1" class="lds-ellipsis p-2em"><div></div><div></div><div></div><div></div></label>
			</div>
		</div>
	</div>
</div>`;

	/*** Range input in transfer panels ***/

	document.querySelectorAll('#Copy .slots .panel-transfer input[type="range"]').forEach(inputRange => {
		inputRange.addEventListener('input', range_input_in_transfer_panels);
	});

	/*** Range input in balance panels ***/

	document.querySelectorAll('#Copy .slots .panel-balance input[type="range"]').forEach(inputRange => {
		inputRange.addEventListener('input', range_input_in_balance_panels);
	});

	DATA.slots[DATA.CHAIN].map((v, k)=> getChartConfig(`Copy__Slot${k}__Chart`, v.history));
};

(() => {
	if(DATA.selected_copy_slot === "0x0000000000000000000000000000000000000000") {
		DATA.selected_copy_slot = DATA.selected_slot;
	}

	load_slots();
	load_wallet_slots();
	set_wallet_assets();
	set_wallet_chains_slots();
	add_wallets();

	setTimeout(function() { 
		handleAction('user_slot_copies');
		set_address_transactions();

	}, 500);

	setInterval(() => {
		if(DATA.selected_copy_slot === "0x0000000000000000000000000000000000000000") DATA.selected_copy_slot = DATA.selected_slot;
		if (!DATA.blured && DATA.view === 'copy' && elementify('ModalCopyPositionSettings').classList.contains('d-none')) {
			handleAction('copies');
		}
	}, 10000);


})();

