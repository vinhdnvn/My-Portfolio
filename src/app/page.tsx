'use client';
import React, { useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const achievementsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => scrollToSection(projectsRef);
  const handleContactClick = () => scrollToSection(contactRef);

  const handleNavigationClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100 antialiased selection:bg-indigo-500/40 selection:text-slate-50">
      <Header onNavigationClick={handleNavigationClick} />

      <main className="flex-1">
        <HeroSection
          ref={heroRef}
          id="about"
          onProjectsClick={handleProjectsClick}
          onContactClick={handleContactClick}
        />

        <ExperienceSection ref={experienceRef} id="experience" />

        <ProjectsSection ref={projectsRef} id="projects" />

        <AchievementsSection ref={achievementsRef} id="achievements" />

        <ContactSection ref={contactRef} id="contact" />
      </main>

      <Footer />
    </div>
  );
}
