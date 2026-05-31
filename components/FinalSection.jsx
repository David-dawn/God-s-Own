"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StarScene = dynamic(() => import("./StarScene"), { ssr: false });

export default function FinalSection() {
  const ref = useRef(null);
  const particles = useMemo(
    () =>
      Array.from({ length: 64 }, (_, index) => ({
        id: index,
        left: `${(index * 19) % 100}%`,
        delay: `${(index % 13) * -0.22}s`,
        duration: `${5 + (index % 7)}s`,
      })),
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .from(".final-title", { y: 70, opacity: 0, scale: 0.94, duration: 1 })
        .from(".final-line", { y: 32, opacity: 0, stagger: 0.18, duration: 0.8 }, "-=0.45")
        .to(".final-burst", { scale: 1.4, opacity: 0.82, duration: 1.2 }, 0);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative z-10 min-h-screen overflow-hidden px-4 py-24 sm:px-6">
      <div className="final-burst absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-softGold/20 opacity-30 blur-[120px] sm:h-[720px] sm:w-[720px]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="spark bottom-[-4%]"
          style={{
            left: particle.left,
            "--x": "0px",
            "--y": "-180px",
            "--delay": particle.delay,
            "--duration": particle.duration,
          }}
        />
      ))}
      <div className="absolute inset-0 opacity-60">
        <StarScene final />
      </div>
      <div className="relative mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-softGold/25 bg-softGold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-softGold">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          Go shine
        </p>
        <h2 className="final-title font-display text-[clamp(3.7rem,12vw,9rem)] font-semibold leading-[0.88]">
          The Future Is Waiting For You
        </h2>
        <div className="mt-10 space-y-4 text-balance text-xl leading-8 text-white/78 sm:text-2xl">
          <p className="final-line">Walk into every exam hall with confidence.</p>
          <p className="final-line">You are prepared.</p>
          <p className="final-line">You are capable.</p>
          <p className="final-line gold-text font-display text-4xl font-semibold sm:text-6xl">You are God&apos;s Own.</p>
        </div>
      </div>
    </section>
  );
}
