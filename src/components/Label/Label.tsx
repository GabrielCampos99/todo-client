import React from "react"
import styled from "styled-components"

type LabelProps = {
  children: string
  stylesLabel?: React.CSSProperties
}

const Label = ({ children, stylesLabel }: LabelProps) => {
  return <LabelComponent style={stylesLabel}>{children}</LabelComponent>
}

export default Label

export const LabelComponent = styled.label`
  color: #e0e0e0;
  font-size: 1.6rem;
`
