const CHART_DATA = [{ time: 0, open: 0, high: 0, low: 0, close: 0 }];

var DATA = {
    UUID: `${Math.random()}-${Math.random()}-${Math.random()}`,
    is_mobile:
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            navigator.userAgent || navigator.vendor || window.opera
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/.test(
            (navigator.userAgent || navigator.vendor || window.opera).substr(0, 4).toLowerCase()
        ),
    LANGS: [
        ['en', 'English'],
        ['ru', 'Russian'],
        ['he', 'Hebrew'],
        ['hi', 'Hindi'],
        ['zh', 'Chinese'],
        ['es', 'Spanish'],
        ['fr', 'French'],
        ['it', 'Italian'],
        ['de', 'German'],
        ['pt', 'Portuguese'],
        ['vi', 'Vietnamese'],
    ],
    dev_chains: {
        97: true,
        1337: true,
    },
    CHAINS_ORDER: [56, 137, 250, 43114, 1],
    CHAINS: {
        1: {
            EXPLORER: 'https://etherscan.io',
            CHAIN_ID: 1,
            CHAIN: 'ETH',
            CHAIN_ASSETS: 'ethereum',
            TRUST_WALLET_ASSETS: 'ethereum',
            PEG: 'ETH',
            DECIMALS: 18,
            WPEG: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' /*	WBNB */,
            WPEG: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' /*	WBNB */,
            ROUTER: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
            RPC: 'https://eth.public-rpc.com',
            STABLE: ['0xdAC17F958D2ee523a2206206994597C13D831ec7'],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                ETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                WBNB: '0x418d75f65a02b3d53b2418fb8e1fe493759c7605',
                WMATIC: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
                WFTM: '0x4e15361fd6b4bb609fa63c81a2be19d873717870',
                WAVAX: '0x85f138bfee4ef8e540890cfb48f620571d67eda3',
                WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
                XTZ: '0x2e59005c5c0f0a4D77CcA82653d48b46322EE5Cd',
                BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
                DOGE: '0x3832d2F059E55934220881F831bE501D180671A7',
                USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
                BUSD: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
            },
        },
        56: {
            EXPLORER: 'https://bscscan.com',
            CHAIN_ID: 56,
            CHAIN: 'BSC',
            CHAIN_ASSETS: 'smartchain',
            TRUST_WALLET_ASSETS: 'binance',
            PEG: 'BNB',
            DECIMALS: 18,
            WPEG: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' /*	WBNB */,
            ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
            CHECKER: '0xb84b334893e501Ca147c09C9e12eF2d55BCc5c46',
            USERS: '0xF0fDBCE8a4dE89bb1ef645Be600E69e411eEa843',
            SUBSCRIPTION: '0xD75AFB376748a7000aa740fcaa0a77Ca75AD8097',
            ACTIONS_NFT: '0x860694e09552C9942C052Cb14e8dcc5c59379768',
            ARTIFACTS_NFT: '0x32f447FdD738a25395164Ff12Cb8624D73146427',
            USERS_NFT: '0xd1878a51d5b9fF76CB7c5527627b905db6f4287e',
            SERVERS_NFT: '0xBb6177865e488a988c0027994331F44b15D90472',
            DEPOSIT: '0x6dBa5186bA7869311D000080c18Cc02fe15A1667',
            DISCOUNTS: '0xCa59B680C597F8b2479af24dC2F4d87E9d338B95',
            SWAP: '0x27A37Fe69B7163Fe44d4c5ca7e236be35dFB63cf',
            WHALES_NFT: '0x0000000000000000000000000000000000000000',
            RPC: 'https://bsc-dataseed.binance.org/',
            BLUECHIPS: [
                '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
                '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
                '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
                '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
                '0xC9882dEF23bc42D53895b8361D0b1EDC7570Bc6A',
                '0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE',
            ],
            STABLE: [
                '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
                '0x03ab98f5dc94996F8C33E15cD4468794d12d41f9',
                '0x55d398326f99059fF775485246999027B3197955',
                '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
                '0x14016E85a25aeb13065688cAFB43044C2ef86784',
                '0xb3c11196A4f3b1da7c23d9FB0A3dDE9c6340934F',
                '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
            ],
            ROUTER_NAMES: {
                '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7': 'ApeSwap',
                '0xB0EeB0632bAB15F120735e5838908378936bd484': 'Autoshark',
                '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd': 'BabySwap',
                '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F': 'BakerySwap',
                '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8': 'BiSwap',
                '0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A': 'CafeSwap',
                '0x3047799262d8D2EF41eD2a222205968bC9B0d895': 'CheeseSwap',
                '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27': 'CoinSwap',
                '0x151030a9Fa62FbB202eEe50Bd4A4057AB9E826AD': 'Definix',
                '0xA63B831264183D755756ca9AE5190fF5183d65D6': 'Elk',
                '0xB3ca4D73b1e0EA2c53B42173388cC01e1c226F40': 'FstSwap',
                '0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec': 'Hyperjump',
                '0xBe65b8f75B9F20f4C522e0067a3887FADa714800': 'JetSwap',
                '0x069A306A638ac9d3a68a6BD8BE898774C073DCb3': 'JSwap',
                '0xbd67d157502A23309Db761c41965600c2Ec788b2': 'JulSwap',
                '0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f': 'KnightSwap',
                '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8': 'Mdex',
                '0xD654953D746f0b114d1F85332Dc43446ac79413d': 'NomiSwap',
                '0x6B45064F128cA5ADdbf79825186F4e3e3c9E7EB5': 'OrbitalSwap',
                '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F': 'PancakeV1',
                '0x10ED43C718714eb63d5aA57B78B54704E256024E': 'PancakeV2',
                '0x24f7C33ae5f77e2A9ECeed7EA858B4ca2fa1B7eC': 'PantherSwap',
                '0x9F088377BcdC220CB0E1Ad15aE6Bc75074beE9F6': 'Planet',
                '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506': 'SushiSwap',
            },
            ROUTER_FEES: {
                buy: {
                    '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7': Big(1 - 0.002),
                    '0xB0EeB0632bAB15F120735e5838908378936bd484': Big(1 - 0.0013),
                    '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd': Big(1 - 0.003),
                    '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F': Big(1 - 0.003),
                    '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8': Big(1 - 0.001),
                    '0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A': Big(1 - 0.002),
                    '0x3047799262d8D2EF41eD2a222205968bC9B0d895': Big(1 - 0.002),
                    '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27': Big(1 - 0.002),
                    '0x151030a9Fa62FbB202eEe50Bd4A4057AB9E826AD': Big(1 - 0.002),
                    '0xA63B831264183D755756ca9AE5190fF5183d65D6': Big(1 - 0.003),
                    '0xB3ca4D73b1e0EA2c53B42173388cC01e1c226F40': Big(1 - 0.003),
                    '0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec': Big(1 - 0.004),
                    '0xBe65b8f75B9F20f4C522e0067a3887FADa714800': Big(1 - 0.003),
                    '0x069A306A638ac9d3a68a6BD8BE898774C073DCb3': Big(1 - 0.003),
                    '0xbd67d157502A23309Db761c41965600c2Ec788b2': Big(1 - 0.003),
                    '0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f': Big(1 - 0.002),
                    '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8': Big(1 - 0.003),
                    '0xD654953D746f0b114d1F85332Dc43446ac79413d': Big(1 - 0.001),
                    '0x6B45064F128cA5ADdbf79825186F4e3e3c9E7EB5': Big(1 - 0.0025),
                    '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F': Big(1 - 0.002),
                    '0x10ED43C718714eb63d5aA57B78B54704E256024E': Big(1 - 0.0025),
                    '0x24f7C33ae5f77e2A9ECeed7EA858B4ca2fa1B7eC': Big(1 - 0.002),
                    '0x9F088377BcdC220CB0E1Ad15aE6Bc75074beE9F6': Big(1 - 0.0025),
                    '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506': Big(1 - 0.003),
                },
                sell: {
                    '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7': Big(1 / (1 - 0.002)),
                    '0xB0EeB0632bAB15F120735e5838908378936bd484': Big(1 / (1 - 0.0013)),
                    '0x325E343f1dE602396E256B67eFd1F61C3A6B38Bd': Big(1 / (1 - 0.003)),
                    '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F': Big(1 / (1 - 0.003)),
                    '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8': Big(1 / (1 - 0.001)),
                    '0x933DAea3a5995Fb94b14A7696a5F3ffD7B1E385A': Big(1 / (1 - 0.002)),
                    '0x3047799262d8D2EF41eD2a222205968bC9B0d895': Big(1 / (1 - 0.002)),
                    '0x34DBe8E5faefaBF5018c16822e4d86F02d57Ec27': Big(1 / (1 - 0.002)),
                    '0x151030a9Fa62FbB202eEe50Bd4A4057AB9E826AD': Big(1 / (1 - 0.002)),
                    '0xA63B831264183D755756ca9AE5190fF5183d65D6': Big(1 / (1 - 0.003)),
                    '0xB3ca4D73b1e0EA2c53B42173388cC01e1c226F40': Big(1 / (1 - 0.003)),
                    '0x3bc677674df90A9e5D741f28f6CA303357D0E4Ec': Big(1 / (1 - 0.004)),
                    '0xBe65b8f75B9F20f4C522e0067a3887FADa714800': Big(1 / (1 - 0.003)),
                    '0x069A306A638ac9d3a68a6BD8BE898774C073DCb3': Big(1 / (1 - 0.003)),
                    '0xbd67d157502A23309Db761c41965600c2Ec788b2': Big(1 / (1 - 0.003)),
                    '0x05E61E0cDcD2170a76F9568a110CEe3AFdD6c46f': Big(1 / (1 - 0.002)),
                    '0x7DAe51BD3E3376B8c7c4900E9107f12Be3AF1bA8': Big(1 / (1 - 0.003)),
                    '0xD654953D746f0b114d1F85332Dc43446ac79413d': Big(1 / (1 - 0.001)),
                    '0x6B45064F128cA5ADdbf79825186F4e3e3c9E7EB5': Big(1 / (1 - 0.0025)),
                    '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F': Big(1 / (1 - 0.002)),
                    '0x10ED43C718714eb63d5aA57B78B54704E256024E': Big(1 / (1 - 0.0025)),
                    '0x24f7C33ae5f77e2A9ECeed7EA858B4ca2fa1B7eC': Big(1 / (1 - 0.002)),
                    '0x9F088377BcdC220CB0E1Ad15aE6Bc75074beE9F6': Big(1 / (1 - 0.0025)),
                    '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506': Big(1 / (1 - 0.003)),
                },
            },
            TOKENS_MAP: {
                BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                WMATIC: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
                WFTM: '0xAD29AbB318791D579433D831ed122aFeAf29dcfe',
                WAVAX: '0x1CE0c2827e2eF14D5C4f29a091d735A204794041',
                WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
                XTZ: '0x16939ef78684453bfDFb47825F8a5F714f12623a',
                BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
                DOGE: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
                USDT: '0x55d398326f99059ff775485246999027b3197955',
                BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            },
            BASE_TOKENS_NAMES: {
                WBNB: 'Wrapped BNB',
                WMATIC: 'Wrapped Matic',
                WFTM: 'Wrapped Fantom',
                WAVAX: 'Wrapped Avalance',
                WETH: 'Wrapped Ethereum',
                XTZ: 'Tezos',
                BTC: 'Bitcoin',
                DOGE: 'Doge Coin',
                USDT: 'Tether USD',
                BUSD: 'Binance USD',
            },
        },
        97: {
            /*	Testnet */ EXPLORER: 'https://testnet.bscscan.com',
            CHAIN_ID: 97,
            CHAIN: 'BSCT',
            CHAIN_ASSETS: 'smartchain',
            TRUST_WALLET_ASSETS: 'binance',
            PEG: 'BNB',
            DECIMALS: 18,
            WPEG: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd' /*	WBNB */,
            ROUTER: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
            RPC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            STABLE: ['0x55d398326f99059fF775485246999027B3197955'],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
                WMATIC: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
                WFTM: '0xAD29AbB318791D579433D831ed122aFeAf29dcfe',
                WAVAX: '0x1CE0c2827e2eF14D5C4f29a091d735A204794041',
                WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
                XTZ: '0x16939ef78684453bfDFb47825F8a5F714f12623a',
                BTC: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
                DOGE: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
                USDT: '0x55d398326f99059ff775485246999027b3197955',
                BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
            },
        },
        137: {
            EXPLORER: 'https://polygonscan.com',
            CHAIN_ID: 137,
            CHAIN: 'MATIC',
            CHAIN_ASSETS: 'polygon',
            TRUST_WALLET_ASSETS: 'polygon',
            PEG: 'MATIC',
            DECIMALS: 18,
            WPEG: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' /*	WMATIC */,
            ROUTER: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
            RPC: 'https://matic-mainnet.chainstacklabs.com',
            STABLE: [
                '0x2088C47Fc0c78356c622F79dBa4CbE1cCfA84A91',
                '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
                '0x2e1AD108fF1D8C782fcBbB89AAd783aC49586756',
                '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
                '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
                '0x9719d867a500ef117cc201206b8ab51e794d3f82',
                '0x1a13F4Ca1d028320A707D99520AbFefca3998b7F',
                '0xC8A94a3d3D2dabC3C1CaffFFDcA6A7543c3e3e65',
                '0xC79358DE3868A7C751F52cFeECd650595AEE8B18',
                '0xF81b4Bec6Ca8f9fe7bE01CA734F55B2b6e03A7a0',
                '0x9aF3b7DC29D3C4B1A5731408B6A9656fA7aC3b72',
                '0xD07A7FAc2857901E4bEC0D89bBDAe764723AAB86',
                '0x60D55F02A771d515e077c9C2403a1ef324885CeC',
            ],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                MATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
                WBNB: '0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
                WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
                WFTM: '0xb85517b87bf64942adf3a0b9e4c71e4bc5caa4e5',
                WAVAX: '0x2c89bbc92bd86f8075d1decc58c7f4e0107f286b',
                WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
                BTC: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
                DOGE: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
                USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
                BUSD: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
            },
        },
        250: {
            EXPLORER: 'https://ftmscan.com',
            CHAIN_ID: 250,
            CHAIN: 'FANTOM',
            CHAIN_ASSETS: 'fantom',
            TRUST_WALLET_ASSETS: 'fantom',
            PEG: 'FTM',
            DECIMALS: 18,
            WPEG: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83' /*	WFTM */,
            ROUTER: '0xF491e7B69E4244ad4002BC14e878a34207E38c29',
            RPC: 'https://rpc.ftm.tools/',
            STABLE: ['0xAd84341756Bf337f5a0164515b1f6F993D194E1f', '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', '0x940F41F0ec9ba1A34CF001cc03347ac092F5F6B5', '0xe578C856933D8e1082740bf7661e379Aa2A30b26'],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                FTM: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                WBNB: '0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454',
                WMATIC: '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
                WFTM: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
                WAVAX: '0x511d35c52a3c244e7b8bd92c0c297755fbd89212',
                WETH: '0x74b23882a30290451a17c44f4f05243b6b58c76d',
                BTC: '0xe1146b9AC456fCbB60644c36Fd3F868A9072fc6E',
                DOGE: '0xEb0a2D1b1a33D95204af5d00f65FD9e349419878',
                USDT: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
            },
        },
        1337: {
            EXPLORER: 'about:blank',
            CHAIN_ID: 1337,
            CHAIN: 'GANACHE',
            CHAIN_ASSETS: 'ganache',
            TRUST_WALLET_ASSETS: 'ganache',
            PEG: 'ETH',
            DECIMALS: 18,
            WPEG: '0x97866Bd7627CC39F568d6aea36C3226A83D44bB3' /*	WETH */,
            ROUTER: '0xbE33Ff4B45825513aCC28A21BD885b08632Fc2d7',
            RPC: 'http://10.0.0.2:7545/',
            STABLE: ['0x89F858ca9aF9Ce69B1D6FD4157CA015ca14B87f1'],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                ETH: '0x97866Bd7627CC39F568d6aea36C3226A83D44bB3',
                WETH: '0x97866Bd7627CC39F568d6aea36C3226A83D44bB3',
                BUSD: '0x89F858ca9aF9Ce69B1D6FD4157CA015ca14B87f1',
            },
        },
        43114: {
            EXPLORER: 'https://cchain.explorer.avax.network',
            CHAIN_ID: 43114,
            CHAIN: 'AVAX',
            CHAIN_ASSETS: 'avalanchec',
            TRUST_WALLET_ASSETS: 'avalanchec',
            PEG: 'AVAX',
            DECIMALS: 18,
            WPEG: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7' /*	WAVAX */,
            ROUTER: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
            RPC: 'https://api.avax.network/ext/bc/C/rpc',
            STABLE: [
                '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
                '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
                '0xde3A24028580884448a5397872046a019649b084',
                '0x46A51127C3ce23fb7AB1DE06226147F446e4a857',
                '0x532E6537FEA298397212F09A61e03311686f548e',
            ],
            ROUTER_NAMES: {},
            TOKENS_MAP: {
                AVAX: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
                WBNB: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
                WMATIC: '0xf2f13f0B7008ab2FA4A2418F4ccC3684E49D20Eb',
                WAVAX: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
                BTC: '0x50b7545627a5162F82A992c33b87aDc75187B218',
                USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
                BUSD: '0x19860CCB0A68fd4213aB9D8266F7bBf05A8dDe98',
            },
        },
    },
    CHAIN_IDS_MAP: {
        ETH: 1,
        BSC: 56,
        BSCT: 97,
        MATIC: 137,
        FANTOM: 250,
        GANACHE: 1337,
        AVAX: 43114,
    },
    CROSS_MAP: {
        /* TODO: */
        BSC: {
            '0x1CE0c2827e2eF14D5C4f29a091d735A204794041': 'avalanchec',
            '0xAD29AbB318791D579433D831ed122aFeAf29dcfe': 'fantom',
            '0x2170Ed0880ac9A755fd29B2688956BD959F933F8': 'ethereum',
            '0xbC4081a8b192a50bD58AC6C595d766e59a56C37E': 'monero',
        },
    },
    MINUS_ONE: '0xffffffffffffffffffffffffffffffffffffffff',
    ZERO: '0x0000000000000000000000000000000000000000',
    ZERO_HASH: '0x0000000000000000000000000000000000000000000000000000000000000000',
    ABI,
    VIEWS: ['swap', 'copy', 'scan', 'nft'],
    ERROR_USER_IMG: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23fdfdfd' d='M11 6A3 3 0 115 6 3 3 0 0111 6ZM0 8A8 8 0 1116 8 8 8 0 010 8ZM8 1A7 7 0 002.532 12.37C3.242 11.226 4.805 10 8 10S12.757 11.225 13.468 12.37A7 7 0 008 1Z'%3E%3C/path%3E%3C/svg%3E`,
    ERROR_IMG: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect fill='%23333333' width='16' height='16' rx='100%25'%3E%3C/rect%3E%3Cpath fill='%23999999' d='M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5.255 5.786A.237.237 0 005.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783 6.677 5.127 7.127 4.649 7.929 4.649 8.615 4.649 9.243 4.992 9.243 5.817 9.243 6.452 8.869 6.744 8.278 7.188 7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392A.25.25 0 007.363 9.638H8.174A.25.25 0 008.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797 10.043 7.334 10.678 6.82 10.678 5.741 10.678 4.23 9.402 3.5 8.005 3.5 6.738 3.5 5.35 4.09 5.255 5.786ZM6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476 8.431 12.476 8.85 12.082 8.85 11.549 8.85 10.997 8.43 10.609 7.821 10.609 7.237 10.609 6.812 10.997 6.812 11.549Z'%3E%3C/path%3E%3C/svg%3E`,
    ERROR_IMG_HTML: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md"><rect fill="#191919" width="16" height="16" rx="100%"></rect><path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM5.255 5.786A.237.237 0 005.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783 6.677 5.127 7.127 4.649 7.929 4.649 8.615 4.649 9.243 4.992 9.243 5.817 9.243 6.452 8.869 6.744 8.278 7.188 7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392A.25.25 0 007.363 9.638H8.174A.25.25 0 008.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797 10.043 7.334 10.678 6.82 10.678 5.741 10.678 4.23 9.402 3.5 8.005 3.5 6.738 3.5 5.35 4.09 5.255 5.786ZM6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476 8.431 12.476 8.85 12.082 8.85 11.549 8.85 10.997 8.43 10.609 7.821 10.609 7.237 10.609 6.812 10.997 6.812 11.549Z"/></svg>`,
    CANCEL_SVG: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md"><circle fill="#333333" cx="8" cy="8" r="8"></circle><path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path></svg>`,
    CANCEL_SVG_BLACK: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="icon-md"><circle fill="#191919" cx="8" cy="8" r="8"></circle><path d="M8 15A7 7 0 118 1 7 7 0 018 15ZM8 16A8 8 0 108 0 8 8 0 008 16ZM4.646 4.646A.5.5 0 015.354 4.646L8 7.293 10.646 4.646A.5.5 0 0111.354 5.354L8.707 8 11.354 10.646A.5.5 0 0110.646 11.354L8 8.707 5.354 11.354A.5.5 0 014.646 10.646L7.293 8 4.646 5.354A.5.5 0 014.646 4.646Z"></path></svg>`,
    IMAGINARY_PEG: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    SLOT_TOPIC: '0x630f01b6ed491f2b42b5a79f35fb6bcf2f32ee31e946f048d9917e6ceef7d03e' /* UserSlot(address) */,
    WPEG_PRICE: 0,
    CONTRACTS: {},
    migration_tokens: {},
    migration_started: {},
    affiliate_fees: [],
    total_affiliate_fees: {},
    cids: [],
    top3: [],
    amounts: {},
    web3_helpers: {},
    settings: {},
    follow_stats: {},
    selected_affiliate_jbu: 0,
    loading: true,
    peg_price: Big(0),
    token_price: Big(0),
    MAX_TARGETS: 10,
    ETHER: Big(10).pow(18),
    ETHER_BASE: 18,
    MAX_VAL: 2 ** 64,
    allowed_chains: ['BSC', 'FANTOM', 'GANACHE'],
    IP_API: 'https://redis-1.dexcelerate.com/',
    IPFS_IMG_CDN: 'https://ipfs.io/ipfs/',
    DEX_IMG_CDN: 'https://dexcelerate.com/img/vendor/exchanges/',
    TOKEN_IMG_CDN: 'https://img-proxy.dexcelerate.com/https://dexcelerate.com/img/vendor/',
    TRUST_WALLET_CDN: 'https://img-proxy.dexcelerate.com/https://assets-cdn.trustwallet.com/blockchains/',
    view_uid: 0,
    view_user: {},
    view_rank: {},
    view_rank_history: [],
    view_chain: 'ALL',
    view: get_url_var('view') || 'swap',
    pair: get_url_var('pair') || undefined,
    token: get_url_var('token') || undefined,
    token_pair_idx: 0,
    pay_token: null,
    last_tokens: [],
    max_last_tokens: 10,
    positions: {},
    token_data: {},
    decimal_powerss: {},
    decimals: {},
    symbols: {},
    ca_name: {},
    requests_cache: {},
    responses_cache: {},
    previous_nft_keys: {},
    nft_divs_cache: {},
    selected_nodes: {},
    lastCandle: { ...CHART_DATA[0] },
    candleBuffer: [{ ...CHART_DATA[0] }],
    chart_data: [],
    chart_time_frames_map: ['1M', '5M', '15M', '30M', '1H'],
    chart_time_frames: [60, 300, 900, 1800, 3600],
    chart_time_frame: 0,
    conf: JSON.parse(store.get('conf') || 'false') || {
        connected: false,
        auth: store.get('auth'),
        vault: Big(0),
        balance: Big(0),
    },
    lq_holders_step: 5,
    MAX_OPS_PER_TX: 100,
    NFT_TYPES_MAP: {
        JBU: 'USERS_NFT',
        JBS: 'SERVERS_NFT',
        JBD: 'DISCOUNTS',
        JBA: 'ACTIONS_NFT',
        JBR: 'ARTIFACTS_NFT',
        JBW: 'WHALES_NFT',
    },
    default_settings: {
        is_block_delay: false,
        is_buy_at: false,
        is_buy_gas_limit: false,
        is_buy_gas_price: false,
        is_buy_gas_multiplier: false,
        is_slippage_buy: false,
        is_defender_manual: false,
        is_defender: false,
        is_kosher_manual: false,
        is_max_buy_fee: false,
        is_max_sell_fee: false,
        is_moonbag: false,
        is_sell_at: false,
        is_sell_gas_limit: false,
        is_sell_gas_price: false,
        is_sell_gas_multiplier: false,
        is_slippage_sell: false,
        is_stop_loss_trailing: false,
        is_stop_loss: false,
        is_timeout: false,
        is_tx_transfer_limit: false,
        block_delay: 0,
        buy_at: 0,
        buy_gas_limit: 0,
        buy_gas_price: 0,
        buy_method_ids: [],
        slippage_buy: 0,
        defender_gas_multiplier: 0,
        kosher_mode: 'n',
        kosher_strainer: [],
        buy_gas_multiplier: 0,
        sell_gas_multiplier: 0,
        max_buy_fee: 0,
        max_sell_fee: 0,
        moonbag: 0,
        sell_at: 0,
        sell_gas_limit: 0,
        sell_gas_price: 0,
        sell_method_ids: [],
        slippage_sell: 0,
        stop_loss_percent: 0,
        stop_loss_trigger: 0,
        targets_percents: [],
        targets_triggers: [],
        timeout: 0,
        tx_transfer_limit: 0,
    },
    default_copy_settings: {
        is_block_delay: false,
        is_buy_gas_limit: false,
        is_buy_gas_price: false,
        is_buy_gas_multiplier: false,
        is_slippage_buy: false,
        is_defender_manual: false,
        is_defender: false,
        is_backrun: false,
        is_frontrun: false,
        is_kosher_manual: false,
        is_kosher: false,
        is_max_buy_fee: false,
        is_max_dev_sell_or_lq_percent: false,
        is_max_sell_fee: false,
        is_moonbag: false,
        is_sell_gas_limit: false,
        is_sell_gas_price: false,
        is_sell_gas_multiplier: false,
        is_slippage_sell: false,
        is_stop_loss_trailing: false,
        is_stop_loss: false,
        is_fixed_amount: false,
        is_strategy_manual: false,
        is_percent: false,
        is_proportional: false,
        is_timeout: false,
        is_tx_transfer_limit: false,
        block_delay: 0,
        buy_gas_limit: 0,
        buy_gas_price: 0,
        buy_method_ids: [],
        slippage_buy: 0,
        defender_gas_multiplier: 0,
        defender_max_tx_per_host: 0,
        frontrun_gas_multiplier: 0,
        kosher_mode: 'n',
        kosher_strainer: [],
        buy_gas_multiplier: 0,
        sell_gas_multiplier: 0,
        max_buy_fee: 0,
        max_dev_sell_or_lq_percent: 0,
        max_sell_fee: 0,
        moonbag: 0,
        sell_gas_limit: 0,
        sell_gas_price: 0,
        sell_method_ids: [],
        slippage_sell: 0,
        stop_loss_percent: 0,
        stop_loss_trigger: 0,
        fixed_amount: 0,
        percent: 0,
        targets_percents: [],
        targets_triggers: [],
        timeout: 0,
        title: '',
        tx_transfer_limit: 0,
    },
    COLOR_RANGES: [
        ['rgba(134, 220, 46, 1)', 'rgba(134, 220, 46, 0.5)'],
        ['rgba(204, 169, 10, 1)', 'rgba(204, 169, 10, 0.5)'],
        ['rgba(221, 119, 60, 1)', 'rgba(221, 119, 60, 0.5)'],
    ],
    settings: {},
    copy_settings: {},
    copy_settings_ordered: {},
    copy_transactions: {},
    block_times: {},
    is_lq: {},
    deposit_prep: {},
    copy_wallet: null,
    selected_slot: null,
    slot: null,
    selected_copy_wallet: null,
    slots: {},
    chats: {},
    p2p: [],
    elements: {},
    chat: [],
    chat_message: '',
    prev_room: 'en',
    room: 'en',
    rooms: ['en'],
    displayInFiat: JSON.parse(store.get('displayInFiat') || 'true'),
    hideZeroBalances: false,
    server_price: '1.00',
    img_cache: {},
    IMG_CACHE: {
        token: {},
        dex: {},
        nft: {},
    },
    IMG_LOAD_CACHE: {
        token: {},
        dex: {},
        nft: {},
    },
    NFT_CACHE: {},
    charts: {},
    synagogues: [],
    CHAIN: store.get('last_chain') || 'BSC',
    INIT_CHAIN: get_url_var('CHAIN'),
    wallet_slots_pagination_idx: -1,
    last_slot_token_balace_in_wpeg: {},
    REVERSE_CHAIN_ASSETS_MAP: {},
    REVERSE_CHAIN_ASSETS_PEG_MAP: {},
    JBNFTS: [],
    scroll_events: {},
    boost_quantity: 0,
    pages: {
        token: 0,
        affiliate: 0,
        stats: 0,
        lq_holders: 0,
        wallet: 0,
        liquidity: 0,
    },
    page_limits: {
        token: 20,
        affiliates: 16,
        stats: 25,
        lq_holders: 16,
        wallet: 100,
        liquidity: 100,
        chart: 250,
    },
    page_offset: {
        token: 0,
        affiliates: 0,
        stats: 0,
        lq_holders: 0,
        wallet: 0,
        liquidity: 0,
        chart: 0,
    },
    currentUser: 0,

    /* ALIEN STUFF */

    assets: [
        { name: 'TEST', favorited: true, balance: '$5,012.48', price: '$0.0 ₄ 7293', liquidity: '$3.256M', volume: '$2.09M', change: '33.6%' },
        { name: 'WBNB', favorited: true, balance: '$1,000.00', price: '$500.00', liquidity: '$123B', volume: '$456.789M', change: '23.10' },
        { name: 'DOGS', favorited: false, balance: '$6.81', price: '$0.0 ₄ 1633', liquidity: '$23.932', volume: '$1.022M', change: '941.92%' },
        { name: 'CATS', favorited: false, balance: '$543.21', price: '$0.0 ₇ 3067', liquidity: '$4.21M', volume: '$16.231M', change: '123.45%' },
        { name: 'TOKENZ', favorited: true, balance: '', price: '$2.52947', liquidity: '$101.4M', volume: '$7.316M', change: '0.85%' },
        { name: 'HERO', favorited: false, balance: '', price: '$15.25', liquidity: '$1.25M', volume: '$9.134M', change: '24.52%' },
        { name: 'Cake', favorited: true, balance: '', price: '$5.22', liquidity: '$891.92M', volume: '$93.214M', change: '2.45%' },
        { name: 'WOWZA', favorited: false, balance: '$5,012.48', price: '$101.01', liquidity: '$1.04M', volume: '$2.217M', change: '8.76%' },
        { name: 'TKN', favorited: true, balance: '$23.12', price: '$567.89', liquidity: '$432.10M', volume: '$987.432M', change: '234.56%' },
        { name: 'BRB', favorited: false, balance: '$156.52', price: '$0.0 ₇ 5631', liquidity: '$32.10M', volume: '$72.136M', change: '19.45%' },
        { name: 'AYY', favorited: true, balance: '$999.99', price: '$24.81242', liquidity: '$12.92B', volume: '$999.242B', change: '543.21%' },
        { name: 'LMAO', favorited: true, balance: '$82.22', price: '$0.03219', liquidity: '$123.454', volume: '$1.242M', change: '12.30%' },
        { name: 'KEK', favorited: false, balance: '$19.63', price: '$0.82948', liquidity: '$24.12M', volume: '$44.931M', change: '21.12%' },
        { name: 'JEW', favorited: true, balance: '$1234.56', price: '$123.45678', liquidity: '$123.456B', volume: '$456.789B', change: '99.99%' },
        { name: 'RUGS', favorited: false, balance: '$0.12', price: '$0. ₇ 6543', liquidity: '$321.123', volume: '$0.313', change: '743.19%' },
        { name: 'LAMBO', favorited: true, balance: '$288.48', price: '$58.18285', liquidity: '$285.838M', volume: '$3.831B', change: '38.81%' },
        {
            name: 'Super Long Name That Should Overflow And Break All The Fucking Layout',
            favorited: true,
            balance: '$123456789.123456789',
            price: '$123456789.123456789',
            liquidity: '$123456789.123456789',
            volume: '$123456789.123456789',
            change: '123456789.123456789%',
        },
    ],
};

const set_chain = async (is_init) => {
    DATA.CHAIN_ID = DATA.CHAIN_ID || 56;
    DATA.CHAIN = (DATA.CHAINS[DATA.CHAIN_ID] || {}).CHAIN || DATA.CHAIN;
    DATA.CHAIN_ASSETS = (DATA.CHAINS[DATA.CHAIN_ID] || {}).CHAIN_ASSETS || DATA.CHAIN_ASSETS;
    DATA.PEG = (DATA.CHAINS[DATA.CHAIN_ID] || {}).PEG || DATA.PEG;
    DATA.WPEG = (DATA.CHAINS[DATA.CHAIN_ID] || {}).WPEG || DATA.WPEG;
    DATA.ROUTER = (DATA.CHAINS[DATA.CHAIN_ID] || {}).ROUTER || DATA.ROUTER;
    DATA.STABLE = (DATA.CHAINS[DATA.CHAIN_ID] || {}).STABLE || DATA.STABLE;
    DATA.EXPLORER = (DATA.CHAINS[DATA.CHAIN_ID] || {}).EXPLORER || DATA.EXPLORER;
    DATA.ROUTER_NAMES = (DATA.CHAINS[DATA.CHAIN_ID] || {}).ROUTER_NAMES || DATA.ROUTER_NAMES;
    DATA.TOKENS_MAP = (DATA.CHAINS[DATA.CHAIN_ID] || {}).TOKENS_MAP || DATA.TOKENS_MAP;
    DATA.CHECKER = (DATA.CHAINS[DATA.CHAIN_ID] || {}).CHECKER || DATA.CHECKER;
    DATA.USERS = (DATA.CHAINS[DATA.CHAIN_ID] || {}).USERS || DATA.USERS;
    DATA.SUBSCRIPTION = (DATA.CHAINS[DATA.CHAIN_ID] || {}).SUBSCRIPTION || DATA.SUBSCRIPTION;
    DATA.DEPOSIT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).DEPOSIT || DATA.DEPOSIT;
    DATA.DISCOUNTS = (DATA.CHAINS[DATA.CHAIN_ID] || {}).DISCOUNTS || DATA.DISCOUNTS;
    DATA.USERS_NFT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).USERS_NFT || DATA.USERS_NFT;
    DATA.SERVERS_NFT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).SERVERS_NFT || DATA.SERVERS_NFT;
    DATA.ARTIFACTS_NFT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).ARTIFACTS_NFT || DATA.ARTIFACTS_NFT;
    DATA.ACTIONS_NFT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).ACTIONS_NFT || DATA.ACTIONS_NFT;
    DATA.WHALES_NFT = (DATA.CHAINS[DATA.CHAIN_ID] || {}).WHALES_NFT || DATA.WHALES_NFT;
    DATA.ROUTER_FEES = (DATA.CHAINS[DATA.CHAIN_ID] || {}).ROUTER_FEES || DATA.ROUTER_FEES;
    DATA.RPC = (DATA.CHAINS[DATA.CHAIN_ID] || {}).RPC || DATA.RPC;

    DATA.JBNFTS = [DATA.DISCOUNTS, DATA.USERS_NFT, DATA.SERVERS_NFT, DATA.ARTIFACTS_NFT, DATA.ACTIONS_NFT, DATA.WHALES_NFT];

    DATA.selected_copy_slot = DATA.selected_slot; //= DATA.ZERO;

    let wallets = Object.keys(DATA.copy_settings[DATA.selected_copy_slot] || {});

    if (wallets.length) {
        DATA.selected_copy_wallet = DATA.copy_wallet = wallets[0];
    }

    while (!document.querySelector('#Copy .wallets')) {
        await sleep(0.01);
    }

    if (is_init) {
        /* if (!is_init) {
		setTimeout(add_wallets, 0);
	} else { */
        setTimeout(_update_price, 0);
    }
};

const set_token = async (item, stop_reload) => {
    let is_item = !!item;

    if (!item && !(item = document.querySelector(`#ModalTokenOutput__Body .list .item[data-token-address="${DATA.token}"]`))) {
        await Promise.all([
            (async () => {
                DATA.symbol = await get_symbol(DATA.token);
            })(),
            (async () => {
                DATA.token_name =
                    (DATA.token &&
                        (
                            await contract(DATA.token, undefined, undefined, true)
                                .name()
                                .catch((e) => '')
                        )
                            .replace('"', '&quot;')
                            .replace('<', '&lt;')
                            .replace('>', '&gt;')
                            .replace('\\', '')) ||
                    'Token';
            })(),
        ]);

        item = htmlToElement(`<button class="btn item" data-token-address="${DATA.token}">
	<img id="${GetTokenImage(DATA.token)}" src="${DATA.ERROR_IMG}" class="icon-round">
	<div class="meta">
		<div class="symbol text-truncated w-100">${DATA.symbol}</div>
		<div class="name text-truncated w-100">${DATA.token_name}</div>
	</div>
</button>`);
        document.querySelector('#ModalTokenOutput__Body .list').insertAdjacentElement('afterbegin', item);
        item.addEventListener('click', async () => {
            (await set_token(item))();
        });

        if (!DATA.last_tokens.includes(DATA.token)) {
            if (DATA.last_tokens.length > DATA.max_last_tokens) {
                DATA.last_tokens = DATA.last_tokens.slice(0, DATA.max_last_tokens);
            }

            DATA.last_tokens.unshift({
                D: DATA.token,
                y: DATA.symbol,
                M: DATA.token_name,
            });
            store.set(`${DATA.CHAIN}_last_tokens`, JSON.stringify(DATA.last_tokens));
        }
    } else {
        is_item = true;
    }

    return (is_hidden) => {
        try {
            item.dataset.tokenAddress = item.dataset.tokenAddress.split('/').slice(-1)[0];

            if (item.dataset.tokenAddress && item.dataset.tokenAddress !== 'null') {
                if (!item.dataset.tokenAddress.startsWith('0x')) {
                    item.dataset.tokenAddress = `0x${item.dataset.tokenAddress}`;
                }

                if ((item.dataset.tokenAddress = toChecksumAddress(item.dataset.tokenAddress)) === DATA.ZERO) {
                    return console.debug('!! Bad address:', item.dataset.tokenAddress);
                }

                DATA.token = item.dataset.tokenAddress;

                (async () => {
                    DATA.symbol = await get_symbol(DATA.token).catch((_) => (DATA.token_data.i && DATA.token_data.i.symbol) || 'Token');

                    navigate();

                    document.querySelector('#Chart__Currency .name').innerText = DATA.symbol;
                    document.querySelector('#Swap__OutputCurrency .symbol > div ').innerText = DATA.symbol;
                })();
            }
        } catch (e) {
            return console.debug('!! Bad address:', item.dataset.tokenAddress, e);
        }

        document.querySelectorAll('#ModalTokenOutput .list .item.active').forEach((activeItem) => {
            activeItem.classList.remove('active');
        });

        item.classList.add('active');
        GetTokenImage(DATA.token, undefined, document.querySelector('#Swap__OutputCurrency .image img').id);
        GetTokenImage(DATA.token, undefined, document.querySelector('#Chart__Currency label img.main-token-icon').id);
        GetTokenImage(
            DATA.token_data.r &&
                DATA.token_data.r.length &&
                ((DATA.token === DATA.token_data.r[DATA.token_pair_idx].token0 && DATA.token_data.r[DATA.token_pair_idx].token1) || DATA.token_data.r[DATA.token_pair_idx].token0),
            undefined,
            document.querySelector('#Chart__Currency label img.secondary-token-icon').id
        );
        document.querySelector('#Chart__Currency label img.dex-icon').src =
            (DATA.token_data.r && DATA.token_data.r.length && get_dex_image(DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router])) || DATA.ERROR_IMG;
        document
            .querySelector('#Chart__Currency label img.dex-icon')
            .setAttribute('onerror', `error_img(this, '${(DATA.token_data.r && DATA.token_data.r.length && get_dex_image(DATA.ROUTER_NAMES[DATA.token_data.r[DATA.token_pair_idx].router])) || DATA.ERROR_IMG}')`);

        if (!stop_reload && DATA.view === 'swap') {
            elementify('Root').classList.add('has-token');
            elementify('Root').classList.add('has-connection');

            if (!is_item) {
                handleAction('token');
            } else {
                if (is_hidden !== true) {
                    toggleModal(document.querySelector('#ModalTokenOutput__Footer button'));
                }
                let _item = item.cloneNode();
                _item.dataset.action = 'token';
                _handleAction(_item);
            }
        } else if (DATA.token) {
            elementify('Root').classList.add('has-token');
            elementify('Root').classList.add('has-connection');
        } else {
            elementify('Root').classList.remove('has-token');
            elementify('MobileHelper__Tab1').checked = 'checked';
        }
    };
};

