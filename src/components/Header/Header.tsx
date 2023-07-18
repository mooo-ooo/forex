import styled, { useTheme } from "styled-components"
import Logo from 'uikit/Icons/Logo'
import { Flex } from 'uikit/Box'
import Button from "uikit/Button"
import { UserMenuItemProps } from "./types";
import { FiChevronDown } from 'react-icons/fi'
import { IoWalletOutline } from 'react-icons/io5'
import Container from 'components/Layout/Container'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Header() {
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const theme = useTheme()
  const { disconnect } = useDisconnect()
  const accountEllipsis = address ? `${address.substring(0, 2)}...${address.substring(address.length - 4)}` : undefined;
  return (
    <HeaderStyled>
      <Container width='100%'>
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Logo />
          <div>
            {address ?
              <StyledUserMenu>
                <IoWalletOutline fontSize={24} color={theme.colors.text} />
                <LabelText title={address}>
                  {accountEllipsis}
                </LabelText>
                <FiChevronDown color={theme.colors.text} />
              </StyledUserMenu>
              : <Button onClick={() => connect()} scale="sm">Connect</Button>
            }
          </div>
        </Flex>
      </Container>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.nav`
  position: sticky;
  z-index: 99;
  top: 0;
  width: 100%;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: rgb(32, 39, 56);
  border-bottom: 1px solid #383241;
  transform: translate3d(0px, 0px, 0px);
`

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: 16px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 8px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`;

export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

export const UserMenuItem = styled.button<UserMenuItemProps>`
  align-items: center;
  border: 0;
  background: transparent;
  color: ${({ theme, disabled }) => theme.colors[disabled ? "textDisabled" : "textSubtle"]};
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: space-between;
  outline: 0;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;

  &:is(button) {
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }

  &:active:not(:disabled) {
    opacity: 0.85;
    transform: translateY(1px);
  }
`;

export const UserMenuDivider = styled.hr`
  border-color: ${({ theme }) => theme.colors.cardBorder};
  border-style: solid;
  border-width: 1px 0 0;
  margin: 4px 0;
`;

export default Header
