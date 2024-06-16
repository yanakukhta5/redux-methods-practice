import "./App.css";
import {
  DecrementAction,
  IncrementAction,
  store,
  useAppDispatch,
  useAppSelector,
  selectorCounter,
} from "./store";
import { Provider } from "react-redux";

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

function App() {
  return (
    <Provider store={store}>
      <Counter counterId={1} />
      <Counter counterId={2} />
      <Counter counterId={3} />
    </Provider>
  );
}

export default App;
