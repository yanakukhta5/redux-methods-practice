// import { z } from "zod";

import { User } from "../../modules/users/slice";

const baseUrl = "http://localhost:3000";

// dto - на сленге описание "транспортного" (не полноценный объект из бизнес логики) объекта, т.е. "который приходит с сервера"
// const UserDtoSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   description: z.string(),
// });

export const api = {
  getUsers: (): Promise<User[]> => {
    return fetch(`${baseUrl}/users`).then((response) => response.json());
    // .then((data) => UserDtoSchema.array().parse(data));
  },

  getUser: (id: number) => {
    return fetch(`${baseUrl}/users/${id}`).then((response) => response.json());
    //  .then((data) => UserDtoSchema.parse(data));
  },

  deleteUser: (id: number) => {
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE'
    }).then((response) => response.json());
  },
};
