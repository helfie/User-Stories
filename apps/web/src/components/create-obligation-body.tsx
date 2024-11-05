import { Button, Stack, Input, ModalBody, FormControl, FormLabel } from "@chakra-ui/react"
import { useState } from "react";
import { useCreateObligation } from "../hooks/api/obligations/use-create-obligation";

export const CreateObligationBody = ({ assetId, userAddress, modalBody }: { assetId: number, userAddress: string, modalBody: any }) => {
  const [inputAmount, setInputAmount] = useState(modalBody?.minPurchaseAmount ?? 0);
  const [inputTxCount, setInputLockup] = useState(modalBody?.lockupPeriod ?? 0);

  const createObligationMutation = useCreateObligation()

  return <>
    <ModalBody>
      <Stack spacing={3} w={'100%'}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input placeholder='Amount' value={inputAmount} onChange={(e) => setInputAmount(Number(e.target.value))} />
        </FormControl>
        <FormControl>
          <FormLabel>Tx Count</FormLabel>
          <Input placeholder='Tx Count' value={inputTxCount} onChange={(e) => setInputLockup(Number(e.target.value))} />
        </FormControl>
        <Button colorScheme='blue' onClick={() => {
          createObligationMutation.mutate({
            assetId: assetId,
            userAddress: userAddress,
            amount: inputAmount,
            txCount: inputTxCount
          })
        }}>
          Create Obligation for Asset[{assetId}]
        </Button>
      </Stack>
    </ModalBody>
  </>
}