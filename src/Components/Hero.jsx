import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const stripRef = useRef(null);
  const text = "WELCOME ITZFIZZ".split("");

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      mainTl
        .fromTo(carRef.current, 
          { x: "0%" }, 
          // FIX: Instead of calc(), we use x: "100vw" and subtract the car's width with xPercent
          { x: "105vw", xPercent: -40, ease: "none", duration: 4 }, 
          0
        )
        .fromTo(stripRef.current, 
          { backgroundColor: "#1a1a1a" }, 
          { backgroundColor: "#4ADE80", duration: 1 }, 
          0.2
        )
        .fromTo(".reveal-char", 
          { opacity: 0 }, 
          { opacity: 1, stagger: 0.1, duration: 3 }, 
          0.3
        )
        .from(".stat-box", { scale: 0, opacity: 0, stagger: 0.1, ease: "back.out" }, 0.5);

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(refreshTimeout);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative bg-[#D1D5DB] min-h-screen flex flex-col justify-center items-center overflow-hidden">
      
      <div className="flex gap-2 mb-1 ml-120">
        <div className="stat-box bg-[#E0FF4F] p-9 w-70 rounded-sm shadow-xl">
          <h1 className="text-5xl font-bold text-black">58%</h1>
          <p className="text-[12px] font-black text-black uppercase leading-tight mt-2">Increase in pick up point use</p>
        </div>
        <div className="stat-box bg-[#374151] text-white p-10 w-70 rounded-sm shadow-xl">
          <h1 className="text-5xl font-bold">27%</h1>
          <p className="text-[12px] font-black uppercase leading-tight mt-2">Increase in pick up point use</p>
        </div>
      </div>

      <div ref={stripRef} className="relative w-full h-[220px] bg-[#1a1a1a] flex items-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <h2 className="text-7xl md:text-9xl font-bold tracking-[0.02em] flex text-black ml-0">
            {text.map((char, index) => (
              <span key={index} className="reveal-char inline-block whitespace-pre">
                {char}
              </span>
            ))}
          </h2>
        </div>

        <div className="relative w-full h-full z-10 pointer-events-none">
          <img
            ref={carRef}
            src="/car.png" 
            alt="car"
            className="absolute left-0 h-[250px] w-[450px] top-1/2 -translate-y-1/2 object-contain drop-shadow-2xl" 
          />
        </div>
      </div>

      <div className="flex gap-2 mt-1 mr-0">
        <div className="stat-box bg-[#60A5FA] p-9 w-70 rounded-sm shadow-xl">
          <h1 className="text-5xl font-bold text-black">23%</h1>
          <p className="text-[12px] font-black text-black uppercase leading-tight mt-2">Decreased in phone calls</p>
        </div>
        <div className="stat-box bg-[#F97316] p-9 w-70 rounded-sm shadow-xl">
          <h1 className="text-5xl font-bold text-black">40%</h1>
          <p className="text-[12px] font-black text-black uppercase leading-tight mt-2">Decreased in phone calls</p>
        </div>
      </div>

    </section>
  );
}
