import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import stl from "./Header.module.css";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FaArrowCircleDown } from "react-icons/fa";

const treePositions = [
  { x: -45, y: 8, z: 45 },
  { x: 45, y: 8, z: 30 },
  { x: 45, y: 8, z: -25 },
];

const textArray = [
  {
    x: -50,
    y: 0.5,
    z: -50,
    text: "Kurwa Bobr CTO",
    rotation: { x: 0, y: 0, z: 0 },
    size: 10,
    color: 0xd713f5,
  },
  {
    x: -50,
    y: 0.5,
    z: 30,
    text: "t.me/bobrportal",
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    size: 6,
    color: 0xfcf403,
  },
  {
    x: 45,
    y: 0.5,
    z: 50,
    text: "x.com/bobrCTO",
    rotation: { x: 0, y: Math.PI / 1, z: 0 },
    size: 8,
    color: 0x07fc03,
  },
];

const Header = () => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const bobrPriceTextMeshRef = useRef();
  const [terrainDone, setTerrainDone] = useState(false);

  useEffect(() => {
    if (!terrainDone) return;
    const balanceFetcher = async () => {
      const inputMint = "ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump";
      try {
        const response = await fetch(
          `https://price.jup.ag/v6/price?ids=${inputMint}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const quoteResponse = await response.json();
        console.log(quoteResponse);
        const bobrPrice = quoteResponse.data[inputMint].price;

        const fontLoader = new FontLoader();
        fontLoader.load(
          "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
          (font) => {
            // Loop through the textArray and create text meshes

            const textGeometry = new TextGeometry(
              "$" + bobrPrice.toFixed(8).toString(),
              {
                font: font,
                size: 5, // Adjust size as needed
                depth: 0, // Adjust depth as needed
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5,
              }
            );

            textGeometry.center();

            const textMaterial = new THREE.MeshStandardMaterial({
              color: 0x03fcc6,
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Set position
            textMesh.position.set(0, 2.5, -30);

            // Set rotation
            textMesh.rotation.set(0, 0, 0);

            // textMesh.renderOrder = -1;
            textMesh.receiveShadow = true;
            sceneRef.current.add(textMesh); // Add each text mesh to the scene
            bobrPriceTextMeshRef.current = textMesh;
          }
        );
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    balanceFetcher();
  }, [terrainDone]);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x000000); // Black background

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 20); // Adjusted to better view the landscape

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);
    // Add lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 3, 10);
    // scene.add(directionalLight);

    // Load the 3D model
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      "../bobrmodel/Pbr/lod.fbx",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const textureLoader = new THREE.TextureLoader();
            const material = new THREE.MeshStandardMaterial({
              map: textureLoader.load("../bobrmodel/Pbr/shaded.png"),
            });
            child.material = material;
          }
        });
        object.scale.set(0.05, 0.05, 0.05);
        object.position.y = 3.25;
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    // Load trees
    fbxLoader.load(
      "../treemodel/Pbr/lod.fbx",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
            const textureLoader = new THREE.TextureLoader();
            const material = new THREE.MeshStandardMaterial({
              map: textureLoader.load("../treemodel/Pbr/texture_diffuse.png"),
            });
            child.material = material;
          }
        });
        object.scale.set(0.1, 0.1, 0.1);

        // Loop through the positions array and clone the object for each position
        treePositions.forEach((pos) => {
          const objectClone = object.clone(); // Clone the loaded object
          objectClone.position.set(pos.x, pos.y, pos.z); // Set unique position
          scene.add(objectClone); // Add the cloned object to the scene
        });
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    // Load trext
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        // Loop through the textArray and create text meshes
        textArray.forEach((text) => {
          const textGeometry = new TextGeometry(text.text, {
            font: font,
            size: text.size, // Adjust size as needed
            depth: 0, // Adjust depth as needed
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          const textMaterial = new THREE.MeshStandardMaterial({
            color: text.color,
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);

          // Set position
          textMesh.position.set(text.x, text.y, text.z);

          // Set rotation
          textMesh.rotation.set(
            text.rotation.x,
            text.rotation.y,
            text.rotation.z
          );

          textMesh.renderOrder = 1;
          textMesh.receiveShadow = true;
          scene.add(textMesh); // Add each text mesh to the scene
        });
      }
    );

    // Add a landscape plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeTexture = new THREE.TextureLoader().load(
      "../Grass.jpg",
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
      }
    );
    const planeMaterial = new THREE.MeshStandardMaterial({ map: planeTexture });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    plane.renderOrder = 0;
    setTerrainDone(true);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      if (bobrPriceTextMeshRef.current) {
        bobrPriceTextMeshRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollDown = () => {
    const headerHeight = canvasRef.current.getBoundingClientRect().height;
    window.scrollTo({
      top: headerHeight,
      behavior: "smooth",
    });
  };

  return (
    <header>
      <button onClick={handleScrollDown} className={stl.down}>
        <FaArrowCircleDown />
      </button>
      <canvas ref={canvasRef} className={stl.threeCanvas}></canvas>
    </header>
  );
};

export default Header;
