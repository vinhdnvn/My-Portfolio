import React from 'react';
import { cn } from '@/lib/utils/string';
import { CardProps } from '@/lib/types/ui';

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      onClick,
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'bg-white rounded-lg shadow-sm border border-gray-200',
    ];

    const variantClasses = {
      default: 'border-gray-200',
      outlined: 'border-2 border-gray-300',
      elevated: 'shadow-lg border-gray-100',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverClasses = hoverable
      ? 'transition-shadow duration-200 hover:shadow-md hover:border-gray-300'
      : '';

    const clickableClasses = clickable
      ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      : '';

    const cardClasses = cn(
      ...baseClasses,
      variantClasses[variant],
      paddingClasses[padding],
      hoverClasses,
      clickableClasses,
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={handleClick}
        id={id}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };