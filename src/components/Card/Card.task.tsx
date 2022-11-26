import React, { useCallback } from "react"
import styled from "styled-components"
import { ITask } from "../../interfaces/Tasks/ITask"
import { H2 } from "../Typography/H2/H2"
import { FiTrash2, FiEdit } from "react-icons/fi"

type CardTaskProps = {
  deleteTask?: (task: ITask) => void
  editTask?: (task: ITask) => void
  completeTask?: (task: ITask) => void
  task: ITask
}

export const CardTask = ({ task, deleteTask, editTask, completeTask }: CardTaskProps) => {
  const handleDeleteTask = useCallback(async (task: ITask) => {
    deleteTask && deleteTask(task)
  }, [])

  const handleEditTask = useCallback(async (task: ITask) => {
    editTask && editTask(task)
  }, [])

  const handleCompleteTask = useCallback(async (task: ITask) => {
    completeTask && completeTask(task)
  }, [])

  return (
    <Wrapper>
      <div className="info-input">
        <Input type={"checkbox"} defaultChecked={!!task.completed} onClick={() => handleCompleteTask(task)} />
        <TaskInfo>
          <H2 style={{ fontWeight: "regular" }}>{task?.title}</H2>
          <H2 style={{ color: "#afafaf", fontWeight: "regular" }}>{task?.description}</H2>
        </TaskInfo>
      </div>

      <TaskOptions>
        {editTask && (
          <div onClick={() => handleEditTask(task)}>
            <FiEdit color="rgb(206, 206, 206)" />
          </div>
        )}

        {deleteTask && (
          <div onClick={() => handleDeleteTask(task)}>
            <FiTrash2 color="rgb(206, 206, 206)" />
          </div>
        )}
      </TaskOptions>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  background-color: #363636;
  display: flex;
  padding: 1.2rem;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: space-between;

  .info-input {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
`

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const TaskOptions = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;
  gap: 1rem;

  > div {
    cursor: pointer;
    border-radius: 0.4rem;
    padding: 1rem;
    background-color: #121212;
  }
  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`

export const Input = styled.input`
  height: 3rem;
  width: 3rem;
  border: 1px solid #e5e5e5;
  border-radius: 100%;
`
