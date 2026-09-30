"use client";

import React, { useRef } from "react";
import {
  Handshake,
  ShieldCheck,
  MessageSquare,
  GraduationCap,
  Building2,
  CheckCircle,
  Award,
  Users,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Section Header Blur-Reveal
      gsap.from(".about-header-elem", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        y: 45,
        opacity: 0,
        filter: "blur(12px)",
        scale: 0.96,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "filter,transform",
      });

      // 2. Credibility Box
      gsap.from(".about-credibility-box", {
        scrollTrigger: {
          trigger: ".about-credibility-box",
          start: "top 82%",
        },
        y: 45,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // 3. Core Principles Cards Stagger
      gsap.from(".about-principle-card", {
        scrollTrigger: {
          trigger: ".about-principles-grid",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        scale: 0.93,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: sectionRef }
  );
  const principles = [
    {
      id: "trust",
      title: "Взаимное доверие",
      description:
        "Это основа наших отношений с клиентами. Вне зависимости от формы договоренности мы всегда соблюдаем свои обещания.",
      icon: Handshake,
      badge: "Фундамент партнерства",
      color: "from-blue-500/20 via-blue-500/5 to-transparent",
      iconStyle: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      id: "responsibility",
      title: "Ответственность",
      description:
        "С нами комфортно сотрудничать. Мы несем полностью ответственность за результат своей работы.",
      icon: ShieldCheck,
      badge: "Гарантия качества",
      color: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      iconStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "communication",
      title: "Коммуникация",
      description:
        "Всегда на связи и готовы решать любые вопросы в процессе работы над проектом.",
      icon: MessageSquare,
      badge: "Открытый диалог",
      color: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      iconStyle: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      id: "growth",
      title: "Саморазвитие",
      description:
        "Наши специалисты постоянно развивают свою экспертность и тем самым повышают качество наших услуг.",
      icon: GraduationCap,
      badge: "Экспертиза и стек",
      color: "from-indigo-500/20 via-indigo-500/5 to-transparent",
      iconStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">

          <h2 className="about-header-elem text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Принципы, которых{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              мы придерживаемся
            </span>
          </h2>


          <p className="about-header-elem text-base sm:text-lg text-zinc-400 leading-relaxed">
            Мы строим долгосрочные партнерские отношения, опираясь на честность, инженерную культуру и ответственность за каждый байт кода.
          </p>
        </div>

        {/* Big Credibility Box: IT-Park resident since 2021 */}
        <div className="about-credibility-box mb-14 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                ISDS - Резиденты технологического парка IT-Park Узбекистана с 2021 года
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Специализируемся на проектировании, разработке и сопровождении сложных enterprise-систем: банковский сектор, лизинговые и страховые организации, электронный документооборот, биометрические Face ID комплексы и масштабные ERP решения.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-zinc-300 whitespace-nowrap">
                  <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">Прозрачный договор и NDA</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300 whitespace-nowrap">
                  <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">Стандарты IT-Park</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-300 whitespace-nowrap">
                  <CheckCircle className="size-4 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">Выделенные команды сеньоров</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center space-y-3">
              <Award className="size-12 text-blue-400" />
              <div className="text-3xl font-black text-white font-mono">
                2021 - 2026
              </div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                5+ лет стабильной разработки и роста
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Principles Grid */}
        <div className="about-principles-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => {
            const Icon = p.icon;
            return (
              <Card
                key={p.id}
                className="about-principle-card group relative overflow-hidden rounded-2xl bg-zinc-950/80 border border-zinc-800/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${p.color} opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <CardHeader className="relative p-6 pb-2">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl border ${p.iconStyle} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                      0{principles.indexOf(p) + 1}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wider mb-1 block">
                    {p.badge}
                  </span>

                  <CardTitle className="text-xl font-bold text-white tracking-tight">
                    {p.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative p-6 pt-2">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {p.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
