/**
 * Modal Copy Position Settings
 */

/*** Inject HTML ***/

(() => {

	const html = `<div id="ModalCopyPositionSettings" class="togglable modal d-none">
	<div class="lightbox" data-togglable="ModalCopyPositionSettings"></div>

	<div class="container">
		<div id="ModalCopyPositionSettings__Header" class="header">
			<div class="text-white text-bold text-truncated">WALLET SETTINGS</div>

			<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalCopyPositionSettings" id="copy-position-settings">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#191919" width="16" height="16" rx="100%"></rect>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
				</svg>
			</button>
		</div>

		<div id="ModalCopyPositionSettings__Body" class="body">
			<div class="label text-white d-flex mb-12px">
				<div>Wallet name</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set the name of the wallet.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group w-100">
					<input type="text" autocomplete="off" id="copy_title" name="title" class="form-control" spellcheck="false">
					<button class="btn btn-has-icon mt-2px ml-6px mr-6px" id="copy-address-copier" onclick="copyTextToClipboard('0x', event, this)" data-tooltip="Copy address" data-tooltip-left>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
							<path d="M0 2A2 2 0 012 0H10A2 2 0 0112 2V4H14A2 2 0 0116 6V14A2 2 0 0114 16H6A2 2 0 014 14V12H2A2 2 0 010 10V2ZM5 12V14A1 1 0 006 15H14A1 1 0 0015 14V6A1 1 0 0014 5H12V10A2 2 0 0110 12H5Z"></path>
						</svg>
					</button>
				</div>
			</div>

			<div class="text-white text-bold text-title">REQUIRED</div>

			<!-- Buy strategy -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Buy strategy</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set the strategy you want to use when copying a wallet.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>


			<div class="input-group checkbox-btn w-100 is-colored">
				<input type="checkbox" id="copy_input_is_strategy_manual" name="copy_is_strategy_manual" class="visually-hidden">

				<label for="copy_input_is_strategy_manual" data-inner-text-alt="ON">OFF</label>
			</div>

			<div id="group_strategy_manual" class="d-none">
				<!-- Buy strategy - Fixed amount -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Buy strategy - Fixed amount</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Copy a wallet with specific amount.">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" id="copy_input_fixed_amount" name="fixed_amount" class="form-control" placeholder="0">
						<div class="addon">BNB</div>
					</div>

					<div class="input-group checkbox-btn is-colored">
						<input type="checkbox" id="copy_input_is_fixed_amount" name="copy_is_fixed_amount" class="visually-hidden">

						<label for="copy_input_is_fixed_amount" data-inner-text-alt="ON">OFF</label>
					</div>
				</div>

				<!-- Buy strategy - Percent -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Buy strategy - Percent</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Copy a wallet with specific percentage from the copied trade.">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" id="copy_input_percent" name="percent" class="form-control" placeholder="0" data-val-max="100">
						<div class="addon">%</div>
					</div>

					<div class="input-group checkbox-btn is-colored">
						<input type="checkbox" id="copy_input_is_percent" name="copy_is_percent" class="visually-hidden">

						<label for="copy_input_is_percent" data-inner-text-alt="ON">OFF</label>
					</div>
				</div>

				<!-- Buy strategy - Proportional -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Buy strategy - Proportional</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Copy a wallet proportionally to the balance of the copied wallet and yours.">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group checkbox-btn is-colored w-100">
						<input type="checkbox" id="copy_input_is_proportional" name="copy_is_proportional" class="visually-hidden">

						<label for="copy_input_is_proportional" data-inner-text-alt="ON">OFF</label>
					</div>
				</div>
			</div>

			<div class="text-white text-bold text-title">OPTIONAL</div>

			<!-- Targets -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Targets</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set targets to sell the token at, JewBot will watch the price and sell accordingly.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="input-group">
				<button type="button" id="ModalCopyPositionSettings__AddTargetButton" class="btn btn-style w-100">Add Target</button>
			</div>

			<template id="ModalCopyPositionSettings__TargetTemplate">
				<div class="multiple-input-groups target-settings">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" name="targets_triggers[]" class="form-control" placeholder="0" data-val-min="1">
						<div class ="addon">X</div>
					</div>

					<div class="input-group has-addon">
						<input type="text" autocomplete="off" name="targets_percents[]" class="form-control" placeholder="0" data-val-max="100">
						<div class ="addon">%</div>
					</div>

					<div class="input-group">
						<button type="button" class="btn btn-style w-100">Remove</button>
					</div>
				</div>
			</template>

			<!-- Frontrun -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Frontrun</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set gas multiplier that will be added on top of the token owner/developer, used to front run a transaction.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_frontrun_gas_multiplier" name="frontrun_gas_multiplier" class="form-control" placeholder="0" data-val-min="1.001">
					<div class="addon">Multiplier</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_frontrun" name="copy_is_frontrun" class="visually-hidden">

					<label for="copy_input_is_frontrun" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Backrun -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Backrun</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set whether buy after the copied wallet (needed if that wallet enters many times on first block with devs).">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group checkbox-btn is-colored w-100">
					<input type="checkbox" id="copy_input_is_backrun" name="copy_is_backrun" class="visually-hidden">

					<label for="copy_input_is_backrun" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Maximum buy fee -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Maximum buy fee</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set maximum fee allowed for buying a token, act as a fee sniper as well.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_max_buy_fee" name="max_buy_fee" class="form-control" placeholder="0" data-val-max="100">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_max_buy_fee" name="copy_is_max_buy_fee" class="visually-hidden">

					<label for="copy_input_is_max_buy_fee" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Maximum sell fee -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Maximum sell fee</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set maximum fee allowed for selling a token, act as a fee defender as well.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_max_sell_fee" name="max_sell_fee" class="form-control" placeholder="0" data-val-max="100">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_max_sell_fee" name="copy_is_max_sell_fee" class="visually-hidden">

					<label for="copy_input_is_max_sell_fee" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Stop loss -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Stop loss</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Sell an asset when it reaches a particular price point. It is used to limit loss.<br>Trailing stop loss will lock in profits while protecting you from significant losses.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_stop_loss_trigger" name="stop_loss_trigger" class="form-control" placeholder="0.0" data-val-max="0.999">
					<div class="addon">X</div>
				</div>

				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_stop_loss_percent" name="stop_loss_percent" class="form-control" placeholder="0" data-val-max="100">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn">
					<input type="checkbox" id="copy_input_is_stop_loss_trailing" name="copy_is_stop_loss_trailing" class="visually-hidden" checked>

					<label for="copy_input_is_stop_loss_trailing" data-inner-text-alt="Trailing">Normal</label>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_stop_loss" name="copy_is_stop_loss" class="visually-hidden">

					<label for="copy_input_is_stop_loss" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Defender -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Defender</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Sell a bought token on specific methods, used to front run a fraudulent transaction.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group checkbox-btn w-100 is-colored">
					<input type="checkbox" id="copy_input_is_defender" name="copy_is_defender" class="visually-hidden">

					<label for="copy_input_is_defender" data-inner-text-alt="ON">OFF</label>
				</div>

				<div class="input-group checkbox-btn">
					<input type="checkbox" id="copy_input_is_defender_manual" name="copy_is_defender_manual" class="visually-hidden">

					<label for="copy_input_is_defender_manual" class="d-flex">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md ml-auto mr-auto">
							<path d="M 11.5 2 A 1.5 1.5 0 1 0 11.5 5 A 1.5 1.5 0 0 0 11.5 2 Z M 9.05 3 A 2.5 2.5 0 0 1 13.95 3 H 16 V 4 H 13.95 A 2.5 2.5 0 0 1 9.05 4 H 0 V 3 H 9.05 Z M 4.5 7 A 1.5 1.5 0 1 0 4.5 10 A 1.5 1.5 0 0 0 4.5 7 Z M 2.05 8 A 2.5 2.5 0 0 1 6.95 8 H 16 V 9 H 6.95 A 2.5 2.5 0 0 1 2.05 9 H 0 V 8 H 2.05 Z M 11.5 12 A 1.5 1.5 0 1 0 11.5 15 A 1.5 1.5 0 0 0 11.5 12 Z M 9.05 13 A 2.5 2.5 0 0 1 13.95 13 H 16 V 14 H 13.95 A 2.5 2.5 0 0 1 9.05 14 H 0 V 13 H 9.05 Z"/>
						</svg>
					</label>
				</div>
			</div>

			<div id="group_defender" class="d-none">
				<!-- Dev fake LQ removal -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Dev fake LQ removal</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Percent of the liquidity that the Dev can remove until position gets triggered.">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" id="copy_input_max_dev_sell_or_lq_percent" name="copy_max_dev_sell_or_lq_percent" class="form-control" placeholder="0" data-val-max="99">
						<div class="addon">%</div>
					</div>

					<div class="input-group checkbox-btn is-colored">
						<input type="checkbox" id="copy_input_is_max_dev_sell_or_lq_percent" name="copy_is_max_dev_sell_or_lq_percent" class="visually-hidden">

						<label for="copy_input_is_max_dev_sell_or_lq_percent" data-inner-text-alt="ON">OFF</label>
					</div>
				</div>

				<!-- Defender - Gas multiplier  -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Defender - Gas multiplier</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set gas multiplier that will be added on top of the token owner/developer, used to front run a transaction.">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" id="copy_input_defender_gas_multiplier" name="defender_gas_multiplier" class="form-control" placeholder="0" data-val-min="1.01">
						<div class="addon">Multiplier</div>
					</div>
				</div>

				<!-- Defender - Max TX per host  -->

				<div class="label text-white d-flex mt-12px mb-12px">
					<div>Defender - Max TX per host</div>

					<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set the maximum number of transactions you allow to buy a token when following a spesific wallet">
						${DATA.ERROR_IMG_HTML}
					</button>
				</div>

				<div class="multiple-input-groups">
					<div class="input-group has-addon">
						<input type="text" autocomplete="off" id="copy_input_defender_max_tx_per_host" name="defender_max_tx_per_host" class="form-control" placeholder="0">
						<div class="addon">Times</div>
					</div>

					<div class="input-group checkbox-btn is-colored">
						<input type="checkbox" id="copy_input_is_defender_max_tx_per_host" name="copy_is_defender_max_tx_per_host" class="visually-hidden">

						<label for="copy_input_is_defender_max_tx_per_host" data-inner-text-alt="ON">OFF</label>
					</div>
				</div>
			</div>

			<div class="text-white text-bold text-title">ADVANCED</div>

			<!-- Buy and sell slippage -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div><b>BUY & SELL</b> - Slippage</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Slippage refers to the difference between the expected price of a trade and the price at which the trade is executed.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_slippage_buy" name="slippage_buy" class="form-control" placeholder="0" data-val-max="100">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_slippage_buy" name="copy_is_slippage_buy" class="visually-hidden" checked>

					<label for="copy_is_slippage_buy" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_slippage_sell" name="slippage_sell" class="form-control" placeholder="0" data-val-max="100">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_slippage_sell" name="copy_is_slippage_sell" class="visually-hidden" checked>

					<label for="copy_is_slippage_sell" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<!-- Buy and sell gas price -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div><b>BUY & SELL</b> - Gas price</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set custom gas price for buying or selling a token, perfect for successful pre-sales.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_buy_gas_price" name="buy_gas_price" class="form-control" placeholder="0">
					<div class="addon">GWei</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_buy_gas_price" name="copy_is_buy_gas_price" class="visually-hidden" checked>

					<label for="copy_is_buy_gas_price" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_sell_gas_price" name="sell_gas_price" class="form-control" placeholder="0">
					<div class="addon">GWei</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_sell_gas_price" name="copy_is_sell_gas_price" class="visually-hidden" checked>

					<label for="copy_is_sell_gas_price" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<!-- Buy and sell gas limit -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div><b>BUY & SELL</b> - Gas limit</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Gas limit is the highest cost an Ethereum user pays to push a transaction through the network. The limit set depends on the complexity of the activity you want to run the blockchain or the speed you want the transaction fulfilled.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_buy_gas_limit" name="buy_gas_limit" class="form-control" placeholder="0" data-val-max="50">
					<div class="addon">MWei</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_buy_gas_limit" name="copy_is_buy_gas_limit" class="visually-hidden" checked>

					<label for="copy_is_buy_gas_limit" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_sell_gas_limit" name="sell_gas_limit" class="form-control" placeholder="0" data-val-max="50">
					<div class="addon">MWei</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_sell_gas_limit" name="copy_is_sell_gas_limit" class="visually-hidden" checked>

					<label for="copy_is_sell_gas_limit" data-inner-text-alt="Manual">Automatic</label>
				</div>
			</div>

			<!-- Buy and sell gas multiplier -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div><b>BUY & SELL</b> - Gas Multiplier</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Gas multiplier is the coefficient to multiply the gas by when using auto gas limit">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_buy_gas_multiplier" name="buy_gas_multiplier" class="form-control" placeholder="1.001" data-val-min="1" data-val-max="10">
					<div class="addon">X</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_buy_gas_multiplier" name="copy_is_buy_gas_multiplier" class="visually-hidden">

					<label for="copy_is_buy_gas_multiplier" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_sell_gas_multiplier" name="sell_gas_multiplier" class="form-control" placeholder="1.001" data-val-min="1" data-val-max="10">
					<div class="addon">X</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_is_sell_gas_multiplier" name="copy_is_sell_gas_multiplier" class="visually-hidden">

					<label for="copy_is_sell_gas_multiplier" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Transfer limit -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Transfer limit</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set the maximum operations for a transactions, will protect you in case of many Max transaction amount (MTA) splits.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_tx_transfer_limit" name="tx_transfer_limit" class="form-control" placeholder="1.2" data-val-min="1.001" data-val-max="10">
					<div class="addon">Times</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_tx_transfer_limit" name="copy_is_tx_transfer_limit" class="visually-hidden">

					<label for="copy_input_is_tx_transfer_limit" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Moonbag -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Moonbag</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Leave a percentage of your trade after you sell the token.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_moonbag" name="copy_moonbag" class="form-control" placeholder="0" data-val-max="99">
					<div class="addon">%</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_moonbag" name="copy_is_moonbag" class="visually-hidden">

					<label for="copy_input_is_moonbag" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Block delay -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Block delay</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Configurable block delay before buying, anti-bot feature.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_block_delay" namecopy_="block_delay" class="form-control" placeholder="0">
					<div class="addon">Blocks</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_block_delay" name="copy_is_block_delay" class="visually-hidden">

					<label for="copy_input_is_block_delay" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Timeout -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Timeout</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="JewBot will drop the trade after given amount of munities.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group has-addon">
					<input type="text" autocomplete="off" id="copy_input_timeout" name="timeout" class="form-control" placeholder="0" data-val-max="500000">
					<div class="addon">Minutes</div>
				</div>

				<div class="input-group checkbox-btn is-colored">
					<input type="checkbox" id="copy_input_is_timeout" name="copy_is_timeout" class="visually-hidden">

					<label for="copy_input_is_timeout" data-inner-text-alt="ON">OFF</label>
				</div>
			</div>

			<!-- Kosher -->

			<div class="label text-white d-flex mt-12px mb-12px">
				<div>Kosher</div>

				<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="JewBot will scan the contract for fraudulent code before buying the token.<br>Adjustable for custom code.">
					${DATA.ERROR_IMG_HTML}
				</button>
			</div>

			<div class="multiple-input-groups">
				<div class="input-group checkbox-btn w-100 is-colored">
					<input type="checkbox" id="copy_input_is_kosher" name="copy_is_kosher" class="visually-hidden">

					<label for="copy_input_is_kosher" data-inner-text-alt="ON">OFF</label>
				</div>

				<div class="input-group checkbox-btn">
					<input type="checkbox" id="copy_input_is_kosher_manual" name="copy_is_kosher_manual" class="visually-hidden">

					<label for="copy_input_is_kosher_manual" class="d-flex">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md ml-auto mr-auto">
							<path d="M 11.5 2 A 1.5 1.5 0 1 0 11.5 5 A 1.5 1.5 0 0 0 11.5 2 Z M 9.05 3 A 2.5 2.5 0 0 1 13.95 3 H 16 V 4 H 13.95 A 2.5 2.5 0 0 1 9.05 4 H 0 V 3 H 9.05 Z M 4.5 7 A 1.5 1.5 0 1 0 4.5 10 A 1.5 1.5 0 0 0 4.5 7 Z M 2.05 8 A 2.5 2.5 0 0 1 6.95 8 H 16 V 9 H 6.95 A 2.5 2.5 0 0 1 2.05 9 H 0 V 8 H 2.05 Z M 11.5 12 A 1.5 1.5 0 1 0 11.5 15 A 1.5 1.5 0 0 0 11.5 12 Z M 9.05 13 A 2.5 2.5 0 0 1 13.95 13 H 16 V 14 H 13.95 A 2.5 2.5 0 0 1 9.05 14 H 0 V 13 H 9.05 Z"/>
						</svg>
					</label>
				</div>
			</div>

			<div id="copy_group_kosher_manual" class="d-none">
				<div id="ModalCopyPositionSettings__KosherMode" class="multiple-input-groups">
					<div class="input-group checkbox-btn">
						<input type="radio" id="copy_input_kosher_mode_auto" name="kosher_mode" class="visually-hidden" value="a" checked>

						<label for="copy_input_kosher_mode_auto">Automatic</label>
					</div>

					<div class="input-group checkbox-btn w-100">
						<input type="radio" id="copy_input_kosher_mode_mixed" name="kosher_mode" class="visually-hidden" value="m">

						<label for="copy_input_kosher_mode_mixed">Mixed</label>
					</div>

					<div class="input-group checkbox-btn w-100">
						<input type="radio" id="copy_input_kosher_mode_custom" name="kosher_mode" class="visually-hidden" value="c">

						<label for="copy_input_kosher_mode_custom">Custom</label>
					</div>
				</div>

				<div class="input-group text-area d-none">
					<textarea id="copy_textarea_kosher_strainer" name="kosher_strainer" class="form-control" spellcheck="false" placeholder="Add each exception on a new line" rows="8"></textarea>
				</div>
			</div>
		</div>

		<div id="ModalCopyPositionSettings__Footer" class="footer">
			<button class="btn btn-style w-100 w-auto text-white fs-0 mr-12px lightbox" data-action="reset-copy-settings">Reset</button>

			<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalCopyPositionSettings" data-action="save-copy-settings">Save</button>
		</div>
	</div>
</div>`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

(() => {

	document.querySelectorAll('#ModalCopyPositionSettings input, #ModalCopyPositionSettings textarea').forEach(el => {
		el.oninput = e => {
			if (el.type === 'text') {
				if (el.name === 'title') {
					el.value = el.value.replace(/[^0-9a-zA-Z .,\-\(\)\[\]\/\!@#\$\%\^\&\*\+]/g, '');
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet].title = el.value;
					return;
				}

				el.value = el.value.replace(/[^0-9.]+/g, '');

				if (/^0\.?0*$/.test(el.value)) {
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')] = 0;
					return;
				}

				if (!Number(el.value) || Number(el.value) <= 0) {
					el.value = '';
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')] = 0;
				} else if (el.getAttribute('data-val-max') && Number(el.value) > Number(el.getAttribute('data-val-max') || 0)) {
					el.value = el.getAttribute('data-val-max');
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')] = Number(el.getAttribute('data-val-max'));
				} else {
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')] = Big(el.value);
				}
			} else if (el.type === 'checkbox') {
				DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')] = !DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.id.replace(/^(copy_)?(input_)?/, '')];
			} else if (el.type === 'radio') {
				DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name] = el.value;
			} else if (el.type === 'textarea') {
				DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name] = el.value.split("\n");
			}
		};
	});

	load_settings('ModalCopyPositionSettings', DATA.selected_slot && (DATA.selected_copy_wallet || DATA.copy_wallet || (DATA.selected_copy_wallet = DATA.ZERO)) && (DATA.copy_settings[DATA.selected_copy_slot] || (DATA.copy_settings[DATA.selected_copy_slot] = {})) && (DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet] = (JSON.parse(store.get(`${DATA.CHAIN}_copy_settings`) || `{"${DATA.selected_slot}": {}}`)[DATA.selected_slot] || {})[DATA.selected_copy_wallet || DATA.copy_wallet] || { ...DATA.default_copy_settings, buy_method_ids: [], sell_method_ids: [], kosher_strainer: [], targets_percents: [], targets_triggers: [] }));

})();

