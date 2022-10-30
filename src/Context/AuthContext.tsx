import axios from "axios"
import * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAxios } from "../hooks/Axios/useAxios"

type Props = {
  children?: React.ReactNode
}

type UserResponse = {
  token: string
  user: { email: string; name: string }
}

export type TAuthContext = {
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  handleLogin: (obj: any) => void
  handleLogout: (obj: any) => void
}

export const AuthContext = React.createContext<TAuthContext | null>(null)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const { error, loading, response, fetchData } = useAxios<UserResponse>()
  const [userIsLoading, setUserIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    setUserIsLoading(false)
  }, [])

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

  useEffect(() => {
    if (!response) return
    localStorage.setItem("token", JSON.stringify(response.token))
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`
    setAuthenticated(true)
    navigate("/")
  }, [response])

  function handleLogout() {
    setAuthenticated(false)
    localStorage.removeItem("token")
    axios.defaults.headers.common["Authorization"] = undefined
    navigate("/sign-in")
  }

  if (userIsLoading) {
    return <h1>LOADING</h1>
  }

  return <AuthContext.Provider value={{ handleLogout, authenticated, setAuthenticated, handleLogin }}>{children}</AuthContext.Provider>
}

export default AuthProvider
