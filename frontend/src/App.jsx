import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadastroPage from './Pages/CadastroPage/CadastroPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import './App.css'


const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <h1>404</h1>
  },
  {
    path: '/cadastro',
    element: <CadastroPage />,
    errorElement: <h1>404</h1>
  },
  {
    path: '/app',
    errorElement: <h1>404</h1>,
    element: <h1>RootLayout</h1>,
    children: [
      {index: true, element: <h1>HomePage</h1>},
      {index: "/post", element: <h1>Escrever texto</h1>},
    ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
