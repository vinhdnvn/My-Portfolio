import React from 'react';
import { cn } from '@/lib/utils/string';
import { ButtonProps } from '@/lib/types/ui';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      onClick,
      type = 'button',
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    ];

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    const classes = cn(
      ...baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      className
    );

    const renderIcon = () => {
      if (!icon) return null;
      
      const iconClasses = cn(
        'h-4 w-4',
        iconPosition === 'left' ? 'mr-2' : 'ml-2',
        loading && 'animate-spin'
      );

      return (
        <span className={iconClasses}>
          {icon}
        </span>
      );
    };

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {children}
          </>
        );
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            {renderIcon()}
            {children}
          </>
        );
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            {children}
            {renderIcon()}
          </>
        );
      }

      return children;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        id={id}
        data-testid={testId}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };