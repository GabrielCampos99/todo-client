import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { CardTask } from "../../components/Card/Card.task"
import { FiMenu, FiSearch } from "react-icons/fi"
import { HeaderLogged } from "../../components/Header/Header.logged"
import { useAxios } from "../../hooks/Axios/useAxios"
import { ITask, ITaskResponse } from "../../interfaces/Tasks/ITask"
import { H1 } from "../../components/Typography/H1/H1"
import { Avatar } from "../../components/Avatar/Avatar"
import { Input } from "../../components/Input/Input"
import { Navbar } from "../../components/Navbar/Navbar"
import { ErrorResponse } from "../../Context/AuthContext"

type TasksProps = {}

export const Tasks = (props: TasksProps) => {
  const { error, loading, response, fetchData } = useAxios<ITaskResponse, ErrorResponse>()
  const [sidebar, setSidebar] = useState<boolean>(false)
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
    return <Wrapper>ERROR: {error.response.data.message}</Wrapper>
  }

  return (
    <Wrapper>
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Input icon={<FiSearch color="#cecece" />} stylesWrapper={{ margin: "2rem 0 " }} />
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
  position: relative;
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
