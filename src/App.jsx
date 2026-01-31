
import './App.css'
import Login from './pages/login'
import Register from './pages/Register'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const route =createBrowserRouter([
    {
      path: "/Login",
      element: <Login />
    },
    {
      path: "/Register",
      element: <Register />
    }
  ])

  return <RouterProvider router={route}/>
}

export default App
  