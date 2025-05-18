import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraMagnet({ targetPosition, magnetRadius = 2, strength = 0.05 }) {
  const { camera } = useThree();
  const targetVec = new THREE.Vector3();
  
  useFrame(() => {
    // Текущее расстояние до цели
    const distance = camera.position.distanceTo(targetPosition);
  
    if (distance < magnetRadius) {
      // Вычисляем направление и силу притяжения
      targetVec.subVectors(targetPosition, camera.position).multiplyScalar(strength);
      camera.position.add(targetVec);
      
    }
  });
  
  return null;
}
