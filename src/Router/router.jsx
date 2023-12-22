
import {
    createBrowserRouter,
 
  } from "react-router-dom";
import MainLay from "../LayOut/MainLay";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Dashboard from "../LayOut/Dashboard";
import CreateTask from "../Page/DashBoardPage/CreateTask/CreateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLay></MainLay>,
    children:[
        {
            path: "/",
            element: <Home></Home>,
        },
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
            path: "/register",
            element: <Register></Register>,
        }
    ]
  },
  {
    path:'/dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
        path:'dashboard/createtask',
        element:<CreateTask></CreateTask>
      }
    ]
  }
]);
export default router;