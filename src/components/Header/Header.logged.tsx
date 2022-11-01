import React from "react"
import styled from "styled-components"


type HeaderLoggedProps = {
  rightItem?: React.ReactNode
  middleItem?: React.ReactNode
  leftItem?: React.ReactNode
}

export const HeaderLogged = ({ leftItem, middleItem, rightItem }: HeaderLoggedProps) => {
  return (
    <Wrapper>
      {leftItem ? <div className="left">{leftItem}</div> : <div></div>}
      {middleItem ? <div className="middle">{middleItem}</div> : <div></div>}
      {rightItem ? <div className="right">{rightItem}</div> : <div></div>}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: center;

  .left {
  }

  .middle {
    justify-self: center;
  }

  .right {
    justify-self: end;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  a {
    text-decoration: none;
  }
`
