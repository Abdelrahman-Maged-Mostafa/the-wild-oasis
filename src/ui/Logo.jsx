import styled from "styled-components";
import { useDarkMode } from "../context/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  @media (max-width: 768px) {
    height: 4.6rem;
  }
`;

function Logo() {
  const { darkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={darkMode ? "/logo-dark.png" : "/logo-light.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
