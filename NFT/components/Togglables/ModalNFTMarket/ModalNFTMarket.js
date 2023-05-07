/**
 * Modal NFT Market
 */

/*** Inject HTML ***/

(() => {
	const html = `
        <div id="ModalNFTMarket" class="togglable modal d-none">
            <div class="lightbox" data-togglable="ModalNFTMarket"></div>

            <div class="container">
                <div id="ModalNFTMarket__Header" class="header">
                    <div class="title text-white text-bold text-truncated"></div>

                    <button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalNFTMarket">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <rect fill="#191919" width="16" height="16" rx="100%"></rect>
                            <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
                        </svg>
                    </button>
                </div>

                <div id="ModalNFTMarket__Body" class="body">
                    <div class="box box-nft">
                        <img src="#" class="icon-xxl">
                    </div>

                    <div class="box box-name mt-12px text-white text-center">Name of the NFT</div>

                    <div class="box box-details mt-12px text-white">
                        <ul>
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>Beatae fugiat libero ipsam quibusdam.</li>
                            <li>Pariatur cumque dolorem impedit rem explicabo.</li>
                        </ul>
                    </div>

                    <div class="box box-duration mt-12px text-white text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

                    <input type="checkbox" id="boxBuyEnabled" class="visually-hidden">

                    <div class="box box-buy-selection mt-12px">
                        <label for="boxBuyEnabled" class="btn btn-style w-100 text-white">Purchase</label>

                        <button class="btn btn-style w-100 text-white mt-12px">Offer Swap</button>
                    </div>

                    <div class="box box-buy mt-12px">
                        <div class="selector">
                            <input type="checkbox" name="nftmarket_currency_selector" id="NFTMarketCurrencySelector" class="visually-hidden" autocomplete="off">

                            <label for="NFTMarketCurrencySelector" class="btn btn-style btn-has-icon">
                                <div class="text-truncated text-white">Select currency</div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                    <path d="M1.646 4.646A.5.5 0 012.354 4.646L8 10.293 13.646 4.646A.5.5 0 0114.354 5.354L8.354 11.354A.5.5 0 017.646 11.354L1.646 5.354A.5.5 0 011.646 4.646Z"></path>
                                </svg>
                            </label>

                            <div class="list d-none">
                                <input type="radio" name="nftmarket_currency" id="NFTMarketCurrencySelector__Currency1" class="visually-hidden" autocomplete="off">

                                <label for="NFTMarketCurrencySelector__Currency1" class="item">
                                    <div class="name text-truncated">BTC</div>
                                    <div class="amount text-truncated ml-4px">$987.00</div>
                                </label>

                                <input type="radio" name="nftmarket_currency" id="NFTMarketCurrencySelector__Currency2" class="visually-hidden" autocomplete="off">

                                <label for="NFTMarketCurrencySelector__Currency2" class="item">
                                    <div class="name text-truncated">DOGE</div>
                                    <div class="amount text-truncated ml-4px">$876.00</div>
                                </label>

                                <input type="radio" name="nftmarket_currency" id="NFTMarketCurrencySelector__Currency3" class="visually-hidden" autocomplete="off">

                                <label for="NFTMarketCurrencySelector__Currency3" class="item">
                                    <div class="name text-truncated">Cake</div>
                                    <div class="amount text-truncated ml-4px">$654.00</div>
                                </label>

                                <input type="radio" name="nftmarket_currency" id="NFTMarketCurrencySelector__Currency4" class="visually-hidden" autocomplete="off">

                                <label for="NFTMarketCurrencySelector__Currency4" class="item">
                                    <div class="name text-truncated">WHATEVER</div>
                                    <div class="amount text-truncated ml-4px">$543.00</div>
                                </label>
                            </div>
                        </div>

                        <div class="actions mt-12px d-flex">
                            <label for="boxBuyEnabled" class="btn btn-style btn-has-icon" data-tooltip="Back" data-tooltip-right>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                    <path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"></path>
                                </svg>
                            </label>

                            <button class="btn btn-style w-100 ml-12px lightbox" data-togglable="ModalNFTMarket"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

	elementify('Root').insertAdjacentHTML('beforeend', html);
})();

/* On click on card open modal */

(() => {
	const modalNFTMarket = elementify('ModalNFTMarket');

	document.querySelectorAll('#NFTMarket > .container > .card').forEach((marketCard) => {
		marketCard.addEventListener('click', (event) => {
			const name = marketCard.querySelector('.name').innerText;
			const image = marketCard.querySelector('img').src;
			const price = marketCard.querySelector('.footer .btn').innerText;
			modalNFTMarket.querySelector('.header .title').innerText = name.toUpperCase();
			modalNFTMarket.querySelector('.body .box-nft img').src = image;
			modalNFTMarket.querySelector('.body .box-name').innerText = name;
			modalNFTMarket.querySelector('.body .box-buy-selection label').innerText = 'Buy for ' + price;
			modalNFTMarket.querySelector('.body .box-buy .actions button').innerText = 'Buy for ' + price;
		});
	});
})();

/*** Currency selector ***/

(() => {
	const selectorLabelDivElement = document.querySelector('label[for="NFTMarketCurrencySelector"]').firstElementChild;

	document.querySelectorAll('#ModalNFTMarket__Body .box-buy .selector input[type="radio"').forEach((radio) => {
		radio.addEventListener('change', (event) => {
			selectorLabelDivElement.classList.add('text-white');
			selectorLabelDivElement.innerText = document.querySelector(`label[for="${radio.id}"] > div`).innerText;
			elementify('NFTMarketCurrencySelector').checked = false;
		});
	});
})();

/* On click of "offer swap" button open wallet nft section */

(() => {
	const modalNFTMarket = elementify('ModalNFTMarket');

	document.querySelector('#ModalNFTMarket .body .box-buy-selection button').addEventListener('click', (event) => {
		const htmlOfferSwapBody = htmlToElement(`
            <div class="offer-swap-selection">
                <div class="row row-1">
                    <div class="title ml-12px">Users</div>

                    <div class="cards">
                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb1.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb2.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb3.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb4.jpg">
                        </label>
                    </div>
                </div>

                <div class="row row-2">
                    <div class="title ml-12px">Artifacts</div>

                    <div class="cards">
                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb1.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb2.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb3.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb4.jpg">
                        </label>
                    </div>
                </div>

                <div class="row row-3">
                    <div class="title ml-12px">Action Cards</div>

                    <div class="cards">
                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb1.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb2.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb3.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb4.jpg">
                        </label>
                    </div>
                </div>

                <div class="row row-4">
                    <div class="title ml-12px">Nodes</div>

                    <div class="cards">
                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb1.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb2.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb3.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb4.jpg">
                        </label>
                    </div>
                </div>

                <div class="row row-5">
                    <div class="title ml-12px">Whales</div>

                    <div class="cards">
                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb1.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb2.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb3.jpg">
                        </label>

                        <label class="card">
                            <input type="checkbox" name="offer_swap_selection" class="visually-hidden">

                            <img src="Base/graphics/raster/nfts/jb4.jpg">
                        </label>
                    </div>
                </div>
            </div>
        `);
		const htmlOfferSwapFooter = htmlToElement(`
            <div id="ModalNFTMarket__Footer" class="footer">
                <button class="btn btn-style w-100 text-white lightbox">Confirm</button>
            </div>
        `);
		document.querySelector('#ModalNFTMarket .body').prepend(htmlOfferSwapBody);
		document.querySelector('#ModalNFTMarket .container').append(htmlOfferSwapFooter);
		/* scroll to top */
		document.querySelector('#ModalNFTMarket .body').scrollTo({ top: 0, behavior: 'smooth' });
		/* change modal title */
		modalNFTMarket.querySelector('.header .title').innerText = `${modalNFTMarket.querySelector('.header .title').innerText} (OFFER SWAP)`;
		/* cleanup rests of offer swap section on exit or confirm */
		document.querySelectorAll('#ModalNFTMarket .lightbox').forEach((lightboxToggle) => {
			lightboxToggle.addEventListener('click', (event) => {
				htmlOfferSwapBody.remove();
				htmlOfferSwapFooter.remove();
				/* change title back to original */
				modalNFTMarket.querySelector('.header .title').innerText = `${modalNFTMarket.querySelector('.header .title').innerText.replace('(OFFER SWAP)', '')}`;
				/* scroll to top */
				document.querySelector('#ModalNFTMarket .body').scrollTo({ top: 0, behavior: 'smooth' });
			});
		});
	});
})();
