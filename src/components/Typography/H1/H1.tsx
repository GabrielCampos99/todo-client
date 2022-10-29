import React, { HTMLAttributes } from "react"
import './styles.scss'
type H1Props = {
  children?: string
} & HTMLAttributes<HTMLHeadingElement>

export const H1 = ({children, ...rest}: H1Props) => {
  return <h1 {...rest}>{children}</h1>
}
