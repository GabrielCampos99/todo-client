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


import { ITask, ITaskResponse } from "../../../interfaces/Tasks/ITask"
import { ITaskForm } from "../../../interfaces/Tasks/ITaskForm"

import { routesPath } from "../../../constants/routes"
import { ListTasksService } from "../../../services/task/ListTasksService"
import { DeleteTaskService } from "../../../services/task/DeleteTaskService"
import { ToggleCompleteTaskService } from "../../../services/task/ToggleCompleteTaskService"
import { CreateTaskService } from "../../../services/task/CreateTaskService"
import { useToast, TToastContext } from "../../../Context/ToastContext"

export const Tasks = () => {
  const toast = useToast() as TToastContext

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [taskResponse, setTaskResponse] = useState<ITaskResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [sidebar, setSidebar] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const navigate = useNavigate()
  const taskFormRef = useRef<ITaskForm>({})

  const listTasks = useCallback(
    async (currentPage: number) => {
      setIsLoading(true)
      const res = await ListTasksService({ page: currentPage })
      setIsLoading(false)
      if (!res) return toast.contextValue.open(`Erro ao listar Tasks`)
      setTaskResponse(res.data.data)
    },
    [currentPage]
  )

  const listTasksWithFilter = useCallback(
    async (currentPage, search?: string) => {
      setIsLoading(true)
      const res = await ListTasksService({ page: currentPage, title: search })
      setIsLoading(false)
      if (!res) return toast.contextValue.open(`Erro ao listar Tasks`)
      setTaskResponse(res.data.data)
    },
    [currentPage, search]
  )

  const handleDeleteTask = useCallback(
    async (task: ITask) => {
      setIsLoading(true)
      const res = await DeleteTaskService(+task.id)
      setIsLoading(false)
      if (!res) return toast.contextValue.open(`Erro ao deletar Task`)
      toast.contextValue.open(`Task deletada com sucesso!`)
      listTasks(currentPage)
    },
    [currentPage]
  )

  const handleCompleteTask = useCallback(
    async (task: ITask) => {
      setIsLoading(true)
      const res = await ToggleCompleteTaskService(+task.id)
      setIsLoading(false)
      if (!res) return toast.contextValue.open(`Erro ao completar uma Task`)
      listTasks(currentPage)
      toast.contextValue.open(`Task Completada com sucesso!`)
      listTasks(currentPage)
    },
    [currentPage]
  )

  const handleCreateTask = async () => {
    if (!taskFormRef.current.title) return toast.contextValue.open(`Insiria ao menos um titulo.`)
    setIsLoading(true)
    const res = await CreateTaskService(taskFormRef.current)
    setIsLoading(false)
    if (!res) toast.contextValue.open(`Erro ao Criar uma Task 🙁`)
    listTasks(currentPage)
    if (res) toast.contextValue.open(`Task Criada com sucesso!`)
    listTasks(currentPage)
    closeModal()
  }

  const handleTaskForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, inputName: string) => {
    const value = event.target.value
    taskFormRef.current[inputName] = value
  }

  const handleEditTask = (task: ITask) => {
    return navigate(`${routesPath.taskEdit}/${task.id}`)
  }

  const closeModal = () => {
    taskFormRef.current = {}
    setIsModalOpen(false)
  }
  const handleSearchEnter = () => {
    listTasksWithFilter(currentPage, search)
  }

  useEffect(() => {
    listTasks(currentPage)
  }, [currentPage])

  return (
    <WrapperTask>
      {isLoading && <Spinner />}
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <Input icon={<FiSearch color="#cecece" onClick={handleSearchEnter} style={{ cursor: "pointer" }} />} stylesWrapper={{ margin: "2rem 0 " }} onChange={(event) => setSearch(event.target.value)} />
      <TasksCardContainer>
        {taskResponse?.items?.map((task) => (
          <CardTask task={task} key={`${task.updated_at}`} deleteTask={handleDeleteTask} editTask={handleEditTask} completeTask={handleCompleteTask} />
        ))}
      </TasksCardContainer>
      {taskResponse?.lastPage && <Pagination setCurrentPage={setCurrentPage} pages={taskResponse.lastPage} style={{ marginTop: "2rem" }} />}

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
