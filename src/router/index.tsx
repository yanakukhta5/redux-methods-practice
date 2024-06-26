import { createBrowserRouter, redirect } from "react-router-dom";

import App from "../app";

import { store } from "../app/store";

import { Counter } from "../modules/counters/ui/counter";
import { List, UserPage } from "../modules/users";

import { getUsersData } from "../modules/users/model";

import { usersSlice } from "../modules/users";

// избавились от запросов внутри ui, вынесли в "инфраструктурный" уровень
const loadStore = () => new Promise((resolve) => setTimeout(resolve, 0));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, loader: () => redirect("/users") },
      {
        path: "users",
        element: <List />,
        loader: () => {
          loadStore().then(() => store.dispatch(getUsersData({ refetch: false })))
          return null
        },
      },
      {
        path: "user/:id",
        element: <UserPage />,
        loader: ({ params: { id } }) => {
          loadStore().then(() => store.dispatch(usersSlice.actions.getUser({ userId: +id! })))
          return null
        },
      },
      { path: "counter", element: <Counter counterId={1} /> },
    ],
  },
]);
