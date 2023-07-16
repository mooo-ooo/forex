import React from "react";
import { Outlet } from "react-router-dom";
import Header from 'components/Header'
import Container from './Container'
import styled from "styled-components"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <LayoutStyled>
      <Header />
      <BodyStyled>
        <Outlet />
      </BodyStyled>
    </LayoutStyled>
  );
}

const LayoutStyled = styled.div`
  background: linear-gradient(180deg,#202738 0,#070816 100%);
`

const BodyStyled = styled(Container)`
  margin-top: 57px;
  padding: 24px;
  min-height: 100vh
`

export default Layout
