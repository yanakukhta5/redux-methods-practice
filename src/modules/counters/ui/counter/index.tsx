import {
  decrementAction,
  incrementAction,
  selectorCounter,
} from "../../slice";

import { useAppDispatch, useAppSelector } from "../../../../shared/redux";

export const Counter = ({ counterId }: { counterId: number }) => {
 // const [, forseUpdate] = useReducer((x) => x + 1, 0);

 // const selectorCounter = (store: StoreType, counterId: CounterId) =>
 //   store.counters[counterId];

 // const lastState = useRef<ReturnType<typeof selectorCounter>>(
 //   selectorCounter(store.getState(), counterId)
 // )

 // useEffect(() => {
 //   // переданная функция вызывается после обновления состояния
 //   const unsubscribe = store.subscribe(() => {
 //     const currentState = selectorCounter(store.getState(), counterId);

 //     if (lastState.current !== currentState) {
 //       forseUpdate();
 //     }

 //     lastState.current = currentState;
 //   })
 //   return unsubscribe;
 // }, [counterId]);

 const dispatch = useAppDispatch();

 const counter = useAppSelector((state) => selectorCounter(state, counterId));

 console.log("counter number " + counterId);

 // можно сделать биндинги при желании и вместо dispatch(decrementAction({ counterId })) писать bindedActions.decrementAction({ counterId })
 // const bindedActions = bindActionCreators(
 //   {
 //     incrementAction,
 //     decrementAction,
 //   },
 //   dispatch
 // );

 return (
   <div className="card">
     <button onClick={() => dispatch(incrementAction({ counterId }))}>
       increment
     </button>

     <button onClick={() => dispatch(decrementAction({ counterId }))}>
       decrement
     </button>
     <p>count is {counter?.counter || 0}</p>
   </div>
 );
};