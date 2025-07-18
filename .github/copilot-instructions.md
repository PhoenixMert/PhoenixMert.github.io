# Copilot Instructions for Bilkent Marketplace

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js marketplace application for Bilkent University students to buy and sell second-hand items.

## Key Requirements
- Authentication is restricted to @ug.bilkent.edu.tr email addresses only
- Use NextAuth.js for authentication with email verification
- Database operations use Prisma ORM with SQLite for development
- Purchase requests instead of direct payments
- Contact facilitation between buyers and sellers
- Modern UI with Tailwind CSS

## Technical Stack
- Next.js 15 with App Router
- TypeScript for type safety
- Prisma for database management
- NextAuth.js for authentication
- Tailwind CSS for styling
- Lucide React for icons

## Code Style Guidelines
- Use TypeScript interfaces for all data structures
- Follow Next.js 15 App Router conventions
- Use server components where possible
- Implement proper error handling and loading states
- Use meaningful component and variable names
- Add proper JSDoc comments for complex functions
