import React, { useCallback, useEffect, useRef, useState } from "react"
import { FiMenu, FiSearch } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom"
import { Avatar } from "../../../components/Avatar/Avatar"
import { Button } from "../../../components/Button/Button"
import ButtonAdd from "../../../components/ButtonAdd/ButtonAdd"
import { CardTask } from "../../../components/Card/Card.task"
import { HeaderLogged } from "../../../components/Header/Header.logged"
import { Input } from "../../../components/Input/Input"
import { Modal } from "../../../components/Modal/Modal"
import { Navbar } from "../../../components/Navbar/Navbar"
import { Spinner } from "../../../components/Spinner/Spinner"
import { TextArea } from "../../../components/TextArea/TextArea"
import { H1 } from "../../../components/Typography/H1/H1"
import { P } from "../../../components/Typography/P/P"
import { routesPath } from "../../../constants/routes"
import { ErrorResponse } from "../../../Context/AuthContext"
import { useToast, TToastContext } from "../../../Context/ToastContext"
import { useAxios } from "../../../hooks/Axios/useAxios"
import { ITask, ITaskResponse } from "../../../interfaces/Tasks/ITask"
import { TasksCardContainer, WrapperTask } from "../Tasks/Tasks"

type TaskEditProps = {}
type TaskEditRef = {
  title: string
  description?: string
}

const TaskEdit = (props: TaskEditProps) => {
  const { error, loading, response, fetchData } = useAxios<any, ErrorResponse>()
  const { error: editError, loading: editLoading, response: editResponse, fetchData: editFetchData } = useAxios<any, ErrorResponse>()

  const taskEditRef = useRef<TaskEditRef>({ title: "", description: "" })

  const [sidebar, setSidebar] = useState<boolean>(false)
  const { taskId } = useParams<{ taskId: string }>()
  const toast = useToast() as TToastContext
  const navigate = useNavigate()

  const getTaskById = useCallback(async () => {
    await fetchData({
      method: "GET",
      url: `/tasks/${taskId}`,
      headers: {
        accept: "*/*",
      },
    })
  }, [])

  const handleEditTask = async () => {
    await editFetchData({
      method: "PUT",
      url: `/tasks/${taskId}`,
      headers: {
        accept: "*/*",
      },
      data: taskEditRef.current,
    })
  }

  const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, name: "title" | "description") => {
    const value = event.target.value
    taskEditRef.current[name] = value
    console.log(taskEditRef.current, "task.current")
  }

  useEffect(() => {
    getTaskById()
  }, [])

  useEffect(() => {
    console.log(editError, "editError")
    if (!!editResponse && !editError) {
      return navigate(routesPath.tasks)
    }
  }, [editResponse, editError])

  useEffect(() => {
    if (response) taskEditRef.current = { title: response?.title, description: response?.description }
  }, [response])

  useEffect(() => {
    if (error?.response.data.message) return toast.contextValue.open(`${error.response.data.message}`)
    if (editError?.response.data.message) return toast.contextValue.open(`${editError.response.data.message}`)
  }, [error])

  return (
    <WrapperTask>
      {loading && <Spinner />}
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <P style={{ fontWeight: "bold", fontSize: "2rem" }}>Editar Tarefa</P>
      <Input label={"Titulo"} stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleForm(event, "title")} defaultValue={response?.title} />
      <TextArea label="Descrição" stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleForm(event, "description")} defaultValue={response?.description} />
      <Button styledType="submit" onClick={handleEditTask} style={{ margin: "0 auto", width: "50%", marginTop: "1.6rem" }}>
        Editar Tarefa
      </Button>
    </WrapperTask>
  )
}

export default TaskEdit
