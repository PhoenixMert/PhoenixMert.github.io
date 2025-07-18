# Vercel Environment Variables Setup

## Problem
The production site is showing "Failed to send verification email. Please try again." because the environment variables are not properly configured in Vercel.

## Solution
You need to add the environment variables to your Vercel project dashboard.

## Step-by-Step Instructions

### 1. Go to Vercel Dashboard
- Open https://vercel.com/dashboard
- Click on your project "bilkent-marketplace" (or whatever it's named)

### 2. Navigate to Environment Variables
- Click on "Settings" tab
- Click on "Environment Variables" in the sidebar

### 3. Add These Environment Variables
Add each of these variables one by one:

**DATABASE_URL**
- Value: `postgresql://postgres:Qp8xvr5sYnh49UWo@db.tyznvhuntbwszjlfjaih.supabase.co:5432/postgres`
- Apply to: Production, Preview, Development

**NEXTAUTH_URL** ⚠️ IMPORTANT - This is different for production!
- Value: `https://bilkent-marketplace.tugrulmert.me`
- Apply to: Production, Preview, Development

**NEXTAUTH_SECRET**
- Value: `your-super-secret-key-change-this-in-production`
- Apply to: Production, Preview, Development

**RESEND_API_KEY**
- Value: `re_gaAEr13b_HM8uduQQf1s5x9mPSWRbwV8V`
- Apply to: Production, Preview, Development

**EMAIL_FROM**
- Value: `noreply@bilkent-marketplace.tugrulmert.me`
- Apply to: Production, Preview, Development

**EMAIL_SERVER**
- Value: `smtp://resend:re_gaAEr13b_HM8uduQQf1s5x9mPSWRbwV8V@smtp.resend.com:587`
- Apply to: Production, Preview, Development

**EMAIL_SERVER_HOST**
- Value: `smtp.resend.com`
- Apply to: Production, Preview, Development

**EMAIL_SERVER_PORT**
- Value: `587`
- Apply to: Production, Preview, Development

**EMAIL_SERVER_USER**
- Value: `resend`
- Apply to: Production, Preview, Development

**EMAIL_SERVER_PASSWORD**
- Value: `re_gaAEr13b_HM8uduQQf1s5x9mPSWRbwV8V`
- Apply to: Production, Preview, Development

### 4. Redeploy
After adding all environment variables:
- Go to the "Deployments" tab
- Click on the latest deployment
- Click "Redeploy" or wait for the next automatic deployment

### 5. Test
Once redeployed, try signing in again at:
https://bilkent-marketplace.tugrulmert.me/auth/signin

## Expected Result
After setting up the environment variables correctly, the sign-in should work and you should receive verification emails successfully.
