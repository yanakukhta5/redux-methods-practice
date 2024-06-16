import { configureStore, createSelector } from "@reduxjs/toolkit";

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

type GlobalState = {
  counters: Record<CounterId, State | undefined>;
  users: UsersStore;
};

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

type UserAction = GetUsersAction | SetSelectedUserIdAction | ResetSelectedUserIdAction;

// дефолтное состояние каунтера (при первом редюсера вызове его нет)
const initialCounterState: State = {
  counter: 0,
};

// описали состояние и экшон и можно создать редюсер
const reducer = (
  state: GlobalState = {
    counters: {},
    users: {
      selectedUserId: undefined,
      ids: [],
      usersData: {},
    },
  },
  action: Action | UserAction
): GlobalState => {
  // иммутабельное обновление
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const counterObject = state.counters[counterId] ?? initialCounterState;

      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { ...counterObject, counter: counterObject.counter + 1 },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const counterObject = state.counters[counterId] ?? initialCounterState;

      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: { ...counterObject, counter: counterObject.counter - 1 },
        },
      };
    }

    // описание экшенов для юзеров

    case "getUsersAction": {
      const { users } = action.payload;

      return {
        ...state,
        users: {
          ...state.users,
          usersData: users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as Record<UserId, User>),
          ids: users.map((user) => user.id),
        },
      };
    }

    case "setSelectedUserId": {
      const { id } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: id,
        },
      };
    }

    case "resetSelectedUserId": {
      return {
        ...state,
        users: {
          ...state.users,
          selectedUserId: undefined,
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
