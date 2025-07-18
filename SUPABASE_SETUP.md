# 🔧 Supabase Database Setup Guide

## Current Issue: Authentication Failed

The error shows your DATABASE_URL still has placeholder `[YOUR-PASSWORD]` instead of real password.

## 🔍 Get Your Real Connection String:

### Option 1: From Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select project: `tyznvhuntbwszjlfjaih`
3. Settings → Database
4. Copy "Connection string" (URI format)

### Option 2: If You Can't Find Password
1. Settings → Database
2. Reset database password
3. Copy new password
4. Replace `[YOUR-PASSWORD]` in connection string

## 📝 Expected Format:

Your connection string should look like:
```
postgresql://postgres.tyznvhuntbwszjlfjaih:REAL_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

## 🚀 After You Get Real Connection String:

1. Update `.env` file with real connection string
2. Run: `npm run prisma:reset`
3. If successful, continue with deployment

## 🔧 Alternative: Create New Supabase Project

If you can't access current project:
1. Create new project: "bilkent-marketplace"
2. Get connection string from new project
3. Update `.env` with new string

---

**Next: Once you have the real connection string, let me know and we'll complete the database setup!**
