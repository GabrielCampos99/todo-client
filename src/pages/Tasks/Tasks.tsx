import { useCallback, useEffect, useRef, useState } from "react"
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
import ButtonAdd from "../../components/ButtonAdd/ButtonAdd"
import { Modal } from "../../components/Modal/Modal"
import { P } from "../../components/Typography/P/P"
import { TextArea } from "../../components/TextArea/TextArea"
import { ITaskForm } from "../../interfaces/Tasks/ITaskForm"

type TasksProps = {}

export const Tasks = (props: TasksProps) => {
  const { error, loading, response, fetchData } = useAxios<ITaskResponse, ErrorResponse>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sidebar, setSidebar] = useState<boolean>(false)
  const taskFormRef = useRef<ITaskForm>({})
  const listTasks = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
    })
  }, [response])

  const handleCreateTask = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
    })
  }, [response])

  const handleTaskForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
    const value = event.target.value
    taskFormRef.current[inputName] = value    
  }

  const closeModal = () => {
    taskFormRef.current = {}
    setIsModalOpen(false)
  }

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

      <ButtonAdd onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <P style={{ fontWeight: "bold", fontSize: "2rem" }}>Criar Tarefa</P>
          <Input label={"Tarefa"} stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleTaskForm(event, "title")} />
          <TextArea label="Descrição" stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleTaskForm(event, "description")} />
        </Modal>
      )}
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
  height: 100%;
  min-height: 100vh;
`

export const TasksCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
`
