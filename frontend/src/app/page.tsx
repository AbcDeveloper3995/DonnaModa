"use client";
import CanvasSequence from "@/components/CanvasSequence";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useRef, useState } from "react";
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
  
  useGSAP(() => {
    const cards = gsap.utils.toArray('.bento-card');
    cards.forEach((card: any) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "bottom 5%",
          scrub: 1,
        }
      });
      tl.fromTo(card,
        { opacity: 0, y: 200, z: -400, rotationX: 25, scale: 0.85 },
        { opacity: 1, y: 0, z: 0, rotationX: 0, scale: 1, ease: "power2.out", duration: 0.4 }
      );
      tl.to(card, { opacity: 1, duration: 0.3 });
      tl.to(card, { opacity: 0.1, y: -100, z: -200, rotationX: -15, scale: 0.9, duration: 0.3 });
    });

    const images = gsap.utils.toArray('.bento-img');
    images.forEach((img: any) => {
      gsap.fromTo(img,
        { y: -40, scale: 1.15 },
        { y: 40, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
      );
    });

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

      // Card Derecha
      philoTl.fromTo('.philo-card-right',
        { opacity: 0, x: 200, y: 200, z: -600, rotationY: 50, rotationZ: 10 },
        { opacity: 0.8, x: 0, y: 0, z: 0, rotationY: -25, rotationX: 10, rotationZ: 5, duration: 0.4, ease: "power2.out" },
        0
      );
      philoTl.to('.philo-card-right', { opacity: 0.8, duration: 0.2 }, 0.4);
      philoTl.to('.philo-card-right',
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

  }, { scope: container });

  return (
    <main ref={container} className="bg-[#0f0f11] min-h-screen text-zinc-200 font-sans selection:bg-[#ff0163] selection:text-white overflow-x-hidden">
      
      {/* Navegación */}
      <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-none mix-blend-difference text-white">
        <div className="pointer-events-auto">
          <img src="/multimedia/logo/logodonnamoda.png" alt="DonnaModa Logo" className="h-6 md:h-8 w-auto brightness-0 invert" />
        </div>
        <ul className="flex space-x-8 text-sm tracking-widest uppercase pointer-events-auto">
          <li><button className="hover:text-[#ff0163] transition-colors">Colección</button></li>
          <li><button className="hover:text-[#ff0163] transition-colors">Boutique</button></li>
        </ul>
      </nav>

      {/* --- HERO CON CANVAS SEQUENCE (Scrollytelling incorporado) --- */}
      <CanvasSequence />

      {/* --- FILOSOFÍA / MANIFIESTO (Glassmorfismo Parallax) --- */}
      {/* El margen negativo -mt-[100vh] hace que se superponga al final del pin de CanvasSequence */}
      <section className="relative w-full z-20 -mt-[100vh] philo-container overflow-hidden" style={{ perspective: "2000px" }}>
        <div className="w-full bg-[#0a0a0c]/60 backdrop-blur-2xl border-t border-[#ff0163]/20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] min-h-screen relative flex items-center justify-center py-32" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Card Flotante Izquierda */}
          <div className="philo-card-left absolute left-4 lg:left-[10%] w-[250px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 pointer-events-none hidden md:block">
            <img src="/multimedia/model1.jpg" alt="DonnaModa Filosofía" className="w-full h-full object-cover object-top opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-transparent to-transparent" />
          </div>

          {/* Texto Central */}
          <div className="philo-text relative z-10 max-w-5xl mx-auto text-center px-6 pointer-events-auto drop-shadow-2xl">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              La moda no es lo que vistes.<br/>
              <span className="italic text-[#9b3263]">Es cómo habitas el espacio.</span>
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              En DonnaModa, fusionamos la precisión arquitectónica con la fluidez orgánica. Cada pieza es diseñada no solo para lucir impecable, sino para responder a la cadencia natural de tu cuerpo.
            </p>
          </div>

          {/* Card Flotante Derecha */}
          <div className="philo-card-right absolute right-4 lg:right-[10%] w-[250px] md:w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/5 pointer-events-none hidden md:block">
            <img src="/multimedia/model2.jpg" alt="DonnaModa Artesanía" className="w-full h-full object-cover object-center opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11] via-transparent to-transparent" />
          </div>

        </div>
      </section>

      {/* --- BENTO GRID --- */}
      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 z-10" style={{ transformStyle: "preserve-3d", perspective: "1200px" }}>
        <ParticlesBackground />
        
        <div className="mb-32 text-center max-w-4xl mx-auto bento-card origin-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-serif text-white mb-8">La Forma del <span className="italic text-[#ff0163]">Movimiento</span></h2>
          <p className="text-zinc-400 text-xl font-light leading-relaxed">
            Nuestros cortes se adaptan a la silueta con precisión arquitectónica. Descubre cómo las telas premium cobran vida al deslizar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 auto-rows-[450px] md:auto-rows-[600px]" style={{ transformStyle: "preserve-3d" }}>
          
          <div className="bento-card md:col-span-8 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]" src="/multimedia/PixVerse_V6_Image_Text_540P_mujer_modelando_la.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-12 left-12 z-10 pr-12">
              <span className="bg-[#9b3263]/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-[#ff0163] border border-[#ff0163]/30 mb-6 inline-block">V6 Collection</span>
              <h3 className="text-5xl md:text-6xl font-serif text-white leading-tight">Fluidez<br/>Natural</h3>
            </div>
          </div>

          <div className="bento-card md:col-span-4 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img src="/multimedia/model1.jpg" alt="Modelo Colección V6" className="bento-img w-full h-[120%] object-cover object-top -mt-[10%]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#9b3263]/80 via-black/40 to-transparent opacity-60 mix-blend-multiply" />
            <div className="absolute bottom-10 left-10 z-10">
              <h3 className="text-3xl font-serif text-white">Estructura</h3>
            </div>
          </div>

          <div className="bento-card md:col-span-5 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom mt-16 md:mt-32">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img src="/multimedia/model2.jpg" alt="Detalle de Tela" className="bento-img w-full h-[120%] object-cover object-center -mt-[10%]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0f11]/90 to-transparent" />
            <div className="absolute bottom-12 left-12 z-10">
              <h3 className="text-4xl font-serif text-white italic mb-2">Elegancia<br/>Atemporal</h3>
              <p className="text-sm tracking-widest uppercase text-[#9b3263]">Detalles bordados</p>
            </div>
          </div>

          <div className="bento-card md:col-span-7 relative rounded-[2rem] overflow-hidden bg-[#18181b] group shadow-2xl origin-bottom">
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2s]" src="/multimedia/Model_walks_on_fashion_runway_202608181749.mp4" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/90 via-black/50 to-transparent" />
            <div className="absolute inset-y-0 left-12 flex flex-col justify-center z-10 max-w-md">
              <h3 className="text-5xl font-serif text-white mb-6">La Pasarela</h3>
              <p className="text-zinc-300 text-lg font-light leading-relaxed mb-8">
                Presenciamos el movimiento en su estado más puro. Una muestra de impacto y presencia escénica.
              </p>
              <div>
                <button className="bg-[#ff0163] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#9b3263] transition-colors shadow-[0_0_20px_rgba(255,1,99,0.3)]">
                  Ver Desfile
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- TESTIMONIOS --- */}
      <section className="relative w-full max-w-6xl mx-auto px-6 py-32 z-10 reveal-up">
        <h2 className="text-5xl font-serif text-white mb-16 text-center">Voces de la Crítica</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { quote: "Una redefinición absoluta de la elegancia contemporánea. Cada corte tiene un propósito.", author: "Vogue México" },
            { quote: "DonnaModa logra lo imposible: estructurar el aire. Sus prendas tienen caída perfecta.", author: "L'Officiel" },
            { quote: "Minimalismo que no se siente frío. Es lujo táctil, pensado para moverse.", author: "Elena R." }
          ].map((t, i) => (
            <div key={i} className="p-10 bg-[#18181b] shadow-xl rounded-[2rem] border border-white/5 hover:border-[#9b3263]/50 transition-colors">
               <div className="text-4xl text-[#ff0163] font-serif mb-6">"</div>
               <p className="text-zinc-300 text-xl font-light leading-relaxed mb-8">{t.quote}</p>
               <p className="text-xs tracking-widest uppercase text-zinc-500">{t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="relative w-full max-w-4xl mx-auto px-6 py-32 z-10 reveal-up">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Dudas Frecuentes</h2>
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
      </section>

      {/* --- CTA / NEWSLETTER --- */}
      <section className="relative w-full px-6 py-32 md:py-48 z-10 overflow-hidden reveal-up">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b3263]/10 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center z-10">
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">Únete al Círculo</h2>
          <p className="text-zinc-400 text-lg mb-12 font-light">
            Recibe acceso anticipado a nuevas colecciones, piezas de edición limitada y eventos privados en nuestra boutique.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" placeholder="Tu correo electrónico" required
              className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff0163]/50 transition-colors"
            />
            <button type="submit" className="bg-[#ff0163] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#9b3263] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,1,99,0.3)]">
              Suscribirse <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* --- BOUTIQUE LOCATION (Map) --- */}
      <section className="relative w-full h-[70vh] bg-[#050505] overflow-hidden reveal-up">
        <div className="absolute inset-0 w-full h-full opacity-40">
           {/* Static stylized map background using a dark textured image or generic map embed if needed, here we use a gradient mesh to simulate depth */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9b3263]/20 via-[#050505] to-[#050505]"></div>
           <img src="/multimedia/model1.jpg" className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Texture" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-16 rounded-[2rem] text-center shadow-2xl pointer-events-auto max-w-lg w-full">
            <MapPin className="w-8 h-8 text-[#ff0163] mx-auto mb-6" />
            <h3 className="font-serif text-4xl text-white mb-4">Nuestra Boutique</h3>
            <p className="text-zinc-400 font-light mb-8 text-lg">
              Te esperamos para vivir la experiencia DonnaModa en físico.<br/>
              <span className="text-zinc-500 text-base">Puerto Morelos, Quintana Roo, México</span>
            </p>
            <a 
              href="https://maps.app.goo.gl/gk9v5uC8bGRzBgyv5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-[#ff0163] hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
            >
              Abrir en Google Maps <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER EXPANDIDO --- */}
      <footer className="w-full bg-[#050505] pt-24 pb-12 px-6 md:px-12 relative z-20 reveal-up">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img src="/multimedia/logo/logodonnamoda.png" alt="DonnaModa Logo" className="h-10 w-auto brightness-0 invert opacity-90 mb-6" />
            <p className="text-zinc-500 font-light text-sm max-w-xs">
              Elegancia atemporal y precisión arquitectónica para la mujer contemporánea.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white mb-6 font-semibold">Explorar</h4>
            <ul className="space-y-4 text-zinc-500 text-sm font-light">
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">V6 Collection</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Essentials</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Accesorios</a></li>
              <li><a href="#" className="hover:text-[#ff0163] transition-colors">Lookbook</a></li>
            </ul>
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
        
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} DonnaModa. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#ff0163] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="hover:text-[#ff0163] transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