/*** Add target button ***/

function handleAddCopyTargetButtonClick(e, x, p) {

	if (e && document.querySelectorAll('#ModalCopyPositionSettings [name="targets_triggers[]"]').length >= DATA.MAX_TARGETS) {
		return e.target.classList.add('d-none');
	}

	const body = elementify('ModalCopyPositionSettings__Body');
	const addTargetButton = elementify('ModalCopyPositionSettings__AddTargetButton');
	const targetTemplate = elementify('ModalCopyPositionSettings__TargetTemplate');
	const targetTemplateContainer = addTargetButton.parentElement.parentElement;

	const template = targetTemplate.content.cloneNode(true);
	const currentTargets = body.querySelectorAll('[name="targets_triggers[]"]');

	template.children[0].setAttribute('data-target-order', currentTargets.length);

	if (e) {
		template.querySelector('input[name*="targets_triggers"]').value = '';
		template.querySelector('input[name*="targets_percents"]').value = '';
	} else {
		let wallet_slot = DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet];

		template.querySelector('input[name*="targets_triggers"]').value = x || wallet_slot.targets_triggers[wallet_slot.targets_triggers.length - 1] || '';
		template.querySelector('input[name*="targets_percents"]').value = p || wallet_slot.targets_percents[wallet_slot.targets_percents.length - 1] || '';
	}

	template.querySelector('button').addEventListener('click', event => {
		let idx = Array.prototype.indexOf.call(event.target.parentElement.parentElement.parentElement.children, event.target.parentElement.parentElement) - 8; /* 8 element before the first (for copy) */

		DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet].targets_triggers.splice(idx, 1);
		DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet].targets_percents.splice(idx, 1);
		event.target.parentElement.parentElement.remove();

		if (document.querySelectorAll('#ModalCopyPositionSettings [name="targets_triggers[]"]').length < DATA.MAX_TARGETS) {
			elementify('ModalCopyPositionSettings__AddTargetButton').classList.remove('d-none');
		}
	});

	template.querySelectorAll('input').forEach(el => {
		el.oninput = e => {
			setTimeout(() => {
				let order = Number(el.parentNode.parentNode.dataset.targetOrder);

				if (!Number(el.value) || Number(el.value) <= 0) {
					el.value = '';
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name.replace('[]', '')][order] = 0;
				} else if (el.getAttribute('data-val-max') && Number(el.value) > Number(el.getAttribute('data-val-max'))) {
					el.value = el.getAttribute('data-val-max');
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name.replace('[]', '')][order] = Number(el.getAttribute('data-val-max'));
				} else if (el.getAttribute('data-val-min') && Number(el.value) <= Number(el.getAttribute('data-val-min'))) {
					el.value = Number(el.getAttribute('data-val-min'));
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name.replace('[]', '')][order] = Number(el.getAttribute('data-val-min'));
				} else {
					DATA.copy_settings[DATA.selected_copy_slot][DATA.selected_copy_wallet || DATA.copy_wallet][el.name.replace('[]', '')][order] = Number(el.value);
				}
			}, 400);
		};
	});

	targetTemplateContainer.insertBefore(template, addTargetButton.parentElement);

	addTargetButton.blur();
};

