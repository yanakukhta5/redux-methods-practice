import { AppThunk } from "../../../store";
import { usersSlice } from "../slice";

export const getUsersData =
  (): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.isDataIdle(getState());
    if (!isIdle) return;

    dispatch(usersSlice.actions.setDataQueryStatePending());
    api
      .getUsers()
      .then((response) =>
        dispatch(usersSlice.actions.setData({ users: response }))
      );
  };
