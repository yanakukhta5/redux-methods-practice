import { PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit";

export type User = {
  name: string;
  id: string;
};

type UserId = string;

type UsersState = {
  data: Record<UserId, User | undefined>;
  ids: UserId[];
  selectedUserId: UserId | undefined;
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
    getData(state, action: PayloadAction<{ users: User[] }>) {
      const { users } = action.payload;

      state.data = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<UserId, User>);

      state.ids = users.map((user) => user.id);
    },

    setSelectedId(state, action: PayloadAction<{ id: UserId }>) {
      state.selectedUserId = action.payload.id;
    },

    resetSelectedId(state) {
      state.selectedUserId = undefined;
    },
  },
  selectors: {
    users: createSelector(
      (store: UsersState) => store.ids,
      (store: UsersState) => store.data,
      (_: UsersState, sort: "asc" | "desc") => sort,

      (ids, users, sort) =>
        (ids.map((id) => users[id]) as User[]).sort((userA, userB) => {
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
