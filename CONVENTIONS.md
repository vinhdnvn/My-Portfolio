# Project Conventions and Patterns

This document outlines the coding conventions, patterns, and best practices for this portfolio project.

## Table of Contents

1. [Folder Structure](#folder-structure)
2. [Component Conventions](#component-conventions)
3. [TypeScript Conventions](#typescript-conventions)
4. [Styling Conventions](#styling-conventions)
5. [Data Fetching Patterns](#data-fetching-patterns)
6. [Error Handling](#error-handling)
7. [Utility Functions](#utility-functions)
8. [Testing Conventions](#testing-conventions)
9. [Git Workflow](#git-workflow)

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── global.css          # Global styles
│   ├── admin/              # Admin section
│   ├── blog/               # Blog section
│   ├── home/               # Home section
│   ├── portfolio/           # Portfolio section
│   └── test-supabase/     # Test pages
├── components/              # Reusable components
│   ├── ui/                 # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   └── index.ts
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   └── index.ts
│   ├── features/           # Feature-specific components
│   │   ├── ProjectCard.tsx
│   │   ├── ContactForm.tsx
│   │   └── index.ts
│   └── providers/          # Context providers
│       └── query-provider.tsx
├── hooks/                  # Custom React hooks
│   ├── api/               # API hooks
│   │   ├── useApiData.ts
│   │   └── index.ts
│   ├── ui/                # UI-related hooks
│   │   ├── useTheme.ts
│   │   └── index.ts
│   ├── utils/              # Utility hooks
│   │   ├── useToggle.ts
│   │   └── index.ts
│   └── index.ts
├── lib/                    # Utility libraries
│   ├── db/                # Database (Drizzle)
│   │   ├── schema/        # Database schemas
│   │   ├── models/        # TypeScript models
│   │   └── index.ts
│   ├── supabase/          # Supabase client
│   ├── react-query/        # React Query config
│   ├── types/              # TypeScript types
│   │   ├── api.ts
│   │   ├── ui.ts
│   │   ├── database.ts
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   ├── api.ts
│   │   ├── string.ts
│   │   ├── validation.ts
│   │   └── index.ts
│   └── constants.ts
└── store/                  # Zustand stores
    └── uiStore.ts
```

## Component Conventions

### Naming Conventions

- **Files**: PascalCase (e.g., `Button.tsx`, `ProjectCard.tsx`)
- **Components**: PascalCase (e.g., `Button`, `ProjectCard`)
- **Props**: PascalCase + `Props` suffix (e.g., `ButtonProps`, `ProjectCardProps`)
- **Hooks**: camelCase with `use` prefix (e.g., `useApiData`, `useTheme`)

### Component Structure

```tsx
import React from 'react';
import { cn } from '@/lib/utils/string';
import { ComponentProps } from '@/lib/types/ui';

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  (
    {
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn('base-classes', className);

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';

export { Component };
```

### Best Practices

1. **Use forwardRef** for components that need ref forwarding
2. **Use TypeScript interfaces** for all props
3. **Use cn utility** for class name merging
4. **Set displayName** for better debugging
5. **Export components individually** and re-export from index

## TypeScript Conventions

### Type Definitions

- **Use interfaces** for object shapes
- **Use type aliases** for unions and complex types
- **Prefer generics** for reusable components
- **Export types** from central location (`@/lib/types`)

### Example Type Definition

```typescript
export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}
```

### Generic Components

```typescript
interface GenericListProps<T> extends BaseComponentProps {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GenericList = <T>({ items, renderItem }: GenericListProps<T>) => {
  return (
    <div>
      {items.map(renderItem)}
    </div>
  );
};
```

## Styling Conventions

### Tailwind CSS

- **Use utility classes** for spacing, colors, and layout
- **Use cn utility** for conditional classes
- **Follow mobile-first** approach
- **Use consistent spacing** scale

### Class Organization

```tsx
const baseClasses = [
  'base-styles',
];

const variantClasses = {
  primary: 'primary-styles',
  secondary: 'secondary-styles',
};

const classes = cn(
  ...baseClasses,
  variantClasses[variant],
  className
);
```

### Responsive Design

```tsx
const responsiveClasses = {
  sm: 'sm-classes',
  md: 'md-classes',
  lg: 'lg-classes',
};

// Use with responsive utilities
<div className="sm:responsiveClasses.sm md:responsiveClasses.md lg:responsiveClasses.lg">
```

## Data Fetching Patterns

### React Query Usage

```typescript
// Basic data fetching
const { data, isLoading, error } = useApiData<Project>(
  ['projects'],
  API_ENDPOINTS.PROJECTS,
  {
    staleTime: CACHE_TTL.MEDIUM,
  }
);

// Mutation with optimistic updates
const createMutation = useCreateApiData<Project>(
  API_ENDPOINTS.PROJECTS,
  {
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries(['projects']);
    },
  }
);
```

### Error Handling

```typescript
// API error handling
const { data, error } = useApiData<Project>(
  ['projects'],
  API_ENDPOINTS.PROJECTS
);

if (error) {
  return <ErrorDisplay error={error} />;
}

if (!data?.success) {
  return <ErrorDisplay message={data.message} />;
}

// Form validation errors
const errors = validateProject(formData);
if (hasErrors(errors)) {
  return <FormErrors errors={errors} />;
}
```

## Error Handling

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

const App = () => {
  return (
    <ErrorBoundary
      fallback={<ErrorFallback />}
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo);
      }}
    >
      <Router />
    </ErrorBoundary>
  );
};
```

### Error Types

```typescript
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
}
```

## Utility Functions

### String Utilities

```typescript
import { cn, truncate, toSlug } from '@/lib/utils/string';

// Usage
const classes = cn('base-class', 'additional-class');
const shortText = truncate(longText, 100);
const slug = toSlug(title);
```

### Validation Utilities

```typescript
import { validateProject, hasErrors } from '@/lib/utils/validation';

// Usage
const errors = validateProject(formData);
if (hasErrors(errors)) {
  // Handle validation errors
}
```

## Testing Conventions

### Test Structure

```
src/components/
├── ui/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── Button.stories.tsx
```

### Test Naming

- **Unit tests**: `ComponentName.test.tsx`
- **Integration tests**: `ComponentName.integration.test.tsx`
- **E2E tests**: `ComponentName.e2e.test.tsx`

### Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Git Workflow

### Branch Naming

- **Main**: `main` or `master`
- **Development**: `develop` or `dev`
- **Features**: `feature/feature-name`
- **Bug fixes**: `fix/bug-description`
- **Releases**: `release/version-number`

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(components): add Button component`
- `fix(api): resolve authentication issue`
- `docs(readme): update installation instructions`

### Pull Request Guidelines

1. **Use descriptive title**
2. **Link related issues**
3. **Add screenshots** for UI changes
4. **Update documentation** for new features
5. **Ensure tests pass**

## Performance Guidelines

### Code Splitting

- **Route-based splitting**: Automatic with Next.js
- **Component splitting**: Use `dynamic()` for large components
- **Vendor splitting**: Separate third-party libraries

### Optimization

- **Use React.memo()** for pure components
- **Use useMemo()** for expensive calculations
- **Use useCallback()** for event handlers
- **Optimize images** with proper formats and sizes

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze

# Check for unused dependencies
npm depcheck
```

## Security Guidelines

### Input Validation

- **Validate all user inputs**
- **Sanitize HTML content**
- **Use parameterized queries** for database operations
- **Implement rate limiting** for API endpoints

### Authentication

- **Use secure password policies**
- **Implement session management**
- **Use HTTPS** for all communications
- **Store secrets** in environment variables

## Accessibility Guidelines

### ARIA Attributes

```tsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="dialog-id"
>
  Close
</button>
```

### Keyboard Navigation

```tsx
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    onClose();
  }
};

<div onKeyDown={handleKeyDown}>
  {/* Content */}
</div>
```

### Screen Readers

```tsx
<img
  src={imageSrc}
  alt="Description of image"
  aria-describedby="image-description"
/>

<div id="image-description" className="sr-only">
  Detailed description for screen readers
</div>
```

## Documentation Standards

### Code Comments

```typescript
/**
 * Component description
 * @param props - Component props
 * @returns JSX element
 */
const Component = (props: ComponentProps) => {
  // Implementation
};

// Complex logic explanation
const result = complexCalculation();
// Result is used for X and Y purposes
```

### README Files

Each major component or feature should include:
- **Purpose and usage**
- **Props documentation**
- **Examples**
- **Accessibility notes**

## Environment Configuration

### Environment Variables

```bash
# Development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production
NEXT_PUBLIC_API_URL=https://api.yoursite.com
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Build Configuration

```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['yoursite.com'],
  },
};
```

## Review Guidelines

### Code Review Checklist

- [ ] Follows naming conventions
- [ ] Includes TypeScript types
- [ ] Has appropriate tests
- [ ] Handles errors gracefully
- [ ] Is accessible
- [ ] Is performant
- [ ] Is documented

### Performance Review

- [ ] No unnecessary re-renders
- [ ] Proper memoization
- [ ] Efficient data fetching
- [ ] Optimized images
- [ ] Bundle size impact

This document should be updated as the project evolves and new patterns emerge.