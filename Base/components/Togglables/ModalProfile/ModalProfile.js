/**
 * ModalProfile
 */

const get_synagogues = async () => {
	return (await Promise.all(DATA.synagogues.map(async (v, k) => {
		let used, limit;

		await Promise.all([
			(async () => {
				used = await contract(DATA.SUBSCRIPTION).PLAN_LEFT(v.pool).catch(e => v.used)
			})(),
			(async () => {
				limit = await contract(DATA.SUBSCRIPTION).PLAN_LIMIT(v.pool).catch(e => v.limit)
			})()
		]);

		used = limit - used;

		return `<div class="item">
	<div class="d-flex">
		<div class="name text-truncated d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M10.9165 6.3125V5.9165Q10.9165 5.5835 11.1665 5.3335 11.4165 5.0835 11.75 5.0835 12.0835 5.0835 12.3335 5.3335 12.5835 5.5835 12.5835 5.9165V6.3125ZM3.4165 6.3125V5.9165Q3.4165 5.5835 3.6665 5.3335 3.9165 5.0835 4.25 5.0835 4.5835 5.0835 4.8335 5.3335 5.0835 5.5835 5.0835 5.9165V6.3125ZM3.4165 11.75V6.75H5.104V11.75ZM5.5415 11.75V6.302L8 4.25 10.4585 6.302V11.75H8.854V9.6665Q8.854 9.302 8.6095 9.0575 8.3645 8.8125 8 8.8125 7.6355 8.8125 7.3905 9.0575 7.146 9.302 7.146 9.6665V11.75ZM10.896 11.75V6.75H12.5835V11.75ZM8 7.7915Q8.2605 7.7915 8.4425 7.6095 8.625 7.427 8.625 7.1665 8.625 6.906 8.4425 6.724 8.2605 6.5415 8 6.5415 7.7395 6.5415 7.5575 6.724 7.375 6.906 7.375 7.1665 7.375 7.427 7.5575 7.6095 7.7395 7.7915 8 7.7915ZM8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16Z"></path>
			</svg>

			<div class="text-truncated ml-4px">${v.title}</div>
		</div>

		<div class="time text-truncated d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5ZM8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8Z"></path>
			</svg>

			<div class="text-truncated ml-4px" data-reverse-timer="${v.expiry}">${timeDifference(new Date(v.expiry).getTime(), Date.now())}</div>
		</div>
	</div>

	<div class="d-flex mt-12px">
		<div class="trade text-truncated d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"></path>
			</svg>

			<div class="text-truncated ml-4px">${used}/${limit}</div>
		</div>

		<div class="value d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M5.5 9.511C5.576 10.465 6.33 11.208 7.682 11.296V12H8.282V11.291C9.682 11.193 10.5 10.445 10.5 9.359 10.5 8.372 9.874 7.863 8.755 7.599L8.282 7.487V5.57C8.882 5.638 9.264 5.966 9.356 6.42H10.408C10.332 5.501 9.544 4.782 8.282 4.704V4H7.682V4.719C6.487 4.836 5.672 5.555 5.672 6.572 5.672 7.472 6.278 8.044 7.285 8.279L7.682 8.377V10.411C7.067 10.318 6.66 9.981 6.568 9.511H5.5ZM7.677 7.345C7.087 7.208 6.767 6.929 6.767 6.509 6.767 6.039 7.112 5.687 7.682 5.584V7.344H7.677ZM8.369 8.538C9.086 8.704 9.417 8.973 9.417 9.448 9.417 9.99 9.005 10.362 8.282 10.43V8.518L8.369 8.538ZM8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14Z"></path>
			</svg>

			<div class="ml-4px">$${formatFiat(v.price)}/MO</div>
		</div>
	</div>

	<div class="selector selector-${k}">
		<input type="checkbox" name="synagogue_currency_selector_${k}" id="SynagogueCurrencySelector${k}" class="visually-hidden" autocomplete="off">

		<label for="SynagogueCurrencySelector${k}" class="btn btn-style btn-has-icon">
			<div class="text-truncated">Select currency</div>

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
				<path d="M1.646 4.646A.5.5 0 012.354 4.646L8 10.293 13.646 4.646A.5.5 0 0114.354 5.354L8.354 11.354A.5.5 0 017.646 11.354L1.646 5.354A.5.5 0 011.646 4.646Z"></path>
			</svg>
		</label>

		<div class="list d-none synagogue-pay-token"></div>
	</div>

	<button class="btn btn-style w-100 mt-12px text-bold" data-pool="${v.pool}" data-action="synagogized">BUY</button>
</div>`;
	}))).flat().join('') || '<div class="item"> No available synagouges yet </div>';
};

