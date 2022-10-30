import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../components/Button/Button"
import { HeaderForm } from "../../components/Header/Header.form"
import { Input } from "../../components/Input/Input"
import { H1 } from "../../components/Typography/H1/H1"

type Props = {}

export const SignIn = (props: Props) => {
  return (
    <Wrapper>
      <HeaderForm path="/" />
      <H1 style={{ marginTop: "4rem" }}>Login</H1>
      <Input placeholder="Digite seu e-mail" label="E-mail" stylesWrapper={{ marginTop: "5.4rem" }} />

      <Input placeholder="Digite sua senha" label="E-mail" stylesWrapper={{ marginTop: "2.5rem" }} type={"password"} />

      <Button styledType="submit" style={{ marginTop: "7rem" }}>
        Login
      </Button>

      <h5>
        Não tem uma conta?<Link to={"/sign-up"}> Registre-se</Link>
      </h5>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  padding: 1.4rem 2.4rem;
  display: flex;
  flex-direction: column;
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