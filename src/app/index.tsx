import "./App.css";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
    <header>Хедер</header>
      <Outlet />
    </>
  );
}

export default App;
