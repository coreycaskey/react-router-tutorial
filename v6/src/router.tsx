import { createBrowserRouter } from "react-router-dom";

import { Index } from "~/routes";
import {
  Contact,
  action as contactAction,
  loader as contactLoader,
} from "~/routes/contact";
import { action as destroyAction } from "~/routes/destroy";
import {
  Edit,
  action as editAction,
  loader as editLoader,
} from "~/routes/edit";
import {
  Root,
  action as rootAction,
  loader as rootLoader,
} from "~/routes/root";

import { ErrorPage } from "./ErrorPage";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <Edit />,
            loader: editLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>, // contextual error message
          },
          {
            index: true,
            element: <Index />,
          },
        ],
      },
    ],
  },
]);
