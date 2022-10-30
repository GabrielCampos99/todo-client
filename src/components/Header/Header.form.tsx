import { FiChevronLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { P } from "../Typography/P/P"

type HeaderFormProps = {
  path?: string
  text?: string
}

export const Header = ({ path, text }: HeaderFormProps) => {
  const navitage = useNavigate()

  const redirect = () => {
    if (!path) return navitage(-1)
    navitage(`${path}`)
  }

  return (
    <Wrapper>
      {!text && <FiChevronLeft color="#ffffff" onClick={redirect} />}
      {text && (
        <P redirectTo="/sign-in" style={{ color: "#7a7a7a" }}>
          {text}
        </P>
      )}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  a {
    text-decoration: none;
  }
`
