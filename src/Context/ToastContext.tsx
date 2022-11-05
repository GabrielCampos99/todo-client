import * as React from "react"
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Toast } from "../components/Toast/Toast"

type Props = {
  children?: React.ReactNode
}

export type TToastContext = {
  contextValue: {
    open: (content: any) => void
  }
}

export const ToastContext = React.createContext<TToastContext | null>(null)

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toasts, setToasts] = useState<any[]>([])
  const open = (content: any) => setToasts((currentToasts) => [...currentToasts, { id: generateUEID(), content }])
  const close = (id: any) => setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  const contextValue = useMemo(() => ({ open }), [])

  function generateUEID() {
    let first: any = (Math.random() * 46656) | 0
    let second: any = (Math.random() * 46656) | 0
    first = ("000" + first.toString(36)).slice(-3)
    second = ("000" + second.toString(36)).slice(-3)

    return first + second
  }

  return (
    <ToastContext.Provider value={{ contextValue }}>
      {children}
      {createPortal(
        <div className="toasts-wrapper">
          {toasts.map((toast) => (
            <Toast key={toast.id} close={() => close(toast.id)}>
              {toast.content}
            </Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => React.useContext(ToastContext)
