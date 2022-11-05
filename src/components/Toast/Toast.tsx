import React from "react"
import styled from "styled-components"
import { useTimeout } from "../../hooks/useTimeout/useTimeout"

export const Toast = (props: any) => {
  useTimeout(props.close, 5000)

  return (
    <WrapperToast>
      <ToastText className="toast__text">{props.children}</ToastText>
      <div>
        <ToastButton onClick={props.close} className="toast__close-btn">
          x
        </ToastButton>
      </div>
    </WrapperToast>
  )
}

export const WrapperToast = styled.label`
  border: 2px solid transparent;
  background-color: #fafafa;
  border-radius: 4px;
  max-width: 480px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-top: 16px;
  display: flex;
  position: relative;
  cursor: pointer;
  top: 0;
  right: 0;

  font-size: 1.6rem;
`

export const ToastText = styled.p`
  padding: 16px 24px;
  line-height: 1.4;
  color: black;
`

export const ToastButton = styled.button`
    border: none;
    background-color: transparent;
    font-size: 16px;
    margin-top: 8px;
    margin-right: 8px;
    cursor: pointer;
`
