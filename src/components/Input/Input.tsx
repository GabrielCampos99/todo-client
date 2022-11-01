import React, { FormEvent, InputHTMLAttributes } from "react"
import Label from "../Label/Label"
import * as S from "./styles"
type InputProps = {
  label?: string
  stylesWrapper?: React.CSSProperties
  icon?: React.ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, stylesWrapper, icon, ...props }: InputProps) => {
  return (
    <S.Wrapper style={stylesWrapper}>
      {label && <Label children={label} />}
      <S.Input>
        {icon && icon}
        <input {...props} />
      </S.Input>
    </S.Wrapper>
  )
}
