/**
 * Navigation
 */

/*** Inject HTML ***/

(() => {

    const html = `
        <div id="Navigation" class="togglable d-none">
            <div class="container">
                <div id="Navigation__Body" class="body">
                    <button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center" data-togglable="Navigation" data-view="swap">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-togglable="Navigation" data-view="swap">
                            <path d="M1 11.5A.5.5 0 001.5 12H13.293L10.146 15.146A.5.5 0 0010.854 15.854L14.854 11.854A.5.5 0 0014.854 11.146L10.854 7.146A.5.5 0 0010.146 7.854L13.293 11H1.5A.5.5 0 001 11.5ZM15 4.5A.5.5 0 0114.5 5H2.707L5.854 8.146A.5.5 0 115.146 8.854L1.146 4.854A.5.5 0 011.146 4.146L5.146.146A.5.5 0 115.854.854L2.707 4H14.5A.5.5 0 0115 4.5Z" data-togglable="Navigation" data-view="swap"/>
                        </svg>

                        <div data-togglable="Navigation" data-view="swap">Swap</div>
                    </button>

                    <button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center mt-12px" data-togglable="Navigation" data-view="copy">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-togglable="Navigation" data-view="copy">
                            <path d="M16 8S13 2.5 8 2.5 0 8 0 8 3 13.5 8 13.5 16 8 16 8ZM1.173 8A13.133 13.133 0 012.833 5.957C4.12 4.668 5.88 3.5 8 3.5 10.12 3.5 11.879 4.668 13.168 5.957A13.133 13.133 0 0114.828 8C14.77 8.087 14.706 8.183 14.633 8.288 14.298 8.768 13.803 9.408 13.168 10.043 11.879 11.332 10.119 12.5 8 12.5 5.88 12.5 4.121 11.332 2.832 10.043A13.134 13.134 0 011.172 8ZM8 5.5A2.5 2.5 0 108 10.5 2.5 2.5 0 008 5.5ZM4.5 8A3.5 3.5 0 1111.5 8 3.5 3.5 0 014.5 8ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z" data-togglable="Navigation" data-view="copy"/>
                        </svg>

                        <div data-togglable="Navigation" data-view="copy">Copy</div>
                    </button>

                    <button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center mt-12px" data-togglable="Navigation" data-view="scan">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-togglable="Navigation" data-view="scan">
                            <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13A5 5 0 118 3 5 5 0 018 13ZM8 14A6 6 0 108 2 6 6 0 008 14ZM8 11A3 3 0 118 5 3 3 0 018 11ZM8 12A4 4 0 108 4 4 4 0 008 12ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z" data-togglable="Navigation" data-view="scan"/>
                        </svg>

                        <div data-togglable="Navigation" data-view="scan">Scan</div>
                    </button>

                    <button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center mt-12px" data-togglable="Navigation" data-view="nft">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-4px" data-togglable="Navigation" data-view="nft">
                            <path d="M3.1.7A.5.5 0 013.5.5H12.5A.5.5 0 0112.9.7L15.876 4.674C16.025 4.859 16.032 5.124 15.886 5.318L8.4 15.3A.5.5 0 017.6 15.3L.1 5.3A.5.5 0 01.1 4.7L3.1.7ZM14.486 4.485 12.68 2.075 11.904 4.488 14.486 4.485ZM10.853 4.489 11.814 1.5H4.186L5.149 4.495 10.853 4.489ZM5.47 5.495 8 13.366 10.532 5.49 5.47 5.495ZM4.099 4.496 3.319 2.074 1.501 4.499 4.099 4.496ZM1.499 5.5 6.612 12.317 4.42 5.497 1.5 5.5ZM9.388 12.317 14.511 5.487 11.583 5.489 9.388 12.317Z" data-togglable="Navigation" data-view="nft"/>
                        </svg>

                        <div data-togglable="Navigation" data-view="nft">NFT</div>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('Navigation').outerHTML = html;

})();
