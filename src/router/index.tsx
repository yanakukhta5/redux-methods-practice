import { createBrowserRouter, redirect } from "react-router-dom";

import App from "../App.tsx";

import { Counter } from "../modules/counters/ui/counter";
import { List, UserPage } from "../modules/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, loader: () => redirect("/users") },
      {
        path: "users",
        element: <List />,
      },
      { path: "user/:id", element: <UserPage /> },
      { path: "counter", element: <Counter counterId={1} /> }
    ],
  },
]);
