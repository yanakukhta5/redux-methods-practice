import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

import { api } from "../shared/api";
import { router } from "../router";

import { countersReducer } from "../modules/counters"
import { usersSlice } from "../modules/users";

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

export const extraArgument = { // объект дополнительных данных, которые мы может использовать в middleware
  api, router
};

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
