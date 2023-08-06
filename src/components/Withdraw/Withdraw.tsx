import { useEffect, useState } from "react";
import { Text } from 'rebass'
import { useAccount, useSignTypedData } from "wagmi";
import styled, { useTheme } from 'styled-components'
import { useToast } from 'contexts/ToastsContext/useToast'
import { Box, Flex } from 'uikit/Box'
import { Input } from 'uikit/Input'
import Button from 'uikit/Button'
import http from 'helpers/http'
import AutoRenewIcon from 'uikit/Icons/AutoRenew'

const timestamp = new Date().valueOf()

const DOMAIN = [
  {name: "url", type: "string"},
  {name: "time", type: "uint256"},
];

const DATA = [
  {name: "action", type: "string"},
  {name: "user", type: "address"},
  {name: "amount", type: "string"}
];

const TYPES = {
  EIP712Domain: DOMAIN,
  Data: DATA,
}

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const Withdraw = () => {
  const { toastSuccess, toastError } = useToast()
  const { address } = useAccount()
  const { colors: { textSecondary, gradientBubblegum, textSubtle }} = useTheme()
  const [amount, setAmount] = useState('')

  const domain: any = {
    url: "https://tothemoon.io/",
    time: Math.floor(timestamp / 1000 / 60 / 60)
  }
  const { data: signature, isLoading, isSuccess, signTypedData, error } = useSignTypedData({
    domain,
    message: {
      action: "WIT",
      user: address,
      amount
  },
    primaryType: 'Data',
    types: TYPES,
  })

  useEffect(() => {
    if (error) {
      toastError((error as any).details)
    }
  }, [error, toastError])

  const withdraw = () => http.post('/v1/user-reward/claim', {
    signature, amount, address
  })

  useEffect(() => {
    if (signature) {
      withdraw()
        .then(() => toastSuccess('Wit done'))
        .catch(err => toastError(err.message))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  console.log({signature, error, isSuccess})

  return (
    <Box>
      <Flex p="12px 24px" background={gradientBubblegum} >
        <Text fontSize={24} fontWeight='bold' color={textSecondary}>Withdraw USDT</Text>
      </Flex>
      <Flex p="24px" flexDirection="column">
        <Text fontSize={14} color={textSubtle}>Enter amount</Text>
        <InputStyled
          color={textSubtle}
          id='amount'
          name='amount'
          type='number'
          placeholder='0'
          onChange={(event) => setAmount(event.target.value)}
        />
        <Button
          mt="24px"
          isLoading={isLoading}
          disabled={Number(amount) < 0}
          className='btn-action'
          variant='primary'
          onClick={() => signTypedData?.()}
          endIcon={(isLoading) ? spinnerIcon : undefined}
        >
          Sign & Withdraw
        </Button>
      </Flex>
    </Box>
  );
};

export default Withdraw

const InputStyled = styled(Input)`
  background-color: transparent;
`