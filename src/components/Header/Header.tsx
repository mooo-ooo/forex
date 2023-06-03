import styled from "styled-components"

function Header() {
  return (
    <header>
      <h2>
        My Header
      </h2>
    </header>
  );
}

const HeaderStyled = styled(Header)`
  position: fixed;
  top: 0;
  width: 100%;
`

export default HeaderStyled
