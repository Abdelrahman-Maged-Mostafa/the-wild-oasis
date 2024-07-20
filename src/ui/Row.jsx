import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  /* margin-right: auto; */
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      @media (max-width: 400px) {
        & > h1 {
          font-size: 20px;
        }
      }
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;
Row.defaultProps = { type: "vertical" };

export default Row;
