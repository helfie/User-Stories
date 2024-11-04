import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Container, Stack } from "@chakra-ui/react"
import { UserComponent } from "../components/user-component"
import { useGetUser } from "../hooks/api/users/use-get-user"
import { useAccount } from "wagmi"
import { HeaderComponent } from "../components/header-component"
import { useGetTokenComplianceRequestsAdmin } from "../hooks/api/token-compliance-request/use-get-token-compliance-requests-admin"
import { useVerifyTokenComplianceRequest } from "../hooks/api/token-compliance-request/use-verify-token-compliance-request"
import { ExecuteStatus } from "../types"

export const AdminClaimPage = () => {
    const { address } = useAccount()
    const { isLoadingUser, userData } = useGetUser(address?.toString())
    const { isPendingRequest, requestsData } = useGetTokenComplianceRequestsAdmin()

    const verifyTokenComplianceRequest = useVerifyTokenComplianceRequest()

    return <Container maxW={'8xl'} w={'100%'}>
        <HeaderComponent userData={userData} />
        <UserComponent userData={userData} />

        {
            userData?.isAdmin ?
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption placement="top">Claim Topics</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Token</Th>
                                <Th>User</Th>
                                <Th>Limit Transfer Amount</Th>
                                <Th>Verify</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requestsData?.map((element: any) => {
                                return (
                                    <Tr key={`${element?.id}`}>
                                        <Td>{element?.tokenAddress}</Td>
                                        <Td>{element?.userAddress}</Td>
                                        <Td>{element?.maxTransferAmount}</Td>
                                        <Td>
                                            <Stack direction={'row'}>
                                                <Button colorScheme={"green"} size='sm' isDisabled={element?.status !== ExecuteStatus.Processing} onClick={async () => {
                                                    if (element?.status === ExecuteStatus.Processing) {
                                                        await verifyTokenComplianceRequest.mutateAsync({
                                                            senderAddress: address?.toString(),
                                                            tokenAddress: element?.tokenAddress,
                                                            userAddress: element?.userAddress,
                                                            verify: true
                                                        })
                                                    }
                                                }}>
                                                    Verify
                                                </Button>
                                                <Button colorScheme={"red"} size='sm' isDisabled={element?.status !== ExecuteStatus.Processing} onClick={async () => {
                                                    if (element?.status === ExecuteStatus.Processing) {
                                                        await verifyTokenComplianceRequest.mutateAsync({
                                                            senderAddress: address?.toString(),
                                                            tokenAddress: element?.tokenAddress,
                                                            userAddress: element?.userAddress,
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
                : <></>
        }
    </Container>
}