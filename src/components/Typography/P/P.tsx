import { HTMLAttributes } from "react"

type PProps = {
  content: string
} & HTMLAttributes<HTMLHeadingElement>

export const P = ({ content }: PProps) => {
  return <div>{content}</div>
}
