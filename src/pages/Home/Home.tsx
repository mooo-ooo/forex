import { useMemo } from 'react'
import { Card } from 'uikit/Card'
import { Flex } from 'uikit/Box'
import { Text } from 'rebass'
import Button from 'uikit/Button'
import { Input } from 'uikit/Input'
import { AiOutlineFieldTime } from 'react-icons/ai'
import styled, { useTheme } from 'styled-components'
import TokenPairImage from 'uikit/Image/TokenPairImage'
import { useAccount, useSignTypedData } from 'wagmi'
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
function Home() {
  const { address } = useAccount()
  const { colors: { textSecondary, textSubtle }} = useTheme()
  const domain: any = {
    url: "https://tothemoon.io/",
    time: timestamp
  }
  const { data, isError, isLoading, isSuccess, signTypedData } = useSignTypedData({
    domain,
    message: {
      action: "Deposit",
      user: address,
  },
    primaryType: 'Data',
    types: TYPES,
  })

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
                <span style={{ color: textSecondary }}>EARNED</span>
              </Text>
            </CardRow>
            <CardRow mb="16px">
              <Text fontSize={20} fontWeight={600} color={textSubtle}>
                5,000 ~USD
              </Text>
              <Button variant='secondary'>Compound</Button>
            </CardRow>
            <CardRow mb="4px">
              <Text fontSize={12} color={textSubtle}>USDT</Text>
              <Text fontSize={12} color={textSubtle}>Balance: 1,200</Text>
            </CardRow>
            <Input color={textSubtle} />
            <Button mt="12px" variant='primary' onClick={() => signTypedData()}>Deposit</Button>
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