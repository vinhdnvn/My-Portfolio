import React from 'react';
import { cn } from '@/lib/utils/string';
import { BaseComponentProps } from '@/lib/types/ui';
import { 
  Award, 
  Twitter, 
  Mic, 
  Info, 
  Calendar 
} from 'lucide-react';

export interface AchievementItem {
  id: string;
  type: 'company-award' | 'community' | 'speaking';
  title: string;
  description: string;
  year: string;
  metric?: string;
  icon?: React.ReactNode;
}

export interface StatsItem {
  label: string;
  value: string;
}

export interface LookingForInfo {
  title: string;
  description: string;
  availability: string;
  details: string;
}

export interface AchievementsSectionProps extends BaseComponentProps {
  achievements?: AchievementItem[];
  stats?: StatsItem[];
  lookingFor?: LookingForInfo;
}

const AchievementsSection = React.forwardRef<HTMLElement, AchievementsSectionProps>(
  (
    {
      className,
      achievements = [
        {
          id: "1",
          type: "company-award",
          title: "Engineering Excellence recognition",
          description: "Recognized for leading the performance initiative that cut p95 response times in half across core flows.",
          year: "2024",
          icon: <Award className="w-4 h-4 mr-1.5" />
        },
        {
          id: "2",
          type: "community",
          title: "Tech writing & open source",
          description: "Published articles read by 50k+ developers and contributed to several open-source projects in the React ecosystem.",
          year: "50k+ reads",
          metric: "50k+ reads",
          icon: <Twitter className="w-3.5 h-3.5 mr-1.5" />
        },
        {
          id: "3",
          type: "speaking",
          title: "Conference & meetup talks",
          description: "Delivered talks on frontend performance budgets and building resilient design systems for fast-moving teams.",
          year: "5+ talks",
          metric: "5+ talks",
          icon: <Mic className="w-3.5 h-3.5 mr-1.5" />
        }
      ],
      stats = [
        { label: "Production projects shipped", value: "24" },
        { label: "Teams collaborated with", value: "7" },
        { label: "Avg. tenure / company", value: "2.5y" },
        { label: "Daily coding time", value: "5–6h" }
      ],
      lookingFor = {
        title: "What I'm looking for",
        description: "Roles where I can own complex frontends, help shape engineering practices, and collaborate closely with design & product.",
        availability: "April 2025",
        details: "Open to full-time roles (remote or Berlin) and select consulting engagements. Ideal fit: product-driven teams shipping modern web apps with TypeScript, React, and clear ownership."
      },
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const getAchievementStyles = (type: string) => {
      switch (type) {
        case 'company-award':
          return 'border-emerald-500/40 bg-emerald-500/10';
        case 'community':
        case 'speaking':
        default:
          return 'border-white/10 bg-[#050816]';
      }
    };

    const getAchievementIconColor = (type: string) => {
      switch (type) {
        case 'company-award':
          return 'text-emerald-200';
        case 'community':
        case 'speaking':
        default:
          return 'text-indigo-200';
      }
    };

    return (
      <section
        ref={ref}
        id={id}
        className={cn("border-t border-white/5 bg-[#050816]", className)}
        data-testid={testId}
        {...props}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-14">
          {/* Achievements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">Achievements</h2>
                <p className="text-sm text-slate-400 mt-1">Impact beyond day-to-day feature work.</p>
              </div>
            </div>
            <div className="space-y-4 text-xs">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={cn(
                    "rounded-2xl border p-4",
                    getAchievementStyles(achievement.type)
                  )}
                >
                  {achievement.type === 'company-award' ? (
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="inline-flex items-center text-emerald-200">
                        {achievement.icon}
                        <span className="text-[11px] uppercase tracking-[0.16em]">Company award</span>
                      </div>
                      <span className="text-[11px] text-emerald-100">{achievement.year}</span>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className={cn("inline-flex items-center mb-1", getAchievementIconColor(achievement.type))}>
                          {achievement.icon}
                          <span className="text-[11px] uppercase tracking-[0.16em]">
                            {achievement.type === 'community' ? 'Community' : 'Speaking'}
                          </span>
                        </div>
                        <p className="text-slate-100 font-medium mb-1">{achievement.title}</p>
                        <p className="text-slate-300">{achievement.description}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">{achievement.metric}</span>
                    </div>
                  )}
                  
                  {achievement.type === 'company-award' && (
                    <>
                      <p className="text-slate-100 font-medium mb-1">{achievement.title}</p>
                      <p className="text-slate-100/80">{achievement.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#050816] p-4 sm:p-5">
              <h3 className="text-sm font-medium text-slate-100 tracking-tight mb-3">At a glance</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {stats.map((stat, index) => (
                  <div key={index} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                    <p className="text-[11px] text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-lg font-semibold tracking-tight text-slate-50">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Info className="w-4 h-4 text-indigo-200" />
                </div>
                <div className="text-xs">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-indigo-100 mb-1">{lookingFor.title}</p>
                  <p className="text-slate-50">{lookingFor.description}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-4 sm:p-5 text-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 text-indigo-100">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">Availability</span>
                </div>
                <span className="text-[11px] text-indigo-100">{lookingFor.availability}</span>
              </div>
              <p className="text-slate-50 mb-2">
                Open to full-time roles (remote or Berlin) and select consulting engagements.
              </p>
              <p className="text-slate-100/80">
                Ideal fit: product-driven teams shipping modern web apps with TypeScript, React, and clear ownership.
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
);

AchievementsSection.displayName = 'AchievementsSection';

export { AchievementsSection };