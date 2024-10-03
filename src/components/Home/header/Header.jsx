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
    camera.position.set(0, 3, 5); // Adjusted to better view the landscape

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

    // Load font and add text geometry
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("Kurwa Bobr CTO", {
          font: font,
          size: 0.5, // Adjust size as needed
          depth: 0.2, // Adjust depth as needed
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(3, 3, 0); // Adjust the position as needed
        textMesh.renderOrder = 1;
        scene.add(textMesh);
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
