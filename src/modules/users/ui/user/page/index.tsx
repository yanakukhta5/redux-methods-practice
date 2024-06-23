import { useParams, useNavigate } from "react-router-dom";

import { usersSlice } from "../../../slice";
import { useAppSelector } from "../../../../../store";

export const UserPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  if (!id) navigate('/users')

  const user = useAppSelector((state) => usersSlice.selectors.user(state, +id!))

  return (
    <div>
      <h1>{user?.name}</h1>

      <p>{user?.description}</p>
    </div>
  );
};
