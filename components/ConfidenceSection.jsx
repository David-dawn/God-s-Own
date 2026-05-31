"use client";

import { Brain, Flame, HandHeart, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cards = [
  {
    title: "You Have Prepared",
    body: "The effort you've invested will speak for you.",
    Icon: Sparkles,
  },
  {
    title: "You Are Intelligent",
    body: "You know more than fear wants you to believe.",
    Icon: Brain,
  },
  {
    title: "You Are Resilient",
    body: "You've overcome challenges before and you will overcome this one too.",
    Icon: Flame,
  },
  {
    title: "God Is With You",
    body: "You never walk alone.",
    Icon: HandHeart,
  },
];

export default function ConfidenceSection() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".confidence-card", {
        y: 56,
        opacity: 0,
        rotateX: 10,
        stagger: 0.13,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 72%",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="confidence" ref={ref} className="section-shell">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.34em] text-softGold/80">Confidence</p>
        <h2 className="font-display text-5xl font-semibold leading-tight text-white sm:text-7xl">Why You Will Succeed</h2>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
        {cards.map(({ title, body, Icon }) => (
          <article
            key={title}
            className="confidence-card glass group relative min-h-[220px] overflow-hidden rounded-lg p-6 transition duration-500 hover:-translate-y-2 hover:border-softGold/45 hover:bg-white/[0.16]"
          >
            <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-softGold/10 blur-3xl transition group-hover:bg-softGold/20" />
            <Icon className="mb-8 h-8 w-8 text-softGold" aria-hidden="true" />
            <h3 className="font-display text-3xl font-semibold text-white">{title}</h3>
            <p className="mt-4 max-w-md leading-7 text-white/66">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
