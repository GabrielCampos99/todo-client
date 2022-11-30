import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import styled, { css } from "styled-components"
import { HiOutlinePlus } from "react-icons/hi"

type ButtonAddProps = {
  icon?: React.ReactNode
} & ButtonTypes

type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement>

const ButtonAdd = ({ icon = <HiOutlinePlus color="white" />, ...rest }: ButtonAddProps) => {
  return <Button {...rest}>{icon}</Button>
}

export default ButtonAdd

export const Button = styled.button<ButtonTypes>`
  ${({}) => css`
    cursor: pointer;
    margin: 0 auto;
    background-color: #8687e7;
    border: none;
    outline: none;
    border-radius: 100%;
    width: 6.4rem;
    height: 6.4rem;
    bottom: 4.4rem;

    &:hover {
      scale: 1.1;
      transition: 0.25s ease;
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