(() => {

	elementify('ModalCopyPositionSettings__AddTargetButton').addEventListener('click', handleAddCopyTargetButtonClick);

})();

/* Show strategy configuration */

(() => {

	elementify('copy_input_is_strategy_manual').addEventListener('change', event => {
		if (event.currentTarget.checked) {
			elementify('group_strategy_manual').classList.remove('d-none');
			elementify('group_strategy_manual').scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else {
			elementify('group_strategy_manual').classList.add('d-none');
		}
	});

})();

/* Make strategy on/off mutually exclusive */

(() => {

	document.querySelectorAll('#group_strategy_manual label').forEach(label => {
		label.addEventListener('click', event => {
			document.querySelectorAll('#group_strategy_manual input[type="checkbox"]').forEach(checkbox => {
				if (label.previousElementSibling != checkbox && checkbox.checked == true) {
					checkbox.nextElementSibling.click();
				}
			});
		});
	});
})();

/* Show defender configuration */

(() => {

	elementify('copy_input_is_defender_manual').addEventListener('change', event => {
		if (event.currentTarget.checked) {
			elementify('group_defender').classList.remove('d-none');
			elementify('group_defender').scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else {
			elementify('group_defender').classList.add('d-none');
		}
	});

})();

/* Show kosher configuration */

(() => {

	elementify('copy_input_is_kosher_manual').addEventListener('change', event => {
		if (event.currentTarget.checked) {
			elementify('copy_group_kosher_manual').classList.remove('d-none');
			elementify('copy_group_kosher_manual').scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else {
			elementify('copy_group_kosher_manual').classList.add('d-none');
		}
	});

})();

/* Show kosher strainer if set to mixed or custom else hide */

(() => {

	document.querySelectorAll('#ModalCopyPositionSettings__KosherMode input[type="radio"]').forEach(radio => {
		radio.addEventListener('change', event => {
			switch (radio.value) {
				case 'a': /* auto */
				case 'n': /* none */
					elementify('copy_textarea_kosher_strainer').parentNode.classList.add('d-none');
					break;

				case 'c': /* custom */
				case 'm': /* mixed */
					elementify('copy_textarea_kosher_strainer').parentNode.classList.remove('d-none');
					elementify('copy_textarea_kosher_strainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
					break;

				default:
					break;
			}
			event.target.blur();
		})
	});

})();
