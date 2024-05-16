import { createBrowserRouter } from 'react-router-dom';

import {
  Contact,
  action as contactAction,
  loader as contactLoader,
} from 'routes/Contact';
import { action as destroyAction } from '~/routes/Destroy';
import { Edit, action as editAction } from '~/routes/Edit';
import { Index } from '~/routes/Index';
import {
  Root,
  action as rootAction,
  loader as rootLoader,
} from '~/routes/Root';

import { ErrorPage } from './ErrorPage';

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: '/contacts/:contactId/edit',
            element: <Edit />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
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
