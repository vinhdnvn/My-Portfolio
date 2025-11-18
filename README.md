# Portfolio Website

A modern, interactive portfolio website built with Next.js 16, featuring 3D graphics, smooth animations, and a full-stack architecture with database integration.

## About

This portfolio project is developed by **Vinh Nguyen**, a 4th-year Computer Science student at **VKU University** (Vietnam-Korea University of Information and Communication Technology), pursuing an Engineering degree with a focus on **Software Architecture** and modern web development.

## Project Overview

This portfolio showcases modern web development practices with cutting-edge technologies, featuring:

- **Interactive 3D Graphics** - Immersive visual experiences using Three.js
- **Smooth Animations** - Professional animations powered by GSAP
- **Full-Stack Architecture** - Complete backend integration with PostgreSQL
- **Modern UI/UX** - Responsive design with Tailwind CSS
- **Type-Safe Development** - Full TypeScript implementation
- **Optimized Performance** - React 19 with compiler optimizations

## Tech Stack

### Core Framework
- **[Next.js 16.0.1](https://nextjs.org)** - React framework with App Router, Server Components, and advanced optimizations
- **[React 19.2.0](https://react.dev)** - Latest React with improved performance and new features
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe development with latest TS features

### 3D Graphics & Animation
- **[Three.js 0.181.1](https://threejs.org)** - 3D graphics library for WebGL rendering
- **[@react-three/fiber 9.4.0](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei 10.7.6](https://github.com/pmndrs/drei)** - Useful helpers and abstractions for React Three Fiber
- **[GSAP 3.13.0](https://gsap.com)** - Professional-grade animation library

### State Management & Data Fetching
- **[Zustand 5.0.8](https://zustand-demo.pmnd.rs)** - Lightweight state management solution
- **[@tanstack/react-query 5.56.2](https://tanstack.com/query)** - Powerful data synchronization and server state management

### Database & ORM
- **[Drizzle ORM 0.44.7](https://orm.drizzle.team)** - TypeScript ORM with excellent developer experience
- **[Drizzle Kit 0.31.6](https://orm.drizzle.team/kit-docs/overview)** - Migration and database management tools
- **[Postgres 3.4.7](https://github.com/porsager/postgres)** - Fast PostgreSQL client for Node.js

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[tailwind-merge 2.5.4](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes without conflicts
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Utility for constructing className strings
- **[Lucide React 0.553.0](https://lucide.dev)** - Beautiful & consistent icon library

### Development Tools
- **[babel-plugin-react-compiler 1.0.0](https://react.dev/learn/react-compiler)** - Automatic React optimization
- **[ESLint 9](https://eslint.org)** - Code linting and quality assurance
- **[Prettier](https://prettier.io)** - Code formatting
- **[Husky 9.1.7](https://typicode.github.io/husky)** - Git hooks for pre-commit checks
- **[lint-staged 16.2.6](https://github.com/lint-staged/lint-staged)** - Run linters on staged files

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: Node.js 20+)
- pnpm (Fast, disk space efficient package manager)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd profile
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Configure your database connection and other environment variables
```

4. Set up the database:
```bash
# Generate migration files
pnpm db:gen

# Push schema to database
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:gen` - Generate database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── layout/      # Layout components
│   │   ├── sections/    # Page sections
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── ...
├── public/              # Static assets
└── drizzle.config.ts    # Drizzle ORM configuration
```

## Features

- Modern, responsive design
- Interactive 3D elements
- Smooth page transitions and animations
- Type-safe database operations
- Optimized performance with React Compiler
- Code quality enforcement with pre-commit hooks
- Server-side rendering and static generation

## Development Workflow

This project uses strict quality controls:
- TypeScript type checking on every commit
- ESLint validation with zero warnings policy
- Automatic code formatting with Prettier
- Pre-commit hooks to ensure code quality

## License

This is a personal portfolio project.

## Contact

**Vinh Nguyen**
- University: VKU (Vietnam-Korea University of Information and Communication Technology)
- Major: Computer Science (Software Engineering)
- Year: 4th Year Student
- Degree: Engineering (Software Architecture)

---

Built with passion and modern web technologies 🚀
