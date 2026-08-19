"use client";
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 80; // Aumentada la densidad para que se perciban mejor
    // Usamos el color secundario #9b3263 (rgb: 155, 50, 99) y blanco con mayor opacidad
    const colors = [
      'rgba(155, 50, 99, 0.8)', 
      'rgba(155, 50, 99, 0.5)', 
      'rgba(255, 255, 255, 0.4)'
    ];

    const resize = () => {
      // Usar dimensiones del padre
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1, // Aumentado el tamaño (1 a 4px) para mayor visibilidad
          color: colors[Math.floor(Math.random() * colors.length)],
          speedY: Math.random() * 0.5 + 0.2, // Caída muy lenta
          speedX: 0,
          angle: Math.random() * 360,
          spin: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    createParticles();

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Movimiento oscilante tipo brisa / polvo cinemático
        p.angle += p.spin;
        p.speedX = Math.sin(p.angle) * 0.5;
        
        p.y += p.speedY;
        p.x += p.speedX;

        // Reposicionar si salen de la pantalla
        if (p.y > canvas.height) {
          p.y = 0 - p.radius;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        // Brillo sutil
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
