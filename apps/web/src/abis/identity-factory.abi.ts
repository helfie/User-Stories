import { Abi } from "viem";

export const ID_FACTORY_ABI: Abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "Deployed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "factory",
                "type": "address"
            }
        ],
        "name": "TokenFactoryAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "factory",
                "type": "address"
            }
        ],
        "name": "TokenFactoryRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "identity",
                "type": "address"
            }
        ],
        "name": "TokenLinked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "identity",
                "type": "address"
            }
        ],
        "name": "WalletLinked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "identity",
                "type": "address"
            }
        ],
        "name": "WalletUnlinked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            }
        ],
        "name": "addTokenFactory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_wallet",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_salt",
                "type": "string"
            }
        ],
        "name": "createIdentity",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_wallet",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_salt",
                "type": "string"
            },
            {
                "internalType": "bytes32[]",
                "name": "_managementKeys",
                "type": "bytes32[]"
            }
        ],
        "name": "createIdentityWithManagementKeys",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_tokenOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_salt",
                "type": "string"
            }
        ],
        "name": "createTokenIdentity",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_wallet",
                "type": "address"
            }
        ],
        "name": "getIdentity",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_identity",
                "type": "address"
            }
        ],
        "name": "getToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_identity",
                "type": "address"
            }
        ],
        "name": "getWallets",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "implementationAuthority",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_salt",
                "type": "string"
            }
        ],
        "name": "isSaltTaken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            }
        ],
        "name": "isTokenFactory",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newWallet",
                "type": "address"
            }
        ],
        "name": "linkWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            }
        ],
        "name": "removeTokenFactory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_oldWallet",
                "type": "address"
            }
        ],
        "name": "unlinkWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]