const set_synagogues = async () => { elementify('synagogues-body').innerHTML = await get_synagogues() };

const get_node = async (data) => {
	let action = (!DATA.conf.pools || !DATA.conf.pools[data.id] || !(DATA.conf.pools[data.id].is_synagogue/*  || DATA.conf.pools[data.id].staked */)) && ' data-action="toggle-synagogue-node"' || '';

	return `<label for="SynagogueCreatePanel3" class="card${(!action || (DATA.conf.pools && DATA.conf.pools[data.id] && DATA.conf.pools[data.id].staked)) && ' border-red' || ''}" data-nft="${data.id}"${action}>
	<img id="${lazy_get_nft_image('JBS', data.id, undefined, `jbs-${data.id}-synagogue-${data.expiry}`)}" data-nft="${data.id}"${action} onerror="error_user_img(this)">
	<img id="${GetTokenImage(DATA.CHAINS[DATA.CHAIN_IDS_MAP[data.chain]].CHAIN_ASSETS, data.chain)}" src="${DATA.ERROR_IMG}" class="icon-md" data-nft="${data.id}"${action}>

	<div class="footer" data-nft="${data.id}"${action}>
		<div class="text-white" data-reverse-timer="${data.expiry}" data-nft="${data.id}"${action}>${timeDifference(data.expiry, Date.now())} left</div>
	</div>
</label>`;
};

const set_nodes = async () => {
	if (!elementify('synagogue-pay-nodes')) {
		return;
	}

	if (!DATA.conf.N || !DATA.conf.N.JBS || !DATA.conf.N.JBS.length) {
		return elementify('synagogue-pay-nodes').innerHTML = '<div class="item">You currently don\'t own any nodes</div>';
	}

	let promises = [];

	for (let i = 0; i < DATA.conf.N.JBS.length; ++i) {
		promises.push(get_node(DATA.conf.N.JBS[i]));
	}

	return elementify('synagogue-pay-nodes').innerHTML = (await Promise.all(promises)).flat().join('');
};

