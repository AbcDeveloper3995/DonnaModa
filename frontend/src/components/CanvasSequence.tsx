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
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

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
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. Animación del canvas (Ocupa de 0 a 1 en el timeline)
    tl.to(seq, {
      frame: frameCount - 1,
      snap: "frame", 
      ease: "none",
      duration: 1,
      onUpdate: render, 
    }, 0);

    // 2. Efecto de salida del Título principal
    tl.to(textOverlayRef.current, {
      opacity: 0,
      y: -150,
      scale: 1.2,
      duration: 0.15,
      ease: "power2.inOut"
    }, 0);

    // 3. Scrollytelling: Textos intermedios
    // Texto 1
    tl.fromTo(text1Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.15);
    tl.to(text1Ref.current, 
      { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" }, 0.35);

    // Texto 2
    tl.fromTo(text2Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.45);
    tl.to(text2Ref.current, 
      { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" }, 0.65);

    // Texto 3
    tl.fromTo(text3Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.75);
    tl.to(text3Ref.current, 
      { opacity: 0, y: -50, duration: 0.1, ease: "power2.in" }, 0.95);

    return () => window.removeEventListener("resize", render);
  }, { scope: containerRef });

  return (
    // Es crítico usar z-0 para que la siguiente sección pueda pasar por encima (z-10 o superior)
    <section ref={containerRef} className="relative w-full h-screen bg-[#0a0a0c] overflow-hidden z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Título Principal y Logo */}
      <div ref={textOverlayRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 origin-center pointer-events-none drop-shadow-2xl">
         <img src="/multimedia/logo/logodonnamoda.png" alt="DonnaModa" className="h-24 md:h-40 w-auto mb-4 object-contain brightness-0 invert" />
         <p className="text-[#ff0163] mt-6 tracking-[0.3em] uppercase text-sm font-sans animate-pulse font-bold">Desliza para descubrir</p>
      </div>

      {/* Scrollytelling Overlays */}
      <div ref={text1Ref} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 mix-blend-difference">
         <h2 className="text-white text-5xl md:text-8xl font-serif tracking-widest uppercase">Precisión.</h2>
      </div>
      
      <div ref={text2Ref} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 mix-blend-difference">
         <h2 className="text-white text-5xl md:text-8xl font-serif tracking-widest uppercase">Estructura.</h2>
      </div>
      
      <div ref={text3Ref} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 mix-blend-difference">
         <h2 className="text-white text-5xl md:text-8xl font-serif tracking-widest uppercase">Movimiento.</h2>
      </div>

      {/* Gradiente inferior para ayudar a la transición del glassmorfismo de la siguiente sección */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0c] to-transparent z-20 pointer-events-none opacity-80" />
    </section>
  );
}
