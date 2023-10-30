
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./features/auth/Login";
//import Table from "./features/clients/Table";
import AppLayout from "./features/ui/AppLayout";
import Error from "./features/ui/Error";
import Tables from "./features/clients/Tables";
import PaginatedItems from "./features/clients/PaginatedItems";


const router=createBrowserRouter([

    {
        element: <AppLayout/>,
        errorElement: <Error/>,
        children:[

    {
        path: '/',
        element: <Login/>,
        errorElement: <Error/>,

    },

    {
        path: '/table',
        element: <PaginatedItems/>,
        errorElement: <Error/>
        
    }
    ]
}
]

)


function App() {


  return (
  <RouterProvider router={router}/>
  )
}

export default App
