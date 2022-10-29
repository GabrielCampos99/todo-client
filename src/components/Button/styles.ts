import styled, { css } from "styled-components"
import { ButtonProps } from "./Button"

const wrapperModifiers = {
  submit: () => css`
    background-color: #8875ff;
    color: #ffffff;
  `,

  cancel: () => css`
    background-color: transparent;
    color: #7a7a7a;
  `,
}

export const Button = styled.div<Pick<ButtonProps, "styledType">>`
  ${({ styledType }) => css`
    padding: 1.2rem 2.4rem;
    outline: none;
    border: none;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    font-family: "Lato";
    cursor: pointer;

    ${!!styledType && wrapperModifiers[styledType]()}
  `}
`
