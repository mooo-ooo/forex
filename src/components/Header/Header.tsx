import styled from "styled-components"

function Header() {
  return (
    <HeaderStyled>
      <h2>
        My Header
      </h2>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
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
  background-color: #27262c;
  border-bottom: 1px solid #383241;
  transform: translate3d(0px, 0px, 0px);
  padding-left: 16px;
  padding-right: 16px;
`

export default Header
