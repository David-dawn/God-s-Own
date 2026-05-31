"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const verses = [
  {
    ref: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
  },
  {
    ref: "Isaiah 41:10",
    text: "Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you and help you.",
  },
  {
    ref: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
  },
];

export default function ScriptureSection() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".scripture-card", {
        y: 70,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-shell">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-softGold/80">Scripture</p>
          <h2 className="max-w-2xl font-display text-5xl font-semibold leading-tight sm:text-7xl">Words To Carry With You</h2>
        </div>
        <BookOpen className="hidden h-12 w-12 text-softGold/70 md:block" aria-hidden="true" />
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {verses.map((verse) => (
          <article key={verse.ref} className="scripture-card glass rounded-lg p-6">
            <p className="gold-text font-display text-3xl font-semibold">{verse.ref}</p>
            <blockquote className="mt-6 text-lg leading-8 text-white/72">&ldquo;{verse.text}&rdquo;</blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
