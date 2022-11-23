import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { CardTask } from "../../../components/Card/Card.task"
import { FiMenu, FiSearch } from "react-icons/fi"
import { HeaderLogged } from "../../../components/Header/Header.logged"
import { useAxios } from "../../../hooks/Axios/useAxios"
import { ITask, ITaskResponse } from "../../../interfaces/Tasks/ITask"
import { H1 } from "../../../components/Typography/H1/H1"
import { Avatar } from "../../../components/Avatar/Avatar"
import { Input } from "../../../components/Input/Input"
import { Navbar } from "../../../components/Navbar/Navbar"
import { ErrorResponse } from "../../../Context/AuthContext"
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd"
import { Modal } from "../../../components/Modal/Modal"
import { P } from "../../../components/Typography/P/P"
import { TextArea } from "../../../components/TextArea/TextArea"
import { ITaskForm } from "../../../interfaces/Tasks/ITaskForm"
import { Button } from "../../../components/Button/Button"
import { useToast, TToastContext } from "../../../Context/ToastContext"
import { Spinner } from "../../../components/Spinner/Spinner"
import { routesPath } from "../../../constants/routes"

type TasksProps = {}

export const Tasks = (props: TasksProps) => {
  const { error: deleteError, loading: deleteLoading, response: deleteResponse, fetchData: deteleFetch } = useAxios<any, ErrorResponse>()
  const { error: createError, loading: createLoading, response: createResponse, fetchData: createFetch } = useAxios<any, ErrorResponse>()
  const { error, loading, response, fetchData } = useAxios<ITaskResponse, ErrorResponse>()
  const toast = useToast() as TToastContext

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [sidebar, setSidebar] = useState<boolean>(false)
  const navigate = useNavigate()
  const taskFormRef = useRef<ITaskForm>({})
  const listTasks = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
    })
  }, [])

  const handleDeleteTask = useCallback(async (task: ITask) => {
    await deteleFetch({
      method: "DELETE",
      url: `/tasks/${task.id}`,
      headers: {
        accept: "*/*",
      },
    })
    listTasks()
  }, [])

  const handleCreateTask = async () => {
    await createFetch({
      method: "POST",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
      data: taskFormRef.current,
    })
    listTasks()
    closeModal()
  }

  useEffect(() => {
    if (createError?.response.data.message) return toast.contextValue.open(`${createError.response.data.message}`)
    if (deleteError?.response.data.message) return toast.contextValue.open(`${deleteError.response.data.message}`)
    if (error?.response.data.message) return toast.contextValue.open(`${error.response.data.message}`)
  }, [createError, deleteError, error])

  const handleTaskForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
    const value = event.target.value
    taskFormRef.current[inputName] = value
  }

  const handleEditTask = (task: ITask) => {
    console.log('clicado')
    console.log(`${routesPath.taskEdit}/${task.id}`)
    return navigate(`${routesPath.taskEdit}/${task.id}`)
  }

  const closeModal = () => {
    taskFormRef.current = {}
    setIsModalOpen(false)
  }

  useEffect(() => {
    listTasks()
  }, [])

  if (error) {
    return <WrapperTask>ERROR: {error.response.data.message}</WrapperTask>
  }
  return (
    <WrapperTask>
      {(loading || createLoading || deleteLoading) && <Spinner />}
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Input icon={<FiSearch color="#cecece" />} stylesWrapper={{ margin: "2rem 0 " }} />
      <TasksCardContainer>
        {response?.data.map((task) => (
          <CardTask task={task} key={`${task.updated_at}`} deleteTask={handleDeleteTask} editTask={handleEditTask} />
        ))}
      </TasksCardContainer>

      <ButtonAdd onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <P style={{ fontWeight: "bold", fontSize: "2rem" }}>Criar Tarefa</P>
          <Input label={"Tarefa"} stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleTaskForm(event, "title")} />
          <TextArea label="Descrição" stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleTaskForm(event, "description")} />
          <Button styledType="submit" onClick={handleCreateTask} style={{ margin: "0 auto", width: "50%", marginTop: "1.6rem" }}>
            Criar
          </Button>
        </Modal>
      )}
    </WrapperTask>
  )
}

export const WrapperTask = styled.div`
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