const get_global_top3 = () => {
	return `<div class="item">
	<div data-tooltip="${DATA.top3[1] && (DATA.top3[1].title || `User #$${DATA.top3[1].uid}`) || 'User'}" data-tooltip-bottom>
		<img ${DATA.top3[1] && `id="${lazy_get_nft_image('JBU', DATA.top3[1].nft, undefined, `jbu-global-top3-0`)}"` || `src="${DATA.ERROR_USER_IMG}"`} onerror="error_img(this)">
	</div>
</div>

<div class="item">
	<div data-tooltip="${DATA.top3[0] && (DATA.top3[0].title || `User #$${DATA.top3[0].uid}`) || 'User'}" data-tooltip-bottom>
		<img ${DATA.top3[0] && `id="${lazy_get_nft_image('JBU', DATA.top3[0].nft, undefined, `jbu-global-top3-1`)}"` || `src="${DATA.ERROR_USER_IMG}"`} onerror="error_img(this)">
	</div>
</div>

<div class="item">
	<div data-tooltip="${DATA.top3[2] && (DATA.top3[2].title || `User #$${DATA.top3[2].uid}`) || 'User'}" data-tooltip-bottom>
		<img ${DATA.top3[2] && `id="${lazy_get_nft_image('JBU', DATA.top3[2].nft, undefined, `jbu-global-top3-2`)}"` || `src="${DATA.ERROR_USER_IMG}"`} onerror="error_img(this)">
	</div>
</div>`;
}

/*** Inject HTML ***/

(async () => {

	const html = `<div id="ModalProfile" class="togglable modal d-none">
	<div class="lightbox" data-togglable="ModalProfile"></div>

	<div class="container">
		<div id="ModalProfile__Header" class="header">
			<div class="text-white text-bold text-truncated">USER INFORMATION</div>

			<button type="button" class="btn btn-has-icon ml-auto mr-12px" data-togglable="ModalSettings" data-tooltip="User Settings" data-tooltip-left>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#191919" width="16" height="16" rx="100%"></rect>
					<path d="M6.823 12.1665 6.6665 10.854Q6.5625 10.7915 6.4375 10.719 6.3125 10.646 6.2085 10.5835L4.9895 11.094 3.8125 9.0625 4.854 8.271Q4.854 8.2085 4.854 8.1355 4.854 8.0625 4.854 8 4.854 7.9375 4.854 7.8645 4.854 7.7915 4.854 7.729L3.8125 6.9375 4.9895 4.906 6.2085 5.4165Q6.3125 5.354 6.4375 5.2815 6.5625 5.2085 6.6665 5.146L6.823 3.8335H9.177L9.3335 5.146Q9.4375 5.2085 9.5625 5.2815 9.6875 5.354 9.7915 5.4165L11.0105 4.906 12.1875 6.9375 11.156 7.729Q11.156 7.7915 11.156 7.8645 11.156 7.9375 11.156 8 11.156 8.0625 11.156 8.1355 11.156 8.2085 11.156 8.271L12.1875 9.0625 11.0105 11.094 9.7915 10.5835Q9.6875 10.646 9.5625 10.719 9.4375 10.7915 9.3335 10.854L9.177 12.1665ZM8 9.4895Q8.6145 9.4895 9.052 9.052 9.4895 8.6145 9.4895 8 9.4895 7.3855 9.052 6.948 8.6145 6.5105 8 6.5105 7.3855 6.5105 6.948 6.948 6.5105 7.3855 6.5105 8 6.5105 8.6145 6.948 9.052 7.3855 9.4895 8 9.4895ZM8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16Z"/>
				</svg>
			</button>

			<button type="button" class="btn btn-has-icon lightbox" data-togglable="ModalProfile">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
					<rect fill="#191919" width="16" height="16" rx="100%"></rect>
					<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"/>
				</svg>
			</button>
		</div>

		<div id="ModalProfile__Body" class="body">

			<div class="row-1">
				<div class="boxes">
					<div class="box box-has-nft">
						<div class="body">
							<div class="item">
								<img src="${DATA.ERROR_USER_IMG}" onerror="error_user_img(this)" data-user-image="true" data-action="mint">

								<div class="text-truncated text-name" data-username="true">${DATA.view_user.title || (DATA.view_user.uid && ('User #' + DATA.view_user.uid)) || 'Guest'}</div>
							</div>
						</div>
					</div>

					<div class="box ml-12px">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bg">
							<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13A5 5 0 118 3 5 5 0 018 13ZM8 14A6 6 0 108 2 6 6 0 008 14ZM8 11A3 3 0 118 5 3 3 0 018 11ZM8 12A4 4 0 108 4 4 4 0 008 12ZM9.5 8A1.5 1.5 0 116.5 8 1.5 1.5 0 019.5 8Z"/>
						</svg>

						<div class="body">
							<div class="item">
								<div class="text-truncated text-style-2">LVL<span id="main-user-chain-level">${get_level(DATA.view_rank && DATA.view_rank[DATA.CHAIN] && DATA.view_rank[DATA.CHAIN].weger || 0)}</div>
								<div class="text-truncated text-style-1">VIP PROFILE</div>
							</div>
						</div>
					</div>

					<div class="box ml-12px">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bg">
							<path d="M0 8A8 8 0 1116 8 8 8 0 010 8ZM7.5 1.077C6.83 1.281 6.165 1.897 5.613 2.932 5.47 3.2 5.337 3.492 5.218 3.804 5.923 3.961 6.69 4.061 7.5 4.091V1.077ZM4.249 3.539C4.391 3.155 4.553 2.795 4.73 2.461A6.7 6.7 0 015.327 1.528 7.01 7.01 0 003.051 3.05C3.413 3.234 3.814 3.399 4.249 3.54ZM3.509 7.5C3.545 6.43 3.697 5.413 3.945 4.492A9.124 9.124 0 012.38 3.825 6.964 6.964 0 001.018 7.5H3.508ZM4.909 4.759A12.344 12.344 0 004.509 7.5H7.5V5.091C6.59 5.061 5.717 4.946 4.909 4.759ZM8.5 5.09V7.5H11.49A12.342 12.342 0 0011.091 4.759C10.283 4.946 9.41 5.06 8.5 5.091ZM4.51 8.5C4.545 9.487 4.686 10.414 4.909 11.241A13.612 13.612 0 017.5 10.91V8.5H4.51ZM8.5 8.5V10.909C9.41 10.939 10.283 11.054 11.091 11.241 11.314 10.414 11.455 9.487 11.491 8.5H8.5ZM5.218 12.196C5.338 12.508 5.47 12.8 5.613 13.068 6.165 14.103 6.831 14.718 7.5 14.923V11.91C6.69 11.94 5.923 12.04 5.218 12.197ZM5.328 14.472A6.696 6.696 0 014.73 13.539 8.853 8.853 0 014.249 12.46 8.38 8.38 0 003.051 12.95 7.01 7.01 0 005.327 14.472ZM3.945 11.508A13.36 13.36 0 013.508 8.5H1.018A6.963 6.963 0 002.38 12.175C2.85 11.917 3.375 11.693 3.945 11.508ZM10.673 14.472A7.009 7.009 0 0012.948 12.951 8.376 8.376 0 0011.751 12.461 8.853 8.853 0 0111.27 13.539 6.688 6.688 0 0110.673 14.472ZM8.5 11.909V14.923C9.17 14.719 9.835 14.103 10.387 13.068 10.53 12.8 10.663 12.508 10.782 12.196A12.63 12.63 0 008.5 11.91ZM12.055 11.508C12.625 11.693 13.15 11.917 13.62 12.175A6.963 6.963 0 0014.982 8.5H12.492A13.36 13.36 0 0112.055 11.508ZM14.982 7.5A6.963 6.963 0 0013.62 3.825C13.15 4.083 12.625 4.307 12.055 4.492 12.303 5.412 12.455 6.43 12.492 7.5H14.982ZM11.27 2.461C11.447 2.795 11.609 3.155 11.752 3.539A8.368 8.368 0 0012.948 3.049 7.01 7.01 0 0010.673 1.529C10.891 1.812 11.091 2.126 11.27 2.461ZM10.782 3.804A7.765 7.765 0 0010.387 2.932C9.835 1.897 9.17 1.282 8.5 1.077V4.09C9.31 4.06 10.077 3.96 10.782 3.803Z"/>
						</svg>

						<div class="body">
							<div class="item">
								<div class="text-truncated text-style-2" id="user-followers">0</div>
								<div class="text-truncated text-style-1">FOLLOWERS</div>
							</div>

							<div class="item mt-6px">
								<div class="text-truncated text-style-2" id="user-following">0</div>
								<div class="text-truncated text-style-1">FOLLOWING</div>
							</div>
						</div>
					</div>
				</div>

				<div class="progress-bar mt-12px" data-progress-value="${get_next_level_percent(DATA.CHAIN)}" id="profile-user-chain-level">
					<div class="progress-bar-fill" style="width: ${get_next_level_percent(DATA.CHAIN)}px"></div>
				</div>

				<div class="actions mt-12px d-flex d-none" id="user-communication-options">
					<button class="btn btn-style w-100 text-white" data-action="tip" data-view-uid="0">Tip</button>
					<button class="btn btn-style w-100 text-white ml-12px" data-action="chat" data-room="">Chat</button>
					<button class="btn btn-style w-100 text-white ml-12px" data-action="follow" data-view-uid="0">Follow</button>
				</div>
			</div>

			<div class="row-2 row-is-section">
				<div class="header">
					<div>Statistics</div>

					<button class="btn btn-has-icon text-default d-flex align-items-center ml-auto" data-togglable="ModalStatistics">
						<div>Details</div>

						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
							<path d="M12.14 8.753 6.658 13.549C6.012 14.115 5 13.655 5 12.796V3.204A1 1 0 016.659 2.451L12.139 7.247A1 1 0 0112.139 8.753Z"></path>
						</svg>
					</button>
				</div>

				<div class="body">
					<div class="boxes">
						<div class="box box-has-chart">
							<div class="body">
								<div class="item">
									<canvas id="ModalProfile__Statistics__Chart"></canvas>

									<div class="meta">
										<div class="text-network">
											<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm mr-4px fs-0">
												<path fill="#fff" d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM11 8A3 3 0 115 8 3 3 0 0111 8Z"/>
											</svg>

											<div class="text-truncated">All Networks</div>
										</div>
									</div>
								</div>
							</div>

							<div class="footer">
								<button class="btn btn-style">7D</button>

								<button class="btn btn-style">1M</button>

								<button class="btn btn-style">3M</button>
							</div>
						</div>

						<div class="box">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bg">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14ZM 5.5 9.511 C 5.576 10.465 6.33 11.208 7.682 11.296 V 12 H 8.282 V 11.291 C 9.682 11.193 10.5 10.445 10.5 9.359 C 10.5 8.372 9.874 7.863 8.755 7.599 L 8.282 7.487 V 5.57 C 8.882 5.638 9.264 5.966 9.356 6.42 H 10.408 C 10.332 5.501 9.544 4.782 8.282 4.704 V 4 H 7.682 V 4.719 C 6.487 4.836 5.672 5.555 5.672 6.572 C 5.672 7.472 6.278 8.044 7.285 8.279 L 7.682 8.377 V 10.411 C 7.067 10.318 6.66 9.981 6.568 9.511 H 5.5 Z M 7.677 7.345 C 7.087 7.208 6.767 6.929 6.767 6.509 C 6.767 6.039 7.112 5.687 7.682 5.584 V 7.344 H 7.677 Z M 8.369 8.538 C 9.086 8.704 9.417 8.973 9.417 9.448 C 9.417 9.99 9.005 10.362 8.282 10.43 V 8.518 L 8.369 8.538Z"/>
							</svg>

							<div class="body">
								<div class="item">
									<div class="text-truncated text-style-2">$<span data-user-total-wager="true">${formatFiat(DATA.view_user.total_wager || 0)}</span></div>
									<div class="text-truncated text-style-1">TOTAL WAGERED</div>
								</div>
							</div>
						</div>

						<div class="box">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bg">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14ZM 6.646 5.646 A 0.5 0.5 0 1 1 7.354 6.354 L 5.707 8 L 7.354 9.646 A 0.5 0.5 0 0 1 6.646 10.354 L 4.646 8.354 A 0.5 0.5 0 0 1 4.646 7.646 L 6.646 5.646 Z M 9.354 5.646 A 0.5 0.5 0 1 0 8.646 6.354 L 10.293 8 L 8.646 9.646 A 0.5 0.5 0 0 0 9.354 10.354 L 11.354 8.354 A 0.5 0.5 0 0 0 11.354 7.646 L 9.354 5.646Z"/>
							</svg>

							<div class="body">
								<div class="item">
									<div class="text-truncated text-style-2" data-user-total-trades="true">${formatNumber(DATA.view_user.total_trades || 0)}</div>
									<div class="text-truncated text-style-1">TOTAL TRADES</div>
								</div>
							</div>
						</div>

						<div class="box">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bg">
								<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14ZM 8 12 A 0.5 0.5 0 0 0 8.5 11.5 V 5.707 L 10.646 7.854 A 0.5 0.5 0 0 0 11.354 7.146 L 8.354 4.146 A 0.5 0.5 0 0 0 7.646 4.146 L 4.646 7.146 A 0.5 0.5 0 1 0 5.354 7.854 L 7.5 5.707 V 11.5 A 0.5 0.5 0 0 0 8 12Z"/>
							</svg>

							<div class="body">
								<div class="item">
									<div class="text-truncated text-style-2">#<span data-user-global-rank="true">${formatNumber(Number(DATA.view_user._rank) || 0)}</span></div>
									<div class="text-truncated text-style-1">GLOBAL RANK</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row-3 row-is-section">
				<div class="header">
					<div>Winners</div>
				</div>

				<div class="body">
					<div class="boxes">
						<div class="box">
							<div class="body">
								<div class="item">
									<img src="Base/graphics/raster/chains/smartchain.png" class="icon-md">
								</div>

								<div class="item">
									<div class="text-truncated text-white">Serious Jew</div>
									<div class="text-truncated text-style-2">WBNB</div>
									<div class="text-truncated text-green">$9,012.00</div>
								</div>
							</div>
						</div>

						<div class="box">
							<div class="body">
								<div class="item">
									<img src="Base/graphics/raster/chains/ethereum.png" class="icon-md">
								</div>

								<div class="item">
									<div class="text-truncated text-white">Evgy</div>
									<div class="text-truncated text-style-2">WETH</div>
									<div class="text-truncated text-green">$5,678.00</div>
								</div>
							</div>
						</div>

						<div class="box">
							<div class="body">
								<div class="item">
									<img src="Base/graphics/raster/chains/avalanche.png" class="icon-md">
								</div>

								<div class="item">
									<div class="text-truncated text-white">Alien</div>
									<div class="text-truncated text-style-2">WAVAX</div>
									<div class="text-truncated text-green">$1,234.00</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row-4 row-is-section">
				<div class="header">
					<div>Affiliates</div>

					<button class="btn btn-has-icon text-default d-flex align-items-center ml-auto" data-togglable="ModalAffiliates" data-action="affiliates">
						<div>Details</div>

						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-sm">
							<path d="M12.14 8.753 6.658 13.549C6.012 14.115 5 13.655 5 12.796V3.204A1 1 0 016.659 2.451L12.139 7.247A1 1 0 0112.139 8.753Z"></path>
						</svg>
					</button>
				</div>

				<div class="body">
					<div class="boxes">
						<div class="box">
							<div class="body">
								<div class="item">
									<div class="text-truncated text-style-2" id="nft-affiliates">${DATA.conf.nft_affiliates || 0}</div>
									<div class="text-truncated text-style-1">AFFILIATES</div>
								</div>
							</div>
						</div>

						<div class="box">
							<div class="body w-100">
								<div class="item mt-4px">
									<div class="text-truncated text-style-2" data-balance="${Big(DATA.conf.nft_balance || 0)}" id="nft-balance">$${Big(DATA.conf.nft_balance || 0).mul(DATA.WPEG_PRICE)}</div>
									<div class="text-truncated text-style-1">CURRENT BALANCE</div>
								</div>

								<div class="item mt-4px px-12px${DATA.conf.uid !== DATA.view_uid && ' d-none' || ''}" id="claim-container">
									<button class="btn btn-style text-white text-bold w-100" data-action="claim">WITHDRAW</button>
								</div>
							</div>
						</div>

						<div class="box box-podium">
							<div class="body" id="global-top3">
								${get_global_top3()}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row-5 row-is-section">
				<div class="header">
					<div>Synagogue Create</div>
				</div>

				<div class="body">

					<input type="radio" id="SynagogueCreatePanel1" name="synagogue_create_panel" class="visually-hidden" checked>

					<label for="SynagogueCreatePanel2" class="panel panel-1 btn btn-has-icon btn-style">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-lg mx-auto my-auto">
							<path d="M8 2A.5.5 0 018.5 2.5V7.5H13.5A.5.5 0 0113.5 8.5H8.5V13.5A.5.5 0 017.5 13.5V8.5H2.5A.5.5 0 012.5 7.5H7.5V2.5A.5.5 0 018 2Z"></path>
						</svg>
					</label>

					<input type="radio" id="SynagogueCreatePanel2" name="synagogue_create_panel" class="visually-hidden">

					<div class="panel panel-2">
						<div class="cards" id="synagogue-pay-nodes"><div>You currently don't own any nodes</div></div>
					</div>

					<input type="radio" id="SynagogueCreatePanel3" name="synagogue_create_panel" class="visually-hidden">

					<div class="panel panel-3">
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Synagogue name" id="synagogue-name">
						</div>

						<div class="input-group">
							<input type="text" class="form-control" placeholder="Monthly price" id="synagogue-monthly-price">
						</div>

						<div class="input-group">
							<input type="text" class="form-control" placeholder="Number of Jews" id="synagogue-max-minyan">
						</div>

						<div class="actions mt-12px d-flex">
							<label for="SynagogueCreatePanel1" class="btn btn-style btn-has-icon" data-tooltip="Back" data-tooltip-right>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md">
									<path d="M11.354 1.646A.5.5 0 0111.354 2.354L5.707 8 11.354 13.646A.5.5 0 0110.646 14.354L4.646 8.354A.5.5 0 014.646 7.646L10.646 1.646A.5.5 0 0111.354 1.646Z"></path>
								</svg>
							</label>

							<button class="btn btn-style w-100 ml-12px" data-action="synagogize">Create Synagogue</button>
						</div>
					</div>
				</div>
			</div>

			<div class="row-6 row-is-section">
				<div class="header">
					<div>Synagogue</div>
				</div>

				<div class="body"></div>
			</div>

		</div>
	</div>
</div>`;

	elementify('Root').insertAdjacentHTML('beforeend', html);

})();

(() => {

	set_nodes();
	getChartConfig('ModalProfile__Statistics__Chart', DATA.view_rank_chart_history || [], 'rgba(134, 220, 46, 1)', 'rgba(134, 220, 46, 0.5)');

})();

/* On BUY button click check if a currency is selected and inject next html feed view */

const set_synagogue_transaction = async (now, tx) => {
	return `<div class="item">
	<div class="d-flex">
		<div class="name text-truncated d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z"></path>
			</svg>

			<div class="text-truncated ml-4px">${tx.title || `User #${tx.uid}`}</div>
		</div>

		<div class="time d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M8 3.5A.5.5 0 007 3.5V9A.5.5 0 007.252 9.434L10.752 11.434A.5.5 0 0011.248 10.566L8 8.71V3.5ZM8 16A8 8 0 108 0 8 8 0 008 16ZM15 8A7 7 0 111 8 7 7 0 0115 8Z"></path>
			</svg>

			<div class="ml-4px" data-timer="${new Date(tx.created_at).getTime()}">${timeDifference(now, new Date(tx.created_at).getTime())}</div>
		</div>
	</div>

	<div class="d-flex mt-12px text-${tx.direction < 0 && 'green' || 'red'}">
		<div class="trade text-truncated d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM6.271 5.055A.5.5 0 016.791 5.093L10.291 7.593A.5.5 0 0110.291 8.407L6.791 10.907A.5.5 0 016 10.5V5.5A.5.5 0 016.271 5.055Z"></path>
			</svg>

			<div class="text-truncated ml-4px" data-token="${tx.token}" data-action="token">${formatFiatNumber(Big(tx.amount).abs().div(get_decimals_power(tx.decimals)))} ${tx.symbol || await get_symbol(tx.token)}</div>
		</div>

		<div class="value d-flex">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md fs-0">
				<circle fill="#191919" cx="8" cy="8" r="8"></circle>
				<path d="M5.5 9.511C5.576 10.465 6.33 11.208 7.682 11.296V12H8.282V11.291C9.682 11.193 10.5 10.445 10.5 9.359 10.5 8.372 9.874 7.863 8.755 7.599L8.282 7.487V5.57C8.882 5.638 9.264 5.966 9.356 6.42H10.408C10.332 5.501 9.544 4.782 8.282 4.704V4H7.682V4.719C6.487 4.836 5.672 5.555 5.672 6.572 5.672 7.472 6.278 8.044 7.285 8.279L7.682 8.377V10.411C7.067 10.318 6.66 9.981 6.568 9.511H5.5ZM7.677 7.345C7.087 7.208 6.767 6.929 6.767 6.509 6.767 6.039 7.112 5.687 7.682 5.584V7.344H7.677ZM8.369 8.538C9.086 8.704 9.417 8.973 9.417 9.448 9.417 9.99 9.005 10.362 8.282 10.43V8.518L8.369 8.538ZM8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM8 13.5A5.5 5.5 0 118 2.5 5.5 5.5 0 018 13.5ZM8 14A6 6 0 108 2 6 6 0 008 14Z"></path>
			</svg>

			<div class="ml-4px">$${formatFiat(tx.usd_amount)}</div>
		</div>
	</div>
</div>`;
};

const set_synagogue_top = (i) => {
	let user = DATA.conf.top_3 && DATA.conf.top_3.length && DATA.conf.top_3[i] || { title: 'User', jbu: 0, nft: 0 };

	return `<div class="item">
	<div data-tooltip="${user.title || `User #${user.uid}`}" data-tooltip-bottom>
		<img ${user.nft && `id="${lazy_get_nft_image('JBU', user.nft, undefined, `jbu-top3-${i}-synagogue`)}"` || `src="${DATA.ERROR_USER_IMG}"`} onerror="error_img(this)">
	</div>
</div>`
};

const set_non_synagogue = async () => {
	document.querySelector('#ModalProfile__Body .row-6 .body').innerHTML = `<div class="feed" id="synagogues-body">${await get_synagogues()}</div>`;
};

const set_synagogue_transactions = async () => {
	let now = Date.now();

	document.querySelector('#ModalProfile__Body .row-6 .body').innerHTML = `<div class="boxes">
	<div class="box">
		<div class="body">
			<div class="item">
				<div class="text-truncated text-style-2">$${formatFiat(DATA.conf.total_synagogue_fees || 0)}</div>
				<div class="text-truncated text-style-1">FROM ${DATA.conf.total_synagogue_nodes || 0} NODES</div>
			</div>
		</div>
	</div>

	<div class="box box-podium">
		<div class="body">
			${set_synagogue_top(0)}
			${set_synagogue_top(1)}
			${set_synagogue_top(2)}
		</div>
	</div>
</div>

<div class="text-truncated mb-12px ml-12px">Synagogue Transactions</div>

<div class="feed">${(await Promise.all((DATA.conf.synagogue_last_txs || []).map(async (v) => await set_synagogue_transaction(now, v)))).flat().join('')  || '<div class="item">No transactions</div>'}</div>`;
};
