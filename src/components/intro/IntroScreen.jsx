import { useEffect, useRef, useState } from "react";
import { ArrowRight, MoveDown } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

const IntroScreen = ({ onEnter }) => {
  const containerRef = useRef(null);
  const bgRef1 = useRef(null);
  const bgRef2 = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsClient(true);

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const SplitTextModule = await import("gsap/SplitText");

      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.default;
      const SplitText = SplitTextModule.default;
      
      gsap.registerPlugin(ScrollTrigger, SplitText);

      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });
      
      gsap.from(titleSplit.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.04,
        duration: 2.5,
        ease: "power2.out",
      });

      gsap.from(subtitleSplit.chars, {
        opacity: 0,
        y: 50,
        stagger: 0.02,
        duration: 2, 
        ease: "power1.out",
        delay: 1,
      });

      gsap.fromTo(
        arrowRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        }
      );

      gsap.to([titleRef.current, subtitleRef.current, arrowRef.current], {
        scale: 1.8,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "center center",
          scrub: 0.7,
        },
      });

      // Parallax suave de la primera imagen
      gsap.to(bgRef1.current, {
        scale: 1.1,
        yPercent: -10,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% center",
          scrub: 1,
        },
      });

      gsap.fromTo(
        bgRef2.current,
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: ".second-section",
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    };

    if (isClient) initGSAP();

    return () => {
      if (isClient) {
        import("gsap/ScrollTrigger").then(({ default: ScrollTrigger }) => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
        });
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="relative h-[200vh] overflow-hidden">
      <div
        ref={bgRef1}
        className="fixed top-0 left-0 w-full h-screen z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=2100&q=80")',
          backgroundAttachment: "fixed",
        }}
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-green-900 opacity-30 z-10 pointer-events-none" />
      <div className="relative z-20 flex flex-col justify-center items-center min-h-screen px-6 text-center text-white">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 transition-all duration-700"
        >
          Emisiones de gases <br /> efecto invernadero
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl max-w-2xl text-white/90 mb-8"
        >
          Explora el nuevo dashboard de emisiones
        </p>
        <div 
          ref={arrowRef}
          className="mt-12"
        >
          <MoveDown size={80} className="text-white/80" />
        </div>
      </div>

      <div className="second-section relative z-30 min-h-screen flex flex-col justify-center items-center px-6 text-center text-white">
        <div
          ref={bgRef2}
          className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center opacity-0"
          style={{
            backgroundImage: 'url("/fondo.jpg")',
          }}
        />
        <div className="bg-green-950/60 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Listo para el cambio</h2>
          <p className="text-lg md:text-xl mb-8">
            Sumérgete en los datos, identifica oportunidades de mejora y actúa por un futuro sostenible.
          </p>
          <div className="flex justify-center">
            <button
              ref={buttonRef}
              onClick={onEnter}
              className="cta-button bg-white text-green-800 hover:bg-green-100 cursor-pointer px-8 py-4 rounded-full text-xl font-semibold flex items-center gap-3 transition-all shadow-lg hover:scale-105 mx-auto"
            >
              Entrar al Dashboard
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;