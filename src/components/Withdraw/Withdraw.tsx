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
  { name: "url", type: "string" },
  { name: "time", type: "uint256" },
];

const DATA = [
  { name: "request_type", type: "string" },
  { name: "address", type: "address" },
  { name: "value", type: "string" }
];

const TYPES = {
  EIP712Domain: DOMAIN,
  Data: DATA,
}

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const Withdraw = () => {
  const { toastSuccess, toastError } = useToast()
  const { address } = useAccount()
  const { colors: { textSecondary, gradientBubblegum, textSubtle } } = useTheme()
  const [value, setAmount] = useState('')

  const domain: any = {
    url: "tothemoon.io",
    time: Math.floor(timestamp / 1000 / 60 / 60),
    // time: 111
  }
  const { data: signature, isLoading, isSuccess, signTypedData, error } = useSignTypedData({
    domain,
    message: {
      request_type: 'U_WITHDRAWAL',
      address,
      value
    },
    primaryType: 'Data',
    types: TYPES,
  })

  console.log(',,,domain', domain);

  useEffect(() => {
    if (error) {
      toastError((error as any).details)
    }
  }, [error, toastError])

  const withdraw = () => {
    const data = {
      signature,
      payload: {
        request_type: 'U_WITHDRAWAL',
        address,
        value
      }
    };
    console.log(data);
    return http.post('/v1/port/action', data);
  }

  useEffect(() => {
    if (signature) {
      withdraw()
        .then(() => toastSuccess('Wit done'))
        .catch(err => toastError(err.message))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  console.log({ signature, error, isSuccess })

  return (
    <Box>
      <Flex p="12px 24px" background={gradientBubblegum} >
        <Text fontSize={24} fontWeight='bold' color={textSecondary}>Withdraw USDT</Text>
      </Flex>
      <Flex p="24px" flexDirection="column">
        <Text fontSize={14} color={textSubtle}>Enter amount</Text>
        <InputStyled
          color={textSubtle}
          id='value'
          name='value'
          type='number'
          placeholder='0'
          onChange={(event) => setAmount(event.target.value)}
        />
        <Button
          mt="24px"
          isLoading={isLoading}
          disabled={Number(value) < 0}
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