/**
 * Modal Token Input
 */

/*** Inject HTML ***/

(() => {

	let tokens = '',
		chain;

	for (chain in DATA.CHAINS[DATA.CHAIN_ID].BASE_TOKENS_NAMES) {
		if (chain !== `W${DATA.PEG}`) {
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
		<div id="ModalTokenInput" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalTokenInput"></div>

			<div class="container">
				<div id="ModalTokenInput__Header" class="header">
					<div class="text-white text-bold text-truncated">INPUT TOKEN</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalTokenInput">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalTokenInput__Body" class="body">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Address" onkeyup="check_action_click(event, 'confirm-input-token')" spellcheck="false">
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

				<div id="ModalTokenInput__Footer" class="footer">
					<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalTokenInput" id="confirm-input-token">Confirm</button>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

/*** Address input reset button ***/

(() => {

	document.querySelector('#ModalTokenInput .input-group .btn').addEventListener('click', event => {
		document.querySelector('#ModalTokenInput .input-group input[type="text"]').value = '';
		document.querySelector('#ModalTokenInput .input-group input[type="text"]').focus();
		document.querySelectorAll('#ModalTokenInput .list .item.active').forEach(activeItem => {
			activeItem.classList.remove('active');
		});
		document.querySelector('#Swap__InputCurrency .image').lastElementChild.remove();
		document.querySelector('#Swap__InputCurrency .symbol > div ').innerText = 'Token';
	});

})();

/*** Token list selector ***/

(() => {

	document.querySelectorAll('#ModalTokenInput .list .item').forEach(item => {

		item.addEventListener('click', event => {
			document.querySelectorAll('#ModalTokenInput .list .item.active').forEach(activeItem => {
				activeItem.classList.remove('active');
			});
			item.classList.add('active');
			document.querySelector('#ModalTokenInput input[type="text"]').value = item.dataset.tokenAddress;
			document.querySelector('#Swap__InputCurrency .image').insertAdjacentHTML('beforeend', `<img src="${item.querySelector('img').src}" class="icon-round" onerror="error_img(this)">`);
			document.querySelector('#Swap__InputCurrency .symbol > div ').innerText = item.querySelector('.meta .symbol').innerText;
			document.querySelector('#ModalTokenInput__Footer > .btn').click();
		});

	});

})();
