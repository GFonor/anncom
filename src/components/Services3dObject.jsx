import { useGLTF } from "@react-three/drei";



export default function Services3dObject({ onClick }) {
  const model = useGLTF("/dialer/newsite/services.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.6, 0.6, 0.6]}
        position={[3.71, 0, -11.33]}
        rotation={[0, -3.45, 0]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
