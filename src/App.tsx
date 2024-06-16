import { useEffect, useState } from "react";

import "./App.css";
import {
  DecrementAction,
  IncrementAction,
  useAppDispatch,
  useAppSelector,
  selectorCounter,
  GetUsersAction,
  User,
} from "./store";

const Counter = ({ counterId }: { counterId: number }) => {
  // const [, forseUpdate] = useReducer((x) => x + 1, 0);

  // const selectorCounter = (store: StoreType, counterId: CounterId) =>
  //   store.counters[counterId];

  // const lastState = useRef<ReturnType<typeof selectorCounter>>(
  //   selectorCounter(store.getState(), counterId)
  // )

  // useEffect(() => {
  //   // переданная функция вызывается после обновления состояния
  //   const unsubscribe = store.subscribe(() => {
  //     const currentState = selectorCounter(store.getState(), counterId);

  //     if (lastState.current !== currentState) {
  //       forseUpdate();
  //     }

  //     lastState.current = currentState;
  //   })
  //   return unsubscribe;
  // }, [counterId]);

  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => selectorCounter(state, counterId));

  console.log("counter: " + counterId);

  return (
    <div className="card">
      <button
        onClick={() =>
          dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies IncrementAction)
        }
      >
        increment
      </button>

      <button
        onClick={() => {
          dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies DecrementAction);
        }}
      >
        decrement
      </button>
      <p>count is {counter?.counter}</p>
    </div>
  );
};

const UsersList = () => {
  const ids = useAppSelector((store) => store.users.ids);
  const users = useAppSelector((store) => store.users.usersData);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  console.log(`users`);

  const sortedUsers = (ids.map((id) => users[id]) as User[]).sort(
    (userA, userB) => {
      switch (sort) {
        case "asc":
          return userA?.name.localeCompare(userB.name);
        case "desc":
          return userB?.name.localeCompare(userA.name);
      }
    }
  );

  return (
    <>
      <h2>Список пользователей</h2>

      <button onClick={() => setSort("asc")}>asc</button>

      <button onClick={() => setSort("desc")}>desc</button>
      {sortedUsers.map((user) =>
        user ? (
          <p key={user.id}>
            id: {user.id}, name: {user.name}
          </p>
        ) : (
          ""
        )
      )}
    </>
  );
};

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: "getUsersAction",
      payload: {
        users: [
          { name: "Yana", id: "1" },
          { name: "Andrew", id: "2" },
        ],
      },
    } as GetUsersAction);
  }, [dispatch]);

  return (
    <>
      <Counter counterId={1} />
      <Counter counterId={2} />
      <Counter counterId={3} />

      <UsersList />
    </>
  );
}

export default App;
