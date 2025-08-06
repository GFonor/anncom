import { useGLTF } from "@react-three/drei";

export default function Portfolio3dObject({ onClick }) {
  const model = useGLTF("download_box.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.33, 0.33, 0.33]}
        position={[-9.4, -0.2, -6.7]}
        rotation={[-0, -1, 0]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
