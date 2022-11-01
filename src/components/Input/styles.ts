import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`
export const Input = styled.div`
  border-radius: 0.4rem;
  border: 0.1rem solid #979797;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  input {
    font-size: 1.6rem;
    -webkit-appearance: none;
    box-shadow: none !important;
    width: 100%;
    outline: none;
    background-color: transparent;
    border-color: transparent;
    color: #ffffff;
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #535353;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #535353;
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #535353;
    }
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  a {
    text-decoration: none;
  }
`
