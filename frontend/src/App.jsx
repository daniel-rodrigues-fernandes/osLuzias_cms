import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadastroPage from './Pages/CadastroPage/CadastroPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RootLayout from './Pages/Root/RootLayout'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'


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
    path: '/',
    errorElement: <h1>Error - 404</h1>,
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "novo-artigo", element: <h1>Escrever texto</h1>},
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
