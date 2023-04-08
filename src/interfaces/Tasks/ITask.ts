export interface ITask {
  id: string
  title: string
  description: string
  completed: boolean
  user_id: string
  created_at: Date
  updated_at: Date
}

export interface ITaskResponse {
  statusCode: string
  items: ITask[]
  count: number
  currentPage: number
  nextPage?: any
  prevPage?: any
  lastPage: number
}
