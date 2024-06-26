import { useState, useMemo } from "react";

import { Info } from "./info";

import { useGetUsersQuery } from "../../api";

export const List = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  const { data: users, isLoading } = useGetUsersQuery();

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((userA, userB) => {
      switch (sort) {
        case "asc":
          return userA?.name.localeCompare(userB.name);
        case "desc":
          return userB?.name.localeCompare(userA.name);
      }
    });
  }, [users, sort]);

  // селекторы вызываются после каждого экшона
  // const sortedUsers = useAppSelector((state) =>
  //   usersSlice.selectors.users(state, sort)
  // );

  // вынесли логику отдельно от реализации UI
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   getUsersData(store.getState, dispatch)
  // }, [dispatch]);

  // console.log(`users`);

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      <h2>Список пользователей</h2>

      <button onClick={() => setSort("asc")}>asc</button>

      <button onClick={() => setSort("desc")}>desc</button>

      {sortedUsers.map((user) => (
        <Info
          key={user.id}
          name={user.name}
          description={user.description}
          id={user.id}
        />
      ))}
    </>
  );
};
