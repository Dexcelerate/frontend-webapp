/**
 * Modal Sell
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="ModalSell" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalSell"></div>

			<div class="container">
				<div id="ModalSell__Header" class="header">
					<div class="text-white text-bold text-truncated">SELL TOKEN</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalSell">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalSell__Body" class="body">
					<div class="slider">
						<div class="input-group has-addon">
							<input type="text" class="form-control" placeholder="0" autocomplete="off">
							<div class="addon">%</div>
						</div>

						<div class="mt-6px">
							<input type="range" min="0.1" max="100" step="0.1" value="0">
						</div>
					</div>

					<div class="shortcuts mt-4px">
						<div class="d-flex">
							<button class="btn btn-style w-100 p-0px">10%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">20%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">30%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">40%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">50%</button>
						</div>

						<div class="d-flex mt-6px">
							<button class="btn btn-style w-100 p-0px">60%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">70%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">80%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">90%</button>
							<button class="btn btn-style w-100 p-0px ml-6px">100%</button>
						</div>
					</div>
				</div>

				<div id="ModalSell__Footer" class="footer">
					<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalSell" data-action="sell">Confirm</button>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();


(() => {

	const textInput = document.querySelector('#ModalSell__Body input[type="text"]');
	const rangeInput = document.querySelector('#ModalSell__Body input[type="range"]');
	const shortcutButtons = document.querySelectorAll('#ModalSell__Body .shortcuts .btn');

	textInput.addEventListener('input', event => {
		if (textInput.value > 100) {
			textInput.value = 100;
		}
		if (textInput.value < 0) {
			textInput.value = 0;
		}
		DATA.sell_percent = (rangeInput.value = textInput.value);
	});

	rangeInput.addEventListener('input', event => {
		DATA.sell_percent = (textInput.value = rangeInput.value);
	});

	shortcutButtons.forEach(shortcutButton => {
		shortcutButton.addEventListener('click', event => {
			const shortcutButtonPercent = shortcutButton.innerText.slice(0, -1).trim();
			DATA.sell_percent = (textInput.value = (rangeInput.value = shortcutButtonPercent));
			shortcutButton.blur();
		});
	});

})();