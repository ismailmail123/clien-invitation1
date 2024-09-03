import { createBrowserRouter, RouterProvider } from "react-router-dom";

import EditUndangan from "../containers/EditUndangan";
import HomePage from "../pages/HomePage";
import Invitation from "../pages/Invitation";
import Register from "../containers/Register";
import Login from "../containers/Login";
import WeddingEdit from "../containers/WeddingEdit";
import RecipientLists from "../containers/RecipientLists";
import OpenInvitation from "../containers/InvitationHome";
import EditRecipient from "../containers/EditRecipient";
import AddRecipient from "../containers/AddRecipient";
import AddThems from "../containers/AddThems";
import AddSound from "../containers/AddThems";
import Search from "../containers/Search";

const index = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/edit",
      element: <EditUndangan />,
    },
    {
      path: "/invitation/:id",
      element: <Invitation />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/weddingedit",
      element: <WeddingEdit />,
    },
    {
      path: "/list",
      element: <RecipientLists />,
    },
    {
      path: "/open/:id",
      element: <OpenInvitation />,
    },
    {
      path: "/editrecipient/:id",
      element: <EditRecipient />,
    },
    {
      path: "/addrecipient",
      element: <AddRecipient />,
    },
    {
      path: "/addthems",
      element: <AddThems />,
    },
    {
      path: "/addSound",
      element: <AddSound />,
    },
    {
      path: "/search",
      element: <Search />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default index;
