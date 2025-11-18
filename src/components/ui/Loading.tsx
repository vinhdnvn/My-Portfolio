import React from 'react';
import { cn } from '@/lib/utils/string';
import { LoadingProps } from '@/lib/types/ui';
import { Loader2, MoreHorizontal, Ellipsis } from 'lucide-react';

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      children,
      size = 'md',
      variant = 'spinner',
      text,
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    };

    const containerClasses = cn(
      'flex flex-col items-center justify-center',
      className
    );

    const iconClasses = cn(
      'animate-spin text-blue-600',
      sizeClasses[size]
    );

    const textClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const renderIcon = () => {
      switch (variant) {
        case 'spinner':
          return <Loader2 className={iconClasses} />;
        case 'dots':
          return <Ellipsis className={iconClasses} />;
        case 'pulse':
          return (
            <div className={cn(sizeClasses[size], 'bg-blue-600 rounded-full animate-pulse')} />
          );
        case 'skeleton':
          return (
            <div className={cn('space-y-2', sizeClasses[size])}>
              <div className="bg-gray-300 rounded animate-pulse h-2 w-full" />
              <div className="bg-gray-300 rounded animate-pulse h-2 w-4/5" />
              <div className="bg-gray-300 rounded animate-pulse h-2 w-3/5" />
            </div>
          );
        default:
          return <Loader2 className={iconClasses} />;
      }
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        id={id}
        data-testid={testId}
        {...props}
      >
        {renderIcon()}
        {text && (
          <p className={cn('mt-2 text-gray-600', textClasses[size])}>
            {text}
          </p>
        )}
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export { Loading };