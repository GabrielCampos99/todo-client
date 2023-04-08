import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import styled from "styled-components"

import { CreateUserService } from "../../services/signUp/CreateUserService"

import { TToastContext, useToast } from "../../Context/ToastContext"

import { Header } from "../../components/Header/Header.form"
import { Spinner } from "../../components/Spinner/Spinner"
import { Button } from "../../components/Button/Button"
import { H1 } from "../../components/Typography/H1/H1"
import { Input } from "../../components/Input/Input"
import { routesPath } from "../../constants/routes"

type Props = {}

type SignUpRef = {
  email?: string
  password?: string
  name?: string
}

export const SignUp = (props: Props) => {
  const singUpRef = useRef<SignUpRef>({})
  const toast = useToast() as TToastContext
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleForm = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const value = event.target.value
    singUpRef.current[name] = value
  }

  const handleSignUp = async (body: any) => {
    setIsLoading(true)
    const res = await CreateUserService(body)
    setIsLoading(false)
    if (!res) return toast.contextValue.open(`Erro ao criar Usuario`)
    toast.contextValue.open(`Usuario criado com sucesso`)
    navigate(`${routesPath.singIn}`)

  }

  return (
    <Wrapper>
      {isLoading && <Spinner />}
      <Header path="/sign-in" />
      <H1 style={{ marginTop: "4rem" }}>Cadastro</H1>

      <Input placeholder="Digite seu nome" label="Nome" stylesWrapper={{ marginTop: "2.5rem" }} onChange={(event) => handleForm(event, "name")} />

      <Input placeholder="Digite seu e-mail" label="E-mail" stylesWrapper={{ marginTop: "2.5rem" }} onChange={(event) => handleForm(event, "email")} />

      <Input placeholder="Digite sua senha" label="Senha" stylesWrapper={{ marginTop: "2.5rem" }} type={"password"} onChange={(event) => handleForm(event, "password")} />

      <Button styledType="submit" style={{ marginTop: "7rem" }} onClick={() => handleSignUp(singUpRef.current)}>
        Cadastrar
      </Button>

      <h5>
        Ja tem uma conta?<Link to={"/sign-in"}> Entrar</Link>
      </h5>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
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
