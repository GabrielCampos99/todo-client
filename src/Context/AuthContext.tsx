import axios from "axios"
import * as React from "react"
import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { routesPath } from "../constants/routes"
import { TToastContext, useToast } from "./ToastContext"
import { CreateSessionService } from "../services/signIn/CreateSessionService"

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
  isLoading: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: (obj: any) => void
  handleLogout: () => void
}

export const AuthContext = React.createContext<TAuthContext | null>(null)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [userSession, setUserSession] = useState<UserResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const toast = useToast() as TToastContext

  const handleLogin = async (body: any) => {
    console.log(body, "body")
    setIsLoading(true)
    const res = await CreateSessionService(body)
    setIsLoading(false)
    if (!res) return toast.contextValue.open(`Erro ao criar sessão`)
    setUserSession(res.data)
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem("token")
    axios.defaults.headers.common["Authorization"] = undefined
    navigate(routesPath.singIn)
  }

  useEffect(() => {
    if (!userSession) return
    localStorage.setItem("token", JSON.stringify(userSession.token))
    axios.defaults.headers.common["Authorization"] = `Bearer ${userSession.token}`
    navigate(routesPath.tasks)
    setAuthenticated(true)
  }, [userSession])

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
    setIsLoading(false)
  }, [])

  return <AuthContext.Provider value={{ handleLogout, authenticated, setAuthenticated, handleLogin, isLoading }}>{children}</AuthContext.Provider>
}

export default AuthProvider
