import axios from "axios"
import { useState, useEffect } from "react"

axios.defaults.baseURL = "http://localhost:3333/"

export function useAxios<T> () {
  const [response, setResponse] = useState<T>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchData = async (params: any) => {
    try {
      const result = await axios.request(params)
      setResponse(result.data)
    } catch (error) {
      setError(error as any)
    } finally {
      setLoading(false)
    }
  }

  /*   useEffect(() => {
        fetchData(params);
    }, []); // execute once only 🚀 */

  return { response, error, loading, fetchData }
}