for (let chain_id in DATA.CHAINS) {
    if (DATA.dev_chains[chain_id]) {
        continue;
    }

    DATA.REVERSE_CHAIN_ASSETS_MAP[DATA.CHAINS[chain_id].CHAIN_ASSETS] = DATA.CHAINS[chain_id].CHAIN;
    DATA.REVERSE_CHAIN_ASSETS_PEG_MAP[DATA.CHAINS[chain_id].CHAIN_ASSETS] = DATA.CHAINS[chain_id].WPEG;
}

DATA.server_ip = store.get(`${DATA.CHAIN}_server_ip`);
DATA.wallet_slots_pagination_idx = Number(store.get(`${DATA.CHAIN}_wallet_slots_pagination_idx`)) ?? -1;
DATA.WPEG_PRICE = Big(store.get(`${DATA.CHAIN}_price`) || '0');
DATA.token_price = Big(store.get(`${DATA.CHAIN}_token_price`) || '0');
DATA.NFT_CACHE = JSON.parse(store.get('NFTS') || '{}');
DATA.copy_transactions = JSON.parse(store.get(`${DATA.CHAIN}_copy_transactions`) || '{"0x0000000000000000000000000000000000000000": []}');
DATA.copy_settings = JSON.parse(store.get(`${DATA.CHAIN}_copy_settings`) || '{"0x0000000000000000000000000000000000000000": {}}');
DATA.copy_wallet = JSON.parse(store.get(`${DATA.CHAIN}_copy_wallet`) || '"0x0000000000000000000000000000000000000000"');
DATA.copy_address_transactions = JSON.parse(store.get(`${DATA.CHAIN}_copy_address_transactions`) || '[]');
DATA.token_data = JSON.parse(store.get(`${DATA.CHAIN}_token_data`) || '{}');
DATA.slots = JSON.parse(store.get(`${DATA.CHAIN}_slots`) || '{}');
DATA.slot =
    JSON.parse(store.get(`${DATA.CHAIN}_slot`) || 'null') ||
    (~DATA.wallet_slots_pagination_idx && DATA.slots[DATA.CHAIN] && DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx] && DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx].address) ||
    DATA.ZERO;
