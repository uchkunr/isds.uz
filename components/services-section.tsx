"use client";

import React, { useRef } from "react";
import {
  Palette,
  Globe,
  Smartphone,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  iconColor: string;
  accentColor: string;
  spotlightColor: string;
  tags: string[];
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "ux-ui",
    title: "UX/UI",
    description:
      "Тестируем гипотезы на реальных примерах и проектируем дизайн мобильных и веб-интерфейсов.",
    icon: Palette,
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    iconColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    accentColor: "hover:border-pink-500/40",
    spotlightColor: "rgba(244, 63, 94, 0.25)",
    tags: [
      "Figma & Design Systems",
      "CJM & Прототипирование",
      "A/B тестирование",
      "Mobile & Web UI",
    ],
    features: [
      "Глубокий анализ пользовательских сценариев",
      "Адаптивный дизайн для всех типов устройств",
      "Интерактивные кликабельные прототипы",
      "Полная дизайн-система с компонентами и гайдами",
    ],
  },
  {
    id: "web-dev",
    title: "Веб-разработка",
    description:
      "Создаем высоконагруженные IT системы с применением современных технологий.",
    icon: Globe,
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    accentColor: "hover:border-blue-500/40",
    spotlightColor: "rgba(59, 130, 246, 0.25)",
    tags: [
      "High-load Architecture",
      "Next.js & React",
      "Microservices & Go",
      "PostgreSQL & Redis",
    ],
    features: [
      "Отказоустойчивая микросервисная архитектура",
      "Высокая скорость отклика и оптимизация запросов",
      "Интеграция с платежными системами и банками",
      "Строгие стандарты информационной безопасности",
    ],
  },
  {
    id: "mobile-dev",
    title: "Мобильная разработка",
    description: "Разрабатываем приложения для android и IOS.",
    icon: Smartphone,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    accentColor: "hover:border-indigo-500/40",
    spotlightColor: "rgba(129, 140, 248, 0.25)",
    tags: [
      "iOS (Swift)",
      "Android (Kotlin)",
      "React Native / Flutter",
      "App Store & Google Play",
    ],
    features: [
      "Нативная производительность и плавная анимация",
      "Оффлайн-режим с локальной синхронизацией данных",
      "Push-уведомления и биометрическая авторизация",
      "Публикация и сопровождение в сторах",
    ],
  },
  {
    id: "support",
    title: "Техподдержка",
    description:
      "Обеспечиваем бесперебойную работу систем 24/7. Исправляем ошибки в коде и внедряем новый функционал.",
    icon: Headphones,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    accentColor: "hover:border-emerald-500/40",
    spotlightColor: "rgba(52, 211, 153, 0.25)",
    tags: [
      "SLA 99.9%",
      "24/7 Мониторинг",
      "DevOps & CI/CD",
      "Hotfix & Масштабирование",
    ],
    features: [
      "Круглосуточный мониторинг серверов и логов",
      "Быстрое реагирование на инциденты по регламенту",
      "Регулярные обновления безопасности и бэкапы",
      "Постоянное доразвитие и внедрение новых фичей",
    ],
  },
];

