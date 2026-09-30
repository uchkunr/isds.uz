"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import {
  Layers,
  FileCheck2,
  Briefcase,
  FolderOpen,
  ClipboardCheck,
  UserCheck,
  Smartphone,
  Server,
  ScanFace,
  Globe,
  Users2,
  Database,
  ShoppingBag,
  Navigation,
  Bot,
  Network,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  categories: ("all" | "universal" | "bank" | "leasing" | "insurance")[];
  categoryLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  tags: string[];
  features: string[];
}

const allProjects: ProjectItem[] = [
  {
    id: "ecosystem",
    title: "Экосистема",
    shortDesc:
      "Единая цифровая среда корпоративного управления, объединяющая процессы и сервисы компании.",
    fullDesc:
      "Масштабная цифровая экосистема, которая объединяет разрозненные отделы, филиалы и информационные системы организации в единое защищенное пространство с сквозной авторизацией (SSO) и единой базой знаний.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: Layers,
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    tags: ["SSO / OAuth2", "Microservices", "High Availability", "Audit Logs"],
    features: [
      "Единый личный кабинет сотрудника",
      "Ролевая модель доступа любой сложности",
      "Модульная архитектура для быстрого подключения новых сервисов",
      "Сквозная аналитика и дашборды для топ-менеджмента",
    ],
  },
  {
    id: "ecosystem-edo",
    title: "Экосистема - ЭДО",
    shortDesc:
      "Юридически значимый электронный документооборот с поддержкой ЭЦП и маршрутов согласования.",
    fullDesc:
      "Система электронного документооборота корпоративного и межведомственного уровня с поддержкой государственных ЭЦП РУз, автоматической валидацией сертификатов и многоуровневыми цепочками визирования.",
    categories: ["all", "universal", "bank"],
    categoryLabel: "Банки / Универсальный",
    icon: FileCheck2,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    tags: ["ЭЦП РУз", "PDF/A-1", "Шифрование ГОСТ", "Быстрый поиск"],
    features: [
      "Поддержка квалифицированных ЭЦП (E-imzo / E-kalit)",
      "Гибкий конструктор маршрутов согласования",
      "Автоматическое протоколирование версий и изменений",
      "Интеграция с 1С, банковскими АБС и госсистемами",
    ],
  },
  {
    id: "ecosystem-assistant",
    title: "Экосистема - Аппарат и Помощник",
    shortDesc:
      "Автоматизация протоколов, поручений руководства и мониторинга сроков выполнения задач.",
    fullDesc:
      "Специализированное решение для секретариата и аппарата управления: протоколирование заседаний, автогенерация поручений, смарт-напоминания и строгий контроль дедлайнов для исполнителей.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: Briefcase,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    tags: ["Контроль дедлайнов", "Push & SMS", "Протоколы", "Отчетность"],
    features: [
      "Электронные протоколы совещаний и правления",
      "Автоматическая постановка поручений по пунктам протокола",
      "Интерактивная лента задач и смарт-напоминания исполнителям",
      "Сводный отчет дисциплины для генерального директора",
    ],
  },
  {
    id: "ecosystem-chancellery",
    title: "Экосистема - Канцелярия",
    shortDesc:
      "Регистрация входящей и исходящей корреспонденции, номенклатура дел и электронный архив.",
    fullDesc:
      "Модуль канцелярии обеспечивает 100% учет бумажных и цифровых документов, автоматическое присвоение номеров, сканирование с распознаванием штрихкодов и надежное архивное хранение.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: FolderOpen,
    iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    tags: ["Штрихкоды / QR", "Номенклатура", "OCR", "Электронный архив"],
    features: [
      "Автоматическая нумерация по номенклатуре дел",
      "Маркировка и быстрый поиск по QR / штрихкоду",
      "Контроль местонахождения оригиналов документов",
      "Быстрый экспорт отчетов и статистических справок",
    ],
  },
  {
    id: "ecosystem-workflow",
    title: "Экосистема - Делопроизводитель",
    shortDesc:
      "Оперативный контроль исполнительской дисциплины и маршрутизация рабочих процессов.",
    fullDesc:
      "Рабочее место делопроизводителя с аналитикой нагрузки на сотрудников, воронкой движения резолюций и интеллектуальным планированием ресурсов подразделений.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: ClipboardCheck,
    iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    tags: ["Workflows", "SLA задач", "Эскалация", "Аналитика"],
    features: [
      "Автоматическая эскалация просроченных поручений",
      "Аналитика исполнительской дисциплины в реальном времени",
      "Удобное делегирование и переназначение задач",
      "Шаблоны типовых резолюций и писем",
    ],
  },
  {
    id: "ecosystem-hr",
    title: "Экосистема - HR-модуль",
    shortDesc:
      "Управление штатным расписанием, кадровыми приказами, отпусками и личными делами.",
    fullDesc:
      "Автоматизация кадрового учета компании: электронные заявления на отпуск, больничные, оформление командировок, электронные трудовые договоры и штатное расписание.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: UserCheck,
    iconColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    tags: ["Кадровый учет", "Отпуска онлайн", "Табель учета", "Штатка"],
    features: [
      "Личный кабинет сотрудника для подачи любых заявлений",
      "Автоматический расчет остатка отпускных дней",
      "Интеграция с национальными базами (Mehnat.uz)",
      "Формирование кадровых приказов в 1 клик",
    ],
  },
  {
    id: "mobile-apps",
    title: "Мобильные приложения",
    shortDesc:
      "Высокопроизводительные приложения для iOS и Android: банкинг, клиенты, сервис.",
    fullDesc:
      "Разработка мобильных приложений enterprise-класса с биометрическим входом (Face ID / Touch ID), оффлайн-кешированием, push-инфраструктурой и поддержкой миллионов пользователей.",
    categories: ["all", "universal", "bank"],
    categoryLabel: "Банки / Универсальный",
    icon: Smartphone,
    iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    tags: ["React Native", "Flutter", "iOS & Android", "Fintech Grade"],
    features: [
      "Банковский уровень безопасности (SSL Pinning, биометрия)",
      "Интеграция с локальными платежными системами (Payme, Click, Uzum)",
      "Быстрая и плавная работа интерфейса при слабом интернете",
      "Автоматизированный мониторинг крашей и аналитика сессий",
    ],
  },
  {
    id: "erp-system",
    title: "ERP система",
    shortDesc:
      "Комплексное управление ресурсами, закупками, складом, финансами и лизинговыми активами.",
    fullDesc:
      "Масштабируемая ERP-система для управления материальными и финансовыми активами. Поддерживает сложный расчет графиков лизинговых платежей, амортизацию, цепочки поставок и финотчетность.",
    categories: ["all", "universal", "leasing"],
    categoryLabel: "Лизинг / Универсальный",
    icon: Server,
    iconColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    tags: ["Лизинг & Финансы", "Складской учет", "Бюджетирование", "BI Аналитика"],
    features: [
      "Специализированный калькулятор и скоринг для лизинговых сделок",
      "Учет договоров, платежей, пени и реструктуризации",
      "Многоскладской партионный учет и инвентаризация",
      "Генерация финансовой отчетности по МСФО и НСБУ",
    ],
  },
  {
    id: "face-id",
    title: "FACE ID - идентификация",
    shortDesc:
      "Нейросетевая биометрическая верификация, учет рабочего времени, СКУД и антиспуфинг.",
    fullDesc:
      "Высокоточная система распознавания лиц на базе нейронных сетей с аппаратной защитой от фото- и видео-спуфинга (Liveness Detection). Применяется банками для KYC/скоринга и компаниями для контроля доступа.",
    categories: ["all", "universal", "bank"],
    categoryLabel: "Банки / Универсальный",
    icon: ScanFace,
    iconColor: "text-red-400 bg-red-500/10 border-red-500/20",
    tags: ["Liveness Check", "Нейросети", "СКУД & Турникеты", "KYC Банкинг"],
    features: [
      "Точность распознавания более 99.8% за доли секунды",
      "Защита от подделки (3D Liveness Detection)",
      "Интеграция с турникетами, замками и банковскими терминалами",
      "Учет рабочего времени сотрудников и учет опозданий",
    ],
  },
  {
    id: "websites",
    title: "Веб-сайты",
    shortDesc:
      "Высоконагруженные корпоративные порталы, личные кабинеты и страховые сервисы.",
    fullDesc:
      "Разработка современных веб-порталов с максимальной скоростью загрузки, безупречной адаптивностью и поддержкой онлайн-расчетов, включая калькуляторы страховых полисов и онлайн-оплату.",
    categories: ["all", "universal", "insurance"],
    categoryLabel: "Страхование / Универсальный",
    icon: Globe,
    iconColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    tags: ["Страховые полисы", "Next.js / SSR", "SEO Оптимизация", "Быстрый отклик"],
    features: [
      "Интерактивный калькулятор ОСАГО и КАСКО с мгновенным оформлением",
      "Личный кабинет клиента с историей полисов и заявками на выплату",
      "Мгновенная интеграция с эквайрингом и SMS-верификацией",
      "Высокие баллы Google Lighthouse (95+)",
    ],
  },
  {
    id: "hr-systems",
    title: "Системы для HR",
    shortDesc:
      "Рекрутинг, грейды, оценка компетенций 360°, KPI и обучение сотрудников.",
    fullDesc:
      "Комплексная HR-платформа полного цикла: от автоматизации отклика соискателей с HeadHunter/Telegram до трекинга корпоративного обучения, KPI-мотивации и оценки персонала.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: Users2,
    iconColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    tags: ["KPI & Грейды", "Оценка 360", "ATS Рекрутинг", "LMS Обучение"],
    features: [
      "Воронка подбора кандидатов с автоскринингом резюме",
      "Настраиваемые матрицы компетенций и индивидуальные планы развития",
      "Автоматический расчет бонусов по выполнению KPI",
      "Внутреннее тестирование и курсы повышения квалификации",
    ],
  },
  {
    id: "custom-crm",
    title: "Custom CRM",
    shortDesc:
      "Индивидуальная CRM под специфику ваших продаж, каналов и воронки конверсий.",
    fullDesc:
      "Разработка CRM с нуля под уникальные бизнес-процессы компании. Полная интеграция с телефонией, мессенджерами, банковскими счетами и автоматическим ведением клиента по этапам сделки.",
    categories: ["all", "universal", "bank"],
    categoryLabel: "Банки / Универсальный",
    icon: Database,
    iconColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    tags: ["Воронка продаж", "IP-телефония", "Сделки & Договоры", "Клиентская база"],
    features: [
      "Запись и распознавание звонков с привязкой к карточке клиента",
      "Автоматическое выставление счетов и контроль оплат",
      "Интеграция с Telegram, WhatsApp и онлайн-чатом сайта",
      "Предиктивная аналитика вероятности закрытия сделок",
    ],
  },
  {
    id: "marketplace",
    title: "Marketplace",
    shortDesc:
      "Торговые B2B и B2C площадки с каталогом, кабинетами поставщиков и биллингом.",
    fullDesc:
      "Многопользовательские платформы электронной коммерции: кабинеты продавцов, автоматический сплит платежей, комиссии, интеграция с логистическими службами и чеками фискализации.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: ShoppingBag,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    tags: ["B2B & B2C", "Сплит платежей", "Фискализация", "Логистика"],
    features: [
      "Кабинет мерчанта с аналитикой остатков и продаж",
      "Безопасная сделка (Escrow) и автоматическое распределение средств",
      "Умный поиск товаров с фильтрами по характеристикам",
      "Интеграция с курьерскими службами и трекинг отправлений",
    ],
  },
  {
    id: "gps-tracking",
    title: "GPS трекинг",
    shortDesc:
      "Мониторинг автопарка, контроль маршрутов, расхода топлива и телематика в реальном времени.",
    fullDesc:
      "Система диспетчеризации и телематики для логистических и дистрибьюторских компаний: отслеживание координат, геозоны, датчики уровня топлива, контроль скоростного режима и отчеты о рейсах.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: Navigation,
    iconColor: "text-lime-400 bg-lime-500/10 border-lime-500/20",
    tags: ["Телематика", "Датчики топлива", "Геозоны", "Контроль автопарка"],
    features: [
      "Отображение перемещения транспорта онлайн на интерактивной карте",
      "Мгновенные алерты о сливе топлива и выезде за пределы геозон",
      "Анализ стиля вождения и учет пробега для техобслуживания",
      "Формирование электронных путевых листов",
    ],
  },
  {
    id: "telegram-bot",
    title: "Телеграм-бот",
    shortDesc:
      "Интеллектуальные боты с интеграцией в CRM, онлайн-оплатой и личным кабинетом.",
    fullDesc:
      "Разработка высоконагруженных Telegram Mini Apps и ботов для клиентского сервиса, автоматизации заказов, внутренних сервисных заявок сотрудников и омниканальной поддержки клиентов.",
    categories: ["all", "universal"],
    categoryLabel: "Универсальный продукт",
    icon: Bot,
    iconColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    tags: ["Telegram Mini Apps", "Платежи в боте", "AI Ассистент", "24/7 Сервис"],
    features: [
      "Web App интерфейс внутри Telegram с нативным UX",
      "Прием платежей через Payme, Click и банковские карты",
      "Бесшовная синхронизация с корпоративной CRM и базой данных",
      "AI-чатбот для ответов на частые вопросы пользователей",
    ],
  },
  {
    id: "integrations",
    title: "Интеграция с системами",
    shortDesc:
      "Бесшовное соединение API, шины данных ESB, 1C, банковские АБС и государственные сервисы.",
    fullDesc:
      "Проектирование и реализация защищенных интеграционных шлюзов, очередей сообщений (Kafka, RabbitMQ) и шин данных (ESB) для быстрого и гарантированного обмена информацией между разрозненными системами.",
    categories: ["all", "universal", "bank"],
    categoryLabel: "Банки / Универсальный",
    icon: Network,
    iconColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    tags: ["REST / SOAP / gRPC", "Apache Kafka", "1C Интеграция", "Банковские АБС"],
    features: [
      "Гарантированная доставка сообщений без потерь данных",
      "Шифрование каналов связи по протоколам ГОСТ и TLS",
      "Подключение к платежным шлюзам ЦБ РУз, Humo, Uzcard",
      "Логирование и мониторинг каждой транзакции",
    ],
  },
];