DATA.symbols = JSON.parse(store.get(`${DATA.CHAIN}_symbols`) || '{}');
DATA.decimals = JSON.parse(store.get(`${DATA.CHAIN}_decimals`) || '{}');
DATA.ca_name = JSON.parse(store.get(`${DATA.CHAIN}_names`) || '{}');
DATA.positions = JSON.parse(store.get(`${DATA.CHAIN}_pos`) || '{}');
DATA.last_tokens = JSON.parse(store.get(`${DATA.CHAIN}_last_tokens`) || '[]');
DATA.synagogues = JSON.parse(store.get(`${DATA.CHAIN}_synagogues`) || '[]');
DATA.top3 = JSON.parse(store.get(`${DATA.CHAIN}_top3`) || '[]');
DATA.amounts = JSON.parse(store.get('amounts') || '{}');
DATA.rooms = JSON.parse(store.get('rooms') || '["en"]');
DATA.room = JSON.parse(store.get('room') || '"en"');
DATA.view_rank = JSON.parse(JSON.stringify(DATA.conf.rank || {}));
DATA.view_rank_history = JSON.parse(JSON.stringify(DATA.conf.rank_history || {}));
DATA.view_rank_chart_history = JSON.parse(JSON.stringify(DATA.conf.rank_chart_history || {}));
DATA.gas_price = Big(store.get(`${DATA.CHAIN}_gas`) || 5e9);

DATA.token_pair_idx = (DATA.token_data.r && DATA.token_data.r.length && DATA.token_data.r.findIndex((v) => v.address === DATA.pair)) || 0;
DATA.token_pair_idx = (~DATA.token_pair_idx && DATA.token_pair_idx) || 0;

set_chain(true);

DATA.selected_sell_slot = DATA.selected_slot =
    (~DATA.wallet_slots_pagination_idx && DATA.slots[DATA.CHAIN] && DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx] && DATA.slots[DATA.CHAIN][DATA.wallet_slots_pagination_idx].address) || DATA.slot;

window.addEventListener(
    'blue',
    () => {
        DATA.blured = true;
    },
    false
);

window.addEventListener(
    'focus',
    () => {
        DATA.blured = false;

        if (DATA.view === 'copy' && elementify('ModalCopyPositionSettings').classList.contains('d-none')) {
            handleAction('copies');
        }
    },
    false
);
