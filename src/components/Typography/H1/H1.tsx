import React, { HTMLAttributes } from "react"
import './styles.scss'
type H1Props = {
  content: string
} & HTMLAttributes<HTMLHeadingElement>

export const H1 = ({content, ...rest}: H1Props) => {
  return <h1 {...rest}>content</h1>
}
