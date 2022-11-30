import axios from "axios"

export const DeleteTaskService = async (taskId: number): Promise<any | false> => {
  axios.defaults.baseURL = import.meta.env.VITE_API
  try {
    const response = await axios.delete(`/tasks/${taskId}`)
    return response
  } catch (error: any) {
    if (axios.isCancel(error)) return false
    else console.error(`Error: ${error}`)
    return false
  }
}
