# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BI Design** is a Vue 3 + TypeScript + Vite-based Business Intelligence design tool for creating data visualization dashboards. It provides drag-and-drop layout functionality with rich chart components including bars, lines, pies, and statistical components.

## Commands

### Development Commands
```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Type Checking
```bash
# Run TypeScript compiler check
vue-tsc -b
```

## Architecture & Structure

### Core Technology Stack
- **Frontend Framework**: Vue 3 with Composition API
- **Type System**: TypeScript with strict type checking
- **Build Tool**: Vite with Vue plugin
- **UI Library**: Ant Design Vue with auto-import
- **State Management**: Pinia
- **Routing**: Vue Router
- **Charts**: ECharts integration
- **Layout**: vue-grid-layout-v3 for drag-and-drop
- **HTTP Client**: Axios
- **Utilities**: @vueuse/core, dayjs, uuid

### Project Structure
```
├── src/
│   ├── api/                 # API interfaces and services
│   ├── assets/              # Static assets and images
│   ├── components/          # Shared Vue components
│   │   └── SettingTitle/     # Component settings UI
│   ├── designer/            # Dashboard designer core
│   │   ├── GridCanvas/       # Drag-and-drop canvas
│   │   ├── HeaderBar/        # Top navigation bar
│   │   └── components/       # Designer modals and dialogs
│   ├── enums/               # TypeScript enums
│   ├── hooks/               # Vue composition functions
│   ├── packages/            # Chart and component library
│   │   ├── Basic/           # Basic components (Statistic)
│   │   └── Charts/          # Chart components (Bars, Lines, Pies)
│   ├── router/              # Vue Router configuration
│   ├── store/               # Pinia stores
│   ├── styles/              # Global styles and themes
│   ├── utils/               # Utility functions
│   ├── views/               # Page-level components
│   ├── App.vue              # Root application component
│   └── main.ts              # Application entry point
├── types/                   # TypeScript type definitions
└── public/                  # Static public assets
```

### Key Components

**Designer Core:**
- `GridCanvas`: Main drag-and-drop canvas using vue-grid-layout-v3
- `HeaderBar`: Top toolbar with save/preview actions
- Modals: `addMetricModal`, `configModal`, `saveModal`

**Chart Packages:**
- **Bars**: BarCommon, BarCrossrange
- **Lines**: LineArea, LineCommon, LineSmooth
- **Pies**: PieCommon, PieRing, PieRose
- **Basic**: Statistic component

**Custom Hooks:**
- `use-aside`: Sidebar management
- `use-chart-data`: Chart data processing
- `use-drag-layout`: Drag-and-drop layout management

### Configuration

**Vite Configuration** (`vite.config.ts`):
- Path aliases: `@` → `src/`, `~` → project root
- Auto-import for Vue, Vue Router, and @vueuse/core
- Ant Design Vue component auto-import with icon resolution
- No CSS extraction for component styles

**TypeScript Configuration**:
- Multiple tsconfig files for different targets (app, node)
- Strict TypeScript settings
- Auto-generated type definitions for imports and components

### Development Patterns

1. **Component Architecture**: All components use Vue 3 Composition API with `<script setup>` syntax
2. **State Management**: Pinia stores for application state
3. **Auto-imports**: Vue, Vue Router, and @vueuse/core functions are auto-imported
4. **UI Library**: Ant Design Vue components are auto-imported with Chinese locale
5. **Charts**: ECharts-based chart components with standardized interfaces
6. **Responsive Design**: Grid-based layout system for dashboard responsiveness

### Entry Points

- **Application**: `src/main.ts` → `src/App.vue` → router-view
- **Main View**: `src/views/index.vue` (dashboard designer)
- **Preview**: `src/views/preview.vue` (dashboard preview)

### Build & Deployment

- Production build outputs to default Vite build directory
- Base path configured as `./` for relative asset paths
- TypeScript compilation required before build (`vue-tsc -b && vite build`)
- No linting or testing scripts configured in package.json

### Environment Requirements

- Node.js 16.0+
- pnpm 7.0+
- Development server runs on localhost:5173 by default