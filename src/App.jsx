import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from './pages/homePage';
import InvitationPage from "./pages/invitationPage";
import InvitationVisitedPage from "./pages/invitation-visited";
import Update from './components/UpdateRecipient/Update';
import Edit from './contoiners/Table/Edit user';
import Card from "./contoiners/Card/index";
import AddRecipient from './components/AddRecipient/index';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/invitation/:id',
      element: <InvitationPage />,
    },
    {
      path: '/visited/:id',
      element: <InvitationVisitedPage />,
    },
    {
      path: '/update/:id',
      element: <Update />,
    },
    {
      path: '/edit/:id',
      element: <Edit />,
    },
    {
      path: '/cards',
      element: <Card />,
    },
    {
      path: 'add',
      element: <AddRecipient />,
    },
  ]);
  return <RouterProvider router={router} />
}

export default App;
