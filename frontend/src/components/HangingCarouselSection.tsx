"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

// Definimos un conjunto de prendas (duplicaremos esto visualmente para el scroll infinito)
const CLOTHING_ITEMS = [
  { id: "item-1", title: "Colección V6", description: "Fluidez Natural", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4" },
  { id: "item-2", title: "DonnaModa", description: "Estructura Pura", video: "/multimedia/Model_walks_on_fashion_runway_202608181749.mp4" },
  { id: "item-3", title: "Boutique", description: "Elegancia Atemporal", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4" },
  { id: "item-4", title: "Artesanía", description: "Corte Preciso", video: "/multimedia/Model_walks_on_fashion_runway_202608181749.mp4" },
  { id: "item-5", title: "Colección V6", description: "Movimiento", video: "/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4" },
];

export default function HangingCarouselSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Encontramos los datos del item activo si existe
  const activeItemData = activeItem ? CLOTHING_ITEMS.find(item => item.id === activeItem.replace('-dup', '')) || CLOTHING_ITEMS[0] : null;

  return (
    <section className="relative w-full z-20 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 bg-[#0f0f11] py-32 stack-section">
      <ParticlesBackground />
      
      {/* Título de la sección */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-20 px-6">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 drop-shadow-2xl">
          La Forma del <span className="italic text-[#ff0163]">Movimiento</span>
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
          Nuestros cortes se adaptan a la silueta con precisión arquitectónica. Toca una prenda para verla en acción.
        </p>
      </div>

      {/* Contenedor del Carrusel (Marquee) */}
      <div className="relative w-full overflow-hidden flex items-start pt-10 pb-20">
        
        {/* Barra del armario (Rod) */}
        <div className="absolute top-[58px] left-0 w-full h-1.5 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 shadow-xl z-0" />

        {/* Tracks infinitos usando framer motion */}
        <div className="flex w-fit group">
          {[1, 2].map((trackIndex) => (
            <motion.div
              key={`track-${trackIndex}`}
              className="flex shrink-0 px-8 gap-8 md:gap-16 items-start"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 35, // Velocidad del carrusel
                ease: "linear",
              }}
              // Pausa el carrusel cuando hay hover en escritorio
              style={{ paddingRight: "2rem" }}
            >
              {CLOTHING_ITEMS.map((item) => (
                <div 
                  key={trackIndex === 2 ? `${item.id}-dup` : item.id} 
                  className="relative flex flex-col items-center group/card cursor-pointer"
                  onClick={() => setActiveItem(trackIndex === 2 ? `${item.id}-dup` : item.id)}
                >
                  
                  {/* Gancho de Ropa SVG */}
                  <div className="relative z-10 -mb-[2px] transition-transform duration-500 group-hover/card:-translate-y-2">
                    <svg width="80" height="50" viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ff0163] drop-shadow-[0_2px_5px_rgba(255,1,99,0.3)]">
                      {/* Hook */}
                      <path d="M 40,20 C 40,20 40,12 40,8 C 40,2 50,2 50,10 C 50,16 40,20 40,20" className="text-[#9b3263]" strokeWidth="3" />
                      {/* Shoulders */}
                      <path d="M 40,20 L 4,45 C 2,46 2,48 4,48 L 76,48 C 78,48 78,46 76,45 L 40,20" strokeWidth="2.5" fill="rgba(255,1,99,0.05)" />
                    </svg>
                  </div>

                  {/* Card de la prenda */}
                  <motion.div
                    layoutId={`card-${trackIndex === 2 ? `${item.id}-dup` : item.id}`}
                    className="w-[260px] md:w-[320px] aspect-[3/4] relative rounded-b-2xl rounded-t-sm overflow-hidden shadow-2xl border border-white/10 group-hover/card:border-[#ff0163]/50 transition-all duration-500 origin-top"
                  >
                    <motion.div className="w-full h-full relative" layoutId={`card-image-container-${trackIndex === 2 ? `${item.id}-dup` : item.id}`}>
                      <img 
                        src="/multimedia/model1.jpg" 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover/card:opacity-60 transition-opacity duration-500" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md p-4 rounded-full text-white shadow-[0_0_20px_rgba(255,1,99,0.5)] border border-[#ff0163]/30">
                          <Play className="w-8 h-8 ml-1 text-[#ff0163]" />
                        </div>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-left">
                        <p className="text-xs uppercase tracking-widest text-[#ff0163] font-bold mb-1">{item.title}</p>
                        <h4 className="text-xl font-serif text-white">{item.description}</h4>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
              onClick={() => setActiveItem(null)}
            />

            {/* Card Enfocada */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-${activeItem}`}
                className="relative w-full max-w-5xl aspect-[9/16] md:aspect-video bg-[#0a0a0c] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(255,1,99,0.2)] border border-[#ff0163]/20 pointer-events-auto flex"
                style={{ borderRadius: "2rem" }}
              >
                {/* Botón Cerrar */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-6 right-6 z-50 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-[#ff0163] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Contenido Enfocado (Video) */}
                <motion.div className="absolute inset-0" layoutId={`card-image-container-${activeItem}`}>
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-90"
                    src={activeItemData.video} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                  
                  {/* Información adicional sobre el video */}
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col justify-end md:max-w-xl"
                  >
                    <span className="text-[#ff0163] text-sm uppercase tracking-widest font-bold mb-4 inline-block bg-[#ff0163]/10 px-4 py-2 rounded-full backdrop-blur-sm border border-[#ff0163]/20 w-max">
                      {activeItemData.title}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4 drop-shadow-lg">
                      {activeItemData.description}
                    </h3>
                    <p className="text-zinc-300 text-base md:text-lg font-light drop-shadow-md">
                      El diseño cobra vida en movimiento. Descubre la caída perfecta de telas premium en acción en la pasarela.
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
