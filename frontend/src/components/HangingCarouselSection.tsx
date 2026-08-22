"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useMotionValue } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

// Añadimos offset vertical para asimetría
const CLOTHING_ITEMS = [
  { id: "item-1", title: "Colección V6", description: "Fluidez Natural", offset: "0px", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4", image: "/multimedia/model1.jpg" },
  { id: "item-2", title: "DonnaModa", description: "Estructura Pura", offset: "0px", video: "/multimedia/Model_walks_on_fashion_runway_202608181749.mp4", image: "/multimedia/model2.jpg" },
  { id: "item-3", title: "Boutique", description: "Elegancia Atemporal", offset: "0px", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4", image: "/multimedia/model1.jpg" },
  { id: "item-4", title: "Artesanía", description: "Corte Preciso", offset: "0px", video: "/multimedia/Model_walks_on_fashion_runway_202608181749.mp4", image: "/multimedia/model2.jpg" },
  { id: "item-5", title: "Colección V6", description: "Movimiento", offset: "0px", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4", image: "/multimedia/model1.jpg" },
];

function CarouselCard({ item, trackIndex, setActiveItem }: { item: any, trackIndex: number, setActiveItem: (id: string) => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = trackIndex === 2 ? `${item.id}-dup` : item.id;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div 
      className="relative flex flex-col items-center group/card cursor-pointer"
      style={{ marginTop: item.offset }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveItem(uniqueId)}
    >
      {/* Gancho de Ropa SVG */}
      <div className="relative z-10 -mb-[2px]">
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0163] drop-shadow-[0_2px_5px_rgba(255,1,99,0.3)]">
          <path d="M 40,20 C 40,20 40,12 40,8 C 40,2 50,2 50,10 C 50,16 40,20 40,20" className="text-[#9b3263]" strokeWidth="3" />
          <path d="M 40,20 L 4,45 C 2,46 2,48 4,48 L 76,48 C 78,48 78,46 76,45 L 40,20" strokeWidth="2.5" fill="rgba(255,1,99,0.05)" />
        </svg>
      </div>

      {/* Card de la prenda */}
      <motion.div
        layoutId={`card-${uniqueId}`}
        className="w-[260px] md:w-[320px] aspect-[3/4] relative rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] group-hover/card:shadow-[0_25px_60px_rgba(255,1,99,0.4)] border border-white/10 group-hover/card:border-[#ff0163]/50 transition-all duration-700 origin-top bg-zinc-900/50 backdrop-blur-sm"
      >
        <motion.div className="w-full h-full relative overflow-hidden" layoutId={`card-image-container-${uniqueId}`}>
          
          {/* Imagen de fondo con Parallax CSS (pan lento) */}
          <div className="absolute inset-0 w-[110%] h-[110%] -left-[5%] top-0 group-hover/card:scale-105 transition-transform duration-[2s] ease-out">
            <img 
              src={item.image} 
              alt={item.title} 
              className={`w-full h-full object-cover object-top transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
            />
            {/* Video miniatura en hover */}
            <video 
              ref={videoRef}
              muted 
              playsInline 
              loop
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              src={item.video} 
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity duration-500" />
          
          {/* Icono de expandir */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 scale-95 group-hover/card:scale-100">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-full text-white shadow-[0_0_20px_rgba(255,1,99,0.5)] border border-[#ff0163]/30">
              <Maximize2 className="w-6 h-6 text-[#ff0163]" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-left transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
            <p className="text-xs uppercase tracking-widest text-[#ff0163] font-bold mb-1">{item.title}</p>
            <h4 className="text-xl font-serif text-white">{item.description}</h4>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HangingCarouselSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const activeItemData = activeItem ? CLOTHING_ITEMS.find(item => item.id === activeItem.replace('-dup', '')) || CLOTHING_ITEMS[0] : null;

  return (
    <section className="relative w-full z-20 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 bg-[#0f0f11] py-32 stack-section">
      <ParticlesBackground />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-20 px-6">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 drop-shadow-2xl">
          La Forma del <span className="italic text-[#ff0163]">Movimiento</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
          Desliza para explorar. Observa cómo cada diseño cobra vida con el movimiento.
        </p>
      </div>

      {/* Contenedor del Carrusel */}
      {/* Usamos un cursor personalizado indicando que se puede arrastrar */}
      <div 
        className="relative w-full overflow-hidden flex items-start pt-10 pb-32 cursor-grab active:cursor-grabbing"
        ref={containerRef}
      >
        {/* Barra del armario (Rod) iluminada */}
        <div className="absolute top-[58px] left-0 w-full h-2 bg-gradient-to-b from-zinc-500 via-zinc-800 to-black shadow-[0_5px_15px_rgba(0,0,0,0.8)] z-0 border-t border-white/20" />

        {/* Tracks infinitos (Animación vía CSS para simplicidad y mejor compatibilidad con interactividad si es necesario, o framer motion puro) */}
        <motion.div 
          className="flex w-fit group"
          drag="x"
          dragConstraints={containerRef}
          style={{ x }}
        >
          {[1, 2].map((trackIndex) => (
            <motion.div
              key={`track-${trackIndex}`}
              className="flex shrink-0 px-8 gap-8 md:gap-16 items-start"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }}
              style={{ paddingRight: "2rem" }}
            >
              {CLOTHING_ITEMS.map((item) => (
                <CarouselCard key={trackIndex === 2 ? `${item.id}-dup` : item.id} item={item} trackIndex={trackIndex} setActiveItem={setActiveItem} />
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Vista enfocada (Active Card) */}
      <AnimatePresence>
        {activeItem && activeItemData && (
          <>
            {/* Backdrop oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] cursor-pointer"
              onClick={() => setActiveItem(null)}
            />

            {/* Card Enfocada */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${activeItem}`}
                className="relative h-[90vh] md:h-[85vh] aspect-[9/16] md:aspect-[3/4] lg:aspect-[4/5] bg-[#0a0a0c] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(255,1,99,0.3)] border border-[#ff0163]/30 pointer-events-auto flex mx-auto"
                style={{ borderRadius: "2rem" }}
              >
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-6 right-6 z-50 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-[#ff0163] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div className="absolute inset-0" layoutId={`card-image-container-${activeItem}`}>
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-95"
                    src={activeItemData.video} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:bg-gradient-to-tr" />
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col justify-end"
                  >
                    <span className="text-[#ff0163] text-sm uppercase tracking-widest font-bold mb-4 inline-block bg-[#ff0163]/10 px-4 py-2 rounded-full backdrop-blur-md border border-[#ff0163]/30 w-max shadow-[0_0_15px_rgba(255,1,99,0.2)]">
                      {activeItemData.title}
                    </span>
                    <h3 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6 drop-shadow-xl">
                      {activeItemData.description}
                    </h3>
                    <p className="text-zinc-300 text-lg md:text-xl font-light drop-shadow-md max-w-lg">
                      Una muestra magistral de cómo la tela interactúa con la luz y el movimiento.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
