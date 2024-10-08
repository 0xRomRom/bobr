import stl from "./Nav.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = () => {
    if (location.pathname === "/mememaker") {
      navigate("/");
    } else {
      navigate("/mememaker");
    }
  };

  return (
    <nav>
      <button
        onClick={() =>
          window.open("https://magiceden.io/marketplace/bobardio", "_blank")
        }
        className={stl.nft}
      >
        NFT
      </button>
      <button onClick={() => window.open("https://x.com/bobrCTO", "_blank")}>
        <FaXTwitter />
      </button>
      <button onClick={() => window.open("https://t.me/bobrportal", "_blank")}>
        <FaTelegramPlane />
      </button>
      <span className={stl.memeMaker} onClick={handleNavigation}>
        {location.pathname === "/mememaker" ? "Home" : "Meme Maker"}
      </span>
    </nav>
  );
};

export default Nav;
