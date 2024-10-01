import stl from "./Nav.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const Nav = () => {
  return (
    <nav>
      <button onClick={() => window.open("https://x.com/bobrCTO", "_blank")}>
        <FaXTwitter />
      </button>
      <button onClick={() => window.open("https://t.me/bobrportal", "_blank")}>
        <FaTelegramPlane />
      </button>
      <span className={stl.memeMaker}>Meme Maker</span>
    </nav>
  );
};

export default Nav;
