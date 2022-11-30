import { useCallback, useEffect, useRef, useState } from "react"
import { FiMenu, FiSearch } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import { HeaderLogged } from "../../../components/Header/Header.logged"
import Pagination from "../../../components/Pagination/Pagination"
import { TextArea } from "../../../components/TextArea/TextArea"
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd"
import { CardTask } from "../../../components/Card/Card.task"
import { Spinner } from "../../../components/Spinner/Spinner"
import { Navbar } from "../../../components/Navbar/Navbar"
import { Avatar } from "../../../components/Avatar/Avatar"
import { Button } from "../../../components/Button/Button"
import { H1 } from "../../../components/Typography/H1/H1"
import { Input } from "../../../components/Input/Input"
import { Modal } from "../../../components/Modal/Modal"
import { P } from "../../../components/Typography/P/P"

import { useToast, TToastContext } from "../../../Context/ToastContext"
import { ErrorResponse } from "../../../Context/AuthContext"

import { ITask, ITaskResponse } from "../../../interfaces/Tasks/ITask"
import { ITaskForm } from "../../../interfaces/Tasks/ITaskForm"

import { useAxios } from "../../../hooks/Axios/useAxios"

import { routesPath } from "../../../constants/routes"

type TasksProps = {}

export const Tasks = (props: TasksProps) => {
  const { error: deleteError, loading: deleteLoading, response: deleteResponse, fetchData: deteleFetch } = useAxios<any, ErrorResponse>()
  const { error: createError, loading: createLoading, response: createResponse, fetchData: createFetch } = useAxios<any, ErrorResponse>()
  const { error: completeError, loading: completeLoading, response: completeResponse, fetchData: completeFetch } = useAxios<any, ErrorResponse>()
  const { error, loading, response, fetchData } = useAxios<ITaskResponse, ErrorResponse>()
  const toast = useToast() as TToastContext

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate()
  const taskFormRef = useRef<ITaskForm>({})

  const listTasks = useCallback(
    async (currentPage) => {
      await fetchData({
        method: "GET",
        url: `/tasks?page=${currentPage}`,
        headers: {
          accept: "*/*",
        },
      })
    },
    [currentPage]
  )

  const listTasksWithFilter = useCallback(
    async (currentPage, search?: string) => {
      await fetchData({
        method: "GET",
        url: `/tasks?page=${currentPage}&title=${search}`,
        headers: {
          accept: "*/*",
        },
      })
    },
    [currentPage, search]
  )

  const handleDeleteTask = useCallback(
    async (task: ITask) => {
      await deteleFetch({
        method: "DELETE",
        url: `/tasks/${task.id}`,
        headers: {
          accept: "*/*",
        },
      })
      listTasks(currentPage)
    },
    [currentPage]
  )

  const handleCompleteTask = useCallback(
    async (task: ITask) => {
      await completeFetch({
        method: "PUT",
        url: `/tasks/toggle/${task.id}`,
        headers: {
          accept: "*/*",
        },
      })
      listTasks(currentPage)
    },
    [currentPage]
  )

  const handleCreateTask = async () => {
    await createFetch({
      method: "POST",
      url: "/tasks",
      headers: {
        accept: "*/*",
      },
      data: taskFormRef.current,
    })
    listTasks(currentPage)
    closeModal()
  }

  useEffect(() => {
    console.log(currentPage, "currentPage")
  }, [currentPage])

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
    console.log("clicado")
    console.log(`${routesPath.taskEdit}/${task.id}`)
    return navigate(`${routesPath.taskEdit}/${task.id}`)
  }

  const closeModal = () => {
    taskFormRef.current = {}
    setIsModalOpen(false)
  }
  const handleSearchEnter = () => {
    listTasksWithFilter(currentPage, search)
  }

  /* useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault()

        handleSearchEnter()
      }
    }

    document.addEventListener("keydown", keyDownHandler)

    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [search])

   */
  useEffect(() => {
    listTasks(currentPage)
  }, [currentPage])

  if (error) {
    return <WrapperTask>ERROR: {error.response.data.message}</WrapperTask>
  }
  return (
    <WrapperTask>
      {(loading || createLoading || deleteLoading) && <Spinner />}
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Input icon={<FiSearch color="#cecece" onClick={handleSearchEnter} style={{ cursor: "pointer" }} />} stylesWrapper={{ margin: "2rem 0 " }} onChange={(event) => setSearch(event.target.value)} />
      <TasksCardContainer>
        {response?.data.map((task) => (
          <CardTask task={task} key={`${task.updated_at}`} deleteTask={handleDeleteTask} editTask={handleEditTask} completeTask={handleCompleteTask} />
        ))}
      </TasksCardContainer>
      {response?.lastPage && <Pagination setCurrentPage={setCurrentPage} pages={response.lastPage} style={{ marginTop: "2rem" }} />}

      <ButtonAdd onClick={() => setIsModalOpen(true)} style={{ marginTop: "2rem" }} />
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
  height: 56vh;
  overflow: auto;
`
