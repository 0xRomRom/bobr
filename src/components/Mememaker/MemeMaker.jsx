import stl from "./MemeMaker.module.css";
import { Canvas, FabricImage, ActiveSelection, Textbox } from "fabric";
import { FiUpload } from "react-icons/fi";

const MemeMaker = () => {
  return (
    <div className={stl.mememaker}>
      <h1>BOBR Maker</h1>
      <div className={stl.makerModal}>
        <div className={stl.canvasWrap}>
          <span className={stl.uploadSpan}>
            <FiUpload />
            Upload Image
          </span>
        </div>
        <div className={stl.bar}></div>
        <div className={stl.bar}></div>
      </div>
    </div>
  );
};

export default MemeMaker;
