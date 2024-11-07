import { useMutation, useQueryClient } from '@tanstack/react-query'
import { env } from '../../../env'
import { useSignMessage } from 'wagmi'
import { verifyMessage } from "../../../functions"
import { parseUnits } from 'viem'

export const useCreateTokenComplianceRequest = () => {
  const queryClient = useQueryClient()
  const { signMessageAsync } = useSignMessage()

  const mutation = useMutation({
    mutationFn: async (
      variables: {
        senderAddress: string | undefined,
        tokenAddress: string | undefined,
        amount: number | undefined,
        decimals: number | undefined
      }) => {
      if (!variables.senderAddress || !variables.tokenAddress || !variables.decimals || !variables.amount) {
        throw new Error("No User")
      }

      const tokenComplSignature = await signMessageAsync({ message: verifyMessage(variables.senderAddress, 'createTokenComplianceRequest') })
      const tokenCompl = await fetch(`${env.VITE_API_URL}/token-compliance-requests/add-token-compliance-request`, {
        method: 'POST',
        body: JSON.stringify({
          tokenAddress: variables.tokenAddress,
          userAddress: variables.senderAddress,
          amount: parseUnits(variables.amount.toString(), variables.decimals),
          signature: tokenComplSignature
        },),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tokenComplianceRequestsTokenUser'] })
    },
  })

  return mutation
}