import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import Add from './components/pages/Add'
import Books from './components/pages/Books'
import Update from './components/pages/Update'
import MainContainer from './components/UI/MainContainer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Books />,
  },
  {
    path: '/add',
    element: <Add />,
  },
  {
    path: '/update/:id',
    element: <Update />,
  },
])

function App() {
  return (
    <MainContainer>
      <RouterProvider router={router} />
    </MainContainer>
  )
}

export default App
