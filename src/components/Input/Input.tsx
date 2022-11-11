import React, { InputHTMLAttributes } from "react"
import Label from "../Label/Label"
import { P } from "../Typography/P/P"
import * as S from "./styles"
export type InputProps = {
  label?: string
  stylesWrapper?: React.CSSProperties
  stylesLabel?: React.CSSProperties
  icon?: React.ReactNode
  error?: any
} & InputHTMLAttributes<HTMLInputElement>

export const Input = ({ label, stylesWrapper, icon,stylesLabel, error, ...props }: InputProps) => {
  return (
    <S.Wrapper style={stylesWrapper} >
      {label && <Label children={label} stylesLabel={stylesLabel}/>}
      <S.Input error={error}>
        {icon && icon}
        <input {...props} />
      </S.Input>
      {error && <P style={{color: '#ff4949'}}>Opss... Algo de errado por aqui</P>}
    </S.Wrapper>
  )
}
