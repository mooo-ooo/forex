import React from "react";
import Header from 'components/Header'
import styled from "styled-components"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LayoutStyled>
      <Header />
      <BodyStyled>
        {children}
      </BodyStyled>
    </LayoutStyled>
  );
}

const LayoutStyled = styled.div`
  background: linear-gradient(180deg,#202738 0,#070816 100%);
`

const BodyStyled = styled.div`
  min-height: 100vh
`

export default Layout
