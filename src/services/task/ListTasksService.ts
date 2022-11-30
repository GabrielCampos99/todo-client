import axios from "axios"

export const ListTasksService = async (params): Promise<any | false> => {
  axios.defaults.baseURL = import.meta.env.VITE_API
  const paramsEncoded =  new URLSearchParams(params).toString()
  try {
    const response = await axios.get(`/tasks?${paramsEncoded}`)
    return response
  } catch (error: any) {
    if (axios.isCancel(error)) return false
    else console.error(`Error: ${error}`)
    return false
  }
}
