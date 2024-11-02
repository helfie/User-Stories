import { useReadContract } from "wagmi"
import { CTR_ABI } from "../../../abis/ctr.abi"
import { CTR } from "../../../addresses"

const CLAIM_TOPICS = [1, 2]

export const useGetClaimTopics = () => {
    const result = useReadContract({
        abi: CTR_ABI,
        address: CTR,
        functionName: 'getClaimTopics',
    })
    const resultData: bigint[] = result?.data as bigint[]
    if(!resultData) {
        return {claimTopicsData: CLAIM_TOPICS}    
    } else {
        const resultParsed = resultData.sort().map((el:any) => el.toString())
        return {claimTopicsData: resultParsed}    
    }
}