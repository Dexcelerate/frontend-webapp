/**
 * Inputs
 */

/*** Swap tooltip strings on checkboxes ***/

(() => {

    document.querySelectorAll('label[data-tooltip-alt]').forEach(label => {
        if (label.dataset.tooltip && label.dataset.tooltipAlt) {
            const checkbox = label.firstElementChild;
            checkbox.addEventListener('click', event => {
                [label.dataset.tooltip, label.dataset.tooltipAlt] = [label.dataset.tooltipAlt, label.dataset.tooltip]
            });
        };
    });

})();

/*** Swap inner text strings on button checkboxes ***/

(() => {

    document.querySelectorAll('.checkbox-btn > input').forEach(checkbox => {
        checkbox.addEventListener('change', event => {
            const label = checkbox.nextElementSibling;
            if (label.hasAttribute('data-inner-text-alt')) {
                const innerTextCurrent = label.innerText;
                label.innerText = label.dataset.innerTextAlt;
                label.dataset.innerTextAlt = innerTextCurrent;
            }
            checkbox.blur();
        });
    });

})();
