
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from "react-router-dom"
import Header from './components/header/header.tsx'
import UserPage from './screens/users.page.tsx'
import App from './App.tsx'
import { StrictMode, useEffect } from 'react'

const LayoutAdmin = () => {
  useEffect(() => {
    handleLogin()
  }, [])
  const handleLogin = async () => {
    const data = {
      username: 'hoidanit@gmail.com', password: '123456'
    }
    const response1 = await fetch(`http://localhost:8000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const data1 = await response1.json()
    if (data1.data) {
      localStorage.setItem("access_token", data1.data.access_token)
    }
  }
  return (<><Header />
    <Outlet /></>)
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [{ index: true, element: <App /> }, {
      path: "users",
      element: <UserPage />,
    }]
  },
  {
    path: "/tracks",
    element: <div>Manage tracks</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
