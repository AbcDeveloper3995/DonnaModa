"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const frameCount = 240;
    const currentFrame = (index: number) => 
      `/multimedia/secuencia/${(index + 1).toString().padStart(5, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => render();

    function render() {
      if (!canvas || !context) return;
      
      // Es vital asegurar que el índice sea un número entero
      const currentFrameIndex = Math.round(seq.frame);
      const img = images[currentFrameIndex];
      
      if (!img || !img.complete) return; 

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }

    window.addEventListener("resize", render);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000",
        scrub: 0.5,
        pin: true,
      }
    });

    // La animación de la secuencia de fotos toma toda la duración (hasta 1)
    tl.to(seq, {
      frame: frameCount - 1,
      snap: "frame", 
      ease: "none",
      duration: 1,
      onUpdate: render, 
    }, 0);

    // Efecto 3D de salida para el título: 
    tl.to(textOverlayRef.current, {
      opacity: 0,
      y: -150,
      scale: 1.2,
      duration: 0.15,
      ease: "power2.inOut"
    }, 0);

    return () => window.removeEventListener("resize", render);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a0a0c] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Overlay del texto controlado por GSAP para su salida 3D */}
      <div ref={textOverlayRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference z-10 origin-center">
         <h1 className="text-white text-7xl md:text-[10rem] font-serif text-center leading-none tracking-tight">DonnaModa</h1>
         <p className="text-zinc-300 mt-6 tracking-[0.3em] uppercase text-sm font-sans animate-pulse">Desliza para descubrir</p>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f0f11] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
