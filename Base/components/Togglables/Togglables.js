/**
 * Togglables
 */

/* const toggleElements = document.querySelectorAll('[data-togglable]'); */
/* const togglableElements = document.querySelectorAll('.togglable'); */

let activeToggle, activeTogglable;

function toggleModal(toggle) {
	const togglable = elementify(toggle.dataset.togglable);

	if (toggle === activeToggle) {
		toggle.classList.remove('active');
		togglable.classList.add('d-none');
		[activeToggle, activeTogglable] = [null, null];
		if (!document.querySelectorAll('.togglable:not(.d-none)').length) {
			document.body.classList.remove('lock-scroll');
		}
	} else {
		if (activeToggle) {
			activeToggle.classList.remove('active');
			activeTogglable.classList.add('d-none');
			if (toggle.classList.contains('lightbox')) {
				[activeToggle, activeTogglable] = [null, null];
				if (!document.querySelectorAll('.togglable:not(.d-none)').length) {
					document.body.classList.remove('lock-scroll');
				}
				return;
			}
		}

		toggle.classList.toggle('active');
		togglable.classList.toggle('d-none');
		[activeToggle, activeTogglable] = [toggle, togglable];
	}
};

const help_err = (text) => {
	elementify('ModalHelp__Body').innerHTML = text || 'Coming soon...';
	elementify('ModalHelp').classList.toggle('d-none');
	if (!document.querySelectorAll('.togglable:not(.d-none)').length) {
		document.body.classList.remove('lock-scroll');
	}
};

function handleToggleClick(toggle) {
	const togglable = elementify(toggle.dataset.togglable);

	toggle.blur();

	if (window.innerWidth < 960) {
		document.body.classList.add('lock-scroll');
	}

	/* put ModalHelp always on top and never close other togglables */
	if (toggle.dataset.togglable === 'ModalHelp') {
		return help_err(toggle.dataset.help);
	}

	/* on mobile and desktop we want the selector to remain open until user closes it manually */
	if (toggle.dataset.togglable === 'Selector') {
		toggle.classList.toggle('active');
		elementify(toggle.dataset.togglable).classList.toggle('d-none');
		if (!document.querySelectorAll('.togglable:not(.d-none)').length) {
			document.body.classList.remove('lock-scroll');
		}
		return;
	}

	/* on desktop we want the chat to remain open until user closes it manually */
	if (window.innerWidth >= 960 && toggle.dataset.togglable === 'Chat') {
		toggle.classList.toggle('active');
		elementify(toggle.dataset.togglable).classList.toggle('d-none');
		return;
	}

	toggleModal(toggle)
};

(() => {

	elementify('Root').addEventListener('click', event => {
		event.stopPropagation();
		event.stopImmediatePropagation();

		if (event.target.dataset) {
			if (event.target.dataset.disabledFunctionality) {
				event.preventDefault();
				return;
			}

			/* Set copy wallet */
			if (event.target.dataset.wallet) {
				DATA.selected_copy_wallet = event.target.dataset.wallet;
			}

			/* Set copy pids */
			if (typeof event.target.dataset.pids === 'string') {
				DATA.pids = event.target.dataset.pids.split(',').filter(v => v);
			}

			/* Set copy pair-router */
			if (event.target.dataset.pairRouter) {
				DATA.router = DATA.token_data.router = event.target.dataset.pairRouter;
			}

			/* Set copy slot */
			if (event.target.dataset.slot) {
				DATA.selected_slot = event.target.dataset.slot;
			}

			/* Set selected token */
			if (event.target.dataset.selectedToken) {
				DATA.selected_token = event.target.dataset.selectedToken;
			}

			/* Set selected sell slot */
			if (event.target.dataset.sellSlot) {
				DATA.selected_sell_slot = event.target.dataset.sellSlot;
			}

			/* Set chain */
			if (event.target.dataset.chain) {
				DATA.selected_chain = event.target.dataset.chain;
			}

			/* Set pay token */
			if (event.target.dataset.payToken) {
				DATA.pay_token = event.target.dataset.payToken;
			}

			/* Set pay slot */
			if (event.target.dataset.paySlot) {
				DATA.pay_slot = event.target.dataset.paySlot;
			}

			/* Set pay slot idx */
			if (event.target.dataset.paySlotIdx) {
				DATA.pay_slot_idx = Number(event.target.dataset.paySlotIdx);
			}

			/* Set view uid */
			if (event.target.dataset.viewUid) {
				DATA.view_uid = event.target.dataset.viewUid;
			}

			/* Set nft */
			if (event.target.dataset.nft) {
				DATA.selected_nft = event.target.dataset.nft;
			}

			/* Set view chain */
			if (event.target.dataset.viewChain) {
				DATA.view_chain = event.target.dataset.viewChain;
			}

			/* Set room */
			if (event.target.dataset.room) {
				if (DATA.chat.length) {
					/* Cache current chat */
					DATA.chats[DATA.room] = DATA.chat;
				}

				DATA.chat = [];
				DATA.prev_room = DATA.room;
				DATA.rooms = [DATA.room = event.target.dataset.room];

				set_chat(DATA.chat);
				handleAction('sub');
				save_settings('rooms');
			}

			/* When action needs a network change */
			if (event.target.dataset.payChain && event.target.dataset.payChain != DATA.CHAIN_ID) {
				return change_network(DATA.CHAINS[event.target.dataset.payChain].CHAIN);
			}

			if (event.target.dataset.togglable) {
				handleToggleClick(event.target);
			}

			if (event.target.dataset.action) {
				_handleAction(event.target);
			}

			if (event.target.dataset.view) {
				bootstrap(event.target.dataset.view, false, true);

				if (event.target.dataset.togglable) {
					handleToggleClick(event.target);
				}
			}
		}
	});

})();

/* on window resize we reset all toggles and togglables with half second debounce */
/* let resizeTimeout;
window.addEventListener('resize', () => {
    if (!!resizeTimeout){
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
        toggleElements.forEach(toggle => toggle.classList.remove('active'));
        togglableElements.forEach(togglable => togglable.classList.add('d-none'));
        [activeToggle, activeTogglable] = [null, null];
    }, 500);
}); */
