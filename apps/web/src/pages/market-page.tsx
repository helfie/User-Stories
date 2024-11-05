import { Button, Checkbox, Input, Stack, Table, Image, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Container, Flex } from "@chakra-ui/react"
import { HeaderComponent } from "../components/header-component"
import { UserComponent } from "../components/user-component"
import { useAccount } from "wagmi"
import { useGetUser } from "../hooks/api/users/use-get-user"
import { useGetObligations } from "../hooks/api/obligations/use-get-obligations"
import { useUpdateObligation } from "../hooks/api/obligations/use-update-obligation"
import { useBcApprove } from "../hooks/blockchain/obligations/use-bc-approve"
import { useBcInitDvdTransfers } from "../hooks/blockchain/dvd-transfers/use-bc-init-dvd-transfers"

export const MarketPage = () => {
    const { address } = useAccount()
    const { isLoadingUser, userData } = useGetUser(address?.toString())
    const { isPendingObligations, obligationsData } = useGetObligations('true', 'false')

    const updateObligation = useUpdateObligation()
    const approve = useBcApprove()
    const initDvdTransfers = useBcInitDvdTransfers()

    return <Container maxW={'8xl'} w={'100%'}>
        <HeaderComponent userData={userData} />
        <UserComponent userData={userData} />

        <TableContainer>
            <Table variant='simple'>
                <TableCaption placement="top">Market Obligations</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Asset</Th>
                        <Th>Seller</Th>
                        <Th>Name</Th>
                        <Th>Symbol</Th>
                        <Th>Amount</Th>
                        <Th>Agree</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {obligationsData?.map((element: any) => {
                        return (
                            <Tr key={`${element?.id}`}>
                                <Td>{element?.asset?.id}</Td>
                                <Td>{element?.userAddress}</Td>
                                <Td>{element?.asset?.name}</Td>
                                <Td>{element?.asset?.symbol}</Td>
                                <Td>{element?.amount}</Td>
                                <Td>
                                    <Button colorScheme='yellow' size='sm' onClick={async () => {
                                        if(userData?.isVerified && element?.userAddress.toLowerCase() !== userData?.userAddress?.toLowerCase()) {
                                            await approve.mutateAsync({userAddress: userData?.userAddress,})
                                            await updateObligation.mutateAsync({
                                                userAddress: userData?.userAddress,
                                                obligationId: element?.id
                                            })
                                            await initDvdTransfers.mutateAsync({
                                                buyer: userData?.userAddress,
                                                buyerToken: UNI_TEST_TOKEN0,
                                                buyerAmount: element?.amount,
                                                seller: element?.seller,
                                                sellerToken: element?.asset.address,
                                                sellerAmount: element?.amount,
                                                txCount: element?.txCount,
                                            })
                                            
                                        }
                                        }} isDisabled={!userData?.isVerified || element?.userAddress.toLowerCase() === userData?.userAddress?.toLowerCase()}>
                                            Buy
                                    </Button>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    </Container>
}