import { useReadContract } from "wagmi"
import { CTR_ABI } from "../../../abis/ctr.abi"
import { DIAMOND } from "../../../addresses"
import { getTokenClaimTopicName } from "../../../functions"
import { TOKEN_CLAIM_TOPICS } from "../../../constants"

export const useBcGetTokenClaimTopics = () => {
    const result = useReadContract({
        abi: CTR_ABI,
        address: DIAMOND,
        functionName: 'getTokenClaimTopics',
    })
    const resultData: bigint[] = result?.data as bigint[]
    const data = !resultData ? TOKEN_CLAIM_TOPICS : resultData.sort();
    const parsedData = data.map(el => {
        const claimTopic = {
            value: el,
            name: getTokenClaimTopicName(el)
        }
        return claimTopic
    });
    return { tokenClaimTopicsData: parsedData };
}