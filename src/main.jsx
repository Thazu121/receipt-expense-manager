import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dashboard from "./components/pages/Dashboard.jsx"
import  { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import RootLayout from "./Layouts/RootLayout"
import ReactDOM from 'react-dom/client'
import Landing from './components/pages/Landing.jsx'
import Login from './components/pages/Login.jsx'




const router = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout />,
    // errorElement
    children:[
      {index:true,element:<Landing />},
      {path:"login",element:<Login />},
      // {path:"contact", element:<Contact />},
      // {path:"product/:productId",element:<SingleViewProduct />,loader:SingleProductLoader},
      // { path: "cart", element: <Cart /> },


    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
      {/* <Provider store={store}> */}
  <RouterProvider router={router} />
  {/* </Provider> */}
  </StrictMode>
)

