import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyles from "./styles/global"
import { routesPath } from "./constants/routes"
import { SignIn } from "./pages/SignIn/SignIn"
import { SignUp } from "./pages/SignUp/SignUp"
import { Onbording } from "./pages/Onbording/Onbording"
import AuthProvider from "./Context/AuthContext"
import { Tasks } from "./pages/Tasks/Tasks"
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute"
import { ToastProvider } from "./Context/ToastContext"
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
            <Route
              path={routesPath.tasks}
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)
