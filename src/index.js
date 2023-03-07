import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Contact } from "./components/Contact/Contact";
import { loader as homeLoader } from "./pages/Home/Home"
import './index.css';
import { Home } from "./pages/Home/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);