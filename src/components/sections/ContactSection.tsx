'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils/string';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BaseComponentProps } from '@/lib/types/ui';
import { 
  Send, 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  Calendar, 
} from 'lucide-react';

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export interface DirectLink {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
  badge?: string;
}

export interface AvailabilityInfo {
  availability: string;
  description: string;
  idealFit: string;
}

export interface ContactSectionProps extends BaseComponentProps {
  onSubmit?: (data: ContactForm) => void;
  directLinks?: DirectLink[];
  availability?: AvailabilityInfo;
  email?: string;
}

const ContactSection = React.forwardRef<HTMLElement, ContactSectionProps>(
  (
    {
      className,
      onSubmit,
      directLinks = [
        {
          id: "1",
          label: "GitHub",
          url: "#",
          icon: <Github className="w-4 h-4 text-slate-200" />,
          badge: "@johndoe-dev"
        },
        {
          id: "2",
          label: "LinkedIn",
          url: "#",
          icon: <Linkedin className="w-4 h-4 text-slate-200" />,
          badge: "john-doe"
        },
        {
          id: "3",
          label: "Download résumé",
          url: "#",
          icon: <FileText className="w-4 h-4 text-slate-200" />,
          badge: "PDF · 1 page"
        }
      ],
      availability = {
        availability: "April 2025",
        description: "Open to full-time roles (remote or Berlin) and select consulting engagements.",
        idealFit: "Ideal fit: product-driven teams shipping modern web apps with TypeScript, React, and clear ownership."
      },
      email = "john.doe@example.com",
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const [formData, setFormData] = useState<ContactForm>({
      name: '',
      email: '',
      company: '',
      role: '',
      message: ''
    });

    const handleInputChange = (field: keyof ContactForm) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(formData);
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
          {/* Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-[#050816] p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-slate-400 mt-1">Share a few details and II&apos;ll respondapos;ll respond within 24–48 hours.</p>
              </div>
              <Send className="w-5 h-5 text-indigo-300" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Your name"
                  placeholder="Jane Recruiter"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
                <Input
                  type="email"
                  label="Work email"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleInputChange('company')}
                />
                <Input
                  label="Role / opportunity"
                  placeholder="Senior Frontend Engineer"
                  value={formData.role}
                  onChange={handleInputChange('role')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] text-slate-300 mb-1.5">
                  How can I help?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Share context, timelines, and any relevant links."
                  value={formData.message}
                  onChange={(e) => handleInputChange('message')(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Send message
                </Button>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  <div className="inline-flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5"></span>
                    <span>Actively interviewing</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center hover:text-indigo-300"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1" />
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Direct links & Availability */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#050816] p-5">
              <h3 className="text-sm font-medium text-slate-100 tracking-tight mb-3">Direct links</h3>
              <div className="space-y-2 text-xs">
                {directLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <span className="text-slate-100">{link.label}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{link.badge}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 p-5 text-xs">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 text-indigo-100">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-[0.16em]">Availability</span>
                </div>
                <span className="text-[11px] text-indigo-100">{availability.availability}</span>
              </div>
              <p className="text-slate-50 mb-2">{availability.description}</p>
              <p className="text-slate-100/80">{availability.idealFit}</p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
);

ContactSection.displayName = 'ContactSection';

export { ContactSection };
