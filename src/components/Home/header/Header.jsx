import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import stl from "./Header.module.css";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"; // Import OrbitControls

const Header = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    camera.position.z = 4;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      "../bobrmodel/Pbr/lod.fbx",
      (object) => {
        console.log(object.children);
        object.traverse((child) => {
          if (child.isMesh) {
            // Check if the mesh has a material and load texture if present
            if (child.material) {
              const textureLoader = new THREE.TextureLoader();
              const material = new THREE.MeshStandardMaterial({
                map: textureLoader.load("../bobrmodel/Pbr/shaded.png"), // Replace with actual texture path
              });
              child.material = material;
            }
          }
        });
        object.scale.set(0.01, 0.01, 0.01);
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 10);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      // Render the scene
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
