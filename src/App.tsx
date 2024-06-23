import "./App.css";

import { Counter } from "./modules/counters/ui/counter";
import { List } from "./modules/users/ui/list";

function App() {
  return (
    <>
      <Counter counterId={1} />
      {/* <Counter counterId={2} />
      <Counter counterId={3} /> */}

      <List />
    </>
  );
}

export default App;
