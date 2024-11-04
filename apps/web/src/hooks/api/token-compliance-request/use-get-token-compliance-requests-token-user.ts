import { useQuery } from "@tanstack/react-query"
import { env } from "../../../env"

export const useGetTokenComplianceRequestsTokenUser = (tokenAddress: string | undefined, userAddress: string | undefined) => {
    const { isPending, error, data } = useQuery({
        queryKey: ['tokenComplianceRequestsTokenUser', tokenAddress, userAddress],
        queryFn: async () => {
            const res = await fetch(`${env.VITE_API_URL}/token-compliance-requests/${tokenAddress}-${userAddress}`).then((res) => res.json())
            return res;
        }

    })
    return { isPendingRequest: isPending, requestsData: data }
}