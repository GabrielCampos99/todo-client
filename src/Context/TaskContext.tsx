import * as React from "react"
import { useContext, useState } from "react"

type TaskProps = {
  children?: React.ReactNode
}

export type TTaskContext = {
  setState: React.Dispatch<React.SetStateAction<boolean>>
  state: boolean
}

export const TaskContext = React.createContext<TTaskContext | null>(null)

const TaskProvider: React.FC<TaskProps> = ({ children }) => {
  const [state, setState] = useState<boolean>(false)

  return <TaskContext.Provider value={{ setState, state }}>{children}</TaskContext.Provider>
}

const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a ActivityLibraryProvider');
  }

  return context;
}

export { TaskProvider, useTask }
