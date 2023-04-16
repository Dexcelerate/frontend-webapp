/**
 * Search
 */

/*** Inject HTML - Base ***/

(() => {

    const html = `
        <div id="Search" class="togglable d-none">
            <div class="lightbox" data-togglable="Search"></div>

            <div class="container">
                <div id="Search__Header" class="header"></div>

                <div id="Search__Body" class="body"></div>
            </div>
        </div>
    `;

    document.getElementById('Search').outerHTML = html;

})();

/*** Inject HTML - Header ***/

(() => {

    const html = `
        <div id="Search__Header" class="header">
            <div id="Search__Bar">
                <div class="container">
                    <div class="bar">
                        <input type="text" class="form-control" placeholder="Search by token, pair, etc." autocomplete="off" spellcheck="false">

                        <button class="btn btn-has-icon" tabindex="-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                <circle fill="#262626" cx="8" cy="8" r="8"/>
                                <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
                            </svg>
                        </button>
                    </div>

                    <label class="checkbox-svg btn btn-style btn-has-icon ml-12px" data-tooltip="Show favorites" data-tooltip-left>
                        <input id="Search__Favorites" type="checkbox" class="visually-hidden" autocomplete="off">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M8 6.236 7.106 4.447C6.884 4.004 6.499 3.367 5.954 2.852 5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92 1 6.131 1.554 6.986 2.868 8.29 3.205 8.624 3.589 8.985 4.014 9.383 5.122 10.423 6.5 11.717 8 13.447 9.5 11.717 10.878 10.423 11.986 9.383 12.411 8.985 12.796 8.623 13.132 8.29 14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2 11.223 2 10.582 2.345 10.046 2.852 9.501 3.367 9.116 4.004 8.894 4.447L8 6.236ZM8.392 14.528A.513.513 0 017.608 14.528C6.007 12.626 4.558 11.266 3.365 10.147 1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1 5.6 1 6.719 2.05 7.404 3.008 7.664 3.373 7.862 3.724 8 4A7.55 7.55 0 018.596 3.008C9.281 2.049 10.4 1 12 1 14.21 1 16 2.755 16 4.92 16 6.989 14.7 8.208 12.635 10.147 11.442 11.267 9.993 12.627 8.392 14.527Z"/>
                            <path d="M4 1C6.21 1 8 2.755 8 4.92 8 2.755 9.79 1 12 1S16 2.755 16 4.92C16 8.183 12.766 9.334 8.392 14.528A.513.513 0 017.608 14.528C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1Z"/>
                        </svg>
                    </label>
                </div>
            </div>

            <div id="Search__Filters">
                <div class="container">
                    <div id="Search__Filters__Chains">
                        <div class="container">
                            <div class="boxes">
                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off" checked>

                                    <div>
                                        <img src="Base/graphics/raster/chains/smartchain.png" class="icon-md mr-4px">
                                        <div>BSC</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/ethereum.png" class="icon-md mr-4px">
                                        <div>ETH</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/avalanche.png" class="icon-md mr-4px">
                                        <div>AVAX</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/polygon.png" class="icon-md mr-4px">
                                        <div>MATIC</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/fantom.png" class="icon-md mr-4px">
                                        <div>FTM</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/arbitrum.png" class="icon-md mr-4px">
                                        <div>ARB</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/harmony.png" class="icon-md mr-4px">
                                        <div>ONE</div>
                                    </div>
                                </label>

                                <label class="box">
                                    <input type="checkbox" class="visually-hidden" autocomplete="off">

                                    <div>
                                        <img src="Base/graphics/raster/chains/crypto.png" class="icon-md mr-4px">
                                        <div>CRO</div>
                                    </div>
                                </label>

                                <div class="actions">
                                    <button class="btn btn-style btn-has-icon btn-sfchains-select mr-6px">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                            <path d="M3 14.5A1.5 1.5 0 011.5 13V3A1.5 1.5 0 013 1.5H11A.5.5 0 0111 2.5H3A.5.5 0 002.5 3V13A.5.5 0 003 13.5H13A.5.5 0 0013.5 13V8A.5.5 0 0114.5 8V13A1.5 1.5 0 0113 14.5H3ZM8.354 10.354 15.354 3.354A.5.5 0 0014.646 2.646L8 9.293 5.354 6.646A.5.5 0 104.646 7.354L7.646 10.354A.5.5 0 008.354 10.354Z"/>
                                        </svg>

                                        <div class="ml-4px mr-4px">ALL</div>
                                    </button>

                                    <button class="btn btn-style btn-has-icon btn-sfchains-expand btn-sfchains-expand-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                            <path d="M7.646 4.146A.5.5 0 018.354 4.146L14.354 10.146A.5.5 0 0113.646 10.854L8 5.207 2.354 10.854A.5.5 0 011.646 10.146L7.646 4.146Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button class="btn btn-sfchains-expand btn-sfchains-expand-outer" data-tooltip="Show all chains" data-tooltip-bottom>
                                <div class="icons">
                                    <img src="Base/graphics/raster/chains/polygon.png" class="icon-md">

                                    <img src="Base/graphics/raster/chains/fantom.png" class="icon-md">
                                </div>

                                <div class="count">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                                        <path d="M8.5 6A.5.5 0 007.5 6V7.5H6A.5.5 0 006 8.5H7.5V10A.5.5 0 008.5 10V8.5H10A.5.5 0 0010 7.5H8.5V6Z"/>
                                    </svg>

                                    <div>7</div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-4px my-auto">
                                    <path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="d-flex">
                        <div id="Search__Filters__Categories" data-dropdown>
                            <input type="checkbox" id="Search__Filters__Categories__Checkbox" class="visually-hidden">
                            <label for="Search__Filters__Categories__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM7 11.5A.5.5 0 017.5 11H8.5A.5.5 0 018.5 12H7.5A.5.5 0 017 11.5ZM5 8.5A.5.5 0 015.5 8H10.5A.5.5 0 0110.5 9H5.5A.5.5 0 015 8.5ZM3 5.5A.5.5 0 013.5 5H12.5A.5.5 0 0112.5 6H3.5A.5.5 0 013 5.5Z"/>
                                </svg>
                                <div>HOT</div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
                                    <path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"/>
                                </svg>
                            </label>
                            <ul class="list-unstyled">
                                <li>
                                    <button class="btn btn-style">NEW</button>
                                </li>
                                <li>
                                    <button class="btn btn-style active">HOT</button>
                                </li>
                                <li>
                                    <button class="btn btn-style">TX</button>
                                </li>
                                <li>
                                    <button class="btn btn-style">B/S</button>
                                </li>
                            </ul>
                        </div>

                        <div id="Search__Filters__Intervals" class="ml-12px" data-dropdown>
                            <input type="checkbox" id="Search__Filters__Intervals__Checkbox" class="visually-hidden">
                            <label for="Search__Filters__Intervals__Checkbox" class="btn btn-style btn-has-icon d-flex align-items-center justify-content-center" data-dropdown>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md mr-6px fs-0">
                                    <path d="M8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8ZM8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5Z"/>
                                </svg>
                                <div>30M</div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm ml-2px fs-0">
                                    <path d="M7.247 12.64 2.451 7.158C1.885 6.513 2.345 5.5 3.204 5.5H12.796A1 1 0 0113.549 7.159L8.753 12.639A1 1 0 017.247 12.639Z"/>
                                </svg>
                            </label>
                            <ul class="list-unstyled">
                                <li>
                                    <button class="btn btn-style">1M</button>
                                </li>
                                <li>
                                    <button class="btn btn-style">5M</button>
                                </li>
                                <li>
                                    <button class="btn btn-style">15M</button>
                                </li>
                                <li>
                                    <button class="btn btn-style active">30M</button>
                                </li>
                                <li>
                                    <button class="btn btn-style">1H</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('Search__Header').outerHTML = html;

})();

/*** Inject HTML - Body ***/

(() => {

    let html = '';

    const shuffledAssets = DATA.assets.map(x => [Math.random(), x]).sort(([a], [b]) => a - b).map(([_, x]) => x);

    shuffledAssets.forEach((asset, i) => {
        ++i;
        const randomChangeClass = ['text-red', 'text-green'][Math.floor(Math.random() * 2)];
        html = html.concat(`
            <div class="item">
                <div class="name">
                    <img src="Base/graphics/raster/chains/smartchain.png" class="icon-md mr-4px">
                    <div>${asset.name}</div>
                </div>
                <div class="network">
                    <img src="Base/graphics/raster/chains/smartchain.png" class="icon-md">
                </div>
                <div class="dexs">
                    <img src="Base/graphics/raster/various/bakeryswap.png" class="icon-md">
                    <img src="Base/graphics/raster/various/apeswap.png" class="icon-md">
                    <img src="Base/graphics/raster/various/pancakeswap.png" class="icon-md">
                </div>
                <div class="volume">
                    <div>${asset.volume}</div>
                </div>
                <div class="liquidity">
                    <div>${asset.liquidity}</div>
                </div>
                <div class="price">
                    <div>${asset.price}</div>
                </div>
                <div class="change ${randomChangeClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
                        ${randomChangeClass === 'text-red' ? '<path d="M8 4A.5.5 0 018.5 4.5V10.293L10.646 8.146A.5.5 0 0111.354 8.854L8.354 11.854A.5.5 0 017.646 11.854L4.646 8.854A.5.5 0 115.354 8.146L7.5 10.293V4.5A.5.5 0 018 4Z"/>' : '<path d="M8 12A.5.5 0 008.5 11.5V5.707L10.646 7.854A.5.5 0 0011.354 7.146L8.354 4.146A.5.5 0 007.646 4.146L4.646 7.146A.5.5 0 105.354 7.854L7.5 5.707V11.5A.5.5 0 008 12Z"/>'}
                    </svg>

                    <div>${asset.change}</div>
                </div>
                <div class="fav">
                    <label class="checkbox-svg checkbox-has-tooltip btn-icon" data-tooltip="${DATA.conf.favourites && DATA.conf.favourites[asset.token] && 'Remove from favorites' || 'Add to favorites'}" data-tooltip-alt="${DATA.conf.favourites && DATA.conf.favourites[asset.token] && 'Add to favorites' || 'Remove from favorites'}" data-tooltip-left>
                        <input type="checkbox" class="visually-hidden" autocomplete="off" ${DATA.conf.favourites && DATA.conf.favourites[asset.token] && 'checked' || ''}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M8 6.236 7.106 4.447C6.884 4.004 6.499 3.367 5.954 2.852 5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92 1 6.131 1.554 6.986 2.868 8.29 3.205 8.624 3.589 8.985 4.014 9.383 5.122 10.423 6.5 11.717 8 13.447 9.5 11.717 10.878 10.423 11.986 9.383 12.411 8.985 12.796 8.623 13.132 8.29 14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2 11.223 2 10.582 2.345 10.046 2.852 9.501 3.367 9.116 4.004 8.894 4.447L8 6.236ZM8.392 14.528A.513.513 0 017.608 14.528C6.007 12.626 4.558 11.266 3.365 10.147 1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1 5.6 1 6.719 2.05 7.404 3.008 7.664 3.373 7.862 3.724 8 4A7.55 7.55 0 018.596 3.008C9.281 2.049 10.4 1 12 1 14.21 1 16 2.755 16 4.92 16 6.989 14.7 8.208 12.635 10.147 11.442 11.267 9.993 12.627 8.392 14.527Z"/>
                            <path d="M4 1C6.21 1 8 2.755 8 4.92 8 2.755 9.79 1 12 1S16 2.755 16 4.92C16 8.183 12.766 9.334 8.392 14.528A.513.513 0 017.608 14.528C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1Z"/>
                        </svg>
                    </label>
                </div>
            </div>
        `);
    });

    html = `
        <div id="Search__Body" class="body">
            <div id="Search__Results">
                <div class="head">
                    <div class="item">
                        <div class="name">
                            <div>Name</div>
                        </div>

                        <div class="network">
                            <div>Net</div>
                        </div>

                        <div class="dexs">
                            <div>DEXs</div>
                        </div>

                        <div class="volume">
                            <div>Volume</div>
                        </div>

                        <div class="liquidity">
                            <div>Liquidity</div>
                        </div>

                        <div class="price">
                            <div>Price</div>
                        </div>

                        <div class="change">
                            <div>Change</div>
                        </div>

                        <div class="fav">
                            <div>Fav</div>
                        </div>
                    </div>
                </div>

                <div class="body">${html}</div>
            </div>
        </div>
    `;

    document.getElementById('Search__Body').outerHTML = html;

})();

/*** Header - Reset button ***/

(() => {

    const searchBar = elementify('Search__Bar');

    searchBar.querySelector('button').addEventListener('click', event => {
        searchBar.querySelector('input').value = '';
        searchBar.querySelector('input').focus();
    });

})();

/*** Header - Chain filters ***/

(() => {

    const searchFiltersChains = elementify('Search__Filters__Chains');

    searchFiltersChains.querySelectorAll('.btn-sfchains-expand').forEach(button => {
        button.addEventListener('click', event => {
            searchFiltersChains.querySelector('.boxes').classList.toggle('is-expanded');
        });
    });

    searchFiltersChains.querySelector('.btn-sfchains-select').addEventListener('click', event => {
        const buttonDiv = event.currentTarget.querySelector('div');
        searchFiltersChains.querySelectorAll('[type="checkbox"]').forEach((checkbox, index) => {
            if (index === 0 || buttonDiv.textContent === 'ALL') {
                checkbox.checked = true;
                checkbox.dispatchEvent(new Event('change'));
            } else {
                checkbox.checked = false;
            }
        });
        buttonDiv.textContent = buttonDiv.textContent === 'ALL' ? 'NONE' : 'ALL';
        event.currentTarget.blur();
    });

    searchFiltersChains.querySelectorAll('[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', event => checkbox.blur())
    });

})();

/*** Header - Interval and categries filters ***/

(() => {

    const searchFiltersIntervals = elementify('Search__Filters__Intervals');
    const searchFiltersCategories = elementify('Search__Filters__Categories');

    searchFiltersIntervals.querySelectorAll('ul .btn').forEach(intervalButton => {
        intervalButton.addEventListener('click', event => {
            searchFiltersIntervals.querySelector('label > div').innerText = intervalButton.innerText;
            searchFiltersIntervals.querySelector('.btn.active').classList.remove('active');
            intervalButton.classList.add('active');
            searchFiltersIntervals.querySelector('input[type="checkbox"]').checked = false;
            /* fake event dispatch to trigger demo loader */
            elementify('Search__Favorites').dispatchEvent(new Event('change'));
        });
    });

    searchFiltersCategories.querySelectorAll('ul .btn').forEach(intervalButton => {
        intervalButton.addEventListener('click', event => {
            searchFiltersCategories.querySelector('label > div').innerText = intervalButton.innerText;
            searchFiltersCategories.querySelector('.btn.active').classList.remove('active');
            intervalButton.classList.add('active');
            searchFiltersCategories.querySelector('input[type="checkbox"]').checked = false;
            /* fake event dispatch to trigger demo loader */
            elementify('Search__Favorites').dispatchEvent(new Event('change'));
        });
    });

})();

/*** Demo loading state ***/

(() => {

    const searchHeaderRadiosAndChecboxes = document.querySelectorAll('#Search__Filters__Chains input[type="checkbox"], #Search__Favorites');
    const searchResults = elementify('Search__Results');
    const searchResultsDemoHTML = searchResults.innerHTML;

    searchHeaderRadiosAndChecboxes.forEach(input => {

        input.addEventListener('change', event => {
            searchResults.innerHTML = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

            setTimeout(() => {
                searchResults.innerHTML = searchResultsDemoHTML;

                if (input.id === 'Search__Favorites' && input.checked) {
                    searchResults.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                        if (!checkbox.checked) {
                            checkbox.parentElement.parentElement.parentElement.remove();
                        }
                    });
                }
            }, 2000);
        });
    });

})();
