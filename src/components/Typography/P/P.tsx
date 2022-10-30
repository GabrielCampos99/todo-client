import { HTMLAttributes } from "react"
import { Link } from "react-router-dom"
import "./styles.scss"
type PProps = {
  children?: string
  redirectTo?: string
} & HTMLAttributes<HTMLHeadingElement>

export const P = ({ children, redirectTo, ...rest }: PProps) => {
  const LinkP = (
    <Link to={redirectTo!}>
      <p {...rest}>{children}</p>
    </Link>
  )

  const P = <p {...rest}>{children}</p>

  return redirectTo ? LinkP : P
}
