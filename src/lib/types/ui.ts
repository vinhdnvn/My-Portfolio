import { ReactNode } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  testId?: string;
}

// Button component types
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

// Input component types
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Card component types
export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Modal component types
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  showBackdrop?: boolean;
  backdropClassName?: string;
}

// Loading component types
export interface LoadingProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
}

// Form component types
export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export interface FormProps extends BaseComponentProps {
  onSubmit: (data: Record<string, unknown>) => void;
  initialValues?: Record<string, unknown>;
  validation?: Record<string, (value: unknown) => string | undefined>;
}

// Layout component types
export interface ContainerProps extends BaseComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface GridProps extends BaseComponentProps {
  cols?: number | string;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface FlexProps extends BaseComponentProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

// Navigation component types
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  variant?: 'horizontal' | 'vertical';
  orientation?: 'horizontal' | 'vertical';
}

// Table component types
export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, record: T) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = Record<string, unknown>> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  selection?: {
    selectedRowKeys: string[];
    onChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
  };
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Animation types
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
  repeat?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate';
}

// Responsive breakpoint types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}