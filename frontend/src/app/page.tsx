"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import HangingCarouselSection from "@/components/HangingCarouselSection";

const CanvasSequence = dynamic(() => import("@/components/CanvasSequence"), {
  ssr: false, // Canvas uses window
});
const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), {
  ssr: false, // Particles use window
});
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ArrowRight, MapPin, Mail, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const philoSection = document.querySelector('.philo-container');
      if (philoSection) {
        const top = philoSection.getBoundingClientRect().top;
        setNavSolid(top <= 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useGSAP(() => {
    const reveals = gsap.utils.toArray('.reveal-up');
    reveals.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    const slidesRight = gsap.utils.toArray('.slide-right');
    slidesRight.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    const parallaxImgs = gsap.utils.toArray('.parallax-img');
    parallaxImgs.forEach((img: any) => {
      gsap.fromTo(img,
        { y: -80 },
        { y: 80, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
      );
    });

    const walkRightContents = gsap.utils.toArray('.walk-right-content');
    walkRightContents.forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, x: -100 },
        { 
          opacity: 1, x: 0, 
          ease: "power2.out", 
          scrollTrigger: { trigger: el, start: "top 85%", end: "center center", scrub: 1 } 
        }
      );
    });

    // === STICKY STACK EFFECT ===
    const updateSticky = () => {
      const stackSections = gsap.utils.toArray('.stack-section');
      stackSections.forEach((sec: any) => {
        sec.style.position = 'sticky';
        if (sec.offsetHeight > window.innerHeight) {
          sec.style.top = `calc(100vh - ${sec.offsetHeight}px)`;
        } else {
          sec.style.top = '0px';
        }
      });
    };
    updateSticky();
    window.addEventListener('resize', updateSticky);

    // === EFECTOS 3D PARA LA SECCIÓN DE FILOSOFÍA ===
    const philoContainer = document.querySelector('.philo-container');
    if (philoContainer) {
      const philoTl = gsap.timeline({
        scrollTrigger: {
          trigger: philoContainer,
          start: "top 90%", 
          end: "bottom 10%",
          scrub: 1,
        }
      });
      
      // Card Izquierda
      philoTl.fromTo('.philo-card-left',
        { opacity: 0, x: -200, y: 200, z: -600, rotationY: -50, rotationZ: -10 },
        { opacity: 0.8, x: 0, y: 0, z: 0, rotationY: 25, rotationX: 10, rotationZ: -5, duration: 0.4, ease: "power2.out" },
        0
      );
      philoTl.to('.philo-card-left', { opacity: 0.8, duration: 0.2 }, 0.4);
      philoTl.to('.philo-card-left',
        { opacity: 0, y: -200, z: -400, rotationX: -10, duration: 0.4, ease: "power2.in" },
        0.6
      );



      // Texto Central
      philoTl.fromTo('.philo-text',
        { opacity: 0, y: 150, z: -400, scale: 0.8 },
        { opacity: 1, y: 0, z: 0, scale: 1, duration: 0.4, ease: "power2.out" },
        0
      );
      philoTl.to('.philo-text', { opacity: 1, duration: 0.2 }, 0.4);
      philoTl.to('.philo-text',
        { opacity: 0, y: -150, z: 200, scale: 1.1, duration: 0.4, ease: "power2.in" },
        0.6
      );
    }

    return () => {
      window.removeEventListener('resize', updateSticky);
    };
  }, { scope: container });

  return (
    <main ref={container} className="bg-[#0f0f11] min-h-screen text-zinc-200 font-sans selection:bg-[#ff0163] selection:text-white">
      
      {/* Navegación protegida dinámica */}
      <nav className={`fixed top-0 left-0 w-full flex justify-between items-center z-50 transition-all duration-300 ${
        navSolid 
          ? "py-4 px-6 md:px-8 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "p-6 md:p-8 pointer-events-none"
      }`}>
        <div 
          className="pointer-events-auto cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image src="/multimedia/logo/logodonnamoda.png" alt="DonnaModa Logo" width={200} height={50} className="h-6 md:h-8 w-auto drop-shadow-md object-contain" />
        </div>
        <ul className={`flex space-x-6 md:space-x-8 text-xs md:text-sm tracking-widest uppercase pointer-events-auto text-white ${
          navSolid ? "" : "mix-blend-difference"
        }`}>
          <li><button onClick={() => document.getElementById('carousel')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#ff0163] transition-colors cursor-pointer">Colección</button></li>
          <li><button className="hover:text-[#ff0163] transition-colors cursor-pointer">Boutique</button></li>
        </ul>
      </nav>

      {/* --- HERO CON CANVAS SEQUENCE (Scrollytelling incorporado) --- */}
      <CanvasSequence />

      {/* --- FILOSOFÍA / MANIFIESTO (Glassmorfismo Parallax) --- */}
      {/* El margen negativo -mt-[100vh] hace que se superponga al final del pin de CanvasSequence */}
      <section className="relative w-full z-20 -mt-[100vh] philo-container overflow-hidden stack-section" style={{ perspective: "2000px" }}>
        <div className="w-full bg-[#0a0a0c]/60 backdrop-blur-2xl border-t border-[#ff0163]/20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] min-h-screen relative flex items-center justify-center py-32" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Card Flotante Izquierda */}
          <div className="philo-card-left absolute left-4 lg:left-[10%] w-[250px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 pointer-events-none hidden md:block will-change-transform">
            <Image src="/multimedia/model1.jpg" alt="DonnaModa Filosofía" fill className="object-cover object-top opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" />
          </div>

          {/* Texto Central */}
          <div className="philo-text relative z-10 max-w-5xl mx-auto text-center px-6 pointer-events-auto drop-shadow-2xl flex flex-col items-center">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              ✨ ¿Por qué <span className="italic text-[#ff0163]">Donna Moda</span>?
            </h2>
            <h3 className="text-xl md:text-2xl font-light text-zinc-300 mb-8 uppercase tracking-widest">
              Tu estilo comienza aquí
            </h3>
            
            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md mb-12">
              En Donna Moda creemos que la moda es una forma de expresar quién eres. Por eso seleccionamos cuidadosamente cada pieza para ayudarte a encontrar prendas que hagan match con tu estilo, personalidad y cada ocasión.
            </p>
            
            <div className="text-left max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 hover:border-[#ff0163]/40 transition-colors shadow-2xl">
                <h4 className="text-white text-lg font-serif mb-2 tracking-wide">✨ Selección con estilo</h4>
                <p className="font-light text-sm text-zinc-400">Elegimos cada prenda pensando en las tendencias, la versatilidad y los detalles que hacen la diferencia.</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 hover:border-[#ff0163]/40 transition-colors shadow-2xl">
                <h4 className="text-white text-lg font-serif mb-2 tracking-wide">👗 Encuentra tu look</h4>
                <p className="font-light text-sm text-zinc-400">Desde un look casual para el día hasta ese outfit especial que estabas buscando.</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 hover:border-[#ff0163]/40 transition-colors shadow-2xl">
                <h4 className="text-white text-lg font-serif mb-2 tracking-wide">💖 Atención cercana</h4>
                <p className="font-light text-sm text-zinc-400">Nos gusta conocer a nuestras clientas y ayudarte a encontrar aquello con lo que realmente te sientas tú.</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 hover:border-[#ff0163]/40 transition-colors shadow-2xl">
                <h4 className="text-white text-lg font-serif mb-2 tracking-wide">📍 Moda cerca de ti</h4>
                <p className="font-light text-sm text-zinc-400">Visítanos en Puerto Morelos y descubre nuestra colección en persona.</p>
              </div>
            </div>
            
          </div>



        </div>
      </section>

      {/* --- HANGING CAROUSEL --- */}
      <div id="carousel">
        <HangingCarouselSection />
      </div>

      {/* --- TESTIMONIOS --- */}
      <section className="relative w-full py-32 z-30 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 bg-[#050505] stack-section will-change-transform">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/multimedia/5.jpg" className="parallax-img object-cover object-center scale-[1.3] will-change-transform" alt="Fondo Editorial" fill style={{ filter: 'grayscale(100%) brightness(0.8)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/90 backdrop-blur-[1px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <div className="text-center mb-20 slide-right">
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">La Crítica</h2>
            <p className="text-zinc-400 font-light text-xl max-w-xl mx-auto">Reconocimiento internacional a la maestría en la estructura y fluidez de cada diseño.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-8 md:gap-12">
              {[
                { quote: "Una redefinición absoluta de la elegancia contemporánea. Cada corte tiene un propósito indiscutible.", author: "Vogue México" },
                { quote: "Minimalismo que no se siente frío. Es un auténtico lujo táctil, meticulosamente pensado para moverse.", author: "Elle" }
              ].map((t, i) => (
                <div key={`left-${i}`} className="p-8 md:p-12 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-[2.5rem] border border-white/5 hover:border-[#ff0163]/40 transition-all duration-500 hover:-translate-y-2 slide-right">
                   <div className="text-5xl md:text-6xl text-[#ff0163] font-serif mb-4 leading-none opacity-80">"</div>
                   <p className="text-zinc-200 text-xl md:text-2xl font-light leading-relaxed mb-10 drop-shadow-md">
                     {t.quote}
                   </p>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white font-serif text-xl shadow-inner">
                       {t.author.charAt(0)}
                     </div>
                     <p className="text-sm tracking-widest uppercase text-white font-semibold">{t.author}</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Columna Derecha (Escalonada) */}
            <div className="flex flex-col gap-8 md:gap-12 md:mt-24">
              {[
                { quote: "DonnaModa logra lo que parece imposible: estructurar el aire. Sus prendas tienen una caída simplemente perfecta.", author: "L'Officiel" },
                { quote: "La maestría de un diseño que respeta el cuerpo femenino sin perder ni un ápice de fuerza arquitectónica.", author: "Harper's Bazaar" }
              ].map((t, i) => (
                <div key={`right-${i}`} className="p-8 md:p-12 bg-zinc-900/60 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] rounded-[2.5rem] border border-white/5 hover:border-[#ff0163]/40 transition-all duration-500 hover:-translate-y-2 slide-right">
                   <div className="text-5xl md:text-6xl text-[#ff0163] font-serif mb-4 leading-none opacity-80">"</div>
                   <p className="text-zinc-200 text-xl md:text-2xl font-light leading-relaxed mb-10 drop-shadow-md">
                     {t.quote}
                   </p>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white font-serif text-xl shadow-inner">
                       {t.author.charAt(0)}
                     </div>
                     <p className="text-sm tracking-widest uppercase text-white font-semibold">{t.author}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="relative w-full py-32 z-40 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 bg-[#0f0f11] stack-section">
        <div className="max-w-7xl mx-auto px-6 walk-right-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] border border-white/10">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image src="/multimedia/1.jpg" alt="DonnaModa Detalles" fill className="parallax-img object-cover object-center scale-[1.2] will-change-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9b3263]/30 to-transparent mix-blend-overlay" />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Dudas Frecuentes</h2>
              <p className="text-zinc-400 font-light text-lg">Atención meticulosa incluso antes de que la prenda llegue a ti.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "¿Tienen envíos internacionales?", a: "Sí, realizamos envíos a todo el mundo a través de paquetería express. Los costos se calculan al finalizar la compra." },
                { q: "¿Puedo solicitar ajustes a la medida?", a: "Ofrecemos un servicio de tailoring exclusivo en nuestra boutique de Puerto Morelos. Para compras online, consulta nuestra guía de tallas." },
                { q: "¿Cuál es la política de devoluciones?", a: "Aceptamos devoluciones dentro de los primeros 14 días tras recibir tu pedido, en su estado original y con etiquetas." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/10">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                  >
                    <span className="text-lg md:text-xl text-zinc-200 font-light group-hover:text-white transition-colors">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#ff0163] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                    <p className="text-zinc-400 font-light pr-12">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* --- BOUTIQUE LOCATION & FOOTER --- */}
      <section className="relative w-full pt-32 z-50 rounded-t-[3rem] overflow-hidden shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10 bg-[#050505] reveal-up stack-section">
        <ParticlesBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <MapPin className="w-8 h-8 text-[#ff0163] mb-6" />
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-6">Nuestra Boutique</h3>
            <p className="text-zinc-400 font-light text-lg mb-8 max-w-md">
              Te esperamos para vivir la experiencia DonnaModa en físico. Un espacio diseñado para la apreciación del arte y la moda.
            </p>
            <div className="border-l-2 border-[#ff0163] pl-6">
              <span className="text-white text-xl md:text-2xl font-serif tracking-wide block mb-1">Puerto Morelos</span>
              <span className="text-zinc-500 text-sm tracking-widest uppercase block">Quintana Roo, México</span>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md md:max-w-none mx-auto">
            <div className="w-full aspect-square bg-white/5 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative group">
              <iframe 
                src="https://www.google.com/maps?q=20.855691,-86.900619&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(120%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80"
              />
            </div>
          </div>
        </div>

        {/* --- FOOTER COMPACTO --- */}
        <footer className="relative w-full border-t border-white/10 pt-16 pb-8 px-6 md:px-12 mt-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
          <div className="md:col-span-1">
            <Image src="/multimedia/logo/logodonnamoda.png" alt="DonnaModa Logo" width={200} height={50} className="h-10 w-auto opacity-90 mb-6 drop-shadow-sm object-contain" />
            <p className="text-zinc-500 font-light text-sm max-w-xs">
              Elegancia atemporal y precisión arquitectónica para la mujer contemporánea.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-6 font-semibold">Asistencia</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Guía de Tallas</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-6 font-semibold">Boutique</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#ff0163]" />
                <span>Puerto Morelos,<br/>Q.Roo, México</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff0163]" />
                <span>contacto@donnamoda.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-widest relative z-10">
          <p>&copy; {new Date().getFullYear()} DonnaModa. Todos los derechos reservados.</p>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-zinc-500 hover:text-[#ff0163] transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-zinc-500 hover:text-[#ff0163] transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="text-zinc-500 hover:text-[#ff0163] transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-1.76.2-3.54 1.25-4.99C4.1 10.51 5.91 9.4 7.85 9.29c.14-.01.27-.01.41-.01v4.06c-.84.09-1.69.41-2.31 1-.9.84-1.31 2.1-1 3.3.36 1.4 1.63 2.5 3.08 2.72 1.34.2 2.74-.25 3.63-1.25.75-.85 1.15-2.01 1.14-3.17-.03-5.26-.01-10.51-.02-15.77l-.25-.15z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
      </section>

    </main>
  );
}
