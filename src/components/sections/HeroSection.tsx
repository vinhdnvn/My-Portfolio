import Image from "next/image";
import React from 'react';
import { cn } from '@/lib/utils/string';
import { Button } from '@/components/ui/Button';
import { BaseComponentProps } from '@/lib/types/ui';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  Briefcase,
  Zap,
  Layers
} from 'lucide-react';

export interface HeroSectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  description?: string;
  availabilityStatus?: string;
  techFocus?: string;
  specialty?: string;
  experience?: string;
  basedIn?: string;
  role?: string;
  years?: string;
  timezone?: string;
  tags?: Array<{
    label: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'indigo';
  }>;
  onProjectsClick?: () => void;
  onContactClick?: () => void;
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      title = "Building clean, scalable web experiences.",
      subtitle = "Full-stack developer with 4+ years of experience crafting performant, accessible applications using TypeScript, React, and Node.js. I enjoy solving complex problems, designing robust architectures, and collaborating with product teams.",
      availabilityStatus = "Open to remote & on-site roles",
      techFocus = "React, Next.js, Node.js, GraphQL",
      specialty = "Performance & DX",
      experience = "4+ years shipping",
      basedIn = "Berlin, Germany (CET)",
      role = "Full-Stack",
      years = "4+",
      timezone = "CET / UTC+1",
      tags = [
        { label: "Focused on DX", icon: <Zap className="w-3 h-3" />, variant: "indigo" },
        { label: "End-to-end ownership", icon: <Layers className="w-3 h-3" /> },
      ],
      onProjectsClick,
      onContactClick,
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
        className={cn("relative overflow-hidden", className)}
        data-testid={testId}
        {...props}
      >
        {/* 3D-ish Gradient Orb */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="pointer-events-none absolute top-40 -left-32 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 md:gap-16 items-center">
          {/* Textual Intro */}
          <div className="space-y-7 relative">
            {/* Availability Status */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{availabilityStatus}</span>
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-50 mb-2">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                {subtitle.split(' ').map((word, index) => 
                  ['TypeScript', 'React', 'Node.js'].includes(word) ? (
                    <span key={index} className="text-indigo-300">{word} </span>
                  ) : `${word} `
                )}
              </p>
            </div>

            {/* Key Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="rounded-xl border border-white/10 bg-[#070a1a] px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Code2 className="text-indigo-300" />
                </div>
                <div>
                  <div className="text-slate-300 font-medium">Tech Focus</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs">{techFocus}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#070a1a] px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Cpu className="text-indigo-300" />
                </div>
                <div>
                  <div className="text-slate-300 font-medium">Specialty</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs">{specialty}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#070a1a] px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Briefcase className="text-indigo-300" />
                </div>
                <div>
                  <div className="text-slate-300 font-medium">Experience</div>
                  <div className="text-slate-400 text-[11px] sm:text-xs">{experience}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Button
                onClick={onProjectsClick}
                className="bg-indigo-500 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                View projects
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={onContactClick}
                className="border-white/10 text-slate-200 hover:border-indigo-400 hover:bg-white/5"
              >
                <Sparkles className="mr-1.5 w-4 h-4 text-indigo-300" />
                Let&apos;s work together
              </Button>
            </div>
          </div>

          {/* 3D / Visual Card */}
          <div className="relative">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-[1px] shadow-[0_35px_120px_-40px_rgba(0,0,0,0.8)]">
              <div className="rounded-3xl bg-[#050816]/90 backdrop-blur p-5 flex flex-col gap-4">
                {/* 3D Canvas Placeholder */}
                <div className="relative h-52 sm:h-64 rounded-2xl bg-[#050816] overflow-hidden border border-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(129,140,248,0.28),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.23),transparent_55%)]"></div>
                  <div className="relative h-full w-full flex flex-col items-center justify-center">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500 via-sky-500 to-purple-500 shadow-[0_20px_60px_rgba(79,70,229,0.7)] transform rotate-6 hover:-rotate-3 hover:-translate-y-2 transition-transform duration-500 ease-out"></div>
                    <p className="mt-4 text-[11px] text-slate-300 px-6 text-center">
                      Attach your custom <span className="text-indigo-300 font-medium">3D canvas</span> here using <span className="text-indigo-300 font-medium">Three.js</span> or
                      <span className="text-indigo-300 font-medium">React Three Fiber</span>.
                    </p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-[0.16em] mb-1">Based in</div>
                    <div className="text-sm font-medium text-slate-100">{basedIn}</div>
                  </div>
                  <div className="flex -space-x-3">
                    <Image src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg" alt="avatar" width={32} height={32} className="h-8 w-8 rounded-full border border-[#050816]" />
                    <Image src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80" alt="avatar" width={32} height={32} className="h-8 w-8 rounded-full border border-[#050816]" />
                    <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" alt="avatar" width={32} height={32} className="h-8 w-8 rounded-full border border-[#050816]" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Role</div>
                    <div className="text-slate-100 font-medium">{role}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Years</div>
                    <div className="text-slate-100 font-medium">{years}</div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-1">Timezone</div>
                    <div className="text-slate-100 font-medium">{timezone}</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-[11px]">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1",
                        tag.variant === 'indigo'
                          ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-100"
                          : "border-white/10 text-slate-200"
                      )}
                    >
                      {tag.icon && <span className="w-3 h-3 mr-1.5">{tag.icon}</span>}
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };