/**
 * NFT
 */

/*** Inject HTML ***/

(() => {

    const html = `
        <div id="NFTPacks" class="card card-nft">
            <div class="container">
                <button class="btn card" data-togglable="ModalNFTPack">
                    <img src="Base/graphics/raster/nfts/p3.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Bronze Pack</div>

                        <div class="stock text-truncated">19/150</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$30</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTPack">
                    <img src="Base/graphics/raster/nfts/p2.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Silver Pack</div>

                        <div class="stock text-truncated">30/150</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$50</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTPack">
                    <img src="Base/graphics/raster/nfts/p1.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Gold Pack</div>

                        <div class="stock text-truncated">100/150</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$99</div>
                    </div>
                </button>
            </div>
        </div>

        <div id="NFTMarketFilter" class="card card-nft">
            <div id="NFTMarketFilter__Selector" class="dropdown-has-title" data-dropdown>
                <input type="checkbox" id="NFTMarketFilter__Selector__Checkbox" class="visually-hidden">

                <label for="NFTMarketFilter__Selector__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center">
                    <div class="d-flex text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                            <path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"></path>
                        </svg>
                        <div>All</div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
                        <path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"></path>
                    </svg>
                </label>

                <ul class="list-unstyled">
                    <div class="title text-center">SELECT AN NFT TYPE</div>

                    <div class="wrapper">
                        <li>
                            <button class="btn btn-style active">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"></path>
                                </svg>
                                <div>All</div>
                            </button>
                        </li>

                        <li>
                            <button class="btn btn-style">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" d="M3 14S2 14 2 13 3 9 8 9 14 12 14 13 13 14 13 14H3ZM8 8A3 3 0 108 2 3 3 0 008 8Z"></path>
                                </svg>
                                <div>Users</div>
                            </button>
                        </li>

                        <li>
                            <button class="btn btn-style">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" fill-rule="evenodd" d="M4.736 1.968 3.844 5.237 3.83 5.295C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8S15 7.328 15 6.5C15 6.006 13.887 5.568 12.17 5.295A1.032 1.032 0 0012.156 5.237L11.264 1.967C11.118 1.434 10.566 1.118 10.025 1.233 9.411 1.363 8.62 1.5 8 1.5 7.38 1.5 6.589 1.364 5.975 1.233 5.434 1.118 4.882 1.433 4.736 1.968ZM4.751 5.835A.25.25 0 015.025 5.611C5.925 5.703 6.935 5.754 8 5.754A29.58 29.58 0 0010.975 5.611.25.25 0 0111.025 6.109C10.107 6.202 9.081 6.254 8 6.254S5.893 6.202 4.975 6.109A.25.25 0 014.751 5.835ZM3.5 10H5.5A.5.5 0 016 10.5V11.5A1.5 1.5 0 013 11.5V10.5A.5.5 0 013.5 10ZM2 10.5C2 10.325 2.03 10.156 2.085 10H2A.5.5 0 012 9H5.5A1.5 1.5 0 016.988 10.312 3.5 3.5 0 019.012 10.312 1.5 1.5 0 0110.5 9H14A.5.5 0 0114 10H13.915C13.97 10.156 14 10.325 14 10.5V11.5A2.5 2.5 0 019 11.5V11.36L8.79 11.29A2.5 2.5 0 007.21 11.29L7 11.36V11.5A2.5 2.5 0 012 11.5V10.5ZM10.5 10H12.5A.5.5 0 0113 10.5V11.5A1.5 1.5 0 0110 11.5V10.5A.5.5 0 0110.5 10Z"></path>
                                </svg>
                                <div>Artifacts</div>
                            </button>
                        </li>

                        <li>
                            <button class="btn btn-style">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" d="M11.251.068A.5.5 0 0111.478.648L9.677 6.5H13A.5.5 0 0113.364 7.343L5.364 15.843A.5.5 0 014.522 15.353L6.323 9.5H3A.5.5 0 012.636 8.657L10.636.157A.5.5 0 0111.251.067Z"></path>
                                </svg>
                                <div>Action Cards</div>
                            </button>
                        </li>

                        <li>
                            <button class="btn btn-style">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" d="M2 2A2 2 0 000 4V5A2 2 0 002 7H3V9H2A2 2 0 000 11V12A2 2 0 002 14H14A2 2 0 0016 12V11A2 2 0 0014 9H13V7H14A2 2 0 0016 5V4A2 2 0 0014 2H2ZM2.5 5A.5.5 0 112.5 4 .5.5 0 012.5 5ZM4.5 5A.5.5 0 114.5 4 .5.5 0 014.5 5ZM2.5 12A.5.5 0 112.5 11 .5.5 0 012.5 12ZM4.5 12A.5.5 0 114.5 11 .5.5 0 014.5 12ZM12 7V9H4V7H12Z"></path>
                                </svg>
                                <div>Nodes</div>
                            </button>
                        </li>

                        <li>
                            <button class="btn btn-style">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path fill="#fff" d="M.036 3.314A.5.5 0 01.686 3.036L2.443 3.739A1.5 1.5 0 003.557 3.739L4.571 3.333A2.5 2.5 0 016.428 3.333L7.443 3.739A1.5 1.5 0 008.557 3.739L9.571 3.333A2.5 2.5 0 0111.428 3.333L12.443 3.739A1.5 1.5 0 0013.557 3.739L15.314 3.036A.5.5 0 1115.686 3.964L13.928 4.667A2.5 2.5 0 0112.071 4.667L11.057 4.261A1.5 1.5 0 009.943 4.261L8.928 4.667A2.5 2.5 0 017.071 4.667L6.057 4.261A1.5 1.5 0 004.943 4.261L3.928 4.667A2.5 2.5 0 012.071 4.667L.314 3.964A.5.5 0 01.036 3.314ZM.036 6.314A.5.5 0 01.686 6.036L2.443 6.739A1.5 1.5 0 003.557 6.739L4.571 6.333A2.5 2.5 0 016.428 6.333L7.443 6.739A1.5 1.5 0 008.557 6.739L9.571 6.333A2.5 2.5 0 0111.428 6.333L12.443 6.739A1.5 1.5 0 0013.557 6.739L15.314 6.036A.5.5 0 1115.686 6.964L13.928 7.667A2.5 2.5 0 0112.071 7.667L11.057 7.261A1.5 1.5 0 009.943 7.261L8.928 7.667A2.5 2.5 0 017.071 7.667L6.057 7.261A1.5 1.5 0 004.943 7.261L3.928 7.667A2.5 2.5 0 012.071 7.667L.314 6.964A.5.5 0 01.036 6.314ZM.036 9.314A.5.5 0 01.686 9.036L2.443 9.739A1.5 1.5 0 003.557 9.739L4.571 9.333A2.5 2.5 0 016.428 9.333L7.443 9.739A1.5 1.5 0 008.557 9.739L9.571 9.333A2.5 2.5 0 0111.428 9.333L12.443 9.739A1.5 1.5 0 0013.557 9.739L15.314 9.036A.5.5 0 1115.686 9.964L13.928 10.667A2.5 2.5 0 0112.071 10.667L11.057 10.261A1.5 1.5 0 009.943 10.261L8.928 10.667A2.5 2.5 0 017.071 10.667L6.057 10.261A1.5 1.5 0 004.943 10.261L3.928 10.667A2.5 2.5 0 012.071 10.667L.314 9.964A.5.5 0 01.036 9.314ZM.036 12.314A.5.5 0 01.686 12.036L2.443 12.739A1.5 1.5 0 003.557 12.739L4.571 12.333A2.5 2.5 0 016.428 12.333L7.443 12.739A1.5 1.5 0 008.557 12.739L9.571 12.333A2.5 2.5 0 0111.428 12.333L12.443 12.739A1.5 1.5 0 0013.557 12.739L15.314 12.036A.5.5 0 1115.686 12.964L13.928 13.667A2.5 2.5 0 0112.071 13.667L11.057 13.261A1.5 1.5 0 009.943 13.261L8.928 13.667A2.5 2.5 0 017.071 13.667L6.057 13.261A1.5 1.5 0 004.943 13.261L3.928 13.667A2.5 2.5 0 012.071 13.667L.314 12.964A.5.5 0 01.036 12.314Z"></path>
                                </svg>
                                <div>Whales</div>
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </div>

        <div id="NFTMarket" class="card card-nft">
            <div class="container">
                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb1.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Elite User</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$123</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb2.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Cool Artifact</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$456</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb3.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Dope Action Card</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$789</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb4.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Speedy Node</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$123</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb1.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Giga Whale</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$456</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb3.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Advanced User</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$789</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb2.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Example Action Card</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$123</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb1.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Swift Node</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$456</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb2.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Quality User</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$123</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb3.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Amazing Artifact</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$456</div>
                    </div>
                </button>

                <button class="btn card" data-togglable="ModalNFTMarket">
                    <img src="Base/graphics/raster/nfts/jb4.jpg">

                    <div class="footer">
                        <div class="name text-truncated text-white">Exceptional Action Card</div>

                        <div class="btn btn-style w-100 mt-6px text-bold text-white">$789</div>
                    </div>
                </button>
            </div>
        </div>
    `;

    elementify('Main').insertAdjacentHTML('beforeend', html);

})();


/*** NFT Market Filter Selector ***/

(() => {

    const selector = elementify('NFTMarketFilter__Selector');

    selector.querySelectorAll('ul .btn').forEach(button => {
        button.addEventListener('click', event => {
            selector.querySelector('label > div').innerHTML = button.innerHTML;
            selector.querySelector('.btn.active').classList.remove('active');
            button.classList.add('active');
            selector.querySelector('input[type="checkbox"]').checked = false;
        });
    });

})();
