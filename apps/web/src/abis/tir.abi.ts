export const TIR_ABI = [
  {
    "inputs": [],
    "name": "EmptyArray",
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
        "internalType": "uint8",
        "name": "limit",
        "type": "uint8"
      }
    ],
    "name": "MaxClaimTopics",
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
        "internalType": "uint8",
        "name": "limit",
        "type": "uint8"
      }
    ],
    "name": "MaxTrustedIssuers",
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
    "name": "NotDiamond",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "issuer",
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
        "name": "issuer",
        "type": "address"
      }
    ],
    "name": "TrustedIssuerExists",
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
        "internalType": "contract IClaimIssuer",
        "name": "trustedIssuer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "claimTopics",
        "type": "uint256[]"
      }
    ],
    "name": "ClaimTopicsUpdated",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IClaimIssuer",
        "name": "trustedIssuer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "claimTopics",
        "type": "uint256[]"
      }
    ],
    "name": "TrustedIssuerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "contract IClaimIssuer",
        "name": "trustedIssuer",
        "type": "address"
      }
    ],
    "name": "TrustedIssuerRemoved",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "TIR_VERSION",
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
        "internalType": "contract IClaimIssuer",
        "name": "_trustedIssuer",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "_claimTopics",
        "type": "uint256[]"
      }
    ],
    "name": "addTrustedIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IClaimIssuer",
        "name": "_trustedIssuer",
        "type": "address"
      }
    ],
    "name": "getTrustedIssuerClaimTopics",
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
    "name": "getTrustedIssuers",
    "outputs": [
      {
        "internalType": "contract IClaimIssuer[]",
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
        "internalType": "uint256",
        "name": "claimTopic",
        "type": "uint256"
      }
    ],
    "name": "getTrustedIssuersForClaimTopic",
    "outputs": [
      {
        "internalType": "contract IClaimIssuer[]",
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
        "name": "_issuer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_claimTopic",
        "type": "uint256"
      }
    ],
    "name": "hasClaimTopic",
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
        "name": "_issuer",
        "type": "address"
      }
    ],
    "name": "isTrustedIssuer",
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
        "name": "_issuer",
        "type": "address"
      }
    ],
    "name": "onlyTrustedIssuer",
    "outputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IClaimIssuer",
        "name": "_trustedIssuer",
        "type": "address"
      }
    ],
    "name": "removeTrustedIssuer",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "tirAddOperator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tirDiamond",
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
    "name": "tirInitialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "tirRemoveOperator",
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
    "name": "tirSetDiamond",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IClaimIssuer",
        "name": "_trustedIssuer",
        "type": "address"
      },
      {
        "internalType": "uint256[]",
        "name": "_claimTopics",
        "type": "uint256[]"
      }
    ],
    "name": "updateIssuerClaimTopics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
