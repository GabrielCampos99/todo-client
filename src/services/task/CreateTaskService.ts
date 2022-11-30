import axios from "axios"

export const CreateTaskService  = async (body): Promise<any | false> => {
  axios.defaults.baseURL = import.meta.env.VITE_API
  try {
    const response = await axios.post(`/tasks`, {...body})
    return response
  } catch (error: any) {
    if (axios.isCancel(error)) return false
    else console.error(`Error: ${error}`)
    return false
  }
}
