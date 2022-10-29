import { HTMLAttributes } from "react"
import './styles.scss'
type PProps = {
  children?: string
} & HTMLAttributes<HTMLHeadingElement>

export const P = ({ children }: PProps) => {
  return <p>{children}</p>
}
