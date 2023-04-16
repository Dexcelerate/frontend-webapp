/**
 * Swap
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="Swap" class="card card-swap">
			<div class="container">
				<div id="Swap__InputCurrency" class="token-group">
					<div class="input-group">
						<button class="pe-none">
							<div class="image">
								<div class="icon-md">
									<img class="icon-md icon-round peg" id="${GetTokenImage(DATA.WPEG)}" src="${DATA.ERROR_IMG}">
								</div>
							</div>

							<div class="symbol" data-preposition="From">
								<div data-peg-text="true">W${DATA.PEG}</div>
							</div>
						</button>
					</div>

					<div class="input-group has-animated-addon">
						<input id="Swap__InputCurrency__Amount" class="form-control text-right" placeholder="0.00" value="${Number(DATA.amounts[DATA.CHAIN]) > 0 && DATA.amounts[DATA.CHAIN] || ''}" title="Token Amount" autocomplete="off" oninput="update_token_amount(this)" onfocus="this.dataset.focused = true" onblure="this.dataset.focused = false">

						<div class="addon" id="peg-amount-usd" data-balance="${DATA.amounts[DATA.CHAIN] || '0'}">$${formatFiat(Big(DATA.amounts[DATA.CHAIN] || 0).mul(DATA.WPEG_PRICE))}</div>
					</div>
				</div>

				<div id="Swap__OutputCurrency" class="token-group">
					<div class="input-group">
						<button title="Select Token" data-togglable="ModalTokenOutput">
							<div class="image">
								<div class="icon-md">
									<img id="${GetTokenImage(DATA.token)}" src="${DATA.ERROR_IMG}" class="icon-round">
								</div>
							</div>

							<div class="symbol" data-preposition="To (estimated)">
								<div>Token</div>
							</div>
						</button>
					</div>

					<div class="input-group has-animated-addon">
						<input id="Swap__OutputCurrency__Amount" class="form-control text-right" placeholder="0.00" value="${Big(DATA.amounts[DATA.CHAIN] || 0).gt(0) && DATA.token_price.gt(0) && Big(DATA.amounts[DATA.CHAIN]).mul(DATA.WPEG_PRICE).div(DATA.token_price) || ''}" title="Token Amount" autocomplete="off" oninput="update_peg_amount(this)" onfocus="this.dataset.focused = true" onblure="this.dataset.focused = false">

						<div class="addon">1 Token = <span id="token-price-usd">$0.00</div>
					</div>
				</div>

				<div class="bottom-group">
					<div class="btn-group">
						<div class="btn-wrapper">
							<button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center" id="position-settings" title="Position Settings" data-togglable="ModalPositionSettings">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M2.5 12A.5.5 0 013 11.5H13A.5.5 0 0113 12.5H3A.5.5 0 012.5 12ZM2.5 8A.5.5 0 013 7.5H13A.5.5 0 0113 8.5H3A.5.5 0 012.5 8ZM2.5 4A.5.5 0 013 3.5H13A.5.5 0 0113 4.5H3A.5.5 0 012.5 4Z"/>
								</svg>
							</button>
						</div>

						<div class="btn-wrapper">
							<button class="btn btn-style btn-has-icon w-100 d-flex justify-content-center" title="Positions" data-togglable="ModalPositions">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M6 2A.5.5 0 016.47 2.33L10 12.036 11.53 7.828A.5.5 0 0112 7.5H15.5A.5.5 0 0115.5 8.5H12.35L10.47 13.67A.5.5 0 019.53 13.67L6 3.964 4.47 8.171A.5.5 0 014 8.5H.5A.5.5 0 01.5 7.5H3.65L5.53 2.33A.5.5 0 016 2Z"/>
								</svg>
							</button>
						</div>
					</div>

					<div id="swap-buttons" class="btn-group w-100 mri-0">
						<span id="swap-loader">
							<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
						</span>

						<div class="btn-wrapper mri-0">
							<button id="Swap__ConnectWalletButton" class="btn btn-style w-100 text-white" title="Connect Wallet" data-action="connect">${DATA.conf.auth && 'Buy' || 'Connect Wallet'}</button>
						</div>

						<div id="Swap__SellButton" class="btn-wrapper visually-hidden ml-12px">
							<button class="btn btn-style w-100 text-white" title="Sell" data-action="sell" data-main-sell="true">Sell</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	elementify('Main').insertAdjacentHTML('beforeend', html);

})();

const update_token_amount = (that) => {
	that.value = that.value.replace(/[^0-9.]+/g, '');

	if (/^0\.?0*$/.test(that.value)) {
		return;
	}

	if (!Number(that.value)) {
		DATA.amounts[DATA.CHAIN] = Big(0);
		that.value = '';
	}

	if (Number(that.value) > 0) {
		elementify('peg-amount-usd').dataset.balance = that.value;
		elementify('peg-amount-usd').innerHTML = `$${formatFiat(Big(that.value).mul(DATA.WPEG_PRICE))}`;
		elementify('Swap__OutputCurrency__Amount').value = Big(that.value).mul(DATA.WPEG_PRICE).div(DATA.token_price);
		DATA.amounts[DATA.CHAIN] = Big(that.value);
	} else {
		elementify('peg-amount-usd').dataset.balance = 0;
		elementify('peg-amount-usd').innerHTML = '$0.00';
		elementify('Swap__OutputCurrency__Amount').value = '';
		DATA.amounts[DATA.CHAIN] = Big(0);
	}

	if (DATA.amounts_timeout) {
		clearTimeout(DATA.amounts_timeout);
	}

	DATA.amounts_timeout = setTimeout(() => {
		store.set('amounts', JSON.stringify(DATA.amounts));
	}, 400);
};

const update_peg_amount = (that) => {
	that.value = that.value.replace(/[^0-9.]+/g, '');

	if (/^0\.?0*$/.test(that.value)) {
		DATA.amounts[DATA.CHAIN] = Big(0);
		return;
	}

	if (!Number(that.value)) {
		that.value = '';
	}

	if (Number(that.value) > 0) {
		elementify('peg-amount-usd').dataset.balance = that.value;
		elementify('peg-amount-usd').innerHTML = `$${formatFiat(Big(that.value).mul(DATA.token_price))}`;
		elementify('Swap__InputCurrency__Amount').value = DATA.amounts[DATA.CHAIN] = Big(that.value).mul(DATA.token_price).div(DATA.WPEG_PRICE.gt(0) && DATA.WPEG_PRICE || 1);
	} else {
		elementify('peg-amount-usd').dataset.balance = 0;
		elementify('peg-amount-usd').innerHTML = '$0.00';
		elementify('Swap__InputCurrency__Amount').value = '';
		DATA.amounts[DATA.CHAIN] = Big(0);
	}

	if (DATA.amounts_timeout) {
		clearTimeout(DATA.amounts_timeout);
	}

	DATA.amounts_timeout = setTimeout(() => {
		store.set('amounts', JSON.stringify(DATA.amounts));
	}, 400);
};

const settings_alert = (setting, msg) => {
	toggleModal(document.getElementById(DATA.view === 'swap' && 'position-settings' || 'copy-position-settings'));
	document.querySelector(`#${DATA.view === 'swap' && 'ModalPositionSettings' || 'ModalCopyPositionSettings'} [name*="${setting}"], #${DATA.view === 'swap' && 'ModalPositionSettings' || 'ModalCopyPositionSettings'} [id*="${setting}"]`).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

	help_err(msg || setting);
};

const check_swap_specific_settings = (settings) => {
	settings.t = DATA.token;

	if (settings.is_defender && !settings.buy_method_ids.length && !settings.sell_method_ids.length) {
		return settings_alert('defender', 'No selected methods, the bot wont trigger on anything...');
	}

	if (!settings.is_buy_at || !Number(settings.buy_at)) {
		if ((!settings.targets_triggers.length || (settings.targets_triggers.length !== settings.targets_triggers.filter(v => Number(v) > 1).length))) {
			return settings_alert('Target', 'Targets must be greater that 1x');
		}

		if (!settings.targets_percents.length || settings.targets_triggers.length !== settings.targets_percents.filter(v => (Number(v) <= 100 && Number(v) > 0)).length) {
			return settings_alert('Target', 'Targets\' percents must be greater than 0% and less or equal to 100%');
		}
	} else {
		if (settings.targets_triggers.length !== settings.targets_triggers.filter(v => Number(v) > 1).length) {
			return settings_alert('Target', 'Targets must be greater that 1x');
		}

		if (settings.targets_triggers.length !== settings.targets_percents.filter(v => (Number(v) <= 100 && Number(v) > 0)).length) {
			return settings_alert('Target', 'Targets\' percents must be greater than 0% and less or equal to 100%');
		}
	}

	if (settings.is_buy_at && !Number(settings.buy_at)) {
		return settings_alert('buy_at', 'Buy-at amount must be greater than 0 if it\'s ON');
	}

	if (settings.is_sell_at && !Number(settings.sell_at)) {
		return settings_alert('sell_at', 'Sell-at amount must be greater than 0 if it\'s ON');
	}

	return true;
};

const check_copy_specific_settings = (settings) => {
	settings.D = DATA.selected_copy_wallet || DATA.copy_wallet;
	settings.title = settings.title.slice(0, 64);

	/* if (settings.is_defender && (!Number(settings.defender_max_tx_per_host) || !Number(settings.defender_gas_multiplier) || Number(settings.defender_gas_multiplier) < 1.001)) {
		return settings_alert('defender');
	} */

	if (settings.targets_triggers.length !== settings.targets_triggers.filter(v => Number(v) > 1).length) {
		return settings_alert('Target', 'Targets must be greater that 1x');
	}

	if (settings.targets_triggers.length !== settings.targets_percents.filter(v => (Number(v) <= 100 && Number(v) > 0)).length) {
		return settings_alert('Target', 'Targets\' percents must be greater than 0% and less or equal to 100%');
	}

	if (settings.is_strategy_manual) {
		if (!settings.is_fixed_amount && !settings.is_percent && !settings.is_proportional) {
			return settings_alert('strategy_manual', 'Buy strategy is ON, but no strategy is selected');
		}

		if ((settings.is_fixed_amount && settings.is_percent) || (settings.is_percent && settings.is_proportional) || (settings.is_proportional && settings.is_fixed_amount)) {
			return settings_alert('fixed_amount', 'These options are mutually exclusive');
		}

		if (settings.is_fixed_amount && !Number(settings.fixed_amount)) {
			return settings_alert('fixed_amount', 'Fixed amount must be greater than 0 if it\'s ON');
		}

		if (settings.is_percent && (!Number(settings.percent) || Number(settings.percent) > 100)) {
			return settings_alert('percent', 'The percentage must be greater than 0% and less or equal to 100% if it\'s ON');
		}
	}

	if (settings.is_max_dev_sell_or_lq_percent && (!Number(settings.max_dev_sell_or_lq_percent) || Number(settings.max_dev_sell_or_lq_percent) > 100)) {
		return settings_alert('max_dev_sell_or_lq_percent', 'Max dev lq. percent amount must be greater than 0% and less or equal to 100% if it\'s ON');
	}

	return true;
};

