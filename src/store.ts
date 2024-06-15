import { configureStore } from "@reduxjs/toolkit";

type State = {
  counter: number;
};

export type IncrementAction = {
  type: "increment";
};

export type DecrementAction = {
  type: "decrement";
};

type Action = IncrementAction | DecrementAction;

// дефолтное состояние (при первом редюсера вызове его нет)
const initialState: State = {
  counter: 0,
};

// описали состояние и экшон и можно создать редюсер
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "increment":
      return {
        // иммутабельное обновление
        ...state,
        counter: ++state.counter,
      };
    case "decrement":
      return {
        // иммутабельное обновление
        ...state,
        counter: --state.counter,
      };
    default:
      return state; // иммутабельное обновление
  }
};

export const store = configureStore({
  reducer: reducer,
});
