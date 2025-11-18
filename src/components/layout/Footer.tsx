import React from 'react';
import { cn } from '@/lib/utils/string';
import { BaseComponentProps } from '@/lib/types/ui';
import { Sparkles } from 'lucide-react';

export interface FooterProps extends BaseComponentProps {
  name?: string;
  tagline?: string;
  availabilityText?: string;
  contactHref?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      name = "John Doe",
      tagline = "Built with care for the details.",
      availabilityText = "Available for conversation.",
      contactHref = "#contact",
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear();

    return (
      <footer
        ref={ref}
        className={cn("border-t border-white/5 bg-[#050816]", className)}
        id={id}
        data-testid={testId}
        {...props}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">© {currentYear} {name}.</span>
            <span>{tagline}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{availabilityText}</span>
            <a
              href={contactHref}
              className="inline-flex items-center rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-200 hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Let&apos;s talk
            </a>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export { Footer };