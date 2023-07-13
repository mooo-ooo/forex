import { Card } from 'uikit/Card'
import { Flex } from 'uikit/Box'
import { Text } from 'rebass'
import styled, { useTheme } from 'styled-components'
import TokenPairImage from 'uikit/Image/TokenPairImage'
import AprRowWithToolTip from './AprRowWithToolTip'

const USDT = '/tokens/usdt.png'
function Home() {
  const theme = useTheme()
  return (
    <div className="App">
      <StyledCard>
        <FarmCardInnerContainer>
          <CardHeader justifyContent="space-between">
            <Flex flexDirection="column" alignItems="flex-start">
              <Text fontSize={24} fontWeight='bold' color={theme.colors.textSecondary}>Earn USDT</Text>
              <Text fontSize={14} color={theme.colors.textSubtle}>Stake USDT</Text>
            </Flex>
            <TokenPairImage primarySrc={USDT} secondarySrc={USDT} width={64} height={64} />
          </CardHeader>
          <Flex p="24px">
            <Flex justifyContent="space-between" width="100%" alignItems="center">
              <AprRowWithToolTip questionTooltip="" />
              <Text fontSize={14} color={theme.colors.textSubtle}>80%</Text>
            </Flex>
          </Flex>
          
        </FarmCardInnerContainer>
      </StyledCard>
    </div>
  );
}

export default Home;

const CardHeader = styled(Flex)`
  background: linear-gradient(166.77deg,#3b4155,#3a3045);
  border-radius: var(--radii-card) var(--radii-card) 0 0;
  padding: 24px;
`;

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`