"use client";

import { Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const letter = [
  "Dear Mauton,",
  "Exams are not a measure of your worth.",
  "They are simply an opportunity to demonstrate what you have learned.",
  "I believe in you.",
  "I know your hard work will produce results.",
  "Even when questions seem difficult, stay calm, trust yourself, and keep moving forward.",
  "Remember that God is with you every step of the way.",
  "You are capable of more than you realize.",
  "Go and shine.",
  "- Ife",
];

export default function LetterSection() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".letter-card", { transformOrigin: "top center" });
      gsap.from(".letter-card", {
        rotateX: -28,
        y: 80,
        opacity: 0,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".letter-line", {
        y: 18,
        opacity: 0,
        stagger: 0.09,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: ".letter-card", start: "top 72%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="section-shell">
      <div className="mx-auto max-w-4xl">
        <div className="letter-card glass relative overflow-hidden rounded-lg p-6 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-softGold/80 to-transparent" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-softGold/10 blur-3xl" />
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-softGold/15 text-softGold">
              <Mail className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="font-display text-5xl font-semibold sm:text-7xl">A Note For You</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-white/74 sm:text-xl sm:leading-9">
            {letter.map((line) => (
              <p key={line} className={line === "- David" ? "letter-line gold-text font-display text-3xl font-semibold" : "letter-line"}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
