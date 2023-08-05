import { useEffect, useState } from 'react'
import { Card } from 'uikit/Card'
import { Flex, Box } from 'uikit/Box'
import { Text } from 'rebass'
import Button from 'uikit/Button'
import { Input } from 'uikit/Input'
import { Balance } from 'uikit/Balance'
import { AiOutlineFieldTime } from 'react-icons/ai'
import styled, { useTheme } from 'styled-components'
import TokenPairImage from 'uikit/Image/TokenPairImage'
import TokenImage from 'uikit/Image/TokenImage'
import AutoRenewIcon from 'uikit/Icons/AutoRenew'
import { useAccount, useNetwork, usePrepareContractWrite, useWaitForTransaction, useContractWrite, useBalance } from 'wagmi'
import { usdt } from 'config/token'
import ERC20Abi from 'config/abi/erc20.json'
import { useToast } from 'contexts/ToastsContext/useToast'
import { useDebounce } from 'use-debounce'
import { utils } from 'ethers'
import { formatBigInt } from 'utils/formatBalance'
import AprRowWithToolTip from './AprRowWithToolTip'

const USDT = '/tokens/usdt.png'
const timestamp = new Date().valueOf()

const DOMAIN = [
  {name: "url", type: "string"},
  {name: "time", type: "uint256"},
];

const DATA = [
  {name: "action", type: "string"},
  {name: "user", type: "address"},
];

const TYPES = {
  EIP712Domain: DOMAIN,
  Data: DATA,
}

const DEPOSIT_WALLET = '0x67668dcf335ba40dc14df836a9942b3d47205dec'
const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

function Home() {
  const { toastSuccess, toastError } = useToast()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { colors: { textSecondary, textSubtle }} = useTheme()
  const usdtAddress = usdt[chain?.id || 56]
  const { data: usdtBalance } = useBalance({
    address,
    token: usdtAddress
  })
  const domain: any = {
    url: "https://tothemoon.io/",
    time: Math.floor(timestamp / 1000 / 60 / 60)
  }
  // const { data, isError, isLoading, isSuccess, signTypedData } = useSignTypedData({
  //   domain,
  //   message: {
  //     action: "Deposit",
  //     user: address,
  // },
  //   primaryType: 'Data',
  //   types: TYPES,
  // })
  
  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(amount, 500)

  const { config, error } = usePrepareContractWrite({
    address: usdtAddress,
    abi: ERC20Abi,
    functionName: 'transfer',
    args: [DEPOSIT_WALLET, utils.parseEther(debouncedAmount || '0')],
  })
  const { data, isLoading: isWalletLoading, write: deposit, error: depositWriteError } = useContractWrite(config)
  const { isLoading: isDepositing, status: depositTxStatus, data: depositTx } = useWaitForTransaction({
    hash: data?.hash,
  })
  // console.log({usdtBalance, depositWriteError, error, usdtAddress}, chain?.id)
  useEffect(() => {
    if (depositTxStatus === 'success') {
      toastSuccess('Deposited successfully', depositTx?.blockHash)
    }
    if (depositTxStatus === 'error') {
      toastError('Deposited error', depositTx?.blockHash)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositTxStatus, depositTx])

  return (
    <Flex className="App" justify-content="center">
      <StyledCard>
        <FarmCardInnerContainer>
          <CardHeader justifyContent="space-between">
            <Flex flexDirection="column" alignItems="flex-start">
              <Text fontSize={24} fontWeight='bold' color={textSecondary}>Earn USDT</Text>
              <Text fontSize={14} color={textSubtle}>Stake USDT</Text>
            </Flex>
            <TokenPairImage primarySrc={USDT} secondarySrc={USDT} width={64} height={64} />
          </CardHeader>
          <CardBody>
            <CardRow>
              <AprRowWithToolTip questionTooltip="" />
              <Text fontSize={14} color={textSubtle}>80%</Text>
            </CardRow>
            <CardRow mt="24px">
              <Text fontSize={12} fontWeight='bold' color={textSubtle}>
                USDT&nbsp; 
                <span style={{ color: textSecondary }}>Onchain</span>
              </Text>
              <Flex alignItems="center">
                <Box width="32px"><TokenImage src={USDT} height={24} width={24} /></Box>
                <Balance fontSize={20} fontWeight={600} color={textSubtle} value={Number(formatBigInt(usdtBalance?.value as any || BigInt(0), 3, usdtBalance?.decimals)) || 0} decimals={2} />
              </Flex>
            </CardRow>
            <CardRow mb="16px" mt="24px">
              <Text fontSize={20} fontWeight={600} color={textSubtle}>
                5,000 ~USD
              </Text>
              <Button variant='secondary'>Invest</Button>
            </CardRow>
            <CardRow mb="4px">
              <Text fontSize={12} color={textSubtle}>USDT</Text>
              <Text fontSize={12} color={textSubtle}>Balance: 1,200</Text>
            </CardRow>
            <ForexInputGroup>
              <Input color={textSubtle} onChange={(e) => setAmount(e.target.value)}/>
              <Button
                isLoading={isDepositing || isWalletLoading}
                disabled={!deposit}
                className='btn-action'
                mt="12px"
                variant='primary'
                onClick={() => deposit?.()}
                endIcon={(isDepositing || isWalletLoading) ? spinnerIcon : undefined}
              >
                Deposit
              </Button>
            </ForexInputGroup>
            <Text fontSize={12} color={textSubtle}>{error?.message || depositWriteError?.message}</Text>
            
          </CardBody>
          <CardFooter>
            <CardRow>
              <Text color={textSubtle}>Total balance</Text>
              <Text color={textSubtle}>USDT: 1,200</Text>
            </CardRow>
            <CardRow>
              <Text color={textSubtle}>End in</Text>
              <Text color={textSubtle}>5 days <AiOutlineFieldTime /></Text>
            </CardRow>
          </CardFooter>
        </FarmCardInnerContainer>
      </StyledCard>
    </Flex>
  );
}

export default Home;

const CardBody = styled(Flex)`
  padding: 16px;
  flex-direction: column;
  margin-top: 24px;
`

const CardFooter = styled(Flex)`
  padding: 16px;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

const CardRow = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  align-items: center
`
const CardHeader = styled(Flex)`
  background: linear-gradient(166.77deg,#3b4155,#3a3045);
  border-radius: var(--radii-card) var(--radii-card) 0 0;
  padding: 16px;
`;

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  width: 350px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`

const ForexInputGroup = styled(Flex)`
  position: relative;
  input {
    height: 75px;
    width: 100%;
    background: transparent;
  }
  .btn-action {
    position: absolute;
    margin: auto;
    right: 12px;
    top: 12px;
  }
`