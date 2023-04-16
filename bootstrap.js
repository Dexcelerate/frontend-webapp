/**
 * Bootstrap
 *
 * @param string view
 */

function bootstrap(view, is_init, is_click) {
	let prev_view = DATA.view;
	DATA.view = view;

	document.querySelector('#Main').setAttribute('class', view);

	navigate();

	if (!is_init && view === 'swap') {
		if (view === prev_view) {
			if (DATA.token && DATA.token !== elementify('Chart').dataset.tokenAddressVerifiy && elementify('Root').classList.contains('has-token')) {
				DATA.rooms = [`${DATA.CHAIN}:${DATA.token}:${DATA.pair}`, `${DATA.CHAIN}:H:${DATA.token}`];
				handleAction('untoken');
			}

			elementify('Root').classList.toggle('has-token');
			if (elementify('Root').classList.contains('has-token')) {
				elementify('Root').classList.add('has-connection');
			} else if (!DATA.conf.connected) {
				elementify('Root').classList.remove('has-connection');
			}
		} else {
			if (!is_click || !DATA.loaded_click_chart) {
				DATA.loaded_click_chart = true;
				setTimeout(() => {
					if (DATA.chart) {
						DATA.chart_time_scale.fitContent();
					}
				}, 0);
			}
		}
	}
};

(() => {

	if (!DATA.VIEWS.includes(DATA.view)) {
		DATA.view = 'swap';
	}

	if (DATA.view === 'swap' && DATA.token) {
		elementify('Root').classList.add('has-token');
		elementify('Root').classList.add('has-connection');
	}

	bootstrap(DATA.view, true);

})();

(() => {

	init();
	init_sockets();

	document.body.classList.add('initialized');

})();

const listenMessage = event => {
	let ev = event.originalEvent || event;

	if (ev.key != 'message' || !ev.newValue) {
		return; /* ignore other keys */
	}

	data = JSON.parse(ev.newValue);

	if (data.u === DATA.UUID) {
		return; /* ignore same tab */
	}

	switch (data.a) {
		case 'login':
			setTimeout(() => {
				document.location.href = document.location.href;
			}, 0);
			break;

		case 'logout':
			on_disconnect(true);
			break;

		default:
			break;
	}
};

if (window.addEventListener) {
	window.addEventListener('storage', listenMessage, false);
} else {
	window.attachEvent('onstorage', listenMessage);
}
