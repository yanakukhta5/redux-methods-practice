import { AppThunk } from "../../../store";
import { usersSlice, UserId } from "../slice";

export const getUsersData =
  ({ refetch }: { refetch?: boolean }): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = usersSlice.selectors.isDataIdle(getState());
    if (!isIdle && !refetch) return;

    dispatch(usersSlice.actions.setDataQueryStatePending());
    api
      .getUsers()
      .then((response) =>
        dispatch(usersSlice.actions.setData({ users: response }))
      );
  };

export const getUserData =
  ({ userId }: { userId: UserId }): AppThunk =>
  (dispatch, getState, { api }) => {
    const queryState = usersSlice.selectors.userQueryState(getState(), userId);

    if (queryState === "idle") return;

    dispatch(
      usersSlice.actions.setUserIdState({
        userId,
        queryState: "pending",
      })
    );

    try {
      api.getUser(userId).then((response) => {
        dispatch(usersSlice.actions.setUserData({ user: response }));

        dispatch(
          usersSlice.actions.setUserIdState({
            userId,
            queryState: "fullfield",
          })
        );
      });
    } catch {
      dispatch(
        usersSlice.actions.setUserIdState({
          userId,
          queryState: "rejected",
        })
      );
    }
  };

export const deleteUser =
  ({ userId }: { userId: UserId }): AppThunk =>
  (dispatch, _, { api }) => {
    api.deleteUser(userId).then(() => {
      dispatch(
        usersSlice.actions.setDeleteUserStatus({
          status: "pending",
        })
      );
      dispatch(usersSlice.actions.deleteUser({ userId }));

      dispatch(getUsersData({ refetch: true }));

      dispatch(
        usersSlice.actions.setDeleteUserStatus({
          status: "fullfield",
        })
      );
    });
  };
