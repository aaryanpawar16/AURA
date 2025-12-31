import { useEffect } from 'react';
import { useSpring } from 'framer-motion';

export const useAuraCursor = () => {
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return { x: mouseX, y: mouseY };
};