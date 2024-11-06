import { useReadContract } from "wagmi"
import { CTR_ABI } from "../../../abis/ctr.abi"
import { CTR } from "../../../addresses"
import { getTokenClaimTopicName } from "../../../functions"

const CLAIM_TOPICS = [1, 2]

export const useBcGetTokenClaimTopics = () => {
    const result = useReadContract({
        abi: CTR_ABI,
        address: CTR,
        functionName: 'getTokenClaimTopics',
    })
    const resultData: bigint[] = result?.data as bigint[]
    const data = !resultData ? CLAIM_TOPICS : resultData.sort();
    const parsedData = data.map(el => {
        const claimTopic = {
            value: el,
            name: getTokenClaimTopicName(el)
        }
        return claimTopic
    });
    return { tokenClaimTopicsData: parsedData };
}