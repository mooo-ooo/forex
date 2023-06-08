import styled from "styled-components"
import { Flex } from 'uikit/Box'
import Button from "uikit/Button"
import { Text } from 'rebass'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Header() {
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  return (
    <HeaderStyled>
      <Flex width="100%" alignItems="center" justifyContent="space-around">
        <h2>
          My Header
        </h2>
        <div>
          {address ?
            <Flex>
              <Text>Connected to {address}</Text>
              <Button onClick={() => disconnect()} scale="sm">Disconnect</Button>
            </Flex>
            : <Button onClick={() => connect()} scale="sm">Connect</Button>
          }
        </div>
      </Flex>
      
    </HeaderStyled>
  );
}

const HeaderStyled = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: rgb(32, 39, 56);
  border-bottom: 1px solid #383241;
  transform: translate3d(0px, 0px, 0px);
`

export default Header
