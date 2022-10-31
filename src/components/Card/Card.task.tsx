import React from "react"
import styled from "styled-components"
import { ITask } from "../../interfaces/Tasks/ITask"
import { H2 } from "../Typography/H2/H2"

type CardTaskProps = {
  task?: ITask
}

export const CardTask = ({ task }: CardTaskProps) => {
  return (
    <Wrapper>
      <Input type={"checkbox"} />
      <TaskInfo>
        <H2 style={{ fontWeight: "regular" }}>{task?.title}</H2>
        <H2 style={{ color: "#afafaf", fontWeight: "regular" }}>{task?.description}</H2>
      </TaskInfo>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  background-color: #363636;
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;
  border-radius: 0.4rem;
  align-items: center;
`

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Input = styled.input`
  height: 3rem;
  width: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 100%;
`
