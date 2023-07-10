import { Card } from 'uikit/Card'
import { Flex } from 'uikit/Box'
import styled from 'styled-components'

function Home() {
  return (
    <div className="App">
      <StyledCard>
        <FarmCardInnerContainer>
          test
        </FarmCardInnerContainer>
      </StyledCard>
    </div>
  );
}

export default Home;

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
  padding: 24px;
`