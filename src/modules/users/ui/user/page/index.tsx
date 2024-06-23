import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { usersSlice } from "../../../slice";
import { useAppSelector, useAppDispatch } from "../../../../../store";
import { getUserData } from "../../../model";

export const UserPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams()

  if (!id) navigate("/users");

  useEffect(() => {
    dispatch(getUserData({ userId: +id! }));
  }, [dispatch, id]);

  const user = useAppSelector((state) =>
    usersSlice.selectors.user(state, +id!)
  );

  return (
    <div>
      <h1>{user?.name}</h1>

      <p>{user?.description}</p>

      <button onClick={() => dispatch(usersSlice.actions.deleteUser({userId: +id!}))}>delete user</button>
    </div>
  );
};
