import React from "react";
import "./App.css";

import { useRoutes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register";
import {ManageUsers} from "./pages/ManageUsers/ManageUsers";
import {ServiceTicket} from "./pages/ServiceTicket";
import {ManageTechnicians} from "./pages/ManageTechnicians";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/manageusers",
      element: <ManageUsers/>,
    },
    {
      path: "/serviceticket",
      element: <ServiceTicket/>,
    },
    {
      path: "/managetechnicians",
      element: <ManageTechnicians/>,
    },
  ]);
  return routes;
}

export default App;
