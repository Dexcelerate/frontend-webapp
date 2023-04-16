/**
 * Footer
 */

/*** Inject HTML ***/

(() => {

    const html = `
        <div id="Footer">
            <div class="container">
                <div id="Footer__Toggles">
                    <button class="btn btn-style btn-has-icon d-flex justify-content-center w-100" data-togglable="Navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
                            <path d="M2.5 12A.5.5 0 013 11.5H13A.5.5 0 0113 12.5H3A.5.5 0 012.5 12ZM2.5 8A.5.5 0 013 7.5H13A.5.5 0 0113 8.5H3A.5.5 0 012.5 8ZM2.5 4A.5.5 0 013 3.5H13A.5.5 0 0113 4.5H3A.5.5 0 012.5 4Z"/>
                        </svg>
                    </button>

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

    document.getElementById('Footer').outerHTML = html;

})();
