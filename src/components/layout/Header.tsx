import React from 'react';
import { cn } from '@/lib/utils/string';
import { Button } from '@/components/ui/Button';
import { BaseComponentProps } from '@/lib/types/ui';
import { Menu, Send } from 'lucide-react';

export interface HeaderProps extends BaseComponentProps {
  name?: string;
  title?: string;
  initials?: string;
  navigationItems?: Array<{
    label: string;
    href: string;
  }>;
  onMobileMenuToggle?: () => void;
  onNavigationClick?: (href: string) => void;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      name = 'John Doe',
      title = 'Full-Stack Developer',
      initials = 'JD',
      navigationItems = [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Posts', href: '#posts' },
        { label: 'Achievements', href: '#achievements' },
        { label: 'Contact', href: '#contact' },
      ],
      onMobileMenuToggle,
      onNavigationClick,
      id,
      testId,
      ...props
    },
    ref,
  ) => {
    const handleNavClick = (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (onNavigationClick) {
        onNavigationClick(href);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return (
      <header
        ref={ref}
        className={cn(
          'border-b border-white/5 bg-[#050816]/80 backdrop-blur z-40 sticky top-0',
          className,
        )}
        id={id}
        data-testid={testId}
        {...props}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center text-xs font-semibold tracking-tight">
              <span>{initials}</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">
                {name}
              </span>
              <span className="text-[11px] text-slate-400">{title}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick(item.href)}
                className="hover:text-indigo-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={handleNavClick('#contact')}
              className="hidden sm:inline-flex items-center rounded-lg border border-indigo-500/60 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 hover:bg-indigo-500/20 hover:border-indigo-400 transition-colors"
            >
              <Send className="w-3 h-3 mr-1.5" />
              Hire me
            </a>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden border border-white/10 hover:border-indigo-400 hover:bg-white/5"
              onClick={onMobileMenuToggle}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
    );
  },
);

Header.displayName = 'Header';

export { Header };
