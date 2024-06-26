import { useParams, useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

// import { useAppDispatch } from "../../../../../shared/redux";

import { useGetUserQuery, useDeleteUserMutation } from "../../../api";

//import { deleteUser } from "../../../model";

export const UserPage = () => {
 // const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) navigate("/users");

  // если передан skipToken? то запрос выполнен не будет
  const { data: user, isLoading } = useGetUserQuery(+id! ?? skipToken); 

  // первый аргумент - функция для вызова мутации, второй - состояние её выполнения
  const [deleteUser, {isLoading: isLoadingUserDelete}] = useDeleteUserMutation()

  // const handleDelete = () => {
  //   // обработали результат dispatch как промис
  //   dispatch(deleteUser({ userId: +id! }));
  // };

    const handleDelete = async () => {
      if (!id) return
      await deleteUser(+id)
      navigate("/users");
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user?.name}</h1>

      <p>{user?.description}</p>

      <button disabled={isLoadingUserDelete} onClick={handleDelete}>
        delete user
      </button>
    </div>
  );
};
