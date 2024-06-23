import { useParams, useNavigate } from "react-router-dom";

import { usersSlice } from "../../../slice";
import {
  useAppSelector,
  useAppDispatch,
  RootState,
} from "../../../../../shared/redux";
import { deleteUser } from "../../../model";

export const UserPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) navigate("/users");

  const user = useAppSelector((state) =>
    usersSlice.selectors.user(state, +id!)
  );

  const isUserPending = useAppSelector(
    (state: RootState) => state.users.entities[+id!] === "pending"
  );

    const isDeletePending = useAppSelector(
      (state: RootState) => state.users.deleteUserStatus === "pending"
    );

  const handleDelete = () => {
    // обработали результат dispatch как промис
    dispatch(deleteUser({ userId: +id! }));
  };

  if (isUserPending) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user?.name}</h1>

      <p>{user?.description}</p>

      <button disabled={isDeletePending} onClick={handleDelete}>delete user</button>
    </div>
  );
};
