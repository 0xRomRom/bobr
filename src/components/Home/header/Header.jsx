import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import stl from "./Header.module.css";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const Header = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
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

    // Add lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);

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

    const positions = [
      { x: -45, y: 8, z: 0 },
      { x: 45, y: 8, z: -20 },
      { x: -10, y: 8, z: 15 },
      // Add more positions as needed
    ];

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
        positions.forEach((pos) => {
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

    const textArray = [
      { x: -50, y: 0, z: -50, text: "Kurwa Bobr CTO" },
      { x: 20, y: 10, z: -30, text: "t.me/bobrportal" },
      { x: -10, y: 5, z: 15, text: "x.com/bobrCTO" },
    ];

    // Load font and add text geometry
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        // Loop through the textStrings array and create text meshes
        textArray.forEach((text, index) => {
          const textGeometry = new TextGeometry(text.text, {
            font: font,
            size: 10, // Adjust size as needed
            depth: 5, // Adjust depth as needed
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
          });

          const textMaterial = new THREE.MeshStandardMaterial({
            color: 0xd713f5,
          });

          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          if (textArray[index]) {
            textMesh.position.set(
              textArray[index].x,
              textArray[index].y,
              textArray[index].z
            ); // Set unique position based on the index
          }
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

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
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

  const copyBotWallet = () => {
    navigator.clipboard
      .writeText("ET1FZVF2F33PfY2hLyK6EJ2p4x6dbkva4YBkULFdpump")
      .then(() => {
        alert(`KURWA!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <header>
      <canvas ref={canvasRef} className={stl.threeCanvas}></canvas>
    </header>
  );
};

export default Header;
