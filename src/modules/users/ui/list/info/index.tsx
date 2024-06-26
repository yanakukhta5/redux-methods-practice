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

import { useAppDispatch } from "../../../../../shared/redux";

import { usersSlice } from "../../../slice";

export const Info = ({
  id,
  name,
  description,
}: {
  id: number;
  description: string;
  name: string;
}) => {

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <p
      onClick={() => {
        dispatch(usersSlice.actions.setSelectedId({ id }));
        navigate(`/user/${id}`);
      }}
    >
      id: {id}, name: {name}, description: {description}
    </p>
  );
};
