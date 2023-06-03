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
  background: radial-gradient(103.12%50%at 50%50%,#21193a 0%,#191326 100%);
`

const BodyStyled = styled.div`
  min-height: 100vh
`

export default Layout
