"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CallbackDialog } from "@/components/callback-dialog";
import { TriangleInteractiveBackground } from "@/components/triangle-interactive-background";

export default function Home() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState<string>("");

  const handleOpenCallback = () => {
    setCallbackOpen(true);
  };

  const handleSelectServiceOrProject = (name: string) => {
    setContactSubject(name);
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-300">
      {/* Full-page interactive glowing triangle pattern background */}
      <TriangleInteractiveBackground />

      {/* Top Navbar */}
      <Navbar onOpenCallback={handleOpenCallback} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* 1. Hero Section */}
        <HeroSection onOpenCallback={handleOpenCallback} />

        {/* 2. Services Section */}
        <ServicesSection onSelectService={handleSelectServiceOrProject} />

        {/* 3. About Company & Principles */}
        <AboutSection />

        {/* 4. Projects Portfolio */}
        <ProjectsSection onSelectProject={handleSelectServiceOrProject} />

        {/* 5. Contact Section ("Давайте работать?") */}
        <ContactSection initialSubject={contactSubject} />
      </main>

      {/* Footer */}
      <Footer onOpenCallback={handleOpenCallback} />

      {/* Quick Callback Modal Dialog */}
      <CallbackDialog
        open={callbackOpen}
        onOpenChange={setCallbackOpen}
      />
    </div>
  );
}
