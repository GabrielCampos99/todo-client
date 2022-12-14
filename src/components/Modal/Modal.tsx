import styled, { css } from "styled-components"
import { FiX } from "react-icons/fi"

type ModalProps = {
  children: any
  isOpen: boolean
  closeModal: (obj: any) => void
}

export const Modal = ({ children, closeModal, isOpen = false }: ModalProps) => {
  return (
    <ModalContainer isOpen={isOpen}>
      {children}
      <CloseIcon onClick={closeModal}>
        <FiX color="#e5e5e5" />
      </CloseIcon>
    </ModalContainer>
  )
}

export const ModalContainer = styled.div<Pick<ModalProps, "isOpen">>`
  ${({ isOpen }) => css`
    position: absolute;
    padding: 1rem;
    border-radius: 1rem;
    display: ${isOpen ? "flex" : "none"};
    flex-direction: column;
    color: #e0e0e0;
    font-size: 1.6rem;
    background-color: #363636;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 80%;
    max-width: 50rem;
  `}
`

export const CloseIcon = styled.div`
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  position: absolute;
  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`
