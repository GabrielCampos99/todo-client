import axios from "axios"

export const GitHubClient = axios.create({
  baseURL: "https://localhost:3333/",
})
