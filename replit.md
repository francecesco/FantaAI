# Overview

This is a fantasy football (Fantacalcio Serie A) web application built with React frontend and Express.js backend. The application allows users to create teams, buy and sell players, and manage their fantasy football roster. It features a comprehensive player marketplace, team statistics, personalized player recommendations, and a credit-based economy system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA**: Single-page application using React 18 with TypeScript
- **Routing**: Client-side routing with Wouter for lightweight navigation
- **State Management**: TanStack React Query for server state and caching, React Context for authentication
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **Build Tool**: Vite for development server and bundling with TypeScript support

## Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Route Structure**: Modular route handlers for authentication, players, teams, and transactions
- **Storage Layer**: Abstract storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Request/response logging for API endpoints with duration tracking

## Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM with connection pooling using Neon serverless
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **ORM**: Drizzle ORM with Zod integration for type-safe database operations
- **Tables**: Users, players, user_teams (roster), and transactions with proper foreign key relationships

## Authentication and Authorization
- **Session Management**: Simple authentication using username/password with localStorage persistence
- **User Context**: React Context provider for global user state management
- **Route Protection**: Client-side route guards that redirect unauthenticated users to login
- **No JWT/OAuth**: Uses basic session-based authentication for simplicity

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **drizzle-zod**: Zod schema integration for database validation
- **@tanstack/react-query**: Server state management and data fetching
- **wouter**: Lightweight client-side routing

### UI and Styling
- **@radix-ui/react-***: Accessible UI component primitives (30+ components)
- **tailwindcss**: Utility-first CSS framework with custom design system
- **class-variance-authority**: Type-safe component variant styling
- **lucide-react**: Icon library for consistent iconography

### Development and Build Tools
- **vite**: Frontend build tool and development server
- **@replit/vite-plugin-***: Replit-specific development plugins
- **typescript**: Static type checking for both frontend and backend
- **esbuild**: Server-side bundling for production deployment

### Form and Data Handling
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation utilities

The application follows a monorepo structure with shared TypeScript types and schemas between frontend and backend, enabling full-stack type safety. The architecture emphasizes developer experience with hot reloading, comprehensive TypeScript coverage, and a component-driven UI approach.