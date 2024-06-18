import { RootState } from "./store"
import { createAppSelector } from './helpers'

export type User = {
 name: string;
 id: string;
};

type UserId = string;

type UsersState = {
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

type Action =
 | GetUsersAction
 | SetSelectedUserIdAction
 | ResetSelectedUserIdAction;

export const initialUsersState = {
 selectedUserId: undefined,
 ids: [],
 usersData: {},
};

// описали состояние и экшон и можно создать редюсер
export const usersReducer = (
 state: UsersState = initialUsersState,
 action: Action
): UsersState => {
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
}

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
