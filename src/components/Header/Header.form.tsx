import { FiChevronLeft } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

type HeaderFormProps = {
  path?: string
}

export const HeaderForm = ({ path }: HeaderFormProps) => {
  const navitage = useNavigate()

  const redirect = () => {
    if (!path) return navitage(-1)
    navitage(`${path}`)
  }

  return (
    <Wrapper>
      <FiChevronLeft color="#ffffff" onClick={redirect} />
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
`
