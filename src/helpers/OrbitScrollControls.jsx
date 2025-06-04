import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function OrbitScrollControls({
  radius = 18,
  scrollSpeed = 0.0003,
  rotateSpeed = 0.003,
  target = new THREE.Vector3(0, 0, 0),
  magnetRadius = 6.5,
  magnetStrength = 0.03,
}) {
  const { camera, gl } = useThree();

  const angle = useRef(0);
  const scrollVelocity = useRef(0);
  const dragVelocity = useRef(0);

  const isDragging = useRef(false);
  const prevX = useRef(0);

  const [zoomIn, setZoomIn] = useState(true);
  const [progress, setProgress] = useState(0);

  const magnetPoints = [
    new THREE.Vector3(12, 2, 0),
    new THREE.Vector3(3.71, 2, 11.33),
    new THREE.Vector3(-9.71, 2, 7.02),
    new THREE.Vector3(-9.71, 2, -7.02),
    new THREE.Vector3(3.71, 2, -11.33),
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      if (!zoomIn) scrollVelocity.current -= e.deltaY * scrollSpeed;
    };

    const handleMouseDown = (e) => {
      if (e.button !== 0 || zoomIn) return;
      isDragging.current = true;
      prevX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current || zoomIn) return;
      const deltaX = e.clientX - prevX.current;
      dragVelocity.current = deltaX * rotateSpeed;
      prevX.current = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e) => {
      if (zoomIn || e.touches.length !== 1) return;
      isDragging.current = true;
      prevX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || zoomIn || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevX.current;
      dragVelocity.current = deltaX * rotateSpeed;
      prevX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const el = gl.domElement;

    el.addEventListener('wheel', handleWheel);
    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [gl, scrollSpeed, rotateSpeed, zoomIn]);

  useFrame(() => {
    if (zoomIn && progress < 1) {
      setProgress((prev) => {
        const next = prev + 0.001;
        if (next >= 0.15) setZoomIn(false);
        return next;
      });

      camera.position.lerp(new THREE.Vector3(18, 2, 0), progress);
      camera.lookAt(target);
      return;
    }

    const totalVelocity = scrollVelocity.current + dragVelocity.current;
    angle.current += totalVelocity;

    const x = Math.cos(angle.current) * radius + target.x;
    const z = Math.sin(angle.current) * radius + target.z;
    const y = 2;

    camera.position.set(x, y, z);

    let closestMagnet = null;
    let closestAngleDiff = Infinity;

    for (const point of magnetPoints) {
      const dx = point.x - target.x;
      const dz = point.z - target.z;
      const pointAngle = Math.atan2(dz, dx);

      let diff = pointAngle - angle.current;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // normalize

      const distance = Math.abs(diff);
      if (distance < magnetRadius / radius && distance < closestAngleDiff) {
        closestAngleDiff = distance;
        closestMagnet = pointAngle;
      }
    }

    if (closestMagnet !== null) {
      const angleDiff = Math.atan2(
        Math.sin(closestMagnet - angle.current),
        Math.cos(closestMagnet - angle.current)
      );
      angle.current += angleDiff * magnetStrength;

      scrollVelocity.current *= 0.8;
      dragVelocity.current *= 0.8;
    }

    scrollVelocity.current *= 0.9;
    dragVelocity.current *= 0.9;

    camera.lookAt(target);
  });

  return null;
}
