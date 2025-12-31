# Contributing to Vending Analytics Platform

Welcome to the **Vending Analytics Platform** project! This document provides a comprehensive overview of the project architecture, development guidelines, and contribution workflow to help you scale and contribute effectively.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Philosophy](#architecture-philosophy)
- [Current Project Structure](#current-project-structure)
- [Scaling Architecture](#scaling-architecture)
- [Design System](#design-system)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Component Patterns](#component-patterns)
- [Testing Guidelines](#testing-guidelines)
- [Git Workflow](#git-workflow)
- [Getting Started](#getting-started)

---

## Project Overview

### What is This Project?

The **Vending Analytics Platform** is an AI-powered fleet optimization system designed for vending operations and route management. It provides:

- **Real-time Inventory Monitoring**: Automated stock level tracking and predictive restocking alerts
- **Machine Health Analytics**: IoT telemetry monitoring for preventative maintenance
- **Route Optimization**: AI-driven route planning for efficient restocking
- **Sales Velocity Analysis**: Comprehensive insights into product performance by location

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: CSS Variables + Glass Morphism Design System
- **Icons**: React Icons (Phosphor Duotone)
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useEffect)

---

## Architecture Philosophy

This project follows a **feature-based architecture** inspired by [bulletproof-react](https://github.com/alan2207/bulletproof-react), emphasizing:

1. **Separation of Concerns**: Features are isolated and self-contained
2. **Scalability**: Easy to add new features without affecting existing code
3. **Maintainability**: Clear folder structure and naming conventions
4. **Unidirectional Data Flow**: Data flows from shared → features → app
5. **Component Reusability**: Shared components are framework-agnostic

### Core Principles

- **Feature Isolation**: Each feature should be independent and not import from other features
- **Colocation**: Keep related code close together (components, hooks, types, utils)
- **Explicit Imports**: No barrel exports to enable better tree-shaking
- **Design System First**: All UI components follow the RegainFlow Design System

---

## Current Project Structure

```
Vending-Analytics/
├── components/              # Shared UI components
│   ├── Dashboard.tsx       # Main analytics dashboard
│   ├── MachineList.tsx     # Machine listing with filters
│   ├── MachineDetail.tsx   # Detailed machine telemetry
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── GlassCard.tsx       # Reusable glass morphism card
│   ├── StatusBadge.tsx     # Status indicator (Online/Offline)
│   └── Icons.tsx           # Icon components
│
├── services/               # External service integrations
│   └── telemetryService.ts # Vending telemetry (mock data)
│
├── App.tsx                 # Main application component
├── types.ts                # Shared TypeScript types
├── index.tsx               # Application entry point
├── index.html              # HTML template
│
├── STYLES.md               # Design system documentation
├── README.md               # Project setup instructions
└── CONTRIBUTING.md         # This file
```

---

## Scaling Architecture

As the project grows, we'll transition to a **feature-based architecture** following bulletproof-react patterns:

### Target Structure

```
src/
├── app/                    # Application layer
│   ├── routes/            # Route definitions
│   ├── App.tsx            # Main app component
│   ├── provider.tsx       # Global providers (theme, auth, etc.)
│   └── router.tsx         # Router configuration
│
├── assets/                # Static files (images, fonts)
│
├── components/            # Shared components (used across features)
│   ├── ui/               # Base UI components (Button, Card, Input)
│   ├── layout/           # Layout components (Sidebar, Header)
│   ├── feedback/         # Feedback components (Toast, Modal)
│
├── config/               # Global configuration
│   ├── env.ts           # Environment variables
│   └── constants.ts     # App-wide constants
│
├── features/             # Feature modules (see below)
│
├── hooks/                # Shared hooks
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
│
├── lib/                  # External library configurations
│   ├── axios.ts         # API client setup
│   └── react-query.ts   # React Query setup
│
├── stores/               # Global state management
│   └── authStore.ts     # Example: Authentication state
│
├── types/                # Shared TypeScript types
│   ├── api.ts           # API response types
│   └── common.ts        # Common types
│
└── utils/                # Utility functions
    ├── format.ts        # Formatting helpers
    └── validation.ts    # Validation helpers
```

### Feature Module Structure

Each feature should be self-contained with its own components, hooks, and logic:

```
src/features/fleet-management/
├── api/                  # API calls specific to fleet management
│   ├── getMachines.ts
│   ├── updateStock.ts
│   └── syncTelemetry.ts
│
├── components/           # Feature-specific components
│   ├── MachineList.tsx
│   ├── MachineCard.tsx
│   └── MachineFilters.tsx
│
├── hooks/               # Feature-specific hooks
│   ├── useMachineFilters.ts
│   ├── useTelemetryStream.ts
│
├── types/               # Feature-specific types
│   └── machine.ts
│
└── utils/               # Feature-specific utilities
    └── calculateHealthScore.ts
```

### Example Features to Create

1. **`features/fleet-management/`** - Machine status tracking, location mapping
2. **`features/inventory-control/`** - Stock level monitoring, predictive restocking
3. **`features/sales-analytics/`** - Revenue charts, product velocity metrics
4. **`features/maintenance/`** - Error logging, service ticketing
5. **`features/route-planning/`** - Geolocation optimization for drivers

### Migration Strategy

When scaling, follow this migration path:

1. **Phase 1**: Create `src/` folder and move existing files
2. **Phase 2**: Extract shared components to `src/components/`
3. **Phase 3**: Create first feature module (e.g., `fleet-management`)
4. **Phase 4**: Migrate remaining components into feature modules
5. **Phase 5**: Add global state management and API layer

---

## Design System

All UI components **must** follow the **RegainFlow Design System** documented in [`STYLES.md`](./STYLES.md).

### Key Design Principles

- **Glass Morphism**: Frosted glass effect with backdrop blur
- **Neon Accents**: Subtle cyan glows for highlights and CTAs
- **Dark Theme**: Primary dark background (#121213)
- **Smooth Animations**: Transitions between 150ms-500ms

### Using Design Tokens

Always use CSS variables instead of hardcoded values:

```css
/* ❌ Bad */
.my-component {
  background: rgba(0, 214, 203, 0.15);
  color: #00d6cb;
  border-radius: 8px;
}

/* ✅ Good */
.my-component {
  background: var(--color-primary-alpha-15);
  color: var(--color-primary);
  border-radius: var(--radius-base);
}
```

### Component Styling Guidelines

1. **Use utility classes first** (`.glass-card`, `.neon-button-glass`)
2. **Create component-specific CSS only when necessary**
3. **Follow BEM naming convention** for custom classes
4. **Keep specificity low** to enable easy overrides

---

## Development Workflow

### Setting Up Your Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Vending-Analytics-Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Creating a New Feature

1. **Create feature folder** in `src/features/`
2. **Define feature structure** (api, components, hooks, types, utils)
3. **Implement components** following design system
4. **Add types** to feature's `types/` folder
5. **Export feature** from feature's index file
6. **Integrate** into app routes

### Creating a New Component

1. **Determine scope**: Is it shared or feature-specific?
2. **Follow naming conventions**: PascalCase for components
3. **Use TypeScript**: Define prop interfaces
4. **Apply design system**: Use CSS variables and utility classes
5. **Add documentation**: JSDoc comments for complex components

---

## Code Standards

### TypeScript

- **Use explicit types** for function parameters and return values
- **Define interfaces** for component props
- **Use enums** for fixed sets of values (e.g., `MachineStatus`, `ProductCategory`)
- **Avoid `any`** - use `unknown` if type is truly unknown

```typescript
// ✅ Good
interface MachineCardProps {
  machine: VendingMachine;
  onSelect: (machine: VendingMachine) => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine, onSelect }) => {
  // ...
};

// ❌ Bad
export const MachineCard = (props: any) => {
  // ...
};
```

### React Best Practices

- **Use functional components** with hooks
- **Keep components small** (< 200 lines)
- **Extract custom hooks** for reusable logic
- **Memoize expensive calculations** with `useMemo`
- **Use `useCallback`** for callback props to prevent re-renders

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `MachineCard.tsx`)
- **Hooks**: `camelCase.ts` starting with `use` (e.g., `useMachineFilters.ts`)
- **Utils**: `camelCase.ts` (e.g., `formatCurrency.ts`)
- **Types**: `camelCase.ts` (e.g., `telemetry.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)

### Import Order

```typescript
// 1. External dependencies
import React, { useState, useEffect } from 'react';
import { PiRobotDuotone } from 'react-icons/pi';

// 2. Internal absolute imports
import { GlassCard } from '~/components/ui/GlassCard';
import { useMachineFilters } from '~/features/fleet-management/hooks/useMachineFilters';

// 3. Relative imports
import { calculateHealthScore } from '../utils/calculateHealthScore';
import type { VendingMachine } from '../types/machine';

// 4. Styles
import styles from './MachineCard.module.css';
```

---

## Component Patterns

### Glass Card Pattern

```tsx
import { GlassCard } from '~/components/ui/GlassCard';

export const MyFeature = () => {
  return (
    <GlassCard>
      <h3 className="text-xl font-semibold mb-2">Title</h3>
      <p className="text-text-secondary">Description</p>
    </GlassCard>
  );
};
```

### Neon Button Pattern

```tsx
<button className="neon-button-glass">
  Click Me
</button>
```

### Icon with Glow

```tsx
import { PiShieldCheckDuotone } from 'react-icons/pi';

<div className="icon-container">
  <PiShieldCheckDuotone 
    size={48} 
    className="icon-glow"
    style={{ color: 'var(--color-primary)' }}
  />
</div>
```

### Status Badge

```tsx
import { StatusBadge } from '~/components/feedback/StatusBadge';
import { MachineStatus } from '~/types';

<StatusBadge status={MachineStatus.ONLINE} />
```

---

## Testing Guidelines

### Unit Testing

- **Test business logic** in utils and hooks
- **Use Jest** for unit tests
- **Mock external dependencies** (API calls, services)

```typescript
// Example: utils/calculateHealthScore.test.ts
import { calculateHealthScore } from './calculateHealthScore';

describe('calculateHealthScore', () => {
  it('should return low heatlh for frequent errors', () => {
    const telemetry = {
      uptime: 85,
      errorCount: 15,
      temperature: 42, // High temp!
    };
    expect(calculateHealthScore(telemetry)).toBe(HealthLevel.CRITICAL);
  });
});
```

### Component Testing

- **Use React Testing Library** for component tests
- **Test user interactions** (clicks, inputs)
- **Test accessibility** (ARIA labels, keyboard navigation)

### Integration Testing

- **Test feature workflows** end-to-end
- **Use MSW** (Mock Service Worker) for API mocking
- **Test critical user paths** (machine setup, restock alerts)

---

## Git Workflow

### Branch Naming

- **Feature**: `feature/restock-alerts`
- **Bug Fix**: `fix/chart-rendering`
- **Refactor**: `refactor/telemetry-hooks`
- **Documentation**: `docs/update-contributing`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add predictive restock alerts
fix: resolve map view crash on missing gps
refactor: extract map logic to custom hook
docs: update CONTRIBUTING.md with testing guidelines
style: apply glass morphism to machine cards
```

### Pull Request Process

1. **Create feature branch** from `main`
2. **Implement changes** following code standards
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Create PR** with clear description
6. **Request review** from team members
7. **Address feedback** and make changes
8. **Merge** after approval

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation

## Checklist
- [ ] Follows design system guidelines
- [ ] TypeScript types are defined
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors or warnings
```

---

## Getting Started

### For New Contributors

1. **Read this document** thoroughly
2. **Review [`STYLES.md`](./STYLES.md)** for design guidelines
3. **Explore the codebase** to understand current structure
4. **Pick a task** from the issue tracker
5. **Ask questions** if anything is unclear

### Recommended First Tasks

- **Add new utility function** (e.g., currency formatting)
- **Create new shared component** (e.g., Loading spinner)
- **Improve existing component** (e.g., add accessibility)
- **Write tests** for existing utilities
- **Update documentation** with examples

### Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Vite Guide](https://vitejs.dev/guide/)
- [Phosphor Icons](https://phosphoricons.com/)

---

## Questions?

If you have any questions or need clarification:

1. **Check existing documentation** (README.md, STYLES.md)
2. **Search closed issues** for similar questions
3. **Open a discussion** in GitHub Discussions
4. **Reach out to maintainers** via email or Slack

---

## License

This project is proprietary software. Please contact the project maintainers for licensing information.

---

**Thank you for contributing to the Vending Analytics Platform!** 🚀

Your contributions help build a more efficient and intelligent vending network.
