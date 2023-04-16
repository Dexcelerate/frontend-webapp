/**
 * Modal Change User
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="ModalChangeUser" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalChangeUser"></div>

			<div class="container">
				<div id="ModalChangeUser__Header" class="header">
					<div class="text-white text-bold text-truncated">CHANGE USER</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalChangeUser">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalChangeUser__Body" class="body">Change user?</div>

				<div id="ModalChangeUser__Footer" class="footer">
					<button id="userChangeConfirm" class="btn btn-style w-100" data-togglable="Menu">Confirm</button>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

/*** On next/prev arrow button click change user ***/

(() => {

	const btnUserPrev = elementify('userPrev');
	const btnUserNext = elementify('userNext');
	const btnUserChangeConfirm = elementify('userChangeConfirm');

	btnUserPrev.addEventListener('click', event => {
		btnUserChangeConfirm.removeEventListener('click', handleUserNext);
		btnUserChangeConfirm.removeEventListener('click', handleUserPrev);
		btnUserChangeConfirm.addEventListener('click', handleUserPrev);
	});

	btnUserNext.addEventListener('click', event => {
		btnUserChangeConfirm.removeEventListener('click', handleUserPrev);
		btnUserChangeConfirm.removeEventListener('click', handleUserNext);
		btnUserChangeConfirm.addEventListener('click', handleUserNext);
	});

	function handleUserPrev(event) {
		if (!DATA.conf.N || !DATA.conf.N.JBU || !DATA.conf.N.JBU.length) {
			return;
		}

		if (DATA.conf.N.JBU[DATA.currentUser - 1]) {
			document.querySelector('#Menu__Header img').id = lazy_get_nft_image('JBU', DATA.conf.N.JBU[--DATA.currentUser].nft, undefined, `jbu-menu`);
		}
	}

	function handleUserNext(event) {
		if (!DATA.conf.N || !DATA.conf.N.JBU || !DATA.conf.N.JBU.length) {
			return;
		}

		if (DATA.conf.N.JBU[DATA.currentUser + 1]) {
			document.querySelector('#Menu__Header img').id = lazy_get_nft_image('JBU', DATA.conf.N.JBU[++DATA.currentUser].nft, undefined, `jbu-menu`);
		}
	}

})();
