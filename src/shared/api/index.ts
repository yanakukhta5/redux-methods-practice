import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// получение данных (query) - запрос
// изменение данных (mutation) - мутация (POST, DELETE...)

export const baseApi = createApi({
  // baseQuery делает тоже что и инстанс axios или wretch, то есть получает хедеры, базовый url (и т.д.) 
  // то есть то, на основании чего будут делаться все запросы
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000"
  }),
  // теги нужны для помечания запросов и их инвалидации после выполнения мутаций
  tagTypes: ['Users'], 
  // endpoints это определение общих запросов, мутаций и т.д.
  endpoints: () => ({})
})

// export const api = {
//   getUsers: (): Promise<User[]> => {
//     return fetch(`${baseUrl}/users`).then((response) => response.json());
//     // .then((data) => UserDtoSchema.array().parse(data));
//   },

//   getUser: (id: number) => {
//     return fetch(`${baseUrl}/users/${id}`).then((response) => response.json());
//     //  .then((data) => UserDtoSchema.parse(data));
//   },

//   deleteUser: (id: number) => {
//     return fetch(`${baseUrl}/users/${id}`, {
//       method: 'DELETE'
//     }).then((response) => response.json());
//   },
// };
