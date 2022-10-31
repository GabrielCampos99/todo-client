import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { CardTask } from "../../components/Card/Card.task"
import { Header } from "../../components/Header/Header.form"
import { useAxios } from "../../hooks/Axios/useAxios"
import { ITask, ITaskResponse } from "../../interfaces/Tasks/ITask"

type TasksProps = {}

export const Tasks = (props: TasksProps) => {
  const { error, loading, response, fetchData } = useAxios<ITaskResponse>()
  const [tasks, setTasks] = useState<ITask[]>()

  const listTasks = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
    })
  }, [response])

  useEffect(() => {
    listTasks()
  }, [])

  if (loading) {
    return <Wrapper>CARREGANDO</Wrapper>
  }

  if (error) {
    return <Wrapper>ERROR: {error}</Wrapper>
  }

  return (
    <Wrapper>
      <Header />
      <TasksCardContainer>
        {response?.data.map((task) => (
          <CardTask task={task} key={`${task.updated_at}`} />
        ))}
      </TasksCardContainer>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  padding: 1.4rem 2.4rem;
  display: flex;
  flex-direction: column;
  max-width: 108rem;
  margin: 0 auto;
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

export const TasksCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
`
