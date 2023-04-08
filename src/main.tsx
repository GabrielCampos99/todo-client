import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { routesPath } from "./constants/routes"
import GlobalStyles from "./styles/global"

import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"

import { Onbording } from "./pages/Onbording/Onbording"
import TaskEdit from "./pages/Tasks/TaskEdit/TaskEdit"
import { Tasks } from "./pages/Tasks/Tasks/Tasks"
import { SignUp } from "./pages/SignUp/SignUp"
import { SignIn } from "./pages/SignIn/SignIn"

import { ToastProvider } from "./Context/ToastContext"
import { TaskProvider } from "./Context/TaskContext"
import AuthProvider from "./Context/AuthContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path={routesPath.home} element={<Onbording />} />
            <Route path={routesPath.singIn} element={<SignIn />} />
            <Route path={routesPath.singUp} element={<SignUp />} />
            {/* TASK */}
            <Route
              path={routesPath.tasks}
              element={
                <PrivateRoute>
                  <TaskProvider>
                    <Tasks />
                  </TaskProvider>
                </PrivateRoute>
              }
            ></Route>
            <Route
              path={`${routesPath.taskEdit}/:taskId`}
              element={
                <PrivateRoute>
                  <TaskProvider>
                    <TaskEdit />
                  </TaskProvider>
                </PrivateRoute>
              }
            ></Route>
            {/* TASK */}
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
