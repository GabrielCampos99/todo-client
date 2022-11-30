import axios from "axios"

export const EditTaskService  = async (body, taskId): Promise<any | false> => {
  axios.defaults.baseURL = import.meta.env.VITE_API
  try {
    const response = await axios.put(`/tasks/${taskId}`, {...body})
    return response
  } catch (error: any) {
    if (axios.isCancel(error)) return false
    else console.error(`Error: ${error}`)
    return false
  }
}
