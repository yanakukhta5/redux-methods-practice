import { useState } from "react";

import { usersSlice } from "../../slice";
import { useAppSelector } from "../../../../store";

import { Info } from "./info";

export const List = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // селекторы вызываются после каждого экшона
  const sortedUsers = useAppSelector((state) =>
    usersSlice.selectors.users(state, sort)
  );

  // вынесли логику отдельно от реализации UI
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   getUsersData(store.getState, dispatch)
  // }, [dispatch]);

  // console.log(`users`);

  return (
    <>
      <h2>Список пользователей</h2>

      <button onClick={() => setSort("asc")}>asc</button>

      <button onClick={() => setSort("desc")}>desc</button>
      {sortedUsers.map((user) => user && <Info key={user.id} id={user.id} />)}
    </>
  );
};
