import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      @media (max-width: 768px) {
        padding: 0.8rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      @media (max-width: 770px) {
        width: 60rem;
      }
      @media (max-width: 680px) {
        width: 50rem;
      }
      @media (max-width: 590px) {
        width: 40rem;
      }
      @media (max-width: 490px) {
        width: 30rem;
      }
      @media (max-width: 390px) {
        width: 23rem;
      }
    `}
    
  font-size: 1.4rem;
`;
Form.defaultProps = {
  type: "regular",
};
export default Form;
