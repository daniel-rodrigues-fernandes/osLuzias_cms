import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>LoginPage</h1>,
    errorElement: <h1>404</h1>
  },
  {
    path: '/cadastro',
    element: <h1>CadastroPage</h1>,
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
