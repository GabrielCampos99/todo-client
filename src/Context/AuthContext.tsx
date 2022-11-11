import axios from "axios"
import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { routesPath } from "../constants/routes"
import { useAxios } from "../hooks/Axios/useAxios"
import { TToastContext, useToast } from "./ToastContext"
import jwt_decode from "jwt-decode"

type Props = {
  children?: React.ReactNode
}

type UserResponse = {
  token: string
  user: { email: string; name: string }
}

export type ErrorResponse = {
  response: {
    data: {
      message: string
    }
  }
}

export type TAuthContext = {
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: (obj: any) => void
  handleLogout: () => void
}

export const AuthContext = React.createContext<TAuthContext | null>(null)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const { error, response, fetchData } = useAxios<UserResponse, ErrorResponse>()
  const [userIsLoading, setUserIsLoading] = useState(true)

  const navigate = useNavigate()
  const toast = useToast() as TToastContext

  const handleLogin = async (body: any) => {
    console.log(body, "body")
    await fetchData({
      method: "POST",
      url: "/session",
      headers: {
        accept: "*/*",
      },
      data: body,
    })
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem("token")
    axios.defaults.headers.common["Authorization"] = undefined
    navigate(routesPath.singIn)
  }

  useEffect(() => {
    if (!response) return
    localStorage.setItem("token", JSON.stringify(response.token))
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
    navigate(routesPath.tasks)
    setAuthenticated(true)
  }, [response])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      var decoded: any = jwt_decode(token)
      let currentDate = new Date()
      if (decoded.exp * 1000 < currentDate.getTime()) {
        handleLogout()
      } else {
        axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
        navigate(`${routesPath.tasks}`)
        setAuthenticated(true)
      }
    }
    setUserIsLoading(false)
  }, [])

  useEffect(() => {
    if (error?.response.data.message) {
      toast.contextValue.open(`${error.response.data.message}`)
    }
  }, [error])

  if (userIsLoading) {
    return <h1>LOADING</h1>
  }

  return <AuthContext.Provider value={{ handleLogout, authenticated, setAuthenticated, handleLogin }}>{children}</AuthContext.Provider>
}

export default AuthProvider
