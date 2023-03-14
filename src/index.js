import React, { Suspense, lazy } from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import { Home } from "./pages/Home/Home";
const ContactDatails = lazy(async () => (await import('./components/ContactDetails')))
const ContactForm = lazy(async () => (await import('./components/ContactForm')))
const ContactList = lazy(async () => (await import('./components/ContactList')))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: 
          <Suspense fallback={ <h1>Rendering...</h1> }>
            <ContactList />
          </Suspense>
        
      },
      {
        path: "contacts/:contactId",
        element: 
          <Suspense fallback={ <h1>Rendering...</h1> }>
            <ContactDatails />
          </Suspense>
        
      },
      {
        path: "editContact/:contactId",
        element: 
          <Suspense fallback={ <h1>Rendering...</h1> }>
            <ContactForm />
          </Suspense>
      },
      {
        path: "newContact",
        element: 
          <Suspense fallback={ <h1>Rendering...</h1> }>
            <ContactForm />
          </Suspense>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);