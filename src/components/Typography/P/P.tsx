import { HTMLAttributes } from "react"

type PProps = {
  children?: string
} & HTMLAttributes<HTMLHeadingElement>

export const P = ({ children }: PProps) => {
  return <div>{children}</div>
}
