import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useSelector, useDispatch, useStore } from "react-redux";

import { countersReducer } from "./counters.slice";
import { usersSlice } from "./users.slice";

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

export const store = configureStore({
  reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
