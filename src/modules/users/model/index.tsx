import { api } from "../../../shared/api";
import { AppDispatch, RootState } from "../../../store";
import { usersSlice } from "../../../users.slice";

export const getUsersData = (
  getState: () => RootState,
  dispatch: AppDispatch
) => {
  const isIdle = usersSlice.selectors.isDataIdle(getState());
  if (!isIdle) return;

  dispatch(usersSlice.actions.setDataQueryStatePending());
  api
    .getUsers()
    .then((response) =>
      dispatch(usersSlice.actions.setData({ users: response }))
    );
};
