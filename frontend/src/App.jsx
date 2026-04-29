import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CadastroPage from './Pages/CadastroPage/CadastroPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RootLayout from './Pages/Root/RootLayout'
import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import NewArticle from './Pages/NewArticle/NewArticle'
import Articles from './Pages/Articles/Articles'
import { artigosLoader } from './loader/artigos.loader'
import { editArticleLoader } from './loader/editArticle.loader'
import { newArticleLoader } from './loader/newArticle.loader'
import { protectedLoader } from './loader/protectedLoader.loader'
import ErrorPage from './Pages/ErrorPage/ErrorPage'


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
    element:<RootLayout />,
    errorElement: <h1>Error - 404</h1>,
    loader: protectedLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "novo-artigo", element: <NewArticle />, loader: newArticleLoader },
      { path: "artigos", element: <Articles />, loader: artigosLoader },
      { path: "artigos/:id/editar", element: <NewArticle />, loader: editArticleLoader },
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
