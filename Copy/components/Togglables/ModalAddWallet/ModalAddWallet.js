/**
 * Modal Add Wallet
 */

/*** Inject HTML ***/

(() => {
    const html = `
		<div id="ModalAddWallet" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalAddWallet"></div>

			<div class="container">
				<div id="ModalAddWallet__Header" class="header">
					<div class="text-white text-bold text-truncated">ADD WALLET</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalAddWallet">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalAddWallet__Body" class="body">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Address" onkeyup="check_action_click(event, 'add-wallet')" spellcheck="false">
					</div>

					<div class="input-group">
						<input type="text" class="form-control" placeholder="Name" onkeyup="check_action_click(event, 'add-wallet')" spellcheck="false">
					</div>
				</div>

				<div id="ModalAddWallet__Footer" class="footer">
					<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalAddWallet" id="add-wallet">Confirm</button>
				</div>
			</div>
		</div>
	`;

    elementify('Root').insertAdjacentHTML('beforeend', html);
})();

/*** Add wallet ***/

(() => {
    let inputName = document.querySelector('#ModalAddWallet__Body input[placeholder="Name"]'),
        inputAddress = document.querySelector('#ModalAddWallet__Body input[placeholder="Address"]');

    elementify('add-wallet').addEventListener('click', async (event) => {
        let address = inputAddress.value.trim().split('#')[0].split('/').slice(-1)[0],
            title = inputName.value.trim();

        if (!address.startsWith('0x')) {
            address = `0x${address}`;
        }

        try {
            address = toChecksumAddress(address);
        } catch (e) {
            return help_err('Bad address (checksum check failed)');
        }

        if (!address || Number(address) < Number('0x10000')) {
            return help_err('Bad address (null, not a number, or 0x10000)');
        }

        if ((!DATA.selected_copy_slot || DATA.selected_copy_slot === DATA.ZERO) && DATA.conf.connected && DATA.slots[DATA.CHAIN].length) {
            DATA.slot_copies_addresses = [(DATA.selected_copy_slot = DATA.slots[DATA.CHAIN][0].address)];
            document.querySelectorAll('button[data-action="list-copy-slot"]').forEach((el) => el.classList.remove('active'));
            document.querySelector(`button[data-action="list-copy-slot"][data-slot="${DATA.selected_slot}"]`).classList.add('active');
        }

        if (!DATA.copy_settings[DATA.selected_copy_slot]) {
            DATA.copy_settings[DATA.selected_copy_slot] = {};
        }

        if (DATA.copy_settings[DATA.selected_copy_slot][address]) {
            if (DATA.copy_settings[DATA.selected_copy_slot][address].title) {
                return help_err(`Address already exists as "${DATA.copy_settings[DATA.selected_copy_slot][address].title}"`);
            }
            return help_err('Address already exists');
        }

        if (!title) {
            return help_err('No name');
        }

        DATA.selected_copy_wallet = DATA.copy_wallet = address;

        if (!DATA.copy_transactions[DATA.selected_slot]) {
            DATA.copy_transactions[DATA.selected_slot] = {};
        }

        DATA.copy_transactions[DATA.selected_slot][address] = [];

        DATA.copy_settings[DATA.selected_copy_slot][address] = {
            ...DATA.default_copy_settings,
            title,
            address: address,
            balance: Big(0),
            is_ca: '0x' !== (await provider[DATA.CHAIN_ID].getCode(address)),
            kosher_strainer: [],
            targets_percents: [],
            targets_triggers: [],
            buy_method_ids: [],
            sell_method_ids: [],
        };

        document.querySelector('#Copy .wallets').prepend(
            htmlToElement(`
			<div class="wallet" data-slot="${DATA.selected_slot}" data-wallet="${address}">
				<div class="header">
					<button class="btn btn-has-icon btn-toggle" data-action="set-first-wallet">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none" data-action="set-first-wallet">
							<path d="M6.146 3.646A.5.5 0 006.146 4.354L9.793 8 6.146 11.646A.5.5 0 006.854 12.354L10.854 8.354A.5.5 0 0010.854 7.646L6.854 3.646A.5.5 0 006.146 3.646Z" data-action="set-first-wallet"></path>
							<path d="M3.646 6.146A.5.5 0 014.354 6.146L8 9.793 11.646 6.146A.5.5 0 0112.354 6.854L8.354 10.854A.5.5 0 017.646 10.854L3.646 6.854A.5.5 0 013.646 6.146Z" data-action="set-first-wallet"></path>
						</svg>
					</button>

					<div class="name text-white text-truncated">${title}</div>

					<button class="btn btn-has-icon mt-2px ml-6px mr-6px copy-copy-wallet" onclick="copyTextToClipboard('${address}', event, this)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
							<path d="M0 2A2 2 0 012 0H10A2 2 0 0112 2V4H14A2 2 0 0116 6V14A2 2 0 0114 16H6A2 2 0 014 14V12H2A2 2 0 010 10V2ZM5 12V14A1 1 0 006 15H14A1 1 0 0015 14V6A1 1 0 0014 5H12V10A2 2 0 0110 12H5Z"></path>
						</svg>
					</button>

					<div class="amount ml-6px mr-6px">$${formatFiat(DATA.copy_settings[DATA.selected_copy_slot][address].balance)}</div>

					<div class="actions ml-auto">
						<button class="btn btn-has-icon" data-togglable="ModalDeleteWallet" data-tooltip="Delete" data-tooltip-left data-slot="${DATA.selected_slot}" data-wallet="${address}">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md pe-none">
								<circle fill="#191919" cx="8" cy="8" r="8"></circle>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path>
							</svg>
						</button>

						<label class="checkbox-svg ml-6px" data-tooltip="Pause" data-tooltip-alt="Enable" data-tooltip-left data-slot="${DATA.selected_slot}" data-wallet="${address}" data-action="toggle_copy_wallet_state">
							<input type="checkbox" class="slot-${DATA.selected_slot} visually-hidden" autocomplete="off">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md" data-slot="${DATA.selected_slot}" data-wallet="${address}" data-action="toggle_copy_wallet_state">
								<circle fill="#191919" cx="8" cy="8" r="8" data-slot="${DATA.selected_slot}" data-wallet="${address}" data-action="toggle_copy_wallet_state"></circle>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.521 5.055A.5.5 0 017.041 5.093L10.541 7.593A.5.5 0 0110.541 8.407L7.041 10.907A.5.5 0 016.25 10.5V5.5A.5.5 0 016.521 5.055Z" data-slot="${
                                    DATA.selected_slot
                                }" data-wallet="${address}" data-action="toggle_copy_wallet_state"></path>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.5 5A.5.5 0 017 5.5V10.5A.5.5 0 016 10.5V5.5A.5.5 0 016.5 5ZM9.5 5A.5.5 0 0110 5.5V10.5A.5.5 0 019 10.5V5.5A.5.5 0 019.5 5Z" data-slot="${
                                    DATA.selected_slot
                                }" data-wallet="${address}" data-action="toggle_copy_wallet_state"></path>
							</svg>
						</label>

						<button class="btn btn-has-icon ml-6px" data-togglable="ModalCopyPositionSettings" data-tooltip="Settings" data-tooltip-left data-slot="${DATA.selected_slot}" data-wallet="${address}" data-action="load-wallet-settings">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
								<circle fill="#191919" cx="8" cy="8" r="8"></circle>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4 11A.5.5 0 014.5 10.5H11.5A.5.5 0 0111.5 11.5H4.5A.5.5 0 014 11ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8ZM4 5A.5.5 0 014.5 4.5H11.5A.5.5 0 0111.5 5.5H4.5A.5.5 0 014 5Z"></path>
							</svg>
						</button>
					</div>
				</div>

				<div class="body">
					<div class="transaction">Spectating...</div>
				</div>
			</div>
		`)
        );

        handleAction('fcopy'); /* Fresh copy :) */
        handleAction('slot_copies');

        inputName.value = '';
        inputAddress.value = '';
    });
})();
