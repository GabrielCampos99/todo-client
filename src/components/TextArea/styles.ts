import styled, { css } from "styled-components"
import { TextAreaProps } from "./TextArea"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`
export const TextArea = styled.div<Pick<TextAreaProps, "error">>`
  ${({ error }) => css`
    border-radius: 0.4rem;
    border: 0.1rem solid ${error ? "#ff4949" : "#979797"};
    padding: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    textarea {
      width: 100%;
      height: 100%;
      font-size: 1.6rem;
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
  `}
`
