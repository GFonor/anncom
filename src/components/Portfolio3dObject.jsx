import { useGLTF } from "@react-three/drei";

export default function Portfolio3dObject({ onClick }) {
  const model = useGLTF("/dialer/newsite/download_box.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.3, 0.3, 0.3]}
        position={[-9.91, -0.2, -7.2]}
        rotation={[-0, -1, 0]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
