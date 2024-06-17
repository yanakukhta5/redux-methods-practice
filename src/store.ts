import { combineReducers, configureStore, createSelector } from "@reduxjs/toolkit";

import { useSelector, useDispatch, useStore } from "react-redux";

// type GlobalState = {
//   counters: CountersState;
//   users: UsersStore;
// };

type Action = UserAction | CountersAction;

// описание стора пользователя, его типов
export type User = {
  name: string;
  id: string;
};

type UserId = string;

type UsersStore = {
  usersData: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
};

export type GetUsersAction = {
  type: "getUsersAction";
  payload: {
    users: User[];
  };
};

export type SetSelectedUserIdAction = {
  type: "setSelectedUserId";
  payload: {
    id: UserId;
  };
};

export type ResetSelectedUserIdAction = {
  type: "resetSelectedUserId";
};

type UserAction =
  | GetUsersAction
  | SetSelectedUserIdAction
  | ResetSelectedUserIdAction;

const initialUsersState = {
  selectedUserId: undefined,
  ids: [],
  usersData: {},
};

// описали состояние и экшон и можно создать редюсер
const usersReducer = (
  state: UsersStore = initialUsersState,
  action: Action
): UsersStore => {
  // иммутабельное обновление
  switch (action.type) {
    // описание экшенов для юзеров

    case "getUsersAction": {
      const { users } = action.payload;

      return {
        ...state,
        usersData: users.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {} as Record<UserId, User>),
        ids: users.map((user) => user.id),
      };
    }

    case "setSelectedUserId": {
      const { id } = action.payload;
      return {
        ...state,
        selectedUserId: id,
      };
    }

    case "resetSelectedUserId": {
      return {
        ...state,
        selectedUserId: undefined,
      };
    }

    default:
      return state;
  }
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

type CountersAction = IncrementAction | DecrementAction;

export type CounterId = number;

type CounterState = {
  counter: number;
};

type CountersState = Record<CounterId, CounterState | undefined>;

// дефолтное состояние каунтера (при первом редюсера вызове его нет)
const initialCounterState: CounterState = {
  counter: 0,
};

const initialCountersState = {};

const countersReducer = (
  state: CountersState = initialCountersState,
  action: Action
): CountersState => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const counterObject = state[counterId] ?? initialCounterState;

      return {
        ...state,
        [counterId]: { ...counterObject, counter: counterObject.counter + 1 },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const counterObject = state[counterId] ?? initialCounterState;

      return {
        ...state,
        [counterId]: { ...counterObject, counter: counterObject.counter - 1 },
      };
    }

    default:
      return state;
  }
};




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
  users: usersReducer,
  counters: countersReducer
})

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
export const createAppSelector = createSelector.withTypes<RootState>();

// реселект для избежания пересоздания лишних ссылок (или при использовании алгоритмов высокой сложности)
// лучше хранить рядом со стором для инкапсуляции логики его использования (архитектура)
// реселект кеширует вычисления
export const usersSelector = createAppSelector(
  (store: RootState) => store.users.ids,
  (store: RootState) => store.users.usersData,
  (_: RootState, sort: "asc" | "desc") => sort,
  (ids, users, sort) =>
    (ids.map((id) => users[id]) as User[]).sort((userA, userB) => {
      switch (sort) {
        case "asc":
          return userA?.name.localeCompare(userB.name);
        case "desc":
          return userB?.name.localeCompare(userA.name);
      }
    })
);
