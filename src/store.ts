import {
  combineReducers,
  configureStore,
  type UnknownAction, type ThunkAction
} from "@reduxjs/toolkit";

import { useSelector, useDispatch, useStore } from "react-redux";

import { api } from "./shared/api";

import { countersReducer } from "./modules/counters";
import { usersSlice } from "./modules/users";

// type GlobalState = {
//   counters: CountersState;
//   users: UsersStore;
// };

// type Action = UserAction | CountersAction;

// const initialState = {
//   users: initialUsersState,
//   counters: initialCountersState,
// }

// const reducer = (
//   state: GlobalState = initialState,
//   action: Action
// ): GlobalState => {
//   return {
//     users: usersReducer(state.users, action),
//     counters: countersReducer(state.counters, action),
//   };
// };

// логически разделили редюсеры и скомбинировали их в один
// на каждый экшон вызывается редюсер, и уже редюсер решает что делать с изменениями

const reducer = combineReducers({
  [usersSlice.name]: usersSlice.reducer,
  counters: countersReducer,
});

const extraArgument = { // объект дополнительных данных, которые мы может использовать в middleware
  api,
};

type ExtraArgumentType = typeof extraArgument;

export const store = configureStore({
  reducer: reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnOfThunk = void> = ThunkAction<
  ReturnOfThunk, // Return type of the thunk function
  RootState, // state type used by getState
  ExtraArgumentType, // any "extra argument" injected into the thunk
  UnknownAction // known types of actions that can be dispatched
>

// = (
//   dispatch: ThunkDispatch<RootState, ExtraArgumentType, UnknownAction>,
//   getState: () => RootState,
//   extraArgument: ExtraArgumentType
// ) => ReturnOfThunk

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
