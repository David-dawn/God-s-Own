"use client";

import { RefreshCw, Sparkle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const messages = [
  "You've got this.",
  "One question at a time.",
  "Excellence is already within you.",
  "Trust your preparation.",
  "God's grace is sufficient.",
  "Stay calm and keep moving.",
  "Your mind is steady and bright.",
  "Breathe, read carefully, answer boldly.",
  "You are not behind. You are becoming.",
  "Every page you studied still matters.",
  "Peace is allowed in the exam hall.",
  "You can handle what is in front of you.",
  "Confidence looks beautiful on you.",
  "Wisdom will meet you there.",
  "The work you did was not wasted.",
  "Doubt is loud, but it is not in charge.",
  "You are sharper than the pressure.",
  "Begin with what you know.",
  "Clarity will come as you write.",
  "You carry favor, discipline, and grace.",
  "Your future is bigger than this fear.",
  "Small steady steps win difficult days.",
  "You have overcome before.",
  "God has gone ahead of you.",
  "Your courage can be quiet and still be real.",
  "You are capable of excellent results.",
  "Do not rush your peace.",
  "Your preparation has a voice.",
  "You are God's Own.",
  "Go in with faith. Come out with joy.",
  "The right answers can find you calmly.",
  "You are made for more than anxiety.",
];

export default function EncouragementSection() {
  const ref = useRef(null);
  const messageRef = useRef(null);
  const [message, setMessage] = useState(messages[0]);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".encouragement-panel", {
        y: 58,
        opacity: 0,
        scale: 0.96,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 76%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const revealMessage = () => {
    let next = Math.floor(Math.random() * messages.length);
    if (next === lastIndex) next = (next + 7) % messages.length;
    setLastIndex(next);
    gsap
      .timeline()
      .to(messageRef.current, { opacity: 0, scale: 0.94, filter: "blur(10px)", y: 12, duration: 0.22, ease: "power2.in" })
      .call(() => setMessage(messages[next]))
      .to(messageRef.current, { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.45, ease: "power3.out" });
  };

  return (
    <section ref={ref} className="section-shell pt-6">
      <div className="encouragement-panel glass relative overflow-hidden rounded-lg px-5 py-12 text-center sm:px-10 sm:py-16">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-violetGlow/20 blur-3xl" />
        <Sparkle className="mx-auto mb-5 h-9 w-9 text-softGold" aria-hidden="true" />
        <h2 className="font-display text-4xl font-semibold sm:text-6xl">Click When You Need Encouragement</h2>
        <p ref={messageRef} aria-live="polite" className="mx-auto mt-8 min-h-[92px] max-w-3xl text-balance font-display text-3xl leading-tight text-white sm:text-5xl">
          {message}
        </p>
        <motion.button
          type="button"
          onClick={revealMessage}
          whileTap={{ scale: 0.96 }}
          whileHover={{ y: -2 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-softGold px-6 py-3 text-sm font-bold text-midnight shadow-aureate transition hover:scale-[1.03] hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-midnight"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          New encouragement
        </motion.button>
      </div>
    </section>
  );
}
