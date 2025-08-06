import { useGLTF } from "@react-three/drei";

export default function BotN3dObject({ onClick }) {
  const model = useGLTF("botn.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.7, 0.6, 0.7]}
        position={[12, 0, 0]}
        rotation={[-0.15, 1.571, 0.2]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
