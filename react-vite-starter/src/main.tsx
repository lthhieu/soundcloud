
import ReactDOM from 'react-dom/client'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import UserPage from './screens/users.page.tsx'
import App from './App.tsx'
import LayoutAdmin from './components/layout/layout.admin.tsx'

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
    element: <>Tracks</>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
