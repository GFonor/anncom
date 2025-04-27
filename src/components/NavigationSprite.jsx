import { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Line, Text } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

export default function NavigationSprite() {
  const menuTexture = useLoader(TextureLoader, "/dialer/newsite/grid.png");

  const [open, setOpen] = useState(false);

  const { scale } = useSpring({
    scale: open ? 1 : 0,
    config: { tension: 170, friction: 20 },
  });

  const handleMenuClick = () => {
    setOpen((prev) => !prev);
  };

  const menuItems = [
    { label: "Услуги", position: [-3, -1.5, -0.5] },
    { label: "Портфолио", position: [-3, -2.5, -0.5] },
    { label: "Контакты", position: [-3, -3.5, -0.5] },
  ];

  return (
    <>
      {/* Кнопка Меню */}
      <sprite
        position={[-3, 0, -0.5]}
        scale={[1.5, 1.5, 1]}
        onPointerDown={handleMenuClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <spriteMaterial
          attach="material"
          map={menuTexture}
          transparent
          alphaTest={0.5}
        />
      </sprite>

      {/* Список подменю */}
      {menuItems.map((item, index) => (
        <a.group
          key={index}
          scale-x={scale}
          scale-y={scale}
          scale-z={scale}
          position={item.position}
        >
          {/* Подменю */}
          <mesh
            onPointerDown={() => console.log(`Нажали на ${item.label}`)}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
          >
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="black" transparent opacity={0.8} />
          </mesh>

          {/* Borders */}
          <Line
            points={[
              [-1.05, 0.25, 0.01],
              [1.05, 0.25, 0.01],
              [1.05, -0.25, 0.01],
              [-1.05, -0.25, 0.01],
              [-1.05, 0.25, 0.01],
            ]}
            color="darkgreen"
            lineWidth={2}
          />

          {/* Текст */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {item.label}
          </Text>
        </a.group>
      ))}
    </>
  );
}