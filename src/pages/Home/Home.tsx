import { useEffect, useState, useMemo } from 'react'
import BigNumber from "bignumber.js";
import { Flex, Box } from 'uikit/Box'
import { Text } from 'rebass'
import Button from 'uikit/Button'
import { Input } from 'uikit/Input'
import { Balance } from 'uikit/Balance'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { useTheme } from 'styled-components'
import LineChart from 'uikit/LineChart/LineChart';
import TokenPairImage from 'uikit/Image/TokenPairImage'
import TokenImage from 'uikit/Image/TokenImage'
import AutoRenewIcon from 'uikit/Icons/AutoRenew'
import CalculateIcon from 'uikit/Icons/Calculate'
import { useAccount, useNetwork, usePrepareContractWrite, useWaitForTransaction, useContractWrite, useBalance } from 'wagmi'
import { usdt } from 'config/token'
import {
  StyledCard,
  CardFooter,
  CardBody,
  CardRow,
  CardHeader,
  FarmCardInnerContainer,
  ForexInputGroup
} from './styles'
import { useChartData } from './hook'
import ERC20Abi from 'config/abi/erc20.json'
import { useToast } from 'contexts/ToastsContext/useToast'
import { useDebounce } from 'use-debounce'
import { parseEther } from 'viem'
import { RoiCalculator } from 'uikit/RoiCalculatorModal/'
import { formatBigInt, isNumeric } from 'utils/formatBalance'
import AprRowWithToolTip from './AprRowWithToolTip'

const USDT = '/tokens/usdt.png'

const DEPOSIT_WALLET = '0x67668dcf335ba40dc14df836a9942b3d47205dec'
const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const LOT_AMOUNT = 775

function Home() {
  const [swapPerLot, setSwapPerLot] = useState(2)
  const { toastSuccess, toastError } = useToast()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { colors: { textSecondary, textSubtle }} = useTheme()
  const usdtAddress = usdt[chain?.id || 56]
  const { data: usdtBalance } = useBalance({
    address,
    token: usdtAddress,
    watch: true
  })
  
  const [amount, setAmount] = useState('')
  const [debouncedAmount] = useDebounce(isNumeric(amount) ? amount : '0' , 500)

  const apr = useMemo(() => swapPerLot / LOT_AMOUNT * 365 * 100, [swapPerLot])

  const { config, error } = usePrepareContractWrite({
    address: usdtAddress,
    abi: ERC20Abi,
    functionName: 'transfer',
    args: [DEPOSIT_WALLET, parseEther(debouncedAmount as `${number}`)],
  })
  const { data, isLoading: isWalletLoading, write: deposit, error: depositWriteError } = useContractWrite(config)
  const { isLoading: isDepositing, status: depositTxStatus, data: depositTx } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    if (depositTxStatus === 'success') {
      toastSuccess('Deposited successfully', depositTx?.blockHash)
    }
    if (depositTxStatus === 'error') {
      toastError('Deposited error', depositTx?.blockHash)
    }
  }, [depositTxStatus, depositTx, toastError, toastSuccess])

  useEffect(() => {
    if (depositWriteError) {
      console.log({depositWriteError})
      toastError('Deposited error', (depositWriteError as any)?.details)
    }
  }, [depositWriteError, toastError])

  const onChainBalanceDec = Number(formatBigInt(usdtBalance?.value as any || BigInt(0), 3, usdtBalance?.decimals))

  const charts = useChartData({
    amount: 10000,
    apr,
    compoundEvery: 7
  })

  console.log({
    charts,
    apr
  })

  return (
    <Flex className="App" justify-content="center" flexDirection="column">
      <LineChart
        data={charts}
        color='#9A6AFF'
        minHeight={340}
        value={5}
        label='test'
        // setValue={setLatestValue}
        // setLabel={setValueLabel}
      />
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
              <Text fontSize={14} color={textSubtle}>{apr}%</Text>
            </CardRow>
            <CardRow mt="24px">
              <Text fontSize={12} fontWeight='bold' color={textSubtle}>
                USDT&nbsp; 
                <span style={{ color: textSecondary }}>Onchain</span>
              </Text>
              <Flex alignItems="center">
                <Box width="32px"><TokenImage src={USDT} height={24} width={24} /></Box>
                <Balance fontSize={20} fontWeight={600} color={textSubtle} value={onChainBalanceDec || 0} decimals={2} />
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
              <Input color={textSubtle} type="number" onChange={(e) => setAmount(e.target.value)}/>
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
            <Text fontSize={12} color={textSubtle}>{error?.message}</Text>
            
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
      <StyledCard>
        <FarmCardInnerContainer>
          <CardHeader justifyContent="space-between">
            <Flex justifyContent="space-between" width="100%">
              <Text fontSize={24} fontWeight='bold' color={textSecondary}>ROI Calculator</Text>
              <CalculateIcon height={32} width={32} />
            </Flex>
            
          </CardHeader>
          <CardBody>
            <RoiCalculator
              account={address as string}
              earningTokenPrice={1}
              apr={apr}
              linkLabel="USDT Contract"
              linkHref="https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955#code"
              stakingTokenBalance={new BigNumber(onChainBalanceDec)}
              stakingTokenDecimals={2}
              stakingTokenSymbol="USDT"
              stakingTokenPrice={1}
              earningTokenSymbol="USDT"
            />
          </CardBody>
        </FarmCardInnerContainer>
      </StyledCard>
      
    </Flex>
  );
}

export default Home;
