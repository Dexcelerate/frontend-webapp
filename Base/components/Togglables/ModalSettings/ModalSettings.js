/**
 * Modal Settings
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="ModalSettings" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalSettings"></div>

			<div class="container">
				<div id="ModalSettings__Header" class="header">
					<div class="text-white text-bold text-truncated">Settings</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalSettings">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalSettings__Body" class="body">

					<!-- Go Anonymous -->

					<div class="label text-white d-flex mb-12px">
						<div>Go Anonymous</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>


					<div class="input-group checkbox-btn w-100 is-colored">
						<input type="checkbox" id="input_goanon" name="is_strategy_manual" class="visually-hidden" ${DATA.conf.is_anonymous && 'checked' || ''}>

						<label for="input_goanon" data-inner-text-alt="ON" data-disabled-functionality="true" data-action="${DATA.conf.is_anonymous && 'un' || ''}anonymize">OFF</label>
					</div>

					<!-- Connect Telegram -->

					<div class="label text-white d-flex mb-12px">
						<div>Connect Telegram</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>


					<div class="input-group">
						<a href="https://t.me/jewbot_connect_0_bot?start=${DATA.conf.wallet}" onclick="handle_tg(event)" target="_blank" ref="nofollow" class="btn btn-style text-white w-100">Connect Telegram</a>
					</div>

					<!-- Fiat Currency -->

					<div class="label text-white d-flex mb-12px">
						<div>Fiat Currency</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div id="ModalSettings__SelectorCurrency" class="selector dropdown-has-title" data-dropdown data-disabled-functionality="true">
						<input type="checkbox" id="ModalSettings__SelectorCurrency__Checkbox" class="visually-hidden">

						<label for="ModalSettings__SelectorCurrency__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown data-disabled-functionality="true">
							<div class="d-flex text-white">
								<div>USD</div>
							</div>

							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
								<path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"></path>
							</svg>
						</label>

						<ul class="list-unstyled">
							<div class="title text-center">CURRENCIES</div>

							<div class="wrapper">
								<li>
									<button class="btn btn-style active">
										<div>USD</div>
									</button>
								</li>

								<li>
									<button class="btn btn-style">
										<div>EUR</div>
									</button>
								</li>

								<li>
									<button class="btn btn-style">
										<div>GBP</div>
									</button>
								</li>

								<li>
									<button class="btn btn-style">
										<div>YEN</div>
									</button>
								</li>
							</div>
						</ul>
					</div>

					<!-- System Language -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>System Language</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div id="ModalSettings__SelectorSystemLanguage" class="selector dropdown-has-title" data-dropdown>
						<input type="checkbox" id="ModalSettings__SelectorSystemLanguage__Checkbox" class="visually-hidden">

						<label for="ModalSettings__SelectorSystemLanguage__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown data-disabled-functionality="true">
							<div class="d-flex text-white">
								<div>English</div>
							</div>

							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
								<path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"></path>
							</svg>
						</label>

						<ul class="list-unstyled">
							<div class="title text-center">LANGUAGES</div>

							<div class="wrapper">
								${DATA.LANGS.map((v, i) => {
									return '<li><button class="btn btn-style' + (!i && ' active' || '') + '" data-lang="' + v[0] + '"><div>' + v[1] + '</div></button></li>';
								}).join('')}
							</div>
						</ul>
					</div>

					<!-- Sound -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Sound</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>


					<div class="input-group checkbox-btn w-100 is-colored">
						<input type="checkbox" id="input_sound" name="is_strategy_manual" class="visually-hidden">

						<label for="input_sound" data-inner-text-alt="ON" data-disabled-functionality="true">OFF</label>
					</div>


					<!-- Music -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Music</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>


					<div class="input-group checkbox-btn w-100 is-colored">
						<input type="checkbox" id="input_music" name="is_strategy_manual" class="visually-hidden">

						<label for="input_music" data-inner-text-alt="ON" data-disabled-functionality="true">OFF</label>
					</div>

					<!-- Trades Threshold -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Trades Threshold</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Some text">
							${DATA.ERROR_IMG_HTML}
						</button>

					</div>

					<div class="d-flex w-100 mb-12px">
						<input type="range" min="1" max="1000000000" step="1" value="1000" disabled="true">
					</div>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

/*** Language selector ***/

(() => {

	const selector = elementify('ModalSettings__SelectorSystemLanguage');

	selector.querySelectorAll('ul .btn').forEach(button => {
		button.addEventListener('click', event => {
			selector.querySelector('label > div').innerHTML = button.innerHTML;
			selector.querySelector('.btn.active').classList.remove('active');
			button.classList.add('active');
			selector.querySelector('input[type="checkbox"]').checked = false;
		});
	});

})();

/*** Currency selector ***/

(() => {

	const selector = elementify('ModalSettings__SelectorCurrency');

	selector.querySelectorAll('ul .btn').forEach(button => {
		button.addEventListener('click', event => {
			selector.querySelector('label > div').innerHTML = button.innerHTML;
			selector.querySelector('.btn.active').classList.remove('active');
			button.classList.add('active');
			selector.querySelector('input[type="checkbox"]').checked = false;
		});
	});

})();

const handle_tg = (e) => {
	if (!DATA.conf.connected) {
		e.preventDefault();
		on_connect(() => {
			window.open(`https://t.me/jewbot_connect_0_bot?start=${DATA.conf.wallet}`);
		});
	}
};
