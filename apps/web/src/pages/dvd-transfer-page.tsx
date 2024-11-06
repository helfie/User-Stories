import { Button, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Container } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useGetAsset } from "../hooks/api/assets/use-get-asset"
import { UserComponent } from "../components/user-component"
import { HeaderComponent } from "../components/header-component"
import { zeroAddress } from "viem"
import { useGetUser } from "../hooks/api/users/use-get-user"
import { useParams } from "react-router-dom"
import { ExecuteStatus } from "../types"
import { useUpdateDvdTransfer } from "../hooks/api/dvd-transfers/use-update-dvd-transfer"
import { useGetDvdTransfersByUserAndSellerToken } from "../hooks/api/dvd-transfers/use-get-dvd-transfers-by-user-seller-token"

export const DvdTransferPage = () => {
    const { address } = useAccount()
    const { tokenAddress } = useParams()
    const { isLoadingUser, userData } = useGetUser(address?.toString() ?? zeroAddress)
    const { isPendingAsset, assetData } = useGetAsset(tokenAddress?.toString() ?? zeroAddress)
    const { isPendingTransfers, transfersData } = useGetDvdTransfersByUserAndSellerToken(address?.toString() ?? zeroAddress, tokenAddress?.toString() ?? zeroAddress)
    const updateDvdTransfer = useUpdateDvdTransfer();

    return <Container maxW={'8xl'} w={'100%'}>
        <HeaderComponent userData={userData} />
        <UserComponent userData={userData} />

        <TableContainer>
            <Table variant='simple'>
                <TableCaption placement="top">Claim Topics</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric>Nonce</Th>
                        <Th>Buyer</Th>
                        <Th>Buyer Token</Th>
                        <Th>Buyer Amount</Th>
                        <Th>User</Th>
                        <Th>User Token</Th>
                        <Th>User Amount</Th>
                        <Th>Sell</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transfersData?.map((element: any) => {
                        return (
                            <Tr key={`${element?.id}`} justifyContent={'center'}>
                                <Td>{element?.nonce}</Td>
                                <Td>{element?.buyer}</Td>
                                <Td>{element?.buyerToken}</Td>
                                <Td>{element?.buyerAmount}</Td>
                                <Td>{element?.seller}</Td>
                                <Td>{element?.sellerToken}</Td>
                                <Td>{element?.sellerAmount}</Td>
                                <Td>
                                    <Stack direction={'row'}>
                                        <Button colorScheme={"green"} size='sm' isDisabled={element?.status !== ExecuteStatus.Processing} onClick={async () => {
                                            if (element?.status === ExecuteStatus.Processing) {
                                                await updateDvdTransfer.mutateAsync({
                                                    dvdTransferId: element?.id,
                                                    userAddress: address?.toString(),
                                                    verify: true
                                                })
                                            }
                                        }}>
                                            Verify
                                        </Button>
                                        <Button colorScheme={"red"} size='sm' isDisabled={element?.status !== ExecuteStatus.Processing} onClick={async () => {
                                            if (element?.status === ExecuteStatus.Processing) {
                                                await updateDvdTransfer.mutateAsync({
                                                    dvdTransferId: element?.id,
                                                    userAddress: address?.toString(),
                                                    verify: false
                                                })
                                            }
                                        }}>
                                            Unverify
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </Container>
}