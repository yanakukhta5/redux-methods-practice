import { createBrowserRouter, redirect } from "react-router-dom";

import App from "../App.tsx";

import { store } from "../store";

import { Counter } from "../modules/counters/ui/counter";
import { List, UserPage } from "../modules/users";

import { getUserData, getUsersData } from "../modules/users/model";

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
          loadStore().then(() => store.dispatch(getUserData({ userId: +id! })))
          return null
        },
      },
      { path: "counter", element: <Counter counterId={1} /> },
    ],
  },
]);
