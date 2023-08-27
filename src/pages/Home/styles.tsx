import styled from 'styled-components'
import { Card } from 'uikit/Card'
import { Flex } from 'uikit/Box'

export const CardBody = styled(Flex)`
  padding: 16px;
  flex-direction: column;
  margin-top: 24px;
`

export const CardFooter = styled(Flex)`
  padding: 16px;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

export const CardRow = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  align-items: center
`
export const CardHeader = styled(Flex)`
  background: linear-gradient(166.77deg,#3b4155,#3a3045);
  border-radius: var(--radii-card) var(--radii-card) 0 0;
  padding: 16px;
`;

export const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  width: 350px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

export const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`

export const ForexInputGroup = styled(Flex)`
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