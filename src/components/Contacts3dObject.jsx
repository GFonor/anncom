import { useGLTF } from "@react-three/drei";



export default function Contacts3dObject({ onClick }) {
  const model = useGLTF("/dialer/newsite/contacts.glb")

  return (
    <>
      <primitive 
        object={model.scene} 
        scale={[0.05, 0.05, 0.01]}
        position={[-10.1, 0.5, 6.5]}
        rotation={[0, -0.95, 0]}
      
        onPointerUp={onClick}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "default")}
      />
    </>
  );

}
