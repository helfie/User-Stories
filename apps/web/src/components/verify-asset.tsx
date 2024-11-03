import { Button, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteIdentity } from "../hooks/blockchain/identities/use-bc-delete-identity";
import { useRegisterIdentity } from "../hooks/blockchain/identities/use-bc-register-identity";
import { useVerifyAsset } from "../hooks/api/assets/use-verify-asset";

export function VerifyAsset({ country, isVerified, identityAddress, address, tokenAddress }:
    { country: string, isVerified: boolean, identityAddress: string, address: string, tokenAddress: string }) {
    const [inputCountry, setInputCountry] = useState(country);

    const verifyAsset = useVerifyAsset()

    const registerIdentity = useRegisterIdentity()

    const deleteIdentity = useDeleteIdentity()

    return (
        <Stack direction={"column"}>
            {
                !country || !isVerified
                    ? <Input placeholder='Country' value={inputCountry} onChange={(e) => setInputCountry(e.target.value)} />
                    : <></>
            }
            <Button isDisabled={!identityAddress} colorScheme={isVerified ? 'red' : 'green'} size='sm'
                onClick={async () => {
                    if (identityAddress) {
                        if (isVerified) {
                            await deleteIdentity.mutateAsync({ address: tokenAddress })
                        } else {
                            await registerIdentity.mutateAsync({
                                address: tokenAddress,
                                identityAddress: identityAddress,
                                country: Number(inputCountry),
                            })
                        }
                        await verifyAsset.mutateAsync({
                            senderAddress: address?.toString(),
                            tokenAddress: tokenAddress,
                            country: Number(inputCountry),
                            verify: isVerified ? false : true,
                        })
                    }
                }}>
                {isVerified ? 'Unverify' : 'Verify'}
            </Button>
        </Stack>
    )
}