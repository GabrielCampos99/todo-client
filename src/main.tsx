import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import "./index.scss"
import GlobalStyles from "./styles/global"
import { routesPath } from "./constants/routes"
import { SignIn } from "./pages/SignIn/SignIn"
import { SignUp } from "./pages/SignUp/SignUp"
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path={routesPath.home} element={<App />} />
        <Route path={routesPath.singIn} element={<SignIn />} />
        <Route path={routesPath.singUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
