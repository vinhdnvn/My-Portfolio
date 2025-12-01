import Image from "next/image";
import React from 'react';
import { cn } from '@/lib/utils/string';
import { BaseComponentProps } from '@/lib/types/ui';
import { 
  Activity, 
  Box,
  Users, 
  ArrowRight, 
  ArrowUpRight, 
  ExternalLink, 
  Github,
  Gauge,
  Boxes,
  Terminal
} from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryIcon?: React.ReactNode;
  year: string;
  technologies: string[];
  impact?: string;
  links?: Array<{
    type: 'case-study' | 'live-site' | 'repo';
    label: string;
    url: string;
  }>;
}

export interface PostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryIcon?: React.ReactNode;
  date: string;
}

export interface ProjectsSectionProps extends BaseComponentProps {
  projects?: ProjectItem[];
  posts?: PostItem[];
  onViewAllProjects?: () => void;
  onViewAllPosts?: () => void;
}

const ProjectsSection = React.forwardRef<HTMLElement, ProjectsSectionProps>(
  (
    {
      className,
      projects = [
        {
          id: "1",
          title: "InsightBoard",
          description: "End-to-end redesign of an analytics dashboard with real-time updates, granular filters, and custom chart primitives.",
          image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg",
          category: "SaaS analytics platform",
          categoryIcon: <Activity className="w-3 h-3 text-emerald-300" />,
          year: "2024",
          technologies: ["Next.js", "TypeScript", "WebSockets"],
          impact: "+28% feature adoption",
          links: [
            { type: 'case-study', label: 'Case study', url: '#' }
          ]
        },
        {
          id: "2",
          title: "DevSpace",
          description: "Landing page featuring a custom 3D scene with scroll-based animations and a blazing-fast static export.",
          image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
          category: "3D interactive landing",
          categoryIcon: <Box className="w-3 h-3 text-indigo-300" />,
          year: "2023",
          technologies: ["React", "Three.js", "GSAP"],
          impact: "95+ Lighthouse scores",
          links: [
            { type: 'live-site', label: 'Live site', url: '#' }
          ]
        },
        {
          id: "3",
          title: "SquadHub",
          description: "Real-time collaboration app with presence indicators, optimistic UI, and offline-first syncing.",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
          category: "Collaboration tool",
          categoryIcon: <Users className="w-3 h-3 text-emerald-300" />,
          year: "2022",
          technologies: ["React", "Firebase", "RxJS"],
          impact: "Used by 3k+ teams",
          links: [
            { type: 'repo', label: 'Repo', url: '#' }
          ]
        }
      ],
      posts = [
        {
          id: "1",
          title: "From 3s to 800ms: a journey to a faster dashboard",
          description: "A practical breakdown of how we profiled a slow dashboard and implemented incremental improvements.",
          category: "Performance",
          categoryIcon: <Gauge className="w-3.5 h-3.5" />,
          date: "Mar 2025"
        },
        {
          id: "2",
          title: "Designing frontends for growth, not just launch",
          description: "How to structure React applications so teams can move quickly without accruing unsustainable debt.",
          category: "Architecture",
          categoryIcon: <Boxes className="w-3.5 h-3.5" />,
          date: "Dec 2024"
        },
        {
          id: "3",
          title: "Creating a delightful developer experience with tooling",
          description: "Lessons from building custom ESLint rules, code mods, and CLIs that engineers actually want to use.",
          category: "DX",
          categoryIcon: <Terminal className="w-3.5 h-3.5" />,
          date: "Sep 2024"
        }
      ],
      onViewAllProjects,
      onViewAllPosts,
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const getLinkIcon = (type: string) => {
      switch (type) {
        case 'case-study':
          return <ArrowRight className="w-3.5 h-3.5" />;
        case 'live-site':
          return <ExternalLink className="w-3.5 h-3.5" />;
        case 'repo':
          return <Github className="w-3.5 h-3.5" />;
        default:
          return <ArrowRight className="w-3.5 h-3.5" />;
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
          {/* Projects Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-50">Selected projects</h2>
              <p className="text-sm text-slate-400 mt-1">A few highlights that demonstrate product thinking and technical depth.</p>
            </div>
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center text-xs text-slate-300 hover:text-indigo-300"
            >
              View full project archive
              <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
            </button>
          </div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group rounded-2xl border border-white/10 bg-[#050816] overflow-hidden flex flex-col hover:border-indigo-400/80 hover:bg-indigo-500/5 transition-colors"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={160}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-3 left-3 text-[11px] inline-flex items-center rounded-full bg-black/60 px-2 py-1 text-slate-100">
                    {project.categoryIcon}
                    <span className="ml-1.5">{project.category}</span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-medium text-slate-100">{project.title}</h3>
                    <span className="text-[11px] text-slate-400">{project.year}</span>
                  </div>
                  <p className="text-xs text-slate-300">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/5 px-2 py-1 text-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{project.impact}</span>
                    {project.links && project.links.length > 0 && (
                      <a
                        href={project.links[0].url}
                        className="inline-flex items-center hover:text-indigo-300"
                      >
                        {project.links[0].label}
                        {getLinkIcon(project.links[0].type)}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Posts Section */}
          <div className="border-t border-white/5 pt-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-50">Recent posts</h2>
                <p className="text-sm text-slate-400 mt-1">Writing about performance, DX, and architecture.</p>
              </div>
              <button
                onClick={onViewAllPosts}
                className="inline-flex items-center text-xs text-slate-300 hover:text-indigo-300"
              >
                View all posts
                <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5 text-xs">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-white/10 bg-[#050816] p-4 hover:border-indigo-400/80 hover:bg-indigo-500/5 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-indigo-300 inline-flex items-center">
                      {post.categoryIcon}
                      <span className="ml-1">{post.category}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-slate-100 mb-1">{post.title}</h3>
                  <p className="text-slate-300">{post.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';

export { ProjectsSection };