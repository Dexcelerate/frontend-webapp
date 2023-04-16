/**
 * Modal Position Settings
 */

/*** Inject HTML ***/

(() => {

	const html = `
		<div id="ModalPositionSettings" class="togglable modal d-none">
			<div class="lightbox" data-togglable="ModalPositionSettings"></div>

			<div class="container">
				<div id="ModalPositionSettings__Header" class="header">
					<div class="text-white text-bold text-truncated">POSITION SETTINGS</div>

					<button type="button" class="btn btn-has-icon ml-auto lightbox" data-togglable="ModalPositionSettings">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
							<rect fill="#191919" width="16" height="16" rx="100%"></rect>
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
						</svg>
					</button>
				</div>

				<div id="ModalPositionSettings__Body" class="body">
					<div class="text-white text-bold text-title mt-0">REQUIRED</div>

					<!-- Targets -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Targets</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set targets to sell the token at, JewBot will watch the price and sell accordingly.">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div class="input-group">
						<button type="button" id="ModalPositionSettings__AddTargetButton" class="btn btn-style w-100">Add Target</button>
					</div>

					<template id="ModalPositionSettings__TargetTemplate">
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

					<div class="text-white text-bold text-title">OPTIONAL</div>

					<!-- Buy at -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Buy at</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Buy a token as it reaches the offering price.">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" name="buy_at" id="input_buy_at" class="form-control" placeholder="0">
							<div class="addon">$</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_buy_at" name="is_buy_at" class="visually-hidden" checked>

							<label for="is_buy_at" data-inner-text-alt="Manual">Automatic</label>
						</div>
					</div>

					<!-- Sell at -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Sell at</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Sell that token as it reaches the offering price.">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_sell_at" name="sell_at" class="form-control" placeholder="0">
							<div class="addon">$</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_sell_at" name="is_sell_at" class="visually-hidden" checked>

							<label for="is_sell_at" data-inner-text-alt="Manual">Automatic</label>
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
							<input type="text" autocomplete="off" id="input_max_buy_fee" name="max_buy_fee" class="form-control" placeholder="0" data-val-max="100">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_max_buy_fee" name="is_max_buy_fee" class="visually-hidden">

							<label for="input_is_max_buy_fee" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_max_sell_fee" name="max_sell_fee" class="form-control" placeholder="0" data-val-max="100">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_max_sell_fee" name="is_max_sell_fee" class="visually-hidden">

							<label for="input_is_max_sell_fee" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_stop_loss_trigger" name="stop_loss_trigger" class="form-control" placeholder="0.0" data-val-max="1">
							<div class="addon">X</div>
						</div>

						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_stop_loss_percent" name="stop_loss_percent" class="form-control" placeholder="0" data-val-max="100">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn">
							<input type="checkbox" id="input_is_stop_loss_trailing" name="is_stop_loss_trailing" class="visually-hidden" checked>

							<label for="input_is_stop_loss_trailing" data-inner-text-alt="Trailing">Normal</label>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_stop_loss" name="is_stop_loss" class="visually-hidden">

							<label for="input_is_stop_loss" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_moonbag" name="moonbag" class="form-control" placeholder="0" data-val-max="99">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_moonbag" name="is_moonbag" class="visually-hidden">

							<label for="input_is_moonbag" data-inner-text-alt="ON">OFF</label>
						</div>
					</div>

					<!-- Defender -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div>Defender</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Buy or sell the token on specific methods, used to front run a fraudulent transaction or as a sniper.">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group checkbox-btn w-100 is-colored">
							<input type="checkbox" id="input_swap_is_defender" name="swap_is_defender" class="visually-hidden">

							<label for="input_swap_is_defender" data-inner-text-alt="ON">OFF</label>
						</div>

						<div class="input-group checkbox-btn">
							<input type="checkbox" id="input_swap_is_defender_manual" name="input_swap_is_defender_manual" class="visually-hidden">

							<label for="input_swap_is_defender_manual" class="d-flex">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md ml-auto mr-auto">
									<path d="M 11.5 2 A 1.5 1.5 0 1 0 11.5 5 A 1.5 1.5 0 0 0 11.5 2 Z M 9.05 3 A 2.5 2.5 0 0 1 13.95 3 H 16 V 4 H 13.95 A 2.5 2.5 0 0 1 9.05 4 H 0 V 3 H 9.05 Z M 4.5 7 A 1.5 1.5 0 1 0 4.5 10 A 1.5 1.5 0 0 0 4.5 7 Z M 2.05 8 A 2.5 2.5 0 0 1 6.95 8 H 16 V 9 H 6.95 A 2.5 2.5 0 0 1 2.05 9 H 0 V 8 H 2.05 Z M 11.5 12 A 1.5 1.5 0 1 0 11.5 15 A 1.5 1.5 0 0 0 11.5 12 Z M 9.05 13 A 2.5 2.5 0 0 1 13.95 13 H 16 V 14 H 13.95 A 2.5 2.5 0 0 1 9.05 14 H 0 V 13 H 9.05 Z"/>
								</svg>
							</label>
						</div>
					</div>

					<div id="group_swapp_defender" class="d-none">
						<!-- Dev fake LQ removal -->

						<div class="label text-white d-flex mt-12px mb-12px">
							<div>Dev fake LQ removal</div>

							<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Percent of the liquidity that the Dev can remove until position gets triggered.">
								${DATA.ERROR_IMG_HTML}
							</button>
						</div>

						<div class="multiple-input-groups">
							<div class="input-group has-addon">
								<input type="text" autocomplete="off" id="input_max_dev_sell_or_lq_percent" name="max_dev_sell_or_lq_percent" class="form-control" placeholder="0" data-val-max="99">
								<div class="addon">%</div>
							</div>

							<div class="input-group checkbox-btn is-colored">
								<input type="checkbox" id="input_is_max_dev_sell_or_lq_percent" name="is_max_dev_sell_or_lq_percent" class="visually-hidden">

								<label for="input_is_max_dev_sell_or_lq_percent" data-inner-text-alt="ON">OFF</label>
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
								<input type="text" autocomplete="off" id="input_defender_gas_multiplier" name="defender_gas_multiplier" class="form-control" placeholder="0">
								<div class="addon">Multiplier</div>
							</div>
						</div>

						<!-- Defender - Method ID  -->

						<div class="label text-white d-flex mt-12px mb-12px">
							<div>Defender - Method ID</div>

							<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set specific methods to snipe at or sell at if triggered by the developer.<br>Green for sniping, Red for selling, multiple selection is allowed.">
								${DATA.ERROR_IMG_HTML}
							</button>
						</div>

						<div id="group_buy_methodid_manual"></div>
						<br>
						<hr>
						<br>
						<div id="group_sell_methodid_manual"></div>
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
							<input type="text" autocomplete="off" id="input_slippage_buy" name="slippage_buy" class="form-control" placeholder="0" data-val-max="100">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_slippage_buy" name="is_slippage_buy" class="visually-hidden" checked>

							<label for="is_slippage_buy" data-inner-text-alt="Manual">Automatic</label>
						</div>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_slippage_sell" name="slippage_sell" class="form-control" placeholder="0" data-val-max="100">
							<div class="addon">%</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_slippage_sell" name="is_slippage_sell" class="visually-hidden" checked>

							<label for="is_slippage_sell" data-inner-text-alt="Manual">Automatic</label>
						</div>
					</div>

					<!-- Buy and sell gas price -->

					<div class="label text-white d-flex mt-12px mb-12px">
						<div><b>BUY & SELL</b> - Gas price</div>

						<button class="btn btn-has-icon ml-auto" data-togglable="ModalHelp" data-help="Set custom gas price for buying or selling a token, perfect for successful pre-sales. ">
							${DATA.ERROR_IMG_HTML}
						</button>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_buy_gas_price" name="buy_gas_price" class="form-control" placeholder="0">
							<div class="addon">GWei</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_buy_gas_price" name="is_buy_gas_price" class="visually-hidden" checked>

							<label for="is_buy_gas_price" data-inner-text-alt="Manual">Automatic</label>
						</div>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_sell_gas_price" name="sell_gas_price" class="form-control" placeholder="0">
							<div class="addon">GWei</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_sell_gas_price" name="is_sell_gas_price" class="visually-hidden" checked>

							<label for="is_sell_gas_price" data-inner-text-alt="Manual">Automatic</label>
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
							<input type="text" autocomplete="off" id="input_buy_gas_limit" name="buy_gas_limit" class="form-control" placeholder="0" data-val-max="50">
							<div class="addon">MWei</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_buy_gas_limit" name="is_buy_gas_limit" class="visually-hidden" checked>

							<label for="is_buy_gas_limit" data-inner-text-alt="Manual">Automatic</label>
						</div>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_sell_gas_limit" name="sell_gas_limit" class="form-control" placeholder="0" data-val-max="50">
							<div class="addon">MWei</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_sell_gas_limit" name="is_sell_gas_limit" class="visually-hidden" checked>

							<label for="is_sell_gas_limit" data-inner-text-alt="Manual">Automatic</label>
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
							<input type="text" autocomplete="off" id="input_buy_gas_multiplier" name="buy_gas_multiplier" class="form-control" placeholder="1.001" data-val-min="1" data-val-max="10">
							<div class="addon">X</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_buy_gas_multiplier" name="is_buy_gas_multiplier" class="visually-hidden">

							<label for="is_buy_gas_multiplier" data-inner-text-alt="ON">OFF</label>
						</div>
					</div>

					<div class="multiple-input-groups">
						<div class="input-group has-addon">
							<input type="text" autocomplete="off" id="input_sell_gas_multiplier" name="sell_gas_multiplier" class="form-control" placeholder="1.001" data-val-min="1" data-val-max="10">
							<div class="addon">X</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="is_sell_gas_multiplier" name="is_sell_gas_multiplier" class="visually-hidden">

							<label for="is_sell_gas_multiplier" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_tx_transfer_limit" name="tx_transfer_limit" class="form-control" placeholder="0" data-val-max="50">
							<div class="addon">Times</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_tx_transfer_limit" name="is_tx_transfer_limit" class="visually-hidden">

							<label for="input_is_tx_transfer_limit" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_block_delay" name="block_delay" class="form-control" placeholder="0">
							<div class="addon">Blocks</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_block_delay" name="is_block_delay" class="visually-hidden">

							<label for="input_is_block_delay" data-inner-text-alt="ON">OFF</label>
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
							<input type="text" autocomplete="off" id="input_timeout" name="timeout" class="form-control" placeholder="0" data-val-max="500000">
							<div class="addon">Minutes</div>
						</div>

						<div class="input-group checkbox-btn is-colored">
							<input type="checkbox" id="input_is_timeout" name="is_timeout" class="visually-hidden">

							<label for="input_is_timeout" data-inner-text-alt="ON">OFF</label>
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
							<input type="checkbox" id="input_is_kosher" name="is_kosher" class="visually-hidden">

							<label for="input_is_kosher" data-inner-text-alt="ON">OFF</label>
						</div>

						<div class="input-group checkbox-btn">
							<input type="checkbox" id="input_is_kosher_manual" name="is_kosher_manual" class="visually-hidden">

							<label for="input_is_kosher_manual" class="d-flex">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md ml-auto mr-auto">
									<path d="M 11.5 2 A 1.5 1.5 0 1 0 11.5 5 A 1.5 1.5 0 0 0 11.5 2 Z M 9.05 3 A 2.5 2.5 0 0 1 13.95 3 H 16 V 4 H 13.95 A 2.5 2.5 0 0 1 9.05 4 H 0 V 3 H 9.05 Z M 4.5 7 A 1.5 1.5 0 1 0 4.5 10 A 1.5 1.5 0 0 0 4.5 7 Z M 2.05 8 A 2.5 2.5 0 0 1 6.95 8 H 16 V 9 H 6.95 A 2.5 2.5 0 0 1 2.05 9 H 0 V 8 H 2.05 Z M 11.5 12 A 1.5 1.5 0 1 0 11.5 15 A 1.5 1.5 0 0 0 11.5 12 Z M 9.05 13 A 2.5 2.5 0 0 1 13.95 13 H 16 V 14 H 13.95 A 2.5 2.5 0 0 1 9.05 14 H 0 V 13 H 9.05 Z"/>
								</svg>
							</label>
						</div>
					</div>

					<div id="group_kosher_manual" class="d-none">
						<div id="ModalPositionSettings__KosherMode" class="multiple-input-groups">
							<div class="input-group checkbox-btn">
								<input type="radio" id="input_kosher_mode_auto" name="kosher_mode" class="visually-hidden" value="a" checked>

								<label for="input_kosher_mode_auto">Automatic</label>
							</div>

							<div class="input-group checkbox-btn w-100">
								<input type="radio" id="input_kosher_mode_mixed" name="kosher_mode" class="visually-hidden" value="m">

								<label for="input_kosher_mode_mixed">Mixed</label>
							</div>

							<div class="input-group checkbox-btn w-100">
								<input type="radio" id="input_kosher_mode_custom" name="kosher_mode" class="visually-hidden" value="c">

								<label for="input_kosher_mode_custom">Custom</label>
							</div>
						</div>

						<div class="input-group text-area d-none">
							<textarea id="textarea_kosher_strainer" name="kosher_strainer" class="form-control" spellcheck="false" placeholder="Add each exception on a new line" rows="8"></textarea>
						</div>
					</div>
				</div>

				<div id="ModalPositionSettings__Footer" class="footer">
					<button class="btn btn-style w-100 w-auto text-white fs-0 mr-12px lightbox" data-action="reset-settings">Reset</button>

					<button class="btn btn-style w-100 text-white lightbox" data-togglable="ModalPositionSettings" data-action="save-settings">Save</button>
				</div>
			</div>
		</div>
	`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

(() => {

	document.querySelectorAll('#ModalPositionSettings input, #ModalPositionSettings textarea, #ModalPositionSettings textarea').forEach(el => {
		el.oninput = e => {
			if (el.type === 'text') {
				el.value = el.value.replace(/[^0-9.]+/g, '');

				if (/^0\.?0*$/.test(el.value)) {
					DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')] = 0;
					return;
				}

				if (!Number(el.value) || Number(el.value) <= 0) {
					el.value = '';
					DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')] = 0;
				} else if (el.getAttribute('data-val-max') && Number(el.value) > Number(el.getAttribute('data-val-max') || 0)) {
					el.value = el.getAttribute('data-val-max');
					DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')] = Number(el.getAttribute('data-val-max'));
				} else {
					DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')] = Big(el.value);
				}
			} else if (el.type === 'checkbox') {
				DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')] = !DATA.settings[el.id.replace(/^(input_)?(swap_)?/, '')];
			} else if (el.type === 'radio') {
				DATA.settings[el.name] = el.value;
			} else if (el.type === 'textarea') {
				DATA.settings[el.name] = el.value.split("\n");
			}
		};
	});

	if (!DATA.conf.auth) {
		load_settings('ModalPositionSettings', DATA.settings = JSON.parse(store.get(`${DATA.CHAIN}_settings`) || 'false') || { ...DATA.default_settings, buy_method_ids: [], sell_method_ids: [], kosher_strainer: [], targets_percents: [], targets_triggers: [] });
	}

})();

/*** Add target button ***/

function handleAddTargetButtonClick(e, x, p) {
	if (e && document.querySelectorAll('#ModalPositionSettings [name="targets_triggers[]"]').length >= DATA.MAX_TARGETS) {
		return e.target.classList.add('d-none');
	}

	const body = elementify('ModalPositionSettings__Body');
	const addTargetButton = elementify('ModalPositionSettings__AddTargetButton');
	const targetTemplate = elementify('ModalPositionSettings__TargetTemplate');
	const targetTemplateContainer = addTargetButton.parentElement.parentElement;

	const template = targetTemplate.content.cloneNode(true);
	const currentTargets = body.querySelectorAll('[name="targets_triggers[]"]');

	template.children[0].setAttribute('data-target-order', currentTargets.length);

	if (e) {
		template.querySelector('input[name*="targets_triggers"]').value = '';
		template.querySelector('input[name*="targets_percents"]').value = '';
	} else {
		template.querySelector('input[name*="targets_triggers"]').value = x || DATA.settings.targets_triggers[DATA.settings.targets_triggers.length - 1] || '';
		template.querySelector('input[name*="targets_percents"]').value = p || DATA.settings.targets_percents[DATA.settings.targets_percents.length - 1] || '';
	}

	template.querySelector('button').addEventListener('click', event => {
		const idx = Array.prototype.indexOf.call(event.target.parentElement.parentElement.parentElement.children, event.target.parentElement.parentElement) - 2; /* 2 element before the first (for swap) */

		console.log(idx, DATA.settings.targets_triggers);

		DATA.settings.targets_triggers.splice(idx, 1);
		DATA.settings.targets_percents.splice(idx, 1);
		event.target.parentElement.parentElement.remove();

		if (document.querySelectorAll('#ModalPositionSettings [name="targets_triggers[]"]').length < DATA.MAX_TARGETS) {
			elementify('ModalPositionSettings__AddTargetButton').classList.remove('d-none');
		}
	});

	template.querySelectorAll('input').forEach(el => {
		el.oninput = e => {
			let order = Number(el.parentNode.parentNode.dataset.targetOrder);

			if (!Number(el.value) || Number(el.value) <= 0) {
				el.value = '';
				DATA.settings[el.name.replace('[]', '')][order] = 0;
			} else if (el.getAttribute('data-val-max') && Number(el.value) > Number(el.getAttribute('data-val-max'))) {
				el.value = el.getAttribute('data-val-max');
				DATA.settings[el.name.replace('[]', '')][order] = Number(el.getAttribute('data-val-max'));
			} else if (el.getAttribute('data-val-min') && Number(el.value) <= Number(el.getAttribute('data-val-min'))) {
				el.value = Number(el.getAttribute('data-val-min'));
				DATA.settings[el.name.replace('[]', '')][order] = Number(el.getAttribute('data-val-min'));
			} else {
				DATA.settings[el.name.replace('[]', '')][order] = Number(el.value);
			}
		};
	});

	targetTemplateContainer.insertBefore(template, addTargetButton.parentElement);

	addTargetButton.blur();
};

(() => {

	elementify('ModalPositionSettings__AddTargetButton').addEventListener('click', handleAddTargetButtonClick);

})();

/* Show defender configuration */

(() => {

	elementify('input_swap_is_defender_manual').addEventListener('change', event => {
		if (event.currentTarget.checked) {
			elementify('group_swapp_defender').classList.remove('d-none');
			/* elementify('group_swapp_defender').scrollIntoView({ behavior: 'smooth', block: 'center' }); */
		} else {
			elementify('group_swapp_defender').classList.add('d-none');
		}
	});

})();

/* Methodid */

const set_method_ids = (abi) => {
	DATA.token_abi = abi || {};

	let keys = Object.values(DATA.token_abi);

	if (DATA.settings.is_defender) {
		DATA.settings._buy_method_ids = [...(DATA.settings.buy_method_ids || [])];
		if (DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.length) {
			DATA.settings.buy_method_ids = DATA.settings.buy_method_ids.filter(v => keys.includes(v));
		} else {
			DATA.settings.buy_method_ids = [];
		}

		DATA.settings._sell_method_ids = [...(DATA.settings.sell_method_ids || [])];
		if (DATA.settings.sell_method_ids && DATA.settings.sell_method_ids.length) {
			DATA.settings.sell_method_ids = DATA.settings.sell_method_ids.filter(v => keys.includes(v));
		} else {
			DATA.settings.sell_method_ids = keys;
		}
	} else {
		DATA.settings._buy_method_ids = [...(DATA.settings.buy_method_ids || [])];
		DATA.settings.buy_method_ids = [];

		DATA.settings._sell_method_ids = [...(DATA.settings.sell_method_ids || [])];
		DATA.settings.sell_method_ids = keys;
	}


	elementify('group_buy_methodid_manual').innerHTML = '';
	elementify('group_sell_methodid_manual').innerHTML = '';

	for (let i in abi) {
		elementify('group_buy_methodid_manual').insertAdjacentHTML('beforeend', `<button class="btn btn-style${DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.includes(abi[i]) && ' green' || ''}" data-method-id="${abi[i]}">${i.split('(')[0]}</button>`);
	}

	let buyMethodIdBtns = document.querySelectorAll('#group_buy_methodid_manual .btn');

	buyMethodIdBtns.forEach(btn => {
		btn.addEventListener('click', event => {
			btn.classList.toggle('green');
			btn.blur();

			if (DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.includes(btn.dataset.methodId)) {
				DATA.settings.buy_method_ids.splice(DATA.settings.buy_method_ids.indexOf(btn.dataset.methodId), 1);
			} else {
				DATA.settings.buy_method_ids.push(btn.dataset.methodId);
			}
		});
	});

	for (let i in abi) {
		elementify('group_sell_methodid_manual').insertAdjacentHTML('beforeend', `<button class="btn btn-style${DATA.settings.sell_method_ids && DATA.settings.sell_method_ids.includes(abi[i]) && ' red' || ''}" data-method-id="${abi[i]}">${i.split('(')[0]}</button>`);
	}

	let sellMethodIdBtns = document.querySelectorAll('#group_sell_methodid_manual .btn');

	elementify('input_swap_is_defender').addEventListener('change', event => {
		let is_save = false;

		if (event.currentTarget.checked) {
			DATA.settings._buy_method_ids = [...(DATA.settings.buy_method_ids || [])];
			DATA.settings.buy_method_ids = DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.length && (is_save = true) && DATA.settings.buy_method_ids || [];

			buyMethodIdBtns.forEach(btn => {
				if (DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.includes(btn.dataset.methodId)) {
					btn.classList.add('green');
				} else {
					btn.classList.remove('green');
				}
			});
		} else {
			DATA.settings.buy_method_ids = [...(DATA.settings._buy_method_ids || [])];
			DATA.settings._buy_method_ids = [];

			buyMethodIdBtns.forEach(btn => {
				if (DATA.settings.buy_method_ids && DATA.settings.buy_method_ids.includes(btn.dataset.methodId)) {
					btn.classList.add('green');
				} else {
					btn.classList.remove('green');
				}
			});
		}

		if (event.currentTarget.checked) {
			DATA.settings._sell_method_ids = [...(DATA.settings.sell_method_ids || [])];
			DATA.settings.sell_method_ids = DATA.settings.sell_method_ids && DATA.settings.sell_method_ids.length && DATA.settings.sell_method_ids || (is_save && [] || Object.values(DATA.token_abi));
		} else {
			DATA.settings.sell_method_ids = [...(DATA.settings._sell_method_ids || [])];
			DATA.settings._sell_method_ids = [];

		}

		sellMethodIdBtns.forEach(btn => {
			if (DATA.settings.sell_method_ids && DATA.settings.sell_method_ids.includes(btn.dataset.methodId)) {
				btn.classList.add('red');
			} else {
				btn.classList.remove('red');
			}
		});
	});

	sellMethodIdBtns.forEach(btn => {
		btn.addEventListener('click', event => {
			btn.classList.toggle('red');
			btn.blur();

			if (DATA.settings.sell_method_ids.includes(btn.dataset.methodId)) {
				DATA.settings.sell_method_ids.splice(DATA.settings.sell_method_ids.indexOf(btn.dataset.methodId), 1);
			} else {
				DATA.settings.sell_method_ids.push(btn.dataset.methodId);
			}
		});
	});

};

/* Show kosher configuration */

(() => {

	elementify('input_is_kosher_manual').addEventListener('change', event => {
		if (event.currentTarget.checked) {
			elementify('group_kosher_manual').classList.remove('d-none');
			elementify('group_kosher_manual').scrollIntoView({ behavior: 'smooth', block: 'center' });
		} else {
			elementify('group_kosher_manual').classList.add('d-none');
		}
	});

})();

/* Show kosher strainer if set to mixed or custom else hide */

(() => {

	document.querySelectorAll('#ModalPositionSettings__KosherMode input[type="radio"]').forEach(radio => {
		radio.addEventListener('change', event => {
			switch (radio.value) {
				case 'a': /* auto */
				case 'n': /* none */
					elementify('textarea_kosher_strainer').parentNode.classList.add('d-none');
					break;

				case 'c': /* custom */
				case 'm': /* mixed */
					elementify('textarea_kosher_strainer').parentNode.classList.remove('d-none');
					elementify('textarea_kosher_strainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
					break;

				default:
					break;
			}
			event.target.blur();
		})
	});

})();
