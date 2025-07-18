# Database Configuration Update for Production

## Current Issue: SQLite + Vercel Production

The "Something went wrong" error during sign-in is likely caused by database connectivity issues. Vercel's production environment has a read-only filesystem, which can cause problems with SQLite databases.

## Quick Fix Options:

### Option 1: Use Neon Database (Recommended - Free)
1. Go to [neon.tech](https://neon.tech)
2. Sign up (free)
3. Create project "bilkent-marketplace"
4. Copy connection string
5. Update Vercel env var: `DATABASE_URL=postgresql://...`

### Option 2: Vercel Postgres (Paid but integrated)
1. Go to Vercel dashboard
2. Add Postgres addon to your project
3. Auto-configures DATABASE_URL

### Option 3: Temporary Memory DB (Testing only)
Update DATABASE_URL to: `file:/tmp/dev.db`

## Current Status:
- ✅ Build: Working
- ✅ Email API: Working 
- ✅ Environment: Configured
- ❌ Database: SQLite incompatible with production

The authentication fails because NextAuth.js cannot write to the database to store sessions and verification tokens.
