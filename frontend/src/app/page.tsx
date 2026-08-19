"use client";
import CanvasSequence from "@/components/CanvasSequence";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // === 1. EFECTOS 3D PARA EL BENTO GRID ===
    // ERROR CORREGIDO: No puedes tener dos ScrollTriggers (fromTo y to) compitiendo por los mismos estilos.
    // Solución: Usar un único Timeline por tarjeta que maneje la entrada y la salida.
    const cards = gsap.utils.toArray('.bento-card');
    cards.forEach((card: any) => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 95%", // Inicia entrada
          end: "bottom 5%", // Finaliza salida
          scrub: 1,         // Sincronizado al scroll
        }
      });

      // 1. Entrada 3D
      tl.fromTo(card,
        { 
          opacity: 0, 
          y: 200, 
          z: -400, 
          rotationX: 25, 
          scale: 0.85
        },
        {
          opacity: 1, 
          y: 0,
          z: 0,
          rotationX: 0, 
          scale: 1,
          ease: "power2.out",
          duration: 0.4 // Representa el 40% del recorrido del scroll
        }
      );

      // 2. Mantenimiento (se queda quieto en el centro)
      tl.to(card, { opacity: 1, duration: 0.3 });

      // 3. Salida 3D (Se aleja al pasar de largo)
      tl.to(card, {
        opacity: 0.1,
        y: -100,
        z: -200,
        rotationX: -15, 
        scale: 0.9,
        duration: 0.3 // Representa el último 30% del recorrido del scroll
      });
    });

    // === 2. EFECTO PARALLAX INTERNO EN IMÁGENES ===
    const images = gsap.utils.toArray('.bento-img');
    images.forEach((img: any) => {
      gsap.fromTo(img,
        { y: -40, scale: 1.15 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-[#0f0f11] min-h-screen text-zinc-200 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Navegación */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <h1 className="font-serif text-2xl tracking-widest uppercase font-bold">DM</h1>
        <ul className="flex space-x-8 text-sm tracking-widest uppercase pointer-events-auto">
          <li><button className="hover:text-zinc-400 transition-colors">Colección</button></li>
          <li><button className="hover:text-zinc-400 transition-colors">Boutique</button></li>
        </ul>
      </nav>

      {/* --- HERO CON CANVAS SEQUENCE --- */}
      <CanvasSequence />

      {/* --- GOOGLE LABS STYLE BENTO GRID (Con Scrollytelling 3D) --- */}
      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 z-10" style={{ transformStyle: "preserve-3d", perspective: "1200px" }}>
        
        <div className="mb-32 text-center max-w-4xl mx-auto bento-card origin-center">
          <h2 className="text-6xl md:text-8xl font-serif text-white mb-8">La Forma del <span className="italic text-zinc-500">Movimiento</span></h2>
          <p className="text-zinc-400 text-xl font-light leading-relaxed">
            Nuestros cortes se adaptan a la silueta con precisión arquitectónica. Descubre cómo las telas premium cobran vida al deslizar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 auto-rows-[450px] md:auto-rows-[600px]" style={{ transformStyle: "preserve-3d" }}>
          
          <div className="bento-card md:col-span-8 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <video 
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              src="/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-12 left-12 z-10 pr-12">
              <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-white border border-white/20 mb-6 inline-block">V6 Collection</span>
              <h3 className="text-5xl md:text-6xl font-serif text-white leading-tight">Fluidez<br/>Natural</h3>
            </div>
          </div>

          <div className="bento-card md:col-span-4 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src="/multimedia/model1.jpg" 
                alt="Modelo Colección V6" 
                className="bento-img w-full h-[120%] object-cover object-top -mt-[10%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 z-10">
              <h3 className="text-3xl font-serif text-white">Estructura</h3>
            </div>
          </div>

          <div className="bento-card md:col-span-5 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom mt-16 md:mt-32">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src="/multimedia/model2.jpg" 
                alt="Detalle de Tela" 
                className="bento-img w-full h-[120%] object-cover object-center -mt-[10%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
            <div className="absolute bottom-12 left-12 z-10">
              <h3 className="text-4xl font-serif text-white italic mb-2">Elegancia<br/>Atemporal</h3>
              <p className="text-sm tracking-widest uppercase text-zinc-400">Detalles bordados</p>
            </div>
          </div>

          <div className="bento-card md:col-span-7 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <video 
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              src="/multimedia/Model_walks_on_fashion_runway_202608181749.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-y-0 left-12 flex flex-col justify-center z-10 max-w-md">
              <h3 className="text-5xl font-serif text-white mb-6">La Pasarela</h3>
              <p className="text-zinc-300 text-lg font-light leading-relaxed mb-8">
                Presenciamos el movimiento en su estado más puro. Una muestra de impacto y presencia escénica.
              </p>
              <div>
                <button className="bg-white text-black px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors">
                  Ver Desfile
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#0a0a0c] py-24 text-center text-sm tracking-widest uppercase border-t border-white/5 relative z-20">
        <h2 className="font-serif text-4xl mb-6 text-white">DonnaModa</h2>
        <p className="text-zinc-600">Puerto Morelos, Q.Roo</p>
      </footer>

    </main>
  );
}
