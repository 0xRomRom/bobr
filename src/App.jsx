import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
