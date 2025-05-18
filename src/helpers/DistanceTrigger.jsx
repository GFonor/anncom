import { useFrame, useThree } from "@react-three/fiber";


export default function DistanceTrigger({targetPosition, onEnter}) {
  const { camera } = useThree();
    
  useFrame(() => {
    // Текущее расстояние до цели
    const distance = camera.position.distanceTo(targetPosition);
  
    if (distance < 6.5) {
      onEnter(true)
    }
    if (distance > 6.5) {
      onEnter(false)
    }
  });
  
  return null;
}
