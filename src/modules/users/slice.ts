import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";

export type User = {
  name: string;
  id: number;
  description: string;
};

export type UserId = number;

type DataQueryState = "idle" | "pending" | "fullfield" | "rejected";

type UsersState = {
  data: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
  dataQueryState: DataQueryState;
  deleteUserStatus:DataQueryState;
  entities: Record<UserId, DataQueryState>;
};

// export type GetUsersAction = {
//   type: "getUsersAction";
//   payload: {
//     users: User[];
//   };
// };

// export type SetSelectedUserIdAction = {
//   type: "setSelectedUserId";
//   payload: {
//     id: UserId;
//   };
// };

// export type ResetSelectedUserIdAction = {
//   type: "resetSelectedUserId";
// };

// type Action =
//   | GetUsersAction
//   | SetSelectedUserIdAction
//   | ResetSelectedUserIdAction;

export const initialState: UsersState = {
  selectedUserId: undefined,
  ids: [],
  data: {},
  dataQueryState: "idle",
  deleteUserStatus: "idle",
  entities: {},
  // данные о состоянии загрузки каждого пользователя
};

// описали состояние и экшон и можно создать редюсер
// export const usersReducer = (
//   state: UsersState = initialState,
//   action: Action
// ): UsersState => {
//   // иммутабельное обновление
//   switch (action.type) {
//     // описание экшенов для юзеров

//     case "getUsersAction": {
//       const { users } = action.payload;

//       return {
//         ...state,
//         data: users.reduce((acc, user) => {
//           acc[user.id] = user;
//           return acc;
//         }, {} as Record<UserId, User>),
//         ids: users.map((user) => user.id),
//       };
//     }

//     case "setSelectedUserId": {
//       const { id } = action.payload;
//       return {
//         ...state,
//         selectedUserId: id,
//       };
//     }

//     case "resetSelectedUserId": {
//       return {
//         ...state,
//         selectedUserId: undefined,
//       };
//     }

//     default:
//       return state;
//   }
// };

// реселект для избежания пересоздания лишних ссылок (или при использовании алгоритмов высокой сложности)
// лучше хранить рядом со стором для инкапсуляции логики его использования (архитектура)
// реселект кеширует вычисления
// export const usersSelector = createAppSelector(
//   (store: RootState) => store.users.ids,
//   (store: RootState) => store.users.data,
//   (_: RootState, sort: "asc" | "desc") => sort,
//   (ids, users, sort) =>
//     (ids.map((id) => users[id]) as User[]).sort((userA, userB) => {
//       switch (sort) {
//         case "asc":
//           return userA?.name.localeCompare(userB.name);
//         case "desc":
//           return userB?.name.localeCompare(userA.name);
//       }
//     })
// );

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setDataQueryStatePending(state: UsersState) {
      state.dataQueryState = "pending";
    },

    setDataQueryStateRejected(state: UsersState) {
      state.dataQueryState = "rejected";
    },

    setData(state, action: PayloadAction<{ users: User[] }>) {
      const { users } = action.payload;

      state.data = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);

      state.ids = users.map((user) => user.id);
      state.dataQueryState = "fullfield";
    },

    deleteUser(state, action: PayloadAction<{ userId: UserId }>){
      const { userId } = action.payload;
      state.data[userId] = undefined;
    },

    setDeleteUserStatus(state, action: PayloadAction<{ status: DataQueryState }>){
      const { status } = action.payload;
      state.deleteUserStatus = status
    },

    setUserData(state, action: PayloadAction<{ user: User }>) {
      const { user } = action.payload;
      state.data[user.id] = user;
    },

    setUserIdState(
      state,
      action: PayloadAction<{ userId: UserId; queryState: DataQueryState }>
    ) {
      const { userId, queryState } = action.payload;
      state.entities[userId] = queryState;
    },

    setSelectedId(state, action: PayloadAction<{ id: UserId }>) {
      state.selectedUserId = action.payload.id;
    },

    resetSelectedId(state) {
      state.selectedUserId = undefined;
    },
  },
  selectors: {
    isDataPending: (store: UsersState) => store.dataQueryState === "pending",
    isDataIdle: (store: UsersState) => store.dataQueryState === "idle",
    user: (store: UsersState, id: UserId) => store.data[id],
    userQueryState: (store: UsersState, id: UserId) => store.entities[id],
    users: createSelector(
      (store: UsersState) => store.ids,
      (store: UsersState) => store.data,
      (_: UsersState, sort: "asc" | "desc") => sort,

      (ids, users, sort) =>
        // (ids.map((id) => users[id]) as User[]).sort((userA, userB) => {
        ids
          .map((id) => users[id])
          .filter((user): user is User => !!user) // добавили type guard
          .sort((userA, userB) => {
            switch (sort) {
              case "asc":
                return userA?.name.localeCompare(userB.name);
              case "desc":
                return userB?.name.localeCompare(userA.name);
            }
          })
    ),
  },
});

// установить и интегрировать роутер
// добавить страницу пользователя (id из роутера) (отображение лоадинга)
// прописать навигации
// добавить селекторы данных о загрузке конкретного пользователя
// добавить thunk для получения пользователя (id передаётся в аргумент, refetch тоже)
// опцианально добавить получение статуса загрузки по id у user
// добавить thunk для удаления пользователя (id передаётся в аргумент, можно снова запросить пользователей с refetch)
