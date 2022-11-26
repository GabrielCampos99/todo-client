import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import * as S from "./styles"

export type ButtonTypesStyle = "cancel" | "submit"

type ButtonTypes = ButtonHTMLAttributes<HTMLElement>

export type ButtonProps = {
  styledType: "cancel" | "submit"
  children?: React.ReactNode
} & ButtonTypes

export const Button = ({ children, styledType, ...props }: ButtonProps) => {
  return (
    <S.Button styledType={styledType} {...props}>
      {children}
    </S.Button>
  )
}
