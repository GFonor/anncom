import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// 📌 Генерация случайного графа (нейронной сети)
const generateGraph = (numNodes = 50, numLinks = 100) => {
  const nodes = Array.from({ length: numNodes }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
    ],
    velocity: [
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
    ],
  }));

  const links = Array.from({ length: numLinks }, () => ({
    source: Math.floor(Math.random() * numNodes),
    target: Math.floor(Math.random() * numNodes),
  }));

  return { nodes, links };
};

// 📌 Список фиксированных узлов-ссылок
const fixedNodes = [
  { id: "about", position: [20, 0, 0], label: "О компании", link: "/about" },
  { id: "services", position: [-20, 0, 0], label: "Услуги", link: "/services" },
  { id: "portfolio", position: [0, 20, 0], label: "Портфолио", link: "/portfolio" },
  { id: "contacts", position: [0, -20, 0], label: "Контакты", link: "/contacts" },
];

// 📌 Компонент узла (нейрона)
const Neuron = ({ position, velocity }) => {
  const ref = useRef();

  useFrame(() => {
    ref.current.position.x += velocity[0];
    ref.current.position.y += velocity[1];
    ref.current.position.z += velocity[2];

    // Отскакиваем от границ
    if (ref.current.position.x > 25 || ref.current.position.x < -25) velocity[0] *= -1;
    if (ref.current.position.y > 25 || ref.current.position.y < -25) velocity[1] *= -1;
    if (ref.current.position.z > 25 || ref.current.position.z < -25) velocity[2] *= -1;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.7, 16, 16]} />
      <meshStandardMaterial color="green" emissive="green" emissiveIntensity={2} />
    </mesh>
  );
};

// 📌 Компонент узла-ссылки (в виде текста)
const LinkNode = ({ position, label, link }) => {
    const ref = useRef();
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
  
    useEffect(() => {
      // Меняем курсор, если ссылка активна
      document.body.style.cursor = hovered ? "pointer" : "default";
  
      // Возвращаем стандартный курсор при размонтировании компонента
      return () => {
        document.body.style.cursor = "default";
      };
    }, [hovered]);
  
    return (
      <Text
        ref={ref}
        position={position}
        fontSize={1.5}
        color={hovered ? "#0f0" : "green"} // Цвет изменяется при наведении
        anchorX="center"
        anchorY="middle"
        // font="Courier New, monospace"
        onClick={() => navigate(link)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1} // Немного увеличивается при наведении
        outlineColor="green"
        outlineWidth={hovered ? 0.01 : 0} // Свечение при наведении
      >
        [{label}]
      </Text>
    );
  };
// 📌 Компонент связи (синапса)
const Synapse = ({ start, end }) => {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    ref.current.geometry.setFromPoints([start, end]);
  }, [start, end]);

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="white" linewidth={2} />
    </line>
  );
};

// 📌 Главный компонент нейронной сети
const NeuralNetwork = () => {
  const [graph, setGraph] = useState(generateGraph());

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "black" }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Обычные нейроны */}
      {graph.nodes.map((node) => (
        <Neuron key={node.id} position={node.position} velocity={node.velocity} />
      ))}

      {/* Узлы-ссылки (в виде терминального текста) */}
      {fixedNodes.map((node) => (
        <LinkNode key={node.id} position={node.position} label={node.label} link={node.link} />
      ))}

      {/* Связи (синапсы) */}
      {graph.links.map((link, index) => {
        const startNode = graph.nodes[link.source];
        const endNode = graph.nodes[link.target];

        return <Synapse key={index} start={new THREE.Vector3(...startNode.position)} end={new THREE.Vector3(...endNode.position)} />;
      })}
    </Canvas>
  );
};

export default NeuralNetwork;