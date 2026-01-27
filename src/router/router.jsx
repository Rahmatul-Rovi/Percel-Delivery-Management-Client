import { createBrowserRouter } from "react-router";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "coverage",
          Component: Coverage
        },
        {
          path: "sendParcel",
          element: <PrivateRoute> <SendParcel></SendParcel> </PrivateRoute>
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
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute> <DashBoardLayout></DashBoardLayout> </PrivateRoute>,
    children: [
     {
       path: "myParcels",
      Component: MyParcels
     },
     {
      path: "payment/:id",
      Component: Payment
     },
     {
      path: "paymentHistory",
      Component: PaymentHistory
     },
     {
      path: "track",
      Component: TrackParcel
     }
    ]
  }
]);