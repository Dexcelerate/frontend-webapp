const ABI = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
        ],
        name: 'getAmountsOut',
        outputs: [
            {
                internalType: 'uint256[]',
                name: 'amounts',
                type: 'uint256[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxTotalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'balances',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'decimals',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'token0',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'token1',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
        ],
        name: 'allowance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'helpers',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'affiliate',
                type: 'uint256',
            },
        ],
        name: 'slot',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'getUserBalance',
        outputs: [
            {
                internalType: 'uint256',
                balance: 'tokenId',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sell_fee',
                type: 'uint256',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'tokenURI',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256[]',
                name: 'tokenIds',
                type: 'uint256[]',
            },
        ],
        name: 'reduce',
        outputs: [
            {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'tokenDiscounts',
        outputs: [
            {
                internalType: 'uint256',
                name: '_fixed',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'limit',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'expiry',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'once',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'percent',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'min_quantity',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address[]',
                name: 'routers',
                type: 'address[]',
            },
            {
                internalType: 'address[][]',
                name: 'paths',
                type: 'address[][]',
            },
            {
                internalType: 'uint256[]',
                name: 'maxFees',
                type: 'uint256[]',
            },
            {
                internalType: 'uint256',
                name: 'server_fee_tokenId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'server_fee',
                type: 'uint256',
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'balance',
                type: 'uint256',
            },
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUserPlan',
        outputs: [
            {
                internalType: 'uint256',
                name: 'plan',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'pool',
                type: 'address',
            },
        ],
        name: 'PLAN_LIMIT',
        outputs: [
            {
                internalType: 'uint256',
                name: 'limit',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'pool',
                type: 'address',
            },
        ],
        name: 'PLAN_LEFT',
        outputs: [
            {
                internalType: 'uint256',
                name: 'left',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'pool',
                type: 'address',
            },
        ],
        name: 'PLAN',
        outputs: [
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'user',
                type: 'address',
            },
        ],
        name: 'getUser',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'last_payment',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'affiliate',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'no_fee',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'avatar',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'plan',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'sell_fee',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'addr',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'pool',
                        type: 'address',
                    },
                    {
                        internalType: 'address',
                        name: 'router',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256[]',
                        name: 'avatars',
                        type: 'uint256[]',
                    },
                    {
                        internalType: 'address[]',
                        name: 'path',
                        type: 'address[]',
                    },
                    {
                        internalType: 'bool',
                        name: 'safe',
                        type: 'bool',
                    },
                    {
                        internalType: 'bool',
                        name: 'stop',
                        type: 'bool',
                    },
                    {
                        internalType: 'bool',
                        name: 'exists',
                        type: 'bool',
                    },
                ],
                internalType: 'struct Slots',
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'affiliate',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'helpers',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sell_fee',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'safe',
                type: 'bool',
            },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'form',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'tranferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'form',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'affiliate',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'helpers',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'sell_fee',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'pool',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'safe',
                type: 'bool',
            },
        ],
        name: 'subscribe',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'userTokenId',
                type: 'uint256',
            },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'limit',
                type: 'uint256',
            },
            {
                internalType: 'bool',
                name: 'auto_renew',
                type: 'bool',
            },
            {
                internalType: 'uint256[]',
                name: 'tokenIds',
                type: 'uint256[]',
            },
        ],
        name: 'setPlan',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'new_ca',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'token',
                type: 'address',
            },
        ],
        name: 'migrateTo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'new_ca',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'tokens',
                type: 'address[]',
            },
            {
                internalType: 'bool',
                name: 'is_final',
                type: 'bool',
            },
        ],
        name: 'migrateTo',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'maxFee',
                type: 'uint256',
            },
        ],
        name: 'buySell',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'maxFee',
                type: 'uint256',
            },
        ],
        name: 'checkBuy',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'maxFee',
                type: 'uint256',
            },
        ],
        name: 'sell',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amountIn',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'router',
                type: 'address',
            },
            {
                internalType: 'address[]',
                name: 'path',
                type: 'address[]',
            },
            {
                internalType: 'uint256',
                name: 'maxFee',
                type: 'uint256',
            },
        ],
        name: 'trade',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
];
