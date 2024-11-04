import { toBytes, keccak256, encodeAbiParameters, parseAbiParameters, Address, SignableMessage } from 'viem'
import { ExecuteStatus } from './types';

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
    if(status === ExecuteStatus.Processing) {
        return 'Processing';
    } else if(status === ExecuteStatus.Canceled) {
        return 'Canceled';
    } else if(status === ExecuteStatus.Executed) {
        return 'Executed';
    } else {
        return 'None';
    }
}