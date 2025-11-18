import React from 'react';
import { cn } from '@/lib/utils/string';
import { InputProps } from '@/lib/types/ui';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      children,
      type = 'text',
      placeholder,
      value,
      defaultValue,
      disabled = false,
      required = false,
      error,
      label,
      helperText,
      onChange,
      onBlur,
      onFocus,
      id,
      testId,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const finalId = id || `input-${inputId}`;
    
    const baseClasses = [
      'flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    ];

    const errorClasses = error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
      : '';

    const inputClasses = cn(
      ...baseClasses,
      errorClasses,
      className
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onFocus) {
        onFocus();
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            type={type}
            id={finalId}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            data-testid={testId}
            {...props}
          />
          
          {children && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {children}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="mt-1">
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };