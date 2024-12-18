import { Button, Checkbox, Input, Stack, Table, Image, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Container, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { env } from "../env";
import { verifyMessage } from "../functions";
import { useAccount, useSignMessage } from "wagmi";

export const HeaderImage = ({ claimTopic, data }: { claimTopic: number, data: string }) => {
    const { address } = useAccount()
    const { signMessageAsync } = useSignMessage()

    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    if(!address) {
        throw new Error("No User"); 
    }

    useEffect(() => {
        let isMounted = true;
        let objectUrl = '';

        const fetchImage = async () => {
            try {
                const getDocgenSignature = await signMessageAsync({ message: verifyMessage(address, 'getDocgen'), account: address })
                const response = await fetch(`${env.VITE_API_URL}/claims/claim/docgen/${address}/${address}-${claimTopic}?data=${data}`, {
                    headers: {
                        'signature': getDocgenSignature
                    },
                });

                if (!response.ok) {
                    throw new Error(await response.text());
                }

                const blob = await response.blob();
                objectUrl = URL.createObjectURL(blob);

                if (isMounted) {
                    setImageUrl(objectUrl);
                    setError('');
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message);
                }
                console.error('Error fetching image:', err);
            }
        };

        fetchImage();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [address, claimTopic, data]);

    if (error) {
        return <Stack>Error loading image: {error}</Stack>;
    }

    if (!imageUrl) {
        return <Stack>Loading image...</Stack>;
    }

    return <Image src={imageUrl} alt='Doc' boxSize='75px' />;
}
