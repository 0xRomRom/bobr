import stl from "./MemeMaker.module.css";
import { Canvas, FabricImage, ActiveSelection, Textbox } from "fabric";
import { FiUpload } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";

const MemeMaker = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canvas, setCanvas] = useState(false);
  const [fileArray, setFileArray] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = () => {
          if (fileArray.length === 0) {
            canvas.setWidth(imgObj.width);
            canvas.setHeight(imgObj.height);
          }
          const fabricImg = new FabricImage(imgObj);
          fabricImg.set({
            left: 0,
            top: 0,
            selectable: true,
          });
          setFileArray((prev) => [...prev, { ...fabricImg, name: file.name }]);
          canvas.add(fabricImg);
          canvas.renderAll();
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={stl.mememaker}>
      <h1>BOBR Maker</h1>
      <div className={stl.makerModal}>
        <div className={stl.canvasWrap}>
          <span className={stl.uploadSpan} onClick={handleAddImageClick}>
            <FiUpload />
            Upload Image
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={stl.hidden}
          />
        </div>
        <div className={stl.bar}></div>
        <div className={stl.bar}></div>
      </div>
    </div>
  );
};

export default MemeMaker;
