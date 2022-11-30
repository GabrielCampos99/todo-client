import React, { useContext } from "react"
import { Navigate, Route, RouteProps } from "react-router-dom"
import { routesPath } from "../../constants/routes"
import { AuthContext, TAuthContext } from "../../context/AuthContext"
type PrivateRouteProps = RouteProps

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { authenticated } = React.useContext(AuthContext) as TAuthContext

  if (!authenticated)
    return (
      <>
        <Navigate to={routesPath.singIn} replace={true} />
      </>
    )
  return <>{props.children}</>
}
