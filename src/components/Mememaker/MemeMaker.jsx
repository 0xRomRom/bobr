import stl from "./MemeMaker.module.css";
import { Canvas, FabricImage, ActiveSelection, Textbox } from "fabric";
import { FiUpload } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import "./canvas.css";

const presets = [
  {
    preset: 1,
    src: "../Head1.png",
  },
];

const MemeMaker = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canvas, setCanvas] = useState(false);
  const [fileArray, setFileArray] = useState([]);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      initCanvas.backgroundColor = "#000";
      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

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
  const deleteImage = (index) => {
    const objects = canvas.getObjects();

    const updatedFileArray = fileArray.filter((_, i) => i !== index);
    setFileArray(updatedFileArray);

    if (objects.length > index) {
      canvas.remove(objects[index]);
      canvas.renderAll();
    }
  };

  const focusImage = (index) => {
    const objects = canvas.getObjects();
    canvas.discardActiveObject();

    const selection = new ActiveSelection([objects[index]], {
      canvas: canvas,
    });

    canvas.setActiveObject(selection);
    canvas.requestRenderAll();
  };

  const addPreset = (img) => {
    const imgObj = new Image();
    imgObj.src = img.src;
    imgObj.onload = () => {
      const fabricImg = new FabricImage(imgObj);
      fabricImg.set({
        left: 0,
        top: 0,
        selectable: true,
      });
      setFileArray((prev) => [
        ...prev,
        { ...fabricImg, name: `Preset ${img.preset}` },
      ]);

      canvas.add(fabricImg);
      canvas.renderAll();
    };
  };

  const handleAddText = () => {
    const textObject = new Textbox("KURWA", {
      left: 0,
      top: 0,
      fill: "white",
      editable: true,
    });

    canvas.add(textObject);

    setFileArray((prev) => [...prev, { ...textObject, name: "Text" }]);
    canvas.renderAll();
  };

  const saveCanvasAsImage = () => {
    if (canvas) {
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "YAKUB.png";
      link.click();
    }
  };

  return (
    <div className={stl.mememaker}>
      <h1>BOBR Maker</h1>
      <div className={stl.makerModal}>
        <div className={stl.canvasWrap}>
          <canvas
            id="canvas"
            ref={canvasRef}
            className={stl.canvas}
            width="100vw"
          />
          {fileArray.length === 0 && (
            <span className={stl.uploadSpan} onClick={handleAddImageClick}>
              <FiUpload />
              Upload Image
            </span>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={stl.hidden}
          />
        </div>
        <div className={stl.bar}>
          <button className={stl.addCta}>Presets</button>
          {presets.map((preset, index) => (
            <div
              className={stl.fileBlock}
              key={index}
              onClick={() => addPreset(preset)}
            >
              <img src={preset.src} alt="Preset" className={stl.presetImg} />
              <span>Preset {index + 1}</span>
            </div>
          ))}
        </div>
        <div className={stl.bar}>
          <button className={stl.addCta} onClick={handleAddImageClick}>
            <FaPlus />
            Add Image
          </button>
          <button className={stl.addCta} onClick={handleAddText}>
            <FaPlus />
            Add Text
          </button>
          {fileArray.map((file, index) => (
            <div
              className={stl.fileBlock}
              key={index}
              onClick={() => {
                focusImage(index);
              }}
            >
              <span>{file?.name}</span>
              <FaTrashCan
                className={stl.trash}
                onClick={() => deleteImage(index)}
              />
            </div>
          ))}
        </div>
        <button className={stl.saveCta} onClick={saveCanvasAsImage}>
          Save Image
        </button>
      </div>
    </div>
  );
};

export default MemeMaker;
