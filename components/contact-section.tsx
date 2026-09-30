"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Clock,
  Sparkles,
  Building,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ContactSectionProps {
  initialSubject?: string;
}

export function ContactSection({ initialSubject }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState(initialSubject ? `Интересует проект/услуга: ${initialSubject}` : "");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      // 1. Heading blur reveal
      gsap.from(".contact-header-elem", {
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

      // 2. Direct contact cards stagger
      gsap.from(".contact-info-card", {
        scrollTrigger: {
          trigger: ".contact-info-list",
          start: "top 85%",
        },
        x: -35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      // 3. Form card smooth slide up
      gsap.from(".contact-form-card", {
        scrollTrigger: {
          trigger: ".contact-form-card",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        scale: 0.96,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: sectionRef }
  );

  // Sync if initialSubject changes
  React.useEffect(() => {
    if (initialSubject) {
      setMessage((prev) =>
        prev.includes(initialSubject)
          ? prev
          : `Здравствуйте! Интересует проект/услуга: "${initialSubject}". Давайте обсудим детали.`
      );
    }
  }, [initialSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.trim().length < 9) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">


              <h2 className="contact-header-elem text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Давайте{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                  работать?
                </span>
              </h2>


              <p className="contact-header-elem text-base sm:text-lg text-zinc-300 leading-relaxed">
                Расскажите о вашем проекте и в ближайшее время мы свяжемся с вами для обсуждения всех деталей.
              </p>
            </div>

            {/* Direct contact cards */}
            <div className="contact-info-list space-y-4">
              <a
                href="tel:+998977112116"
                className="contact-info-card flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-blue-500/40 transition-all duration-200 group"
              >
                <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-400">
                    Прямой номер телефона
                  </div>
                  <div className="text-lg font-bold font-mono text-white group-hover:text-blue-400 transition-colors">
                    +998 97 711 21 16
                  </div>
                </div>
              </a>


              <div className="contact-info-card flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Clock className="size-5" />
                </div>
                <div>
                  <div className="text-xs font-medium text-zinc-400">
                    Режим работы
                  </div>
                  <div className="text-sm font-semibold text-white">
                    Техподдержка 24/7 / Ответ в течение 15 минут
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="contact-form-card relative rounded-3xl border border-zinc-800 bg-zinc-950/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-300">
                  <div className="size-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Заявка успешно отправлена!
                  </h3>
                  <p className="text-zinc-300 text-sm max-w-md leading-relaxed">
                    Спасибо, {name}! Наш эксперт уже получил вашу заявку и свяжется с вами по номеру {phone} для обсуждения деталей проекта.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("+998 ");
                      setCompany("");
                      setMessage("");
                    }}
                    variant="outline"
                    className="border-zinc-800 text-zinc-300 hover:text-white mt-4"
                  >
                    Отправить еще одну заявку
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Ваше имя */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Ваше имя <span className="text-blue-400">*</span>
                      </label>
                      <Input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Илон Маск"
                        className="h-11 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl"
                      />
                    </div>

                    {/* Контактный номер */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                        Контактный номер <span className="text-blue-400">*</span>
                      </label>
                      <Input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="998 (00) 000 00 00"
                        className="h-11 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  {/* Название компании */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Название компании
                    </label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Tesla"
                      className="h-11 bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl"
                    />
                  </div>

                  {/* Сообщение */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Сообщение
                    </label>
                    <Textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Введите текст: опишите задачу, сроки или требования к проекту..."
                      className="bg-zinc-900/90 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl resize-none min-h-[110px]"
                    />
                  </div>

                  <p className="text-[12px] text-zinc-500 leading-relaxed">
                    Нажимая кнопку «Отправить», вы даете согласие на обработку персональных данных и подтверждаете согласие с политикой конфиденциальности.
                  </p>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-base shadow-xl shadow-blue-600/30 transition-all duration-200 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-5 animate-spin mr-2" />
                        Отправка заявки...
                      </>
                    ) : (
                      <>
                        Отправить
                        <Send className="size-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
