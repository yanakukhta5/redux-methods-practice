import { createAction, createReducer } from "@reduxjs/toolkit";

import { RootState } from "./store";

export const incrementAction = createAction<{
  counterId: number;
}>("counters/increment");

export const decrementAction = createAction<{
  counterId: number;
}>("counters/decrement");

// export type IncrementAction = {
//   type: "increment";
//   payload: {
//     counterId: number;
//   };
// };

// export type DecrementAction = {
//   type: "decrement";
//   payload: {
//     counterId: number;
//   };
// };

//export type Action = IncrementAction | DecrementAction;

export type CounterId = number;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

// дефолтное состояние каунтера (при первом редюсера вызове его нет)
export const initialCounterState: CounterState = {
  counter: 0,
};

export const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(incrementAction, (state, action) => {
      const { counterId } = action.payload;
      // const counterObject = state[counterId] ?? initialCounterState;

      if (!state[counterId]) state[counterId] = { ...initialCounterState };

      state[counterId]!.counter++;

      // return {
      //   ...state,
      //   [counterId]: { ...counterObject, counter: counterObject.counter + 1 },
      // };
    }),
      builder.addCase(decrementAction, (state, action) => {
        const { counterId } = action.payload;
        // const counterObject = state[counterId] ?? initialCounterState;

        if (!state[counterId]) state[counterId] = { ...initialCounterState };

        state[counterId]!.counter--;

        // return {
        //   ...state,
        //   [counterId]: { ...counterObject, counter: counterObject.counter - 1 },
        // };
      });
  }
);

// export const countersReducer = (
//   state: CountersState = initialCountersState,
//   action: Action
// ): CountersState => {
//   switch (action.type) {
//     case "counters/increment": {
//       const { counterId } = action.payload;
//       const counterObject = state[counterId] ?? initialCounterState;

//       return {
//         ...state,
//         [counterId]: { ...counterObject, counter: counterObject.counter + 1 },
//       };
//     }
//     case "counters/decrement": {
//       const { counterId } = action.payload;
//       const counterObject = state[counterId] ?? initialCounterState;

//       return {
//         ...state,
//         [counterId]: { ...counterObject, counter: counterObject.counter - 1 },
//       };
//     }

//     default:
//       return state;
//   }
// };

export const selectorCounter = (store: RootState, counterId: CounterId) =>
  store.counters[counterId];
