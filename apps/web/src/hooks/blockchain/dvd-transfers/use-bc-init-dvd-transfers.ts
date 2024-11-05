import { usePublicClient, useSignMessage, useWriteContract } from 'wagmi'
import { parseUnits, Address } from 'viem'
import { DVD } from '../../../addresses'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DVD_ABI } from 'apps/web/src/abis/dvd.abi'
import { TOKEN_ABI } from 'apps/web/src/abis/token.abi'
import { verifyMessage } from "../../../functions"
import { env } from '../../../env'

export const useBcInitDvdTransfers = () => {
    const queryClient = useQueryClient()
    const { writeContractAsync } = useWriteContract()
    const publicClient = usePublicClient()
    const { signMessageAsync } = useSignMessage()

    const mutation = useMutation({
        mutationFn: async (
          variables: { 
            buyer: string | undefined, 
            buyerToken: string | undefined,
            buyerAmount: number | undefined, 
            seller: string | undefined, 
            sellerToken: string | undefined, 
            sellerAmount: number | undefined,
            txCount: number | undefined, } ) => {
          if(!variables.buyer || !variables.buyerToken || !variables.buyerAmount || !variables.seller || !variables.sellerToken || !variables.sellerAmount || !variables.txCount) {
            throw new Error("No User")
          }
          try {
            const buyerTokenDecimals = await publicClient?.readContract({
                abi: TOKEN_ABI,
                address: variables.buyerToken as Address,
                functionName: 'decimals',
                args: [],
              })

            const sellerTokenDecimals = await publicClient?.readContract({
                abi: TOKEN_ABI,
                address: variables.sellerToken as Address,
                functionName: 'decimals',
                args: [],
            })
            if(!buyerTokenDecimals || !sellerTokenDecimals) {
                throw new Error("No Decimals")
            }

            const buyerTxAmount = parseUnits(variables.buyerAmount.toString(), buyerTokenDecimals)
            const sellerTxAmount = parseUnits(variables.sellerAmount.toString(), sellerTokenDecimals)
            for(let i = 0; i < variables.txCount; i++) {
                const nonce = await publicClient?.readContract({
                    abi: DVD_ABI,
                    address: DVD,
                    functionName: 'getTxNonce',
                    args: [],
                })
                const addDVDTransferSignature = await signMessageAsync({message: verifyMessage(variables.buyer, 'addDVDTransfer')})
                const addDVDTransfer = await fetch(`${env.VITE_API_URL}/dvd-transfers/add-dvd-transfer`, { 
                  method: 'POST', 
                  body: JSON.stringify({
                      nonce: nonce, 
                      buyer: variables.buyer, 
                      buyerToken: variables.buyerToken, 
                      buyerAmount: buyerTxAmount, 
                      seller: variables.buyerToken, 
                      sellerToken: variables.sellerToken, 
                      sellerAmount: sellerTxAmount, 
                      signature: addDVDTransferSignature,},),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then((res) => res.json())
                
                const wc = await writeContractAsync({
                    abi: DVD_ABI,
                    address: DVD,
                    functionName: 'initiateDVDTransfer',
                    args: [
                        variables.buyerToken as Address,
                        buyerTxAmount,
                        variables.seller as Address,
                        variables.sellerToken as Address,
                        sellerTxAmount
                    ],
                })
                await publicClient?.waitForTransactionReceipt({hash: wc})    
            }
          } catch (error) {
            console.error(error)
            throw error
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['dvdTransfersUser'] })
        },
      })
    
    return mutation
}