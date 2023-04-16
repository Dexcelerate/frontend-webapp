/**
 * Menu
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="Menu" class="togglable d-none">
			<div class="lightbox" data-togglable="Menu"></div>

			<div class="container">
				<div id="Menu__Header" class="header">
					<div class="container">
						<button class="btn" data-togglable="ModalProfile">
							<img src="${DATA.ERROR_USER_IMG}" onerror="error_user_img(this)" data-user-image="true">
						</button>

						<div class="meta">
							<div class="d-flex">
								<div class="user d-flex align-items-center">
									<button id="userPrev" class="btn btn-has-icon" data-togglable="ModalChangeUser">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M3.86 8.753 9.342 13.549C9.988 14.115 11 13.655 11 12.796V3.204A1 1 0 009.341 2.451L3.861 7.247A1 1 0 003.861 8.753Z"></path>
										</svg>
									</button>

									<div class="btn name text-white text-truncated" data-togglable="ModalProfile" data-username="true">${DATA.view_user.title || (DATA.view_user.uid && ('User #' + DATA.view_user.uid)) || 'Guest'}</div>

									<button id="userNext" class="btn btn-has-icon" data-togglable="ModalChangeUser">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
											<path d="M12.14 8.753 6.658 13.549C6.012 14.115 5 13.655 5 12.796V3.204A1 1 0 016.659 2.451L12.139 7.247A1 1 0 0112.139 8.753Z"></path>
										</svg>
									</button>
								</div>

								<div class="level fs-0 ml-auto">LVL${get_level(DATA.view_rank && DATA.view_rank[DATA.CHAIN] && DATA.view_rank[DATA.CHAIN].wager || 0)}</div>
							</div>

							<div class="progress-bar" data-progress-value="${get_next_level_percent(DATA.CHAIN)}" id="menu-user-chain-level">
								<div class="progress-bar-fill" style="width: ${get_next_level_percent(DATA.CHAIN)}px"></div>
							</div>
						</div>
					</div>
				</div>

				<div id="Menu__Body" class="body">
					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M9.669.864 8 0 6.331.864 4.473 1.146 3.631 2.826 2.294 4.146 2.6 6 2.294 7.854 3.631 9.174 4.473 10.854 6.331 11.136 8 12 9.669 11.136 11.527 10.854 12.369 9.174 13.706 7.854 13.4 6 13.706 4.146 12.369 2.826 11.527 1.146 9.669.864ZM10.865 2.057 11.549 3.422 12.635 4.494 12.387 6 12.635 7.506 11.549 8.578 10.865 9.943 9.355 10.172 8 10.874 6.645 10.172 5.135 9.943 4.451 8.578 3.365 7.506 3.614 6 3.364 4.494 4.451 3.422 5.135 2.057 6.645 1.828 8 1.126 9.356 1.828 10.865 2.057ZM4 11.794V16L8 15 12 16V11.794L9.982 12.1 8 13.126 6.018 12.1 4 11.794Z"></path>
						</svg>

						<div class="text-truncated">VIP</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px" data-togglable="ModalAffiliates" data-action="affiliates" data-action="affiliate_chain" data-affiliate-chain="ALL">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0" data-action="affiliate_chain" data-affiliate-chain="ALL">
							<path d="M5.5 9.511C5.576 10.465 6.33 11.208 7.682 11.296V12H8.282V11.291C9.682 11.193 10.5 10.445 10.5 9.359 10.5 8.372 9.874 7.863 8.755 7.599L8.282 7.487V5.57C8.882 5.638 9.264 5.966 9.356 6.42H10.408C10.332 5.501 9.544 4.782 8.282 4.704V4H7.682V4.719C6.487 4.836 5.672 5.555 5.672 6.572 5.672 7.472 6.278 8.044 7.285 8.279L7.682 8.377V10.411C7.067 10.318 6.66 9.981 6.568 9.511H5.5ZM7.677 7.345C7.087 7.208 6.767 6.929 6.767 6.509 6.767 6.039 7.112 5.687 7.682 5.584V7.344H7.677ZM8.369 8.538C9.086 8.704 9.417 8.973 9.417 9.448 9.417 9.99 9.005 10.362 8.282 10.43V8.518L8.369 8.538ZM8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14Z" data-action="affiliate_chain" data-affiliate-chain="ALL"></path>
						</svg>

						<div class="text-truncated" data-action="affiliate_chain" data-affiliate-chain="ALL">Affiliates</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px" data-togglable="ModalStatistics">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M6 2A.5.5 0 016.47 2.33L10 12.036 11.53 7.828A.5.5 0 0112 7.5H15.5A.5.5 0 0115.5 8.5H12.35L10.47 13.67A.5.5 0 019.53 13.67L6 3.964 4.47 8.171A.5.5 0 014 8.5H.5A.5.5 0 01.5 7.5H3.65L5.53 2.33A.5.5 0 016 2Z"></path>
						</svg>

						<div class="text-truncated">Statistics</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px" data-togglable="ModalStatistics" data-view-chain="${DATA.CHAIN}" data-action="user">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0" data-view-chain="${DATA.CHAIN}" data-action="user">
							<path d="M1 11.5A.5.5 0 001.5 12H13.293L10.146 15.146A.5.5 0 0010.854 15.854L14.854 11.854A.5.5 0 0014.854 11.146L10.854 7.146A.5.5 0 0010.146 7.854L13.293 11H1.5A.5.5 0 001 11.5ZM15 4.5A.5.5 0 0114.5 5H2.707L5.854 8.146A.5.5 0 115.146 8.854L1.146 4.854A.5.5 0 011.146 4.146L5.146.146A.5.5 0 115.854.854L2.707 4H14.5A.5.5 0 0115 4.5Z" data-view-chain="${DATA.CHAIN}" data-action="user"></path>
						</svg>

						<div class="text-truncated" data-view-chain="${DATA.CHAIN}" data-action="user">Transactions</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M3.05 3.05A7 7 0 003.05 12.95.5.5 0 012.343 13.657 8 8 0 012.343 2.343.5.5 0 013.05 3.05ZM5.172 5.172A4 4 0 005.172 10.828.5.5 0 114.464 11.536 5 5 0 014.464 4.464.5.5 0 015.172 5.172ZM10.828 4.464A.5.5 0 0111.536 4.464 5 5 0 0111.536 11.536.5.5 0 1110.828 10.828 4 4 0 0010.828 5.172.5.5 0 0110.828 4.464ZM12.95 2.344A.5.5 0 0113.657 2.344 8 8 0 0113.657 13.657.5.5 0 0112.95 12.95 7 7 0 0012.95 3.05.5.5 0 0112.95 2.343ZM10 8A2 2 0 116 8 2 2 0 0110 8Z"></path>
						</svg>

						<div class="text-truncated">Notifications</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M8 1A5 5 0 003 6V7H4A1 1 0 015 8V11A1 1 0 014 12H3A1 1 0 012 11V6A6 6 0 1114 6V12A2.5 2.5 0 0111.5 14.5H9.366A1 1 0 018.5 15H7.5A1 1 0 117.5 13H8.5A1 1 0 019.366 13.5H11.5A1.5 1.5 0 0013 12H12A1 1 0 0111 11V8A1 1 0 0112 7H13V6A5 5 0 008 1Z"></path>
						</svg>

						<div class="text-truncated">Support</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px" data-togglable="ModalSettings">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M11.5 2A1.5 1.5 0 1011.5 5 1.5 1.5 0 0011.5 2ZM9.05 3A2.5 2.5 0 0113.95 3H16V4H13.95A2.5 2.5 0 019.05 4H0V3H9.05ZM4.5 7A1.5 1.5 0 104.5 10 1.5 1.5 0 004.5 7ZM2.05 8A2.5 2.5 0 016.95 8H16V9H6.95A2.5 2.5 0 012.05 9H0V8H2.05ZM11.5 12A1.5 1.5 0 1011.5 15 1.5 1.5 0 0011.5 12ZM9.05 13A2.5 2.5 0 0113.95 13H16V14H13.95A2.5 2.5 0 019.05 14H0V13H9.05Z"></path>
						</svg>

						<div class="text-truncated">Settings</div>
					</button>

					<button class="btn btn-style btn-has-icon d-flex w-100 d-flex justify-content-center mt-12px" onclick="DATA.conf.auth ? on_disconnect() : on_connect()">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px fs-0">
							<path d="M7.5 1V8H8.5V1H7.5ZM3 8.812A4.999 4.999 0 015.578 4.437L5.093 3.563A6 6 0 1011 3.616L10.499 4.481A5 5 0 113 8.812Z"></path>
						</svg>

						<div class="text-truncated" id="login-logout-text">${DATA.conf.auth && 'Logout' || 'Login'}</div>
					</button>
				</div>
			</div>
		</div>
	`;

	document.getElementById('Menu').outerHTML = html;

})();

/* DEMO - On menu button click orchestrate opening correct section */

(() => {

	const walletButton = document.querySelector('#Header__TogglesTop [data-togglable="Wallet"]');
	const chatButton = document.querySelector('#Header__TogglesBottom [data-togglable="Chat"]');

	document.querySelectorAll('#Menu__Body button').forEach(menuButton => {
		menuButton.addEventListener('click', event => {
			/* close menu */
			document.querySelector('#Menu > .lightbox').click();
			/* get text of button and open correct section */
			switch (menuButton.querySelector('.text-truncated').innerText) {
				case 'VIP':
					walletButton.click();
					document.getElementById('Wallet__Tab3').checked = true;
					break;

				case 'Support':
					chatButton.click();
					document.getElementById('Chat__Support').click();
					break;

				case 'Notifications':
					chatButton.click();
					document.getElementById('Chat__Tab4').checked = true;
					break;

				case 'Statistics':
					document.querySelector('#ModalStatistics__Selector li:nth-of-type(1) button').click();
					break;

				case 'Transactions':
					document.querySelector('#ModalStatistics__Selector li:nth-of-type(2) button').click();
					break;

				default:
					break;
			}
		});
	});

})();

