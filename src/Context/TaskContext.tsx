import axios from "axios"
import * as React from "react"
import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { routesPath } from "../constants/routes"
import { TToastContext, useToast } from "./ToastContext"
import { CreateSessionService } from "../services/signIn/CreateSessionService"

type TaskProps = {
  children?: React.ReactNode
}



export type TTaskContext = {}


export const TaskContext = React.createContext<TTaskContext | null>(null)

const TaskProvider: React.FC<TaskProps> = ({ children }) => {


  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>
}

export const useTask = () => React.useContext(TaskContext)
export default TaskProvider
