import React from "react"
import Label from "../Label/Label"
import * as S from "./styles"
export type TextAreaProps = {
  stylesWrapper?: React.CSSProperties
  stylesLabel?: React.CSSProperties
  error?: any
  label?: string
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

export const TextArea = ({ error, stylesWrapper, label, stylesLabel, ...rest }: TextAreaProps) => {
  return (
    <S.Wrapper style={stylesWrapper}>
      {label && <Label children={label} stylesLabel={stylesLabel} />}
      <S.TextArea>
        <textarea {...rest} />
      </S.TextArea>
    </S.Wrapper>
  )
}
