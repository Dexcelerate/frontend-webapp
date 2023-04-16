/**
 * Modal Coming Soon
 */

/*** Inject HTML ***/

(() => {

    const html = `
        <div id="ModalHelp" class="togglable modal d-none" style="z-index: 999999">
            <div class="lightbox" data-togglable="ModalHelp"></div>

            <div class="container">
                <div id="ModalHelp__Header" class="header">
                    <div class="text-white text-bold text-truncated">WARNING</div>

                    <button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalHelp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <rect fill="#191919" width="16" height="16" rx="100%"></rect>
                            <path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
                        </svg>
                    </button>
                </div>

                <div id="ModalHelp__Body" class="body"></div>
            </div>
        </div>
    `;

    elementify('Root').insertAdjacentHTML('beforeend', html);

})();
