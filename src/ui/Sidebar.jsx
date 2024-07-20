import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useUser } from "../features/authentication/useUser";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem;
  }
`;
// .continer{
//     width: 750px;}

function Sidebar() {
  const {
    user: { email },
  } = useUser();

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      {email === "r@r.r" && <Uploader />}
    </StyledSidebar>
  );
}

export default Sidebar;
