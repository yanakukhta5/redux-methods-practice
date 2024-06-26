import { baseApi } from "../../shared/api";

import { UserId, type User } from "./slice";

// лучше не переусложнять работу с тегами
// перезапрашиваются только актуальные запросы

// injectEndpoints позволяет определить endpoints где-то вовне
export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<
      User[], // первый тип возвращаемое значение
      void // второй тип параметры
    >({
      // query - куда делать запрос (функция которая возвращает строку или объект)
      query: () => "/users",
      providesTags: ["Users", { type: "Users", id: "List" }],
    }),

    getUser: create.query<
      User, // первый тип возвращаемое значение
      UserId // второй тип параметры
    >({
      // query - куда делать запрос (функция которая возвращает строку или объект)
      query: (id) => `/users/${id}`,
      // (result, error, arg)
      providesTags: (_, __, id) => ["Users", { type: "Users", id }],
    }),

    deleteUser: create.mutation<void, UserId>({
      query: (id) => ({
        method: "DELETE",
        url: `/users/${id}`,
      }),
      invalidatesTags: (_, __, id) => [
        "Users",
        { type: "Users", id },
        { type: "Users", id: "List" },
      ],
    }),
  }),
  overrideExisting: true, // чтобы можно было после изменений смотреть без перезагрузки сайта (hot modele replacement)
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } =
  usersApi;
