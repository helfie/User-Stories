import { keccak256, encodeAbiParameters, parseAbiParameters, Address, SignableMessage, encodePacked } from 'viem'
import { ClaimTopics, ExecuteStatus, TokenClaimTopics } from './types';

export const verifyMessage = (address: string, methodStr: string) => {
    return `You [${address}] are going to sign this message for method [${methodStr}]`
}

export const claimSignature = (
    identityHolder: Address,
    claimTopic: bigint,
    data: `0x${string}`,
): SignableMessage => {
    const sign =
        keccak256(
            encodeAbiParameters(
                parseAbiParameters('address, uint256, bytes'),
                [identityHolder, claimTopic, data],
            ),
        );
    return sign;
};

export const generateClaimId = (
    identityIssuer: Address,
    claimTopic: bigint,
): string => {
    const claimid =
        keccak256(
            encodeAbiParameters(
                parseAbiParameters('address, uint256'),
                [identityIssuer, claimTopic],
            ),
        );
    return claimid;
};

export const getStatusName = (status: ExecuteStatus): string => {
    if (status === ExecuteStatus.PROCESSING) {
        return 'Processing';
    } else if (status === ExecuteStatus.CANCELED) {
        return 'Canceled';
    } else if (status === ExecuteStatus.EXECUTED) {
        return 'Executed';
    } else {
        return 'None';
    }
}

export const generateTransferId = (
    nonce: bigint,
    buyer: string,
    buyerToken: string,
    buyerAmount: bigint,
    seller: string,
    sellerToken: string,
    sellerAmount: bigint): string => {
    return keccak256(
        encodePacked(
            ['uint256', 'address', 'address', 'uint256', 'address', 'address', 'uint256'],
            [
                nonce,
                buyer as Address,
                buyerToken as Address,
                buyerAmount,
                seller as Address,
                sellerToken as Address,
                sellerAmount,
            ]
        )
    )
}

export const getClaimTopicName = (claimTopic: number | bigint): string => {
    if (claimTopic === ClaimTopics.NAMES) {
        return 'Names';
    } else if (claimTopic === ClaimTopics.KYC) {
        return 'KYC';
    } else if (claimTopic === ClaimTopics.AML) {
        return 'AML';
    } else if (claimTopic === ClaimTopics.COMPANY_IDENTITY) {
        return 'Company Identity';
    } else if (claimTopic === ClaimTopics.TRADE_LISENCE) {
        return 'Trade lisence';
    } else if (claimTopic === ClaimTopics.LETTER_OF_CREDIT) {
        return 'Letter of credit';
    } else if (claimTopic === ClaimTopics.ASSAY_REPORT) {
        return 'Assay report';
    } else {
        return 'None';
    }
}

export const getTokenClaimTopicName = (claimTopic: number | bigint): string => {
    if (claimTopic === TokenClaimTopics.GOLD_PURITY) {
        return 'Gold purity';
    } else if (claimTopic === TokenClaimTopics.HOLLOWMARK_ABSENCE) {
        return 'Hollowmark Absence';
    } else {
        return 'None';
    }
}

