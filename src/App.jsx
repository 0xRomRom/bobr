import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/nav/Nav";
import MemeMaker from "./components/Mememaker/MemeMaker";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/mememaker" element={<MemeMaker />} />
      </Routes>
    </>
  );
};

export default App;
