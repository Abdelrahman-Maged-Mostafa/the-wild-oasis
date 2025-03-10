import styled from "styled-components";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  overflow: hidden;
  padding: 1.2rem 0;
  @media (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0rem;
    padding: 0;
    /* padding-left: 1rem; */
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
export default FormRow;
