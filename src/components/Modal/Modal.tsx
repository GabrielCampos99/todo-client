import styled, { css } from "styled-components"
import { FiX } from "react-icons/fi"

type ModalProps = {
  children: any
  isOpen: boolean
}

export const Modal = ({ children, isOpen = false }: ModalProps) => {
  return (
    <ModalContainer isOpen={isOpen}>
      {children}
      <CloseIcon>
        <FiX color="#e5e5e5" />
      </CloseIcon>
    </ModalContainer>
  )
}

export const ModalContainer = styled.div<Pick<ModalProps, "isOpen">>`
  ${({ isOpen }) => css`
    position: relative;
    padding: 1rem;
    border-radius: 0.4rem;
    display: ${isOpen ? "flex" : "none"};
    flex-direction: column;
    color: #e0e0e0;
    font-size: 1.6rem;
    background-color: #363636;
  `}
`

export const CloseIcon = styled.div`
  top: 1rem;
  right: 1rem;
  position: absolute;
  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`
