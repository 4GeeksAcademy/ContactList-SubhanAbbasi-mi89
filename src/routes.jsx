import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import AddContact from "./pages/AddContact.jsx";
import Single from "./pages/Single.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/add-contact", element: <AddContact /> },
      { path: "/edit-contact/:id", element: <AddContact /> },
      { path: "/single/:id", element: <Single /> },
    ],
  },
]);