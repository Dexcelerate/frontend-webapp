const fs = require('fs'),
	{ exec } = require("child_process");

(async () => {
	if (fs.existsSync('./dist/index.html')) {
		fs.unlinkSync('./dist/index.html');
	}

	let files = {
		'index': fs.readFileSync('./index.html', 'utf8'),
		'favicon16': fs.readFileSync('./img/favicon-16x16.png', 'base64'),
		'favicon32': fs.readFileSync('./img/favicon-32x32.png', 'base64'),
		'style': '',
		'script': ''
	};

	let styles = ['Base/styles/base.css', 'Base/styles/inputs.css', 'Base/styles/loaders.css', 'Base/styles/overlays.css', 'Base/components/Header/Header.css', 'Base/components/Footer/Footer.css', 'Base/components/Togglables/Togglables.css', 'Base/components/Togglables/ModalAffiliates/ModalAffiliates.css', 'Base/components/Togglables/ModalStatistics/ModalStatistics.css', 'Base/components/Togglables/ModalSettings/ModalSettings.css', 'Base/components/Togglables/ModalProfile/ModalProfile.css', 'Base/components/Togglables/Navigation/Navigation.css', 'Base/components/Togglables/Selector/Selector.css', 'Base/components/Togglables/Search/Search.css', 'Base/components/Togglables/Wallet/Wallet.css', 'Base/components/Togglables/Menu/Menu.css', 'Base/components/Togglables/Chat/Chat.css', 'Swap/styles/base.css', 'Swap/components/Swap/Swap.css', 'Swap/components/MobileHelper/MobileHelper.css', 'Swap/components/Terminal/Terminal.css', 'Swap/components/Chart/Chart.css', 'Swap/components/SwapFeed/SwapFeed.css', 'Swap/components/Togglables/ModalPositions/ModalPositions.css', 'Swap/components/Togglables/ModalPositionSettings/ModalPositionSettings.css', 'Swap/components/Togglables/ModalTokenInput/ModalTokenInput.css', 'Swap/components/Togglables/ModalTokenOutput/ModalTokenOutput.css', 'Copy/styles/base.css', 'Copy/components/Copy/Copy.css', 'Copy/components/Togglables/ModalCopyPositionSettings/ModalCopyPositionSettings.css', 'Copy/components/Togglables/ModalSell/ModalSell.css', 'Scan/styles/base.css', 'Scan/components/Scan/Scan.css', 'NFT/styles/base.css', 'NFT/components/NFT/NFT.css', 'NFT/components/Togglables/ModalNFTPack/ModalNFTPack.css', 'NFT/components/Togglables/ModalNFTMarket/ModalNFTMarket.css', 'Base/styles/overrides.css'];

	for (let i = 0; i < styles.length; ++i) {
		files.style += fs.readFileSync(styles[i], 'utf8');
		files.index = files.index.replace(`<link rel="stylesheet" href="${styles[i]}">`, '');
	}

	let scripts = ['Base/scripts/vendor/ethers.umd.min.js', 'Base/scripts/vendor/web3modal.js', 'Base/scripts/vendor/big.js', 'Base/scripts/vendor/web3-provider.js', 'Base/scripts/vendor/pako_inflate.es5.min.js', 'Base/scripts/vendor/socket.io.min.js', 'Base/scripts/vendor/chart.js@3.7.1/script.js', 'Swap/scripts/vendor/lightweight-charts@3.8.0/script.js', 'Base/scripts/store.js', 'Base/scripts/helpers.js', 'Base/scripts/abi.js', 'Base/scripts/tokens.js', 'Base/scripts/data.js', 'Base/scripts/chart_tick_handler.js', 'Base/scripts/populators.js', 'Base/scripts/chain.js', 'Base/scripts/sockets_handle_pre_action.js', 'Base/scripts/sockets_handle_action.js', 'Base/scripts/sockets_handle_message.js', 'Base/scripts/sockets.js', 'Base/components/Header/Header.js', 'Base/components/Footer/Footer.js', 'Base/components/Togglables/ModalHelp/ModalHelp.js', 'Base/components/Togglables/ModalAffiliates/ModalAffiliates.js', 'Base/components/Togglables/ModalStatistics/ModalStatistics.js', 'Base/components/Togglables/ModalSettings/ModalSettings.js', 'Base/components/Togglables/ModalProfile/ModalProfile.js', 'Base/components/Togglables/Navigation/Navigation.js', 'Base/components/Togglables/Selector/Selector.js', 'Base/components/Togglables/Search/Search.js', 'Base/components/Togglables/Wallet/Wallet.js', 'Base/components/Togglables/Menu/Menu.js', 'Base/components/Togglables/Chat/Chat.js', 'Base/components/Togglables/ModalChangeUser/ModalChangeUser.js', 'Copy/components/Togglables/ModalCopyPositionSettings/ModalCopyPositionSettings.js', 'Copy/components/Togglables/ModalDeleteWallet/ModalDeleteWallet.js', 'Copy/components/Togglables/ModalAddWallet/ModalAddWallet.js', 'Copy/components/Togglables/ModalSell/ModalSell.js', 'Swap/components/Togglables/ModalPositions/ModalPositions.js', 'Swap/components/Togglables/ModalPositionSettings/ModalPositionSettings.js', 'Swap/components/Togglables/ModalTokenInput/ModalTokenInput.js', 'Swap/components/Togglables/ModalTokenOutput/ModalTokenOutput.js', 'NFT/components/Togglables/ModalNFTPack/ModalNFTPack.js', 'NFT/components/Togglables/ModalNFTMarket/ModalNFTMarket.js', 'Copy/components/Copy/Copy.js', 'Swap/components/Swap/Swap.js', 'Swap/components/MobileHelper/MobileHelper.js', 'Swap/components/Terminal/Terminal.js', 'Swap/components/Chart/Chart.js', 'Swap/components/SwapFeed/SwapFeed.js', 'NFT/components/NFT/NFT.js', 'Scan/components/Scan/Scan.js', 'bootstrap.js', 'Base/components/Togglables/Togglables.js', 'Base/scripts/inputs.js'];

	// let _scripts = [];

	for (let i = 0; i < scripts.length; ++i) {
		files.script += fs.readFileSync(scripts[i], 'utf8');
		// _scripts.push(fs.readFileSync(scripts[i], 'utf8'));
		files.index = files.index.replace(`<script src="${scripts[i]}"></script>`, '');
	}

	// .replace('</body>', () => `<script type="text/javascript">${_scripts.map(v => v.replaceAll(/[\r\n\t]+/g, '')).join("\n\n// ----------\n\n")}</script></body>`)
	// https://stackoverflow.com/a/71562813/2124529
	fs.writeFileSync('./dist/index.html', files.index.replace(/<!--(?!<!)[^\[>].*?-->/g, '').replaceAll(/[\r\n\t]+/g, '')
		.replace('</head>', () => `<style>${files.style.replaceAll(/[\r\n\t]+/g, '')}</style></head>`)
		.replace('</body>', () => `<script type="text/javascript">${files.script/* .replace(/<!--(?!<!)[^\[>].*?-->/g, '').replaceAll(/[\r\n\t]+/g, '') */}</script></body>`)
		.replace('./img/favicon-16x16.png', () => `data:image/png;base64,${files.favicon16}`)
		.replace('./img/favicon-32x32.png', () => `data:image/png;base64,${files.favicon32}`)
		// .replaceAll(/\t+|(  +)/g, '')
	);

	if (process.env.PROD) {
		console.log(await new Promise((resolve, reject) => {
			exec("aws s3 cp dist/index.html s3://jewbot/index.html --profile jewbot", (error, stdout, stderr) => {
				if (error) {
					reject(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					reject(`stderr: ${stderr}`);
					return;
				}

				console.log(`stdout: ${stdout}`);

				// exec("aws cloudfront create-invalidation --distribution-id EMJ0TVABDAQYO --paths / '/*' --profile jewbot", (error, stdout, stderr) => {
				exec("aws cloudfront create-invalidation --distribution-id EMJ0TVABDAQYO --paths / --profile jewbot", (error, stdout, stderr) => {
					if (error) {
						reject(`error: ${error.message}`);
						return;
					}
					if (stderr) {
						reject(`stderr: ${stderr}`);
						return;
					}

					resolve(`stdout: ${stdout}`);
				});
			});
		}));
	}
})();