import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children:[
      {
        path: "login",
        Component: Login
      }
    ]
  }
]);