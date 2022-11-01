import styled from "styled-components"
import { FiUser } from "react-icons/fi"

type AvatarProps = React.HTMLAttributes<HTMLDivElement>

export const Avatar = ({ ...rest }: AvatarProps) => {
  return (
    <Wrapper {...rest}>
      <FiUser />
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  border-radius: 100%;
  height: 4.2rem;
  width: 4.2rem;
  background-color: #cecece;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
