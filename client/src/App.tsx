import React from "react";
import "./App.css";

import { useRoutes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register";

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
  ]);
  return routes;
}

export default App;
