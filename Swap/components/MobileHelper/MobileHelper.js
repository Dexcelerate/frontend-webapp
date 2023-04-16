/**
 * MobileHelper
 */

/*** Inject HTML ***/

(() => {

    const html = `
        <input type="radio" name="mobilehelper_tab" id="MobileHelper__Tab1" class="visually-hidden card-swap" autocomplete="off" checked>
        <input type="radio" name="mobilehelper_tab" id="MobileHelper__Tab2" class="visually-hidden card-swap" autocomplete="off">
        <input type="radio" name="mobilehelper_tab" id="MobileHelper__Tab3" class="visually-hidden card-swap" autocomplete="off">

        <div id="MobileHelper" class="card card-swap">
            <label for="MobileHelper__Tab1" class="tab">
                <div class="text-truncated">Terminal</div>
            </label>

            <label for="MobileHelper__Tab2" class="tab ml-12px">
                <div class="text-truncated">Chart</div>
            </label>

            <label for="MobileHelper__Tab3" class="tab ml-12px">
                <div class="text-truncated">Feed</div>
            </label>
        </div>
    `;

    elementify('Main').insertAdjacentHTML('beforeend', html);

})();
