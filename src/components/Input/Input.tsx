import React, { FormEvent, InputHTMLAttributes } from "react"
import Label from "../Label/Label"
import * as S from "./styles"
type InputProps = {
  label?: string
  stylesWrapper?: React.CSSProperties
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, stylesWrapper, ...props }: InputProps) => {
  return (
    <S.Wrapper style={stylesWrapper}>
      {label && <Label children={label} />}
      <S.Input>
        <input {...props} />
      </S.Input>
    </S.Wrapper>
  )
}
