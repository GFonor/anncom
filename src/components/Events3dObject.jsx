import { useGLTF } from "@react-three/drei";



export default function Events3dObject({ onClick }) {
  const model = useGLTF("events.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.7, 0.65, 0.3]}
        position={[3.71, 0, 11.33]}
        rotation={[0, 0.33, 0]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
