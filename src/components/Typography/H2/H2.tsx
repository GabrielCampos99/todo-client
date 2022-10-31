import React, { HTMLAttributes } from "react"
import * as S from "./styles"
export type H2Props = {
  children?: string
  fontSizeCustom?: string
  colorCustom?: string
} & HTMLAttributes<HTMLHeadingElement>

export const H2 = ({ children, fontSizeCustom, colorCustom, ...rest }: H2Props) => {
  return (
    <S.H2Styled fontSizeCustom={fontSizeCustom} colorCustom={colorCustom} {...rest}>
      {children}
    </S.H2Styled>
  )
}
