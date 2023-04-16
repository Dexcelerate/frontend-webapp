/**
 * Header
 */

/*** Inject HTML ***/

(() => {

    document.getElementById('Header').outerHTML = `
        <div id="Header">
            <div class="container">
                <div id="Header__Navigation">
                    <button class="btn btn-style btn-has-icon d-flex align-items-center" data-view="swap">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-view="swap">
                            <path d="M1 11.5A.5.5 0 001.5 12H13.293L10.146 15.146A.5.5 0 0010.854 15.854L14.854 11.854A.5.5 0 0014.854 11.146L10.854 7.146A.5.5 0 0010.146 7.854L13.293 11H1.5A.5.5 0 001 11.5ZM15 4.5A.5.5 0 0114.5 5H2.707L5.854 8.146A.5.5 0 115.146 8.854L1.146 4.854A.5.5 0 011.146 4.146L5.146.146A.5.5 0 115.854.854L2.707 4H14.5A.5.5 0 0115 4.5Z" data-view="swap"/>
                        </svg>

                        <div data-view="swap">Swap</div>
                    </button>

                    <button class="btn btn-style btn-has-icon d-flex align-items-center ml-12px" data-view="copy">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-view="copy">
                            <path d="M16 8S13 2.5 8 2.5 0 8 0 8 3 13.5 8 13.5 16 8 16 8ZM1.173 8A13.133 13.133 0 012.833 5.957C4.12 4.668 5.88 3.5 8 3.5 10.12 3.5 11.879 4.668 13.168 5.957A13.133 13.133 0 0114.828 8C14.77 8.087 14.706 8.183 14.633 8.288 14.298 8.768 13.803 9.408 13.168 10.043 11.879 11.332 10.119 12.5 8 12.5 5.88 12.5 4.121 11.332 2.832 10.043A13.134 13.134 0 011.172 8ZM8 5.5A2.5 2.5 0 108 10.5 2.5 2.5 0 008 5.5ZM4.5 8A3.5 3.5 0 1111.5 8 3.5 3.5 0 014.5 8ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z" data-view="copy"/>
                        </svg>

                        <div data-view="copy">Copy</div>
                    </button>

                    <button class="btn btn-style btn-has-icon d-flex align-items-center ml-12px" data-view="scan">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-view="scan">
                            <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13A5 5 0 118 3 5 5 0 018 13ZM8 14A6 6 0 108 2 6 6 0 008 14ZM8 11A3 3 0 118 5 3 3 0 018 11ZM8 12A4 4 0 108 4 4 4 0 008 12ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z" data-view="scan"/>
                        </svg>

                        <div data-view="scan">Scan</div>
                    </button>

                    <button class="btn btn-style btn-has-icon d-flex align-items-center ml-12px mr-12px" data-view="nft">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-view="nft">
                            <path d="M3.1.7A.5.5 0 013.5.5H12.5A.5.5 0 0112.9.7L15.876 4.674C16.025 4.859 16.032 5.124 15.886 5.318L8.4 15.3A.5.5 0 017.6 15.3L.1 5.3A.5.5 0 01.1 4.7L3.1.7ZM14.486 4.485 12.68 2.075 11.904 4.488 14.486 4.485ZM10.853 4.489 11.814 1.5H4.186L5.149 4.495 10.853 4.489ZM5.47 5.495 8 13.366 10.532 5.49 5.47 5.495ZM4.099 4.496 3.319 2.074 1.501 4.499 4.099 4.496ZM1.499 5.5 6.612 12.317 4.42 5.497 1.5 5.5ZM9.388 12.317 14.511 5.487 11.583 5.489 9.388 12.317Z" data-view="nft"/>
                        </svg>

                        <div data-view="nft">NFT</div>
                    </button>
                </div>

                <div id="Header__TogglesTop">
                    <div class="multitoggle">
                        <button class="btn btn-style btn-has-icon d-flex align-items-center w-auto" data-togglable="Selector">
                            <div class="balance text-truncated" data-balance="${DATA.conf.vault || 0}">$${formatFiat(Big(DATA.conf.vault || 0).mul(DATA.WPEG_PRICE))}</div>

                            <img class="icon-md icon-round peg" id="${GetTokenImage(DATA.WPEG)}" src="${DATA.ERROR_IMG}">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm fs-0">
                                <path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"/>
                            </svg>
                        </button>

                        <button class="btn btn-style btn-has-icon w-auto" data-togglable="Wallet" data-action="wallet_and_slots">WALLET</button>
                    </div>
                </div>

                <div id="Header__TogglesBottom">
                    <button class="btn btn-style btn-has-icon d-flex justify-content-center w-100 ml-12px" data-togglable="Search">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M11.742 10.344A6.5 6.5 0 1010.345 11.742H10.344C10.374 11.782 10.406 11.82 10.442 11.857L14.292 15.707A1 1 0 0015.707 14.293L11.857 10.443A1.007 1.007 0 0011.742 10.343ZM12 6.5A5.5 5.5 0 111 6.5 5.5 5.5 0 0112 6.5Z"/>
                        </svg>
                    </button>

                    <button class="btn btn-style btn-has-icon d-flex justify-content-center w-100 ml-12px" data-togglable="Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"/>
                        </svg>
                    </button>

                    <button class="btn btn-style btn-has-icon d-flex justify-content-center w-100 ml-12px" data-togglable="Chat">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M2.165 15.803 2.185 15.799C4.015 15.436 5.133 14.957 5.653 14.694A9.06 9.06 0 008 15C12.418 15 16 11.866 16 8S12.418 1 8 1 0 4.134 0 8C0 9.76.743 11.37 1.97 12.6A10.437 10.437 0 011.446 14.918L1.443 14.929A10.722 10.722 0 011.199 15.566C1.12 15.752 1.273 15.96 1.472 15.928A21.673 21.673 0 002.165 15.803ZM2.965 12.695A1 1 0 002.678 11.894C1.618 10.83 1 9.468 1 8 1 4.808 4.004 2 8 2S15 4.808 15 8C15 11.193 11.996 14 8 14A8.06 8.06 0 015.912 13.728 1 1 0 005.201 13.802C4.814 13.998 3.961 14.372 2.567 14.695A10.97 10.97 0 002.965 12.695ZM4 5.5A.5.5 0 014.5 5H11.5A.5.5 0 0111.5 6H4.5A.5.5 0 014 5.5ZM4 8A.5.5 0 014.5 7.5H11.5A.5.5 0 0111.5 8.5H4.5A.5.5 0 014 8ZM4 10.5A.5.5 0 014.5 10H8.5A.5.5 0 018.5 11H4.5A.5.5 0 014 10.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

})();
