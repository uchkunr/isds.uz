"use client";

import React from "react";
import Image from "next/image";
import { Phone, ShieldCheck, ArrowUp, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FooterProps {
  onOpenCallback: () => void;
}

export function Footer({ onOpenCallback }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 bg-zinc-950/75 backdrop-blur-xl text-zinc-400 text-sm overflow-hidden">
      {/* Top glowing gradient border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      {/* Ambient background glows matching header/hero */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-16 left-1/4 w-[450px] h-[280px] bg-blue-600/15 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute -top-10 right-1/4 w-[400px] h-[260px] bg-indigo-600/15 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[200px] bg-cyan-500/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & IT-Park Status */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <Image
                src="/favicon.png"
                alt="ISDS Logo"
                width={36}
                height={36}
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.25)]"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                ISDS<span className="text-blue-500">.UZ</span>
              </span>
            </div>

            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              IT системы для лидеров рынка. Поможем произвести автоматизацию бизнес-процессов и увеличить прибыль.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>Резиденты IT-park с 2021 г.</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Навигация
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Услуги
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Проекты
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Решения
            </div>
            <ul className="space-y-2.5 text-xs">
              <li>Экосистема & ЭДО</li>
              <li>FACE ID идентификация</li>
              <li>ERP & Лизинговые системы</li>
              <li>Мобильный банкинг</li>
              <li>Интеграция с АБС & API</li>
            </ul>
          </div>

          {/* Col 5: Contact & Callback */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Контакты
            </div>
            <div className="space-y-2">
              <a
                href="tel:+998977112116"
                className="block font-mono text-base font-bold text-white hover:text-blue-400 transition-colors"
              >
                +998 97 711 21 16
              </a>
              <div className="text-xs text-zinc-400">
                г. Ташкент, IT-Park
              </div>
            </div>

            <Button
              onClick={onOpenCallback}
              variant="outline"
              className="w-full border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs h-9 cursor-pointer"
            >
              <Phone className="size-3.5 mr-1.5 text-blue-400" />
              Заказать звонок
            </Button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © Все права защищены. {new Date().getFullYear()} ISDS.UZ
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Наверх
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
