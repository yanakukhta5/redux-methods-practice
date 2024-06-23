// type InfoProps = {
//  id: number
//  name: string
//  description: string
// }

// export const Info = ({id, name, description}: InfoProps) => {
//   return (
//     <p>
//       id: {id}, name: {name}, description: {description}
//     </p>
//   );
// };

// можно достать данные через стор и переданный через props id

import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../../../store";

import { usersSlice } from "../../../slice";

export const Info = ({id}: {id: number}) => {
 const user = useAppSelector((state) => usersSlice.selectors.user(state, id))

 const dispatch = useAppDispatch()

 const navigate = useNavigate()

 if (!user) return

  return (
    <p onClick={() => {
     dispatch(usersSlice.actions.setSelectedId({id}))
     navigate(`/user/${id}`)
    }}>
      id: {user.id}, name: {user.name}, description: {user.description}
    </p>
  );
};
