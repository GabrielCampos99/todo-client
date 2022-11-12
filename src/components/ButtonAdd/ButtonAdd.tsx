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
    background-color: #8687e7;
    border: none;
    outline: none;
    border-radius: 100%;
    width: 6.4rem;
    height: 6.4rem;
    position: absolute;
    bottom: 6.4rem;
    left: 50%;
    transform: translateX(-50%);

    svg {
      height: 2.4rem;
      width: 2.4rem;
    }

    a {
      text-decoration: none;
    }
  `}
`
