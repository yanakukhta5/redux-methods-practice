import { useReducer, useEffect } from "react";
import "./App.css";
import { DecrementAction, IncrementAction, store } from "./store";

const Counter = ({ counterId }: { counterId: number }) => {
  const [, forseUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    // переданная функция вызывается после обновления состояния
    const unsubscribe = store.subscribe(() => forseUpdate());
    return unsubscribe;
  }, []);
  
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
