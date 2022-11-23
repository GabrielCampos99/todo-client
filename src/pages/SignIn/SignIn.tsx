import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../components/Button/Button"
import { Header } from "../../components/Header/Header.form"
import { Input } from "../../components/Input/Input"
import { H1 } from "../../components/Typography/H1/H1"
import { AuthContext, TAuthContext } from "../../Context/AuthContext"

type LoginRef = {
  email: string
  password: string
}
type Props = {}

export const SignIn = (props: Props) => {
  const loginRef = useRef<LoginRef>({ email: "", password: "" })
  const [error, setError] = useState<string[]>([])
  const { handleLogin } = React.useContext(AuthContext) as TAuthContext

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>, name: "email" | "password") => {
    const value = event.target.value
    loginRef.current[name] = value
    console.log(loginRef.current, "loginRef.current")
  }

  const handleCanSubmit = (loginData: React.MutableRefObject<LoginRef>) => {
    const emailTest = /\S+@\S+\.\S+/.test(loginData.current.email)
    const passLenght = loginData.current.password.length >= 4
    const errors: string[] = []
    console.log(passLenght, "passLenght")
    console.log(emailTest, "emailTest")

    if (!passLenght) {
      setError((oldState) => [...oldState, "password"])
      errors.push("password")
    }
    if (!emailTest) {
      setError((oldState) => [...oldState, "email"])
      errors.push("email")
    }

    console.log(errors, 'errrerere')

    if (errors.length > 0) return

    setError([])
    handleLogin(loginData.current)
  }

  return (
    <FormWrapper>
      <Header path="/" />
      <H1 style={{ marginTop: "4rem" }}>Login</H1>
      <Input placeholder="Digite seu e-mail" label="E-mail" type={"email"} stylesWrapper={{ marginTop: "5.4rem" }} onChange={(event) => handleForm(event, "email")} error={error.find((error) => error === "email")} />

      <Input placeholder="Digite sua senha" label="Senha" stylesWrapper={{ marginTop: "2.5rem" }} type={"password"} onChange={(event) => handleForm(event, "password")} error={error.find((error) => error === "password")} />

      <Button styledType="submit" style={{ marginTop: "7rem" }} onClick={() => handleCanSubmit(loginRef)}>
        Login
      </Button>

      <h5>
        Não tem uma conta?<Link to={"/sign-up"}> Registre-se</Link>
      </h5>
    </FormWrapper>
  )
}

export const FormWrapper = styled.div`
  padding: 1.4rem 2.4rem;
  display: flex;
  flex-direction: column;
  max-width: 108rem;
  margin: 0 auto;
  > h5 {
    margin-top: 4.5rem;
    text-align: center;
    color: #979797;
    font-size: 1.4rem;

    > a {
      color: #ffffff;
      text-decoration: none;
    }
  }
`
