import { AppThunk, createAppAsyncThunk } from "../../../shared/redux";
import { usersSlice, UserId } from "../slice";

// redux-thunk это простейший способ описания flow приложения в отрыве от ui
// даже router здесь представлен не столько как ui-единица, а стейт менеджер url

// export const getUsersData =
//   ({ refetch }: { refetch?: boolean }): AppThunk<Promise<void>> =>
//   async (dispatch, getState, { api }) => {
//     const isIdle = usersSlice.selectors.isDataIdle(getState());
//     if (!isIdle && !refetch) return;

//     dispatch(usersSlice.actions.setDataQueryStatePending());
//     try {
//       const data = await api.getUsers();
//       dispatch(usersSlice.actions.setData({ users: data }));
//     } catch {
//       dispatch(usersSlice.actions.setDataQueryStateRejected());
//     }
//   };

// getUsersData() создаст экшон {type: "users/getUsersData", payload: users}
// payload это то что возвращает переданная функция
export const getUsersData = createAppAsyncThunk(
  "users/getUsersData",
  async (_: { refetch?: boolean }, thunkAPI) => {
   
    return thunkAPI.extra.api.getUsers();
  }
);

// export const getUserData =
//   ({ userId }: { userId: UserId }): AppThunk<Promise<void>> =>
//   async (dispatch, getState, { api }) => {
//     const queryState = usersSlice.selectors.userQueryState(getState(), userId);

//     if (queryState === "idle") return;

//     dispatch(
//       usersSlice.actions.setUserIdState({
//         userId,
//         queryState: "pending",
//       })
//     );

//     try {
//       const data = await api.getUser(userId);
//       dispatch(usersSlice.actions.getUser({ user: data }));

//       dispatch(
//         usersSlice.actions.setUserIdState({
//           userId,
//           queryState: "fulfilled",
//         })
//       );
//     } catch {
//       dispatch(
//         usersSlice.actions.setUserIdState({
//           userId,
//           queryState: "rejected",
//         })
//       );
//     }
//   };

export const deleteUser =
  // прописали что диспатч возвращает промис


    ({ userId }: { userId: UserId }): AppThunk<Promise<void>> =>
    async (dispatch, _, { api, router }) => {
      dispatch(
        usersSlice.actions.setDeleteUserStatus({
          status: "pending",
        })
      );
      try {
        await api.deleteUser(userId);

        // dispatch(usersSlice.actions.deleteUser({ userId }));

        await dispatch(getUsersData({ refetch: true }));

        await router.navigate("/users");

        dispatch(
          usersSlice.actions.setDeleteUserStatus({
            status: "fulfilled",
          })
        );
      } catch {
        dispatch(
          usersSlice.actions.setDeleteUserStatus({
            status: "rejected",
          })
        );
      }
    };
