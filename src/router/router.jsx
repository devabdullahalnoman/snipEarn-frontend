import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/rootLayout/MainLayout";
import Home from "../pages/homepage/Home";
import AuthLayout from "../layout/authLayout/AuthLayout";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardHome from "../pages/dashboard/dashboardHome/DashboardHome";
import WorkerRoute from "../routes/WorkerRoute";
import WorkerDashboard from "../pages/dashboard/worker/WorkerDashboard";
import TaskList from "../pages/dashboard/worker/TaskList";
import MySubmissions from "../pages/dashboard/worker/MySubmission";
import AddTask from "../pages/dashboard/buyerDashboard/AddTask";
import BuyerRoute from "../routes/BuyerRoute";
import MyTasks from "../pages/dashboard/buyerDashboard/MyTasks";
import TaskDetails from "../pages/dashboard/worker/TaskDetails";
import PurchaseCoins from "../pages/dashboard/buyerDashboard/PurchaseCoins";
import PaymentHistory from "../pages/dashboard/buyerDashboard/PaymentHistory";
import Withdrawals from "../pages/dashboard/worker/Withdrawals";
import AdminDashboard from "../pages/dashboard/adminDashboard/AdminDashboard";
import AdminRoute from "../routes/AdminRoute";
import ManageUsers from "../pages/dashboard/adminDashboard/ManageUsers";
import ManageTasks from "../pages/dashboard/adminDashboard/ManageTasks";
import Forbidden from "../pages/forbidden/Forbidden";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "worker",
        element: (
          <WorkerRoute>
            <WorkerDashboard></WorkerDashboard>
          </WorkerRoute>
        ),
      },
      {
        path: "worker/task-list",
        element: (
          <WorkerRoute>
            <TaskList></TaskList>
          </WorkerRoute>
        ),
      },
      {
        path: "worker/task-details/:id",
        element: (
          <WorkerRoute>
            <TaskDetails></TaskDetails>
          </WorkerRoute>
        ),
      },
      {
        path: "worker/my-submissions",
        element: (
          <WorkerRoute>
            <MySubmissions></MySubmissions>
          </WorkerRoute>
        ),
      },
      {
        path: "worker/withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals></Withdrawals>
          </WorkerRoute>
        ),
      },
      {
        path: "buyer/add-task",
        element: (
          <BuyerRoute>
            <AddTask></AddTask>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/my-tasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/purchase-coin",
        element: (
          <BuyerRoute>
            <PurchaseCoins></PurchaseCoins>
          </BuyerRoute>
        ),
      },
      {
        path: "buyer/payments",
        element: (
          <BuyerRoute>
            <PaymentHistory></PaymentHistory>
          </BuyerRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-tasks",
        element: (
          <AdminRoute>
            <ManageTasks></ManageTasks>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Forbidden></Forbidden>,
  },
]);

export default router;
