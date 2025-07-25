# Replit.md

## Overview

This is a full-stack dashboard application built for executive-level business intelligence and KPI monitoring. The system provides real-time insights across four main business areas: Demand-Supply Management, Production & Inventory, Logistics & Distribution, and Sales & Market Intelligence. It's specifically themed around dairy/food industry operations with Amul branding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Charts**: Chart.js for data visualization (line, bar, gauge, donut charts)

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development Setup**: Hot reloading with Vite integration in development

### Project Structure
- `client/` - Frontend React application
- `server/` - Backend Express.js API
- `shared/` - Shared TypeScript schemas and types
- `migrations/` - Database migration files (Drizzle)

## Key Components

### Data Layer
- **Database Schema**: Two main tables defined in `shared/schema.ts`
  - `dashboard_metrics` - Stores time-series metric data with categories
  - `kpi_targets` - Stores target values and thresholds for KPIs
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Data Validation**: Zod schemas for runtime type checking and validation

### API Layer
- **REST Endpoints**: 
  - GET `/api/dashboard/metrics` - Fetch metrics by category
  - GET `/api/dashboard/metrics/latest` - Get latest metrics
  - POST `/api/dashboard/metrics` - Add new metric data
  - GET/POST `/api/dashboard/targets` - Manage KPI targets
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Request/response logging for API endpoints

### Frontend Features
- **Tab-based Navigation**: Four main business intelligence tabs
- **Interactive Charts**: Real-time data visualization with Chart.js
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Toast Notifications**: User feedback system
- **Time Range Selection**: Data filtering by time periods
- **Brand Theming**: Custom CSS variables for Amul brand colors

### Chart Components
- **Line Charts**: For trending data (order fill rates, dispatch rates)
- **Bar Charts**: For comparative data (cycle times, regional performance)
- **Gauge Charts**: For utilization metrics (plant capacity, fleet usage)
- **Donut Charts**: For categorical breakdowns (inventory composition)

## Data Flow

1. **Data Collection**: Metrics are posted to REST API endpoints with category, value, and timestamp
2. **Data Storage**: Validated data is stored in PostgreSQL via Drizzle ORM
3. **Data Retrieval**: Frontend queries APIs using TanStack Query for caching and synchronization
4. **Data Visualization**: Chart components render real-time data with interactive features
5. **User Interaction**: Tab navigation and time range selection trigger new API calls

## External Dependencies

### Frontend Dependencies
- **UI Components**: Extensive Radix UI ecosystem for accessibility
- **Charts**: Chart.js for data visualization
- **Date Handling**: date-fns for date manipulation
- **Form Handling**: React Hook Form with Hookform resolvers
- **State Management**: TanStack React Query for server state

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation
- **Session Storage**: connect-pg-simple for PostgreSQL sessions

### Development Dependencies
- **Build Tools**: Vite with React plugin
- **Development**: tsx for TypeScript execution
- **Code Quality**: ESBuild for production builds

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `drizzle-kit push`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **Session Configuration**: PostgreSQL-backed sessions

### Production Setup
- **Static Serving**: Express serves built React app in production
- **API Routes**: Express handles /api routes
- **Database**: Neon Database for production PostgreSQL
- **Process Management**: Single Node.js process handling both API and static files

The application follows a modern full-stack TypeScript architecture with strong separation of concerns, comprehensive error handling, and production-ready deployment configuration. The dashboard is designed for executive-level decision making with real-time business intelligence across key operational metrics.