interface ProjectsSectionProps {
  onSelectProject?: (projectName: string) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<
    "universal" | "bank" | "leasing" | "insurance" | "all"
  >("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useGSAP(
    () => {
      // 1. Header elements blur-reveal
      gsap.from(".project-header-elem", {
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

      // 2. Filter tabs pills entrance
      gsap.from(".project-tabs-container", {
        scrollTrigger: {
          trigger: ".project-tabs-container",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });

      // 3. Project Cards staggered entrance
      gsap.from(".project-card-item", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
        y: 55,
        opacity: 0,
        scale: 0.94,
        stagger: 0.07,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    },
    { scope: sectionRef }
  );

  const tabs = [
    { id: "all", label: "Все проекты", count: 16 },
    { id: "universal", label: "Универсальные продукты", count: 16 },
    { id: "bank", label: "Банковский сектор", count: 5 },
    { id: "leasing", label: "Лизинг", count: 1 },
    { id: "insurance", label: "Страхование", count: 1 },
  ] as const;

  const filteredProjects =
    activeTab === "all"
      ? allProjects
      : allProjects.filter((p) => p.categories.includes(activeTab));

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-4">


          <h2 className="project-header-elem text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Проекты и{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              продукты
            </span>
          </h2>


          <p className="project-header-elem text-base sm:text-lg text-zinc-400 leading-relaxed">
            Наши специализированные разработки для лидеров финтех, корпоративного и государственного сектора Узбекистана.
          </p>
        </div>

        {/* Filter Tabs Pills */}
        <div className="project-tabs-container flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                  }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                    }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                onClick={() => {
                  setSelectedProject(item);
                  setActiveProject(item);
                }}
                className="project-card-item group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl border ${item.iconColor} transition-transform duration-300 group-hover:scale-110 shadow-md`}
                    >
                      <Icon className="size-5" />
                    </div>

                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <CardTitle className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {item.shortDesc}
                  </CardDescription>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-900/90 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-medium text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Детали
                    <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
        onOpenChangeComplete={(open) => {
          if (!open) setActiveProject(null);
        }}
      >
        {activeProject && (
          <DialogContent className="sm:max-w-xl bg-zinc-950/95 border border-blue-500/35 ring-1 ring-blue-500/20 text-zinc-100 shadow-[0_0_40px_-5px_rgba(59,130,246,0.3),0_0_15px_rgba(59,130,246,0.15)] backdrop-blur-2xl overflow-hidden">
            {/* Subtle top ambient glow inside modal */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-xl pointer-events-none -z-10" />
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2.5 rounded-xl border ${activeProject.iconColor}`}
                >
                  <activeProject.icon className="size-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-zinc-400">
                    {activeProject.categoryLabel}
                  </span>
                  <DialogTitle className="text-2xl font-bold text-white tracking-tight">
                    {activeProject.title}
                  </DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2">
                {activeProject.fullDesc}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Ключевой функционал и преимущества:
                </h4>
                <div className="space-y-2">
                  {activeProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Стек и стандарты:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">
                Готово к кастомизации и развертыванию
              </span>
              <a
                href="#contact"
                className="w-full sm:w-auto"
                onClick={() => {
                  onSelectProject?.(activeProject.title);
                  setSelectedProject(null);
                }}
              >
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium cursor-pointer">
                  Обсудить этот проект
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
