import { useWriteContract } from 'wagmi'
import { IDENTITY_FACTORY } from '../../addresses'
import { ID_FACTORY_ABI } from '../../abis/identity-factory.abi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeployIdentity = () => {
    const queryClient = useQueryClient()
    const { writeContractAsync } = useWriteContract()

    const mutation = useMutation({
        mutationFn: async (
            variables: {
                userAddress: string | undefined
            }) => {
            if (!variables.userAddress) {
                throw new Error("No User")
            }

            try {
                const wc = await writeContractAsync({
                    abi: ID_FACTORY_ABI,
                    address: IDENTITY_FACTORY,
                    functionName: 'createIdentity',
                    args: [
                        variables.userAddress,
                        variables.userAddress,
                    ],
                })
            } catch (error) {
                console.error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userAssets'] })
        },
    })

    return mutation
}