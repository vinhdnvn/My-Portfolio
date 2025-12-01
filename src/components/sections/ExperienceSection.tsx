import React from 'react';
import { cn } from '@/lib/utils/string';
import { BaseComponentProps } from '@/lib/types/ui';
import { User } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PersonalInfo {
  name: string;
  currentRole: string;
  location: string;
  languages: string;
  lookingFor: string;
  preferredStack: string;
  bio: string;
}

export interface ExperienceSectionProps extends BaseComponentProps {
  experiences?: ExperienceItem[];
  skillCategories?: SkillCategory[];
  personalInfo?: PersonalInfo;
  lastUpdated?: string;
}

const ExperienceSection = React.forwardRef<HTMLElement, ExperienceSectionProps>(
  (
    {
      className,
      experiences = [
        {
          id: "1",
          title: "Senior Frontend Engineer",
          company: "Acme SaaS",
          employmentType: "Full-time",
          period: "2022 — Present",
          location: "Remote · Berlin, DE",
          description: [
            "Led migration from CRA to Next.js, improving LCP by 32% and reducing bundle size by 40%.",
            "Built internal design system in React + Tailwind, used across 4 product teams.",
            "Mentored 3 junior developers and introduced CI checks for performance budgets."
          ],
          technologies: ["React", "Next.js", "TypeScript", "Storybook"]
        },
        {
          id: "2",
          title: "Full-Stack Developer",
          company: "Nova Labs",
          employmentType: "Full-time",
          period: "2020 — 2022",
          location: "Hybrid · Prague, CZ",
          description: [
            "Designed and implemented REST/GraphQL APIs consumed by mobile and web clients.",
            "Introduced logging & metrics, reducing critical bug resolution time by 45%.",
            "Collaborated with designers to ship a redesign that increased activation by 18%."
          ],
          technologies: ["Node.js", "Express", "PostgreSQL", "GraphQL"]
        },
        {
          id: "3",
          title: "Frontend Developer",
          company: "Freelance",
          employmentType: "Freelance",
          period: "2018 — 2020",
          location: "Remote",
          description: [
            "Shipped marketing sites and dashboards for startups and small businesses.",
            "Delivered pixel-perfect UI implementations from Figma designs.",
            "Implemented analytics and experimented with A/B testing stacks."
          ],
          technologies: ["Vue", "Nuxt", "SCSS"]
        }
      ],
      skillCategories = [
        {
          title: "Frontend",
          skills: ["TypeScript", "React", "Next.js", "Tailwind", "Zustand"]
        },
        {
          title: "Backend & DevOps",
          skills: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "CI/CD"]
        },
        {
          title: "Soft skills",
          skills: ["Product thinking", "Mentoring", "Stakeholder communication"]
        }
      ],
      personalInfo = {
        name: "John Doe",
        currentRole: "Senior Frontend Engineer",
        location: "Berlin, Germany",
        languages: "English (C1), German (B2)",
        lookingFor: "Senior / Staff Frontend or Full-stack",
        preferredStack: "TypeScript, React, Next.js",
        bio: "I care about developer experience, accessibility, and measurable impact. I thrive in product-oriented teams with strong ownership and clear feedback loops."
      },
      lastUpdated = "2025",
      id,
      testId,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn("border-t border-white/5 bg-[#050816]", className)}
        data-testid={testId}
        {...props}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-10 lg:gap-14">
          {/* Experience Timeline */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">Work experience</h2>
                <p className="text-sm text-slate-400 mt-1">Highlights from roles that align with product engineering positions.</p>
              </div>
            </div>

            <div className="space-y-5">
              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="relative rounded-2xl border border-white/10 bg-[#050816] p-4 sm:p-5 hover:border-indigo-400/80 hover:bg-indigo-500/5 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-slate-50">{experience.title}</h3>
                      <p className="text-xs text-slate-400">{experience.company} · {experience.employmentType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-300">{experience.period}</p>
                      <p className="text-[11px] text-slate-500">{experience.location}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                    {experience.description.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    {experience.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/5 px-2 py-1 text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Skills & Personal Info */}
          <aside className="space-y-7">
            {/* Skills */}
            <div className="rounded-2xl border border-white/10 bg-[#050816] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-slate-100 tracking-tight">Core stack & skills</h3>
                <span className="text-[11px] text-slate-400">Last updated: {lastUpdated}</span>
              </div>
              <div className="space-y-4 text-xs">
                {skillCategories.map((category) => (
                  <div key={category.title}>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 mb-2">{category.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-white/5 px-2 py-1 text-slate-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-2xl border border-white/10 bg-[#050816] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-100 tracking-tight">Personal information</h3>
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-xs">
                <div>
                  <dt className="text-[11px] text-slate-400">Name</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.name}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">Current role</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.currentRole}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">Location</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.location}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">Languages</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.languages}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">Looking for</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.lookingFor}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-slate-400">Preferred stack</dt>
                  <dd className="text-slate-100 font-medium">{personalInfo.preferredStack}</dd>
                </div>
              </dl>
              <p className="text-[11px] text-slate-400 border-t border-white/5 pt-3">
                {personalInfo.bio}
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
);

ExperienceSection.displayName = 'ExperienceSection';

export { ExperienceSection };