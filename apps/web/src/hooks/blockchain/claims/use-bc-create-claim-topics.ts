import { usePublicClient, useSignMessage, useWriteContract } from 'wagmi'
import { Address, Hex, keccak256, parseUnits, zeroAddress } from 'viem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IDENTITY_ABI } from '../../../abis/identity.abi'
import { claimSignature } from '../../../functions'
import { CLAIM_DATA, SCHEME } from '../../../constants'
import { env } from '../../../env';

export const useBcCreateClaim = (isToken?: boolean) => {
  const queryClient = useQueryClient()
  const { writeContractAsync } = useWriteContract()
  const { signMessageAsync } = useSignMessage()
  const publicClient = usePublicClient()

  const mutation = useMutation({
    mutationFn: async (
      variables: {
        senderAddress: string | undefined,
        address: string | undefined,
        identityAddress: string | undefined,
        claimTopic: bigint,
      }) => {
      if (!variables.senderAddress || !variables.address || !variables.identityAddress) {
        throw new Error("No Sender")
      }

      try {
        const claimPath = isToken ? 'token-claims' : 'claims';
        const uri = `${env.VITE_API_URL}/${claimPath}/claim/docgen/${variables.senderAddress}/${variables.claimTopic}-${variables.address}`;
        const docData = await (await fetch(uri)).json();
        const data = keccak256(docData as Hex)
        const message = claimSignature(variables.senderAddress as Address, variables.claimTopic, data)
        const signature = await signMessageAsync({ message: message })
        const wc = await writeContractAsync({
          abi: IDENTITY_ABI,
          address: variables.identityAddress as Address,
          functionName: 'addClaim',
          args: [
            variables.claimTopic,
            SCHEME,
            variables.identityAddress as Address,
            signature,
            data,
            uri,
          ],
        })
        await publicClient?.waitForTransactionReceipt({hash: wc})
      } catch (error) {
        console.error(error)
      }
    },
    onSuccess: () => {
      const query = isToken ? 'token-claims' : 'claims'
      queryClient.invalidateQueries({ queryKey: [query] })
    },
  })

  return mutation
}