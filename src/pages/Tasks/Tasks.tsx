import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Button } from "../../components/Button/Button"
import { Header } from "../../components/Header/Header.form"
import { H1 } from "../../components/Typography/H1/H1"
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

    console.log(response?.data, "response")
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
