import { useReducer, useEffect, useRef } from "react";
import "./App.css";
import {
  DecrementAction,
  IncrementAction,
  store,
  StoreType,
  CounterId,
} from "./store";

const Counter = ({ counterId }: { counterId: number }) => {
  const [, forseUpdate] = useReducer((x) => x + 1, 0);

  const selectorCounter = (store: StoreType, counterId: CounterId) =>
    store.counters[counterId];

  const lastState = useRef<ReturnType<typeof selectorCounter>>(
    selectorCounter(store.getState(), counterId)
  );

  console.log(counterId)

  useEffect(() => {
    // переданная функция вызывается после обновления состояния
    const unsubscribe = store.subscribe(() => {
      const currentState = selectorCounter(store.getState(), counterId);

      if (lastState.current !== currentState) {
        forseUpdate();
      }

      lastState.current = currentState;
    })
    return unsubscribe;
  }, [counterId]);

  return (
    <div className="card">
      <button
        onClick={() =>
          store.dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies IncrementAction)
        }
      >
        increment
      </button>

      <button
        onClick={() => {
          store.dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies DecrementAction);
        }}
      >
        decrement
      </button>
      <p>count is {store.getState().counters?.[counterId]?.counter}</p>
    </div>
  );
};

function App() {
  return (
    <div>
      <Counter counterId={1} />
      <Counter counterId={2} />
      <Counter counterId={3} />
    </div>
  );
}

export default App;