const check_common_settings = (settings) => {

	if (settings.is_buy_gas_limit && (!Number(settings.buy_gas_limit) || Number(settings.buy_gas_limit) > 50)) {
		return settings_alert('buy_gas_limit', 'Buy gas limit must be greater than 0 and less than or equal to 50 MWei if it\'s ON');
	}

	if (settings.is_buy_gas_price && !Number(settings.buy_gas_price)) {
		return settings_alert('buy_gas_price', 'Buy gas price must be greater than 0 if it\'s ON');
	}

	if (settings.is_slippage_buy && !Number(settings.slippage_buy)) {
		return settings_alert('slippage_buy', 'Slippage buy must be greater than 0 if it\'s ON');
	}

	if (settings.is_sell_gas_limit && (!Number(settings.sell_gas_limit) || Number(settings.sell_gas_limit) > 50)) {
		return settings_alert('sell_gas_limit', 'Sell gas limit must be greater than 0 and less than or equal to 50 MWei if it\'s ON');
	}

	if (settings.is_sell_gas_price && !Number(settings.sell_gas_price)) {
		return settings_alert('sell_gas_price', 'Sell gas price must be greater than 0 if it\'s ON');
	}

	if (settings.is_slippage_sell && !Number(settings.slippage_sell)) {
		return settings_alert('slippage_sell', 'Slippage sell must be greater than 0 if it\'s ON');
	}

	if (settings.is_max_buy_fee && (!Number(settings.max_buy_fee) || Number(settings.max_buy_fee) > 100)) {
		return settings_alert('max_buy_fee', 'Max buy fee must be greater than 0 and less than 100 if it\'s ON');
	}

	if (settings.is_max_sell_fee && (!Number(settings.max_sell_fee) || Number(settings.max_sell_fee) > 100)) {
		return settings_alert('max_sell_fee', 'Max sell fee must be greater than 0 and less than 100 if it\'s ON');
	}

	if (settings.is_moonbag && (!Number(settings.moonbag) || Number(settings.moonbag) > 99)) {
		return settings_alert('moonbag', 'Moonbag must be greater than 0 and less than 99 if it\'s ON');
	}

	if (settings.is_frontrun && (!Number(settings.frontrun_gas_multiplier) || Number(settings.frontrun_gas_multiplier) < 1.001)) {
		return settings_alert('frontrun_gas_multiplier', 'Frontrun gas multipier must be greater than 1.001 if it\'s ON');
	}

	if (settings.is_block_delay && !Number(settings.block_delay)) {
		return settings_alert('block_delay', 'Block-delay must be greater than 0 if it\'s ON');
	}

	if (settings.is_timeout && (!Number(settings.timeout) || Number(settings.timeout) > 500000)) {
		return settings_alert('timeout', 'Timout must be greater than 0 and less than or equal to 500000 if it\'s ON');
	}

	if (settings.is_tx_transfer_limit && (!Number(settings.tx_transfer_limit) || Number(settings.tx_transfer_limit) > 50)) {
		return settings_alert('tx_transfer_limit', 'Tx transfer limit must be greater than 0 and less than or equal to 50 MWei if it\'s ON');
	}

	if (settings.is_stop_loss) {
		if (!Number(settings.stop_loss_percent)) {
			return settings_alert('stop_loss', 'The stop-loss percentage must be greater than 0% and less or equal to 100% if it\'s ON');
		}

		if (!Number(settings.stop_loss_trigger)) {
			return settings_alert('stop_loss', 'The stop-loss trigger must be greater than 0 and less than 1 if it\'s ON');
		}
	}

	if (settings.is_kosher && settings.kosher_mode === 'c' && !settings.kosher_strainer.length) {
		return settings_alert('kosher', 'Your kosher list is empty');
	}

	for (let i = settings.targets_percents.length - 2; i >= 0; --i) {
		if (Number(settings.targets_percents[i]) === 100) {
			return settings_alert('Target', 'You can\'t sell everything and continue trading');
		}
	}

	return true;
};

const check_fields = () => {
	let settings = null;

	if (DATA.view === 'swap') {
		settings = JSON.parse(JSON.stringify({ targets_percents: [], targets_triggers: [], ...DATA.settings }));
		if (check_common_settings(settings)) {
			if (check_swap_specific_settings(settings)) {
				return settings;
			}
		}
	} else if (DATA.view === 'copy') {
		if (!DATA.copy_settings[DATA.selected_copy_slot]) {
			return settings_alert('Target', 'No slot selected');
		}
		if (!DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet]) {
			return settings_alert('Target', 'No wallet selected');
		}

		settings = JSON.parse(JSON.stringify(DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet]));
		if (check_common_settings(settings)) {
			if (check_copy_specific_settings(settings)) {
				return settings;
			}
		}
	}
};