function InteractiveServiceCard({
  service,
  onSelectService,
}: {
  service: ServiceItem;
  onSelectService?: (serviceName: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
    const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1

    gsap.to(cardRef.current, {
      rotateY: xPercent * 7,
      rotateX: -yPercent * 7,
      transformPerspective: 900,
      scale: 1.015,
      duration: 0.25,
      ease: "power2.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - 128,
        y: y - 128,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.2,
        rotate: 8,
        y: -3,
        duration: 0.35,
        ease: "back.out(2.5)",
      });
    }

    if (ambientGlowRef.current) {
      gsap.to(ambientGlowRef.current, {
        opacity: 0.85,
        scaleY: 1.15,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 5,
        duration: 0.25,
        ease: "power2.out",
      });
    }

    if (cardRef.current) {
      const tagEls = cardRef.current.querySelectorAll(".service-tag-pill");
      if (tagEls.length) {
        gsap.to(tagEls, {
          y: -2,
          stagger: 0.02,
          duration: 0.2,
          ease: "power1.out",
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        rotate: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (ambientGlowRef.current) {
      gsap.to(ambientGlowRef.current, {
        opacity: 0.3,
        scaleY: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (cardRef.current) {
      const tagEls = cardRef.current.querySelectorAll(".service-tag-pill");
      if (tagEls.length) {
        gsap.to(tagEls, {
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      }
    }
  };

  const Icon = service.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`service-card group relative overflow-hidden rounded-2xl bg-zinc-950/75 border border-zinc-800/80 transition-colors duration-300 ${service.accentColor} will-change-transform shadow-xl shadow-black/40 flex flex-col justify-between`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Interactive mouse-following cursor spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full opacity-0 blur-2xl transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(circle, ${service.spotlightColor} 0%, transparent 70%)`,
        }}
      />

      {/* Static top ambient gradient glow */}
      <div
        ref={ambientGlowRef}
        className={`pointer-events-none absolute top-0 left-0 right-0 h-44 bg-gradient-to-b ${service.gradient} opacity-30 transition-opacity duration-500 -z-10 will-change-transform`}
      />

      {/* Card Header & Content */}
      <div className="p-6 sm:p-8 pb-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            ref={iconRef}
            className={`p-3 rounded-xl border ${service.iconColor} shadow-lg shadow-black/30 will-change-transform`}
          >
            <Icon className="size-6" />
          </div>

          <a
            href="#contact"
            onClick={() => onSelectService?.(service.title)}
            className="group/link text-xs font-semibold text-zinc-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
          >
            Заказать
            <ArrowRight ref={arrowRef} className="size-3.5 text-blue-400 will-change-transform" />
          </a>
        </div>

        <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>

        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Card Body Features & Tech Tags */}
      <div className="p-6 sm:p-8 pt-2 space-y-6 relative z-10">
        {/* Features list */}
        <div className="space-y-2.5 pt-2 border-t border-zinc-900/90">
          {service.features.map((feature, idx) => (
            <div
              key={idx}
              className="service-feature-row flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors"
            >
              <CheckCircle2 className="size-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="service-tag-pill text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800/80 text-zinc-300 font-medium group-hover:border-zinc-700/80 transition-colors will-change-transform"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Ambient Background Glow Scroll Parallax Scrub
      gsap.to(".service-ambient-glow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
        y: 120,
        scale: 1.25,
        ease: "none",
      });

      // 2. Header elements staggered entrance with blur reveal
      gsap.from(".service-header-elem", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
        },
        y: 45,
        opacity: 0,
        filter: "blur(12px)",
        scale: 0.96,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "filter,transform",
      });

      // 3. Service Cards Directional Staggered Entrance
      // Left cards enter from slight left with inward angle
      gsap.from(".service-card:nth-child(odd)", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 82%",
        },
        x: -35,
        y: 60,
        rotation: -1.5,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // Right cards enter from slight right with inward angle
      gsap.from(".service-card:nth-child(even)", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 82%",
        },
        x: 35,
        y: 60,
        rotation: 1.5,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // 4. Feature items cascading reveal
      gsap.from(".service-feature-row", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 76%",
        },
        x: -16,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      // 5. Tech tags bounce pop-in
      gsap.from(".service-tag-pill", {
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 72%",
        },
        scale: 0.85,
        y: 8,
        opacity: 0,
        stagger: 0.02,
        duration: 0.5,
        delay: 0.25,
        ease: "back.out(2)",
        clearProps: "transform,opacity",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="services" className="py-24 relative">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

      {/* Floating luminous sphere with GSAP scroll parallax scrub */}
      <div className="service-ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="service-header-elem text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Услуги{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
              компании
            </span>
          </h2>

          <p className="service-header-elem text-base sm:text-lg text-zinc-400 leading-relaxed">
            Реализуем комплексные цифровые решения под ключ - от проектирования
            архитектуры и UX до запуска и круглосуточного сопровождения.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <InteractiveServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
