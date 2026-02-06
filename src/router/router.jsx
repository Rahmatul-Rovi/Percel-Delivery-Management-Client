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
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../Routes/RiderRoute";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyReviews from "../Pages/Dashboard/MyReviews/MyReviews";
import AdminStatistics from "../Pages/Dashboard/AdminStatistics/AdminStatistics";
import MyProfile from "../Pages/Shared/MyProfile/MyProfile";
import AboutUs from "../Pages/Shared/AboutUs/AboutUs";
import ContactUs from "../Pages/Shared/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
      },
      {
        path: "contactUs",
        Component: ContactUs,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "beARider",
        element: (
          <PrivateRoute>
            {" "}
            <BeARider></BeARider>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            {" "}
            <SendParcel></SendParcel>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashBoardLayout></DashBoardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:id",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },

      // Rider Only Routes
      {
        path: "pendingDeliveries",
        element: (
          <RiderRoute>
            {" "}
            <PendingDeliveries></PendingDeliveries>{" "}
          </RiderRoute>
        ),
      },
      {
        path: "completedDeliveries",
        element: (
          <RiderRoute>
            {" "}
            <CompletedDeliveries></CompletedDeliveries>{" "}
          </RiderRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <RiderRoute>
            {" "}
            <MyReviews></MyReviews>{" "}
          </RiderRoute>
        ),
      },

      // Admin Only Routes
      {
        path: "assignRider",
        element: (
          <AdminRoute>
            {" "}
            <AssignRider></AssignRider>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "pendingRiders",
        element: (
          <AdminRoute>
            {" "}
            <PendingRiders></PendingRiders>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "activeRiders",
        element: (
          <AdminRoute>
            {" "}
            <ActiveRiders></ActiveRiders>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "adminStatistics",
        element: (
          <AdminRoute>
            {" "}
            <AdminStatistics></AdminStatistics>{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);
