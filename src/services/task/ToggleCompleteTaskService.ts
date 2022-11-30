import axios from "axios"

export const ToggleCompleteTaskService = async (taskId: number): Promise<any | false> => {
  axios.defaults.baseURL = import.meta.env.VITE_API
  try {
    const response = await axios.put(`/tasks/toggle/${taskId}`)
    return response
  } catch (error: any) {
    if (axios.isCancel(error)) return false
    else console.error(`Error: ${error}`)
    return false
  }
}
