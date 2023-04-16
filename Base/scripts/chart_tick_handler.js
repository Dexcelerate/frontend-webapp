
const _handle_tick = (data, is_draw) => {
	if (data.R !== DATA.router) {
		return;
	}

	/* let time = Math.floor(new Date(data.c).getTime() / 1000), */
	let time = Math.floor(Date.now() / 1000),
		time_frame = time - (time % DATA.chart_time_frames[DATA.chart_time_frame]);

	if (!data.orig_pu) {
		data.orig_pu = data.pu || data._pu;
	}

	if (data.t0 === DATA.token) {
		data._b = !data._b;
	}

	data.val = Big(data.orig_pu);
	if (data.t0 === DATA.token) {
		data.pu = data.val.div(data.A).mul(DATA.ROUTER_FEES[data._b && 'sell' || 'buy'][data.R] || DATA.ROUTER_FEES[data._b && 'sell' || 'buy'][DATA.ROUTER]);
	} else {
		data.pu = data.val.div(data.A).mul(DATA.ROUTER_FEES[data._b && 'buy' || 'sell'][data.R] || DATA.ROUTER_FEES[data._b && 'buy' || 'sell'][DATA.ROUTER]);
	}

	DATA.lastCandle.close = data.pu;

	if (data.pu.gt(DATA.lastCandle.high) || !DATA.lastCandle.time) {
		DATA.lastCandle.high = data.pu;
	}

	if (data.pu.lt(DATA.lastCandle.low) || !DATA.lastCandle.time) {
		DATA.lastCandle.low = data.pu;
	}

	if (is_draw) {
		DATA.candlestickSeries.update(DATA.lastCandle);
	}

	if (DATA.lastCandle.time !== time_frame) {
		DATA.lastCandle.high = data.pu;
		DATA.lastCandle.low = data.pu;
		DATA.lastCandle.open = data.pu;

		if (is_draw && Number(DATA.lastCandle.time)) {
			while (time_frame - DATA.lastCandle.time > DATA.chart_time_frames[DATA.chart_time_frame] + 1) {
				DATA.lastCandle.time += DATA.chart_time_frames[DATA.chart_time_frame];
				DATA.candlestickSeries.update(DATA.lastCandle);
			}
		}

		DATA.lastCandle.time = time_frame;

		if (DATA.candleBuffer.length) {
			DATA.candleBuffer[DATA.candleBuffer.length - 1].close = data.pu;
		}
		DATA.candleBuffer.push(DATA.lastCandle);

		if (is_draw) {
			++DATA.page_offset.chart;
			DATA.candlestickSeries.update(DATA.lastCandle);
		}
	} else {
		DATA.candleBuffer[DATA.candleBuffer.length - 1] = { ...DATA.candleBuffer[DATA.candleBuffer.length - 1], ...DATA.lastCandle };
	}
};


const handle_tick = async (data) => {
	if ((data.t0 !== DATA.token && data.t1 !== DATA.token) || data.r !== DATA.pair) {
		return;
	}

	++DATA.page_offset.token;

	await wait_for_chart_to_finish_drawing();

	_handle_tick(data, true);
	DATA.updating_history_chart = false;

	add_swap_event_to_feed(data);
	update_chart_price(data.pu);
	set_current_positions(DATA.active_positions || []);
};

const update_chart_price = (price) => {
	DATA.token_price = Big(price);
	document.querySelector('#Chart__Currency .price').innerHTML = `$${formatNumber(DATA.token_price)}`;
	elementify('token-price-usd').innerHTML = `$${formatNumber(DATA.token_price)}`;

	let peg_amounts_element = elementify('Swap__InputCurrency__Amount'),
		token_amounts_element = elementify('Swap__OutputCurrency__Amount');

	if (token_amounts_element.dataset.focused !== 'true' && peg_amounts_element.dataset.focused !== 'true' && Big(token_amounts_element.value || 0).gt(0) && DATA.token_price.gt(0)) {
		token_amounts_element.value = Big(peg_amounts_element.value || 0).mul(DATA.WPEG_PRICE).div(DATA.token_price);
	}

	store.set(`${DATA.CHAIN}_token_price`, `${DATA.token_price}`);
};

const update_chart = (is_last) => {
	DATA.candlestickSeries.setData(DATA.candleBuffer);

	if (is_last) {
		DATA.chart_time_scale.fitContent();
		DATA.chart.priceScale('right').applyOptions({ autoScale: true });
		update_chart_price(DATA.candleBuffer.length && DATA.candleBuffer[DATA.candleBuffer.length - 1].close || DATA.token_price);
	}

	DATA.updating_history_chart = false;
};

const set_candles = (data, old) => {
	let candles = [], init_i = data.length - 1, i = init_i, time;

	for (; i >= 0; --i) {
		if (i !== init_i) {
			while (time < data[i].time - DATA.chart_time_frames[DATA.chart_time_frame]) {
				time += DATA.chart_time_frames[DATA.chart_time_frame];
				candles.push({ time, open: data[i + 1].close, high: data[i + 1].close, low: data[i + 1].close, close: data[i + 1].close });
			}

			data[i].open = data[i + 1].close;
		}

		time = data[i].time;
		candles.push(data[i]);
	}

	if (old) {
		DATA.candleBuffer[0].open = candles[candles.length - 1].close;
		DATA.candleBuffer = [...candles, ...DATA.candleBuffer];
	} else {
		DATA.candleBuffer = candles;
	}
	DATA.lastCandle = DATA.candleBuffer[DATA.candleBuffer.length - 1] || { ...CHART_DATA[0] };
};

const wait_for_chart_to_finish_drawing = async () => {
	trials = 25;
	while (--trials && DATA.updating_history_chart) {
		await sleep(0.05);
	}

	DATA.updating_history_chart = true;
};
