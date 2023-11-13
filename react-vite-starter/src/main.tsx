
import ReactDOM from 'react-dom/client'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import UserPage from './screens/users.page.tsx'
import App from './App.tsx'
import LayoutAdmin from './components/layout/layout.admin.tsx'
import TrackPage from './screens/tracks.page.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [{ index: true, element: <App /> }, {
      path: "users",
      element: <UserPage />,
    }, {
      path: "tracks",
      element: <TrackPage />,
    }]
  },
  {
    path: "/example",
    element: <>Example</>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
