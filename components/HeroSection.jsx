"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

const StarScene = dynamic(() => import("./StarScene"), { ssr: false });

const heroLines = [
  "As you step into this examination season,",
  "remember who you are.",
  "You are capable.",
  "You are prepared.",
  "You are intelligent.",
  "You are stronger than every doubt.",
  "Walk into every hall with confidence.",
  "God has gone ahead of you.",
];

function SplitText({ line }) {
  return (
    <span className="block overflow-hidden">
      {line.split("").map((char, index) => (
        <span className="hero-char inline-block will-change-transform" key={`${char}-${index}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        left: `${(index * 23) % 100}%`,
        top: `${(index * 37) % 100}%`,
        x: `${((index % 7) - 3) * 18}px`,
        y: `${-28 - (index % 9) * 12}px`,
        delay: `${(index % 12) * -0.35}s`,
        duration: `${6 + (index % 8)}s`,
      })),
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-char", { yPercent: 115, opacity: 0, rotateX: -45 });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-title", { y: 34, opacity: 0, duration: 1 })
        .from(".hero-kicker", { y: 20, opacity: 0, duration: 0.75 }, "-=0.55")
        .to(".hero-char", { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.015, duration: 0.72 }, "-=0.1")
        .from(".hero-cta", { y: 18, opacity: 0, duration: 0.7 }, "-=0.35");
    }, sectionRef);

    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 26;
      const y = (event.clientY / window.innerHeight - 0.5) * 26;
      gsap.to(glowRef.current, { x, y, duration: 0.8, ease: "power2.out" });
      gsap.to(".hero-parallax", { x: x * -0.35, y: y * -0.3, duration: 0.8, ease: "power2.out" });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      ctx.revert();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.055]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="spark"
          style={{
            left: particle.left,
            top: particle.top,
            "--x": particle.x,
            "--y": particle.y,
            "--delay": particle.delay,
            "--duration": particle.duration,
          }}
        />
      ))}

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[28%] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-softGold/20 blur-[100px] sm:h-[520px] sm:w-[520px]"
      />

      <div className="mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-7xl items-center gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hero-parallax text-center lg:text-left">
          <p className="hero-kicker mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-softGold/80">God&apos;s Own</p>
          <h1 className="hero-title font-display text-[clamp(4.4rem,17vw,12rem)] font-semibold leading-[0.78] text-white">
            Mauton
          </h1>
          <div className="mx-auto mt-8 max-w-2xl space-y-2 text-balance text-lg leading-8 text-white/78 sm:text-xl lg:mx-0">
            {heroLines.map((line) => (
              <SplitText key={line} line={line} />
            ))}
          </div>
          <a
            href="#confidence"
            className="hero-cta mt-9 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-glass backdrop-blur-xl transition hover:border-softGold/50 hover:bg-softGold/15 focus:outline-none focus:ring-2 focus:ring-softGold"
          >
            Begin the blessing
            <ChevronDown className="h-4 w-4 animate-bounce text-softGold" aria-hidden="true" />
          </a>
        </div>

        <div className="relative h-[320px] sm:h-[450px] lg:h-[620px]">
          <div className="absolute inset-0 rounded-full bg-violetGlow/20 blur-[90px]" />
          <StarScene />
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/45 sm:flex">
        <span>Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/15">
          <span className="block h-4 w-px animate-[floatSpark_1.8s_ease-in-out_infinite] bg-softGold" />
        </span>
      </div>
    </section>
  );
}
