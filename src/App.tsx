import { useState } from "react";

import "./App.css";

import {
  decrementAction,
  incrementAction,
  selectorCounter,
} from "./counters.slice";

import { usersSlice } from "./users.slice";
import { useAppDispatch, useAppSelector } from "./store";

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

  // можно сделать биндинги при желании и вместо dispatch(decrementAction({ counterId })) писать bindedActions.decrementAction({ counterId })
  // const bindedActions = bindActionCreators(
  //   {
  //     incrementAction,
  //     decrementAction,
  //   },
  //   dispatch
  // );

  return (
    <div className="card">
      <button onClick={() => dispatch(incrementAction({ counterId }))}>
        increment
      </button>

      <button onClick={() => dispatch(decrementAction({ counterId }))}>
        decrement
      </button>
      <p>count is {counter?.counter || 0}</p>
    </div>
  );
};

const UsersList = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // селекторы вызываются после каждого экшона
  const sortedUsers = useAppSelector((state) => usersSlice.selectors.users(state, sort));

  console.log(`users`);

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
