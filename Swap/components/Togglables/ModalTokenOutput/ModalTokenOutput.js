/**
 * Modal Token Output
 */

/*** Inject HTML ***/

(() => {

	let tokens = '',
		rendered = {},
		token,
		chain;

	for (token in DATA.last_tokens) {
		rendered[DATA.last_tokens[token].D] = true;
		tokens = `${tokens}<button class="btn item" data-token-address="${DATA.last_tokens[token].D}">
	<img id="${GetTokenImage(DATA.last_tokens[token].D)}" src="${DATA.ERROR_IMG}" class="icon-round">
	<div class="meta">
		<div class="symbol text-truncated w-100">${DATA.last_tokens[token].y}</div>
		<div class="name text-truncated w-100">${DATA.last_tokens[token].M}</div>
	</div>
</button>`;
	}

	for (chain in DATA.CHAINS[DATA.CHAIN_ID].BASE_TOKENS_NAMES) {
		if (chain !== `W${DATA.PEG}` && !rendered[DATA.CHAINS[DATA.CHAIN_ID].TOKENS_MAP[chain]]) {
			tokens = `${tokens}<button class="btn item" data-token-address="${DATA.CHAINS[DATA.CHAIN_ID].TOKENS_MAP[chain]}">
		<img id="${GetTokenImage(DATA.CHAINS[DATA.CHAIN_ID].TOKENS_MAP[chain])}" src="${DATA.ERROR_IMG}" class="icon-round">
		<div class="meta">
			<div class="symbol text-truncated w-100">${chain}</div>
			<div class="name text-truncated w-100">${DATA.CHAINS[DATA.CHAIN_ID].BASE_TOKENS_NAMES[chain]}</div>
		</div>
	</button>`;
		}
	}

	const html = `
		<div id="ModalTokenOutput" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalTokenOutput"></div>

			<div class="container">
				<div id="ModalTokenOutput__Header" class="header">
					<div class="text-white text-bold text-truncated">OUTPUT TOKEN</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalTokenOutput">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalTokenOutput__Body" class="body">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Address" onkeyup="check_action_click(event, 'confirm-output-token')" spellcheck="false">
						<button class="btn btn-has-icon" tabindex="-1">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
								<circle fill="#262626" cx="8" cy="8" r="8"></circle>
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path>
							</svg>
						</button>
					</div>

					<div class="list">
						${tokens}
					</div>
				</div>

				<div id="ModalTokenOutput__Footer" class="footer">
					<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalTokenOutput" data-action="token" id="confirm-output-token">Confirm</button>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

/*** Address input reset button ***/

(() => {

	document.querySelector('#ModalTokenOutput .input-group .btn').addEventListener('click', event => {
		document.querySelector('#ModalTokenOutput .input-group input[type="text"]').value = '';
		document.querySelector('#ModalTokenOutput .input-group input[type="text"]').focus();
		document.querySelectorAll('#ModalTokenOutput .list .item.active').forEach(activeItem => {
			activeItem.classList.remove('active');
		});
	});

	/*** Token list selector ***/

	document.querySelectorAll('#ModalTokenOutput .list .item').forEach(async (item) => {
		item.addEventListener('click', async () => { (await set_token(item))() });
	});

})();