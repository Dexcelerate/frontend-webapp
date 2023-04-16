/**
 * Modal NFT Pack
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="ModalNFTPack" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalNFTPack"></div>

			<div class="container">
				<div id="ModalNFTPack__Header" class="header">
					<div class="title text-white text-bold text-truncated"></div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalNFTPack">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalNFTPack__Body" class="body">
					<div class="box box-nft">
						<img src="#" class="icon-xxl">
					</div>

					<div class="box box-details mt-12px">
						<div class="title text-white text-center text-bold">Name of the NFT</div>

						<div class="content text-center">Lorem ipsum dolor sit amet.</div>
					</div>

					<div class="box box-buy mt-12px">
						<div class="selector">
							<input type="checkbox" name="nftpack_currency_selector" id="NFTPackCurrencySelector" class="visually-hidden" autocomplete="off">

							<label for="NFTPackCurrencySelector" class="btn btn-style btn-has-icon">
								<div class="text-truncated text-white">Select currency</div>

								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M1.646 4.646A.5.5 0 012.354 4.646L8 10.293 13.646 4.646A.5.5 0 0114.354 5.354L8.354 11.354A.5.5 0 017.646 11.354L1.646 5.354A.5.5 0 011.646 4.646Z"></path>
								</svg>
							</label>

							<div class="list d-none" id="wallet-assets-for-nft-packs"></div>
						</div>

						<button class="btn btn-style w-100 mt-12px"></button>
					</div>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

/* On click on card open modal */

(() => {

	const modalNFTPack = elementify('ModalNFTPack');

	document.querySelectorAll('#NFTPacks > .container > .card').forEach(packCard => {
		packCard.addEventListener('click', event => {
			const packName = packCard.querySelector('.name').innerText.toUpperCase();
			const packImage = packCard.querySelector('img').src;
			const packPrice = packCard.querySelector('.footer .btn').innerText;
			modalNFTPack.querySelector('.header .title').innerText = packName;
			modalNFTPack.querySelector('.body .box-nft img').src = packImage;
			modalNFTPack.querySelector('.body .box-details .title').innerText = packName;
			modalNFTPack.querySelector('.body button').innerText = 'Buy for ' + packPrice;
		});
	});

})();
