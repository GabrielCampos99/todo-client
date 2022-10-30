import React from "react"
import styled from "styled-components"

type LabelProps = {
  children: string
}

const Label = ({ children }: LabelProps) => {
  return <LabelComponent>{children}</LabelComponent>
}

export default Label

export const LabelComponent = styled.label`
  color: #e0e0e0;
  font-size: 1.6rem;
`
