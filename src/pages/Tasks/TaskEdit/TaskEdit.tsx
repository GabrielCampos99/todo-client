import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiMenu } from "react-icons/fi"

import { HeaderLogged } from "../../../components/Header/Header.logged"
import { TextArea } from "../../../components/TextArea/TextArea"
import { Spinner } from "../../../components/Spinner/Spinner"
import { Avatar } from "../../../components/Avatar/Avatar"
import { Button } from "../../../components/Button/Button"
import { Navbar } from "../../../components/Navbar/Navbar"
import { Input } from "../../../components/Input/Input"
import { H1 } from "../../../components/Typography/H1/H1"
import { P } from "../../../components/Typography/P/P"

import { EditTaskService } from "../../../services/task/EditTaskService"
import { GetTaskFromId } from "../../../services/task/GetTaskFromId"
import { routesPath } from "../../../constants/routes"
import { WrapperTask } from "../Tasks/Tasks"

import { TToastContext } from "../../../Context/ToastContext"
type TaskEditProps = {}
type TaskEditRef = {
  title: string
  description?: string
}

const TaskEdit = (props: TaskEditProps) => {
  const taskEditRef = useRef<TaskEditRef>({ title: "", description: "" })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [taskResponse, setTaskResponse] = useState<any>()
  const [sidebar, setSidebar] = useState<boolean>(false)
  const { taskId } = useParams<{ taskId: string }>()
  const toast = useToast() as TToastContext

  const navigate = useNavigate()

  const getTaskById = async () => {
    if (!taskId) return
    setIsLoading(true)
    const res = await GetTaskFromId(+taskId)
    setIsLoading(false)
    if (!res) return toast.contextValue.open(`Erro ao recuperar Task`)
    setTaskResponse(res.data)
  }

  const handleEditTask = async () => {
    if (!taskId) return
    setIsLoading(true)
    const res = await EditTaskService(taskEditRef.current, +taskId)
    setIsLoading(false)
    if (!res) return toast.contextValue.open(`Erro ao Editar task Task`)
    toast.contextValue.open(`Task editada com sucesso.`)
    navigate(routesPath.tasks)
  }

  const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, name: "title" | "description") => {
    const value = event.target.value
    taskEditRef.current[name] = value
    console.log(taskEditRef.current, "task.current")
  }

  useEffect(() => {
    if (taskResponse) taskEditRef.current = { title: taskResponse?.title, description: taskResponse?.description }
  }, [taskResponse])

  useEffect(() => {
    getTaskById()
  }, [])

  return (
    <WrapperTask>
      {isLoading && <Spinner />}
      <HeaderLogged leftItem={<FiMenu onClick={() => setSidebar(!sidebar)} style={{ cursor: "pointer" }} color="#cecece" />} middleItem={<H1 style={{ fontSize: "2rem", color: "#cecece", fontWeight: "normal" }}>Tarefas</H1>} rightItem={<Avatar />} />
      <Navbar sidebar={sidebar} setSidebar={setSidebar} />
      <P style={{ fontWeight: "bold", fontSize: "2rem" }}>Editar Tarefa</P>
      <Input label={"Titulo"} stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleForm(event, "title")} defaultValue={taskResponse?.title} />
      <TextArea label="Descrição" stylesLabel={{ fontSize: "1.8rem" }} stylesWrapper={{ width: "90%", margin: "1rem auto" }} onChange={(event) => handleForm(event, "description")} defaultValue={taskResponse?.description} />
      <Button styledType="submit" onClick={handleEditTask} style={{ margin: "0 auto", width: "50%", marginTop: "1.6rem" }}>
        Editar Tarefa
      </Button>
    </WrapperTask>
  )
}

export default TaskEdit
function useToast(): TToastContext {
  throw new Error("Function not implemented.")
}
