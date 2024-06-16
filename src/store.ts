import { configureStore } from "@reduxjs/toolkit";

import { useSelector, useDispatch, useStore } from "react-redux";

type State = {
  counter: number;
};

export type IncrementAction = {
  type: "increment";
  payload: {
    counterId: number;
  };
};

export type DecrementAction = {
  type: "decrement";
  payload: {
    counterId: number;
  };
};

type Action = IncrementAction | DecrementAction;

export type CounterId = number;

type CountersState = {
  counters: Record<CounterId, State | undefined>;
};

// дефолтное состояние каунтера (при первом редюсера вызове его нет)
const initialCounterState: State = {
  counter: 0,
};

// описали состояние и экшон и можно создать редюсер
const reducer = (
  state: CountersState = {
    counters: {},
  },
  action: Action
): CountersState => {
  // иммутабельное обновление
  switch (action.type) {
    case "increment": {
      const id = action.payload.counterId;
      const counterObject = state.counters[id] ?? initialCounterState;

      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: { ...counterObject, counter: counterObject.counter + 1 },
        },
      };
    }
    case "decrement": {
      const id = action.payload.counterId;
      const counterObject = state.counters[id] ?? initialCounterState;

      return {
        ...state,
        counters: {
          ...state.counters,
          [id]: { ...counterObject, counter: counterObject.counter - 1 },
        },
      };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: reducer,
});

export const selectorCounter = (store: RootState, counterId: CounterId) =>
  store.counters[counterId];

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
