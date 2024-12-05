export const IRS_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "identity",
        "type": "address"
      }
    ],
    "name": "IdentityAlreadyExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "identity",
        "type": "address"
      }
    ],
    "name": "IdentityNotExist",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "IsNotFalse",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "limit",
        "type": "uint256"
      }
    ],
    "name": "MaxIdentityRegistries",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "NotOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "NotTrustedIssuer",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "investorAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint16",
        "name": "country",
        "type": "uint16"
      }
    ],
    "name": "CountryModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IIdentity",
        "name": "oldIdentity",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "contract IIdentity",
        "name": "newIdentity",
        "type": "address"
      }
    ],
    "name": "IdentityModified",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "identityRegistry",
        "type": "address"
      }
    ],
    "name": "IdentityRegistryBound",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "identityRegistry",
        "type": "address"
      }
    ],
    "name": "IdentityRegistryUnbound",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "investorAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "contract IIdentity",
        "name": "identity",
        "type": "address"
      }
    ],
    "name": "IdentityStored",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "investorAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "contract IIdentity",
        "name": "identity",
        "type": "address"
      }
    ],
    "name": "IdentityUnstored",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "caller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "diamond",
        "type": "address"
      }
    ],
    "name": "SetDiamond",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "IRS_VERSION",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      },
      {
        "internalType": "contract IIdentity",
        "name": "_identity",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "_country",
        "type": "uint16"
      }
    ],
    "name": "addIdentityToStorage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_identityRegistry",
        "type": "address"
      }
    ],
    "name": "bindIdentityRegistry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUserClaimTopics",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "irsDiamond",
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
        "name": "diamond",
        "type": "address"
      }
    ],
    "name": "irsInitialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "irsSetDiamond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "linkedIdentityRegistries",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      },
      {
        "internalType": "contract IIdentity",
        "name": "_identity",
        "type": "address"
      }
    ],
    "name": "modifyStoredIdentity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      },
      {
        "internalType": "uint16",
        "name": "_country",
        "type": "uint16"
      }
    ],
    "name": "modifyStoredInvestorCountry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "removeIdentityFromStorage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "storedIdentity",
    "outputs": [
      {
        "internalType": "contract IIdentity",
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
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "storedInvestorCountry",
    "outputs": [
      {
        "internalType": "uint16",
        "name": "",
        "type": "uint16"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
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
        "name": "_identityRegistry",
        "type": "address"
      }
    ],
    "name": "unbindIdentityRegistry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
