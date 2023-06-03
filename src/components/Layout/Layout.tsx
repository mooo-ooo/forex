import React from "react";
import Header from 'components/Header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>
  );
}

export default Layout
