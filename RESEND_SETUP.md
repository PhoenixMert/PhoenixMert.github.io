# 🚀 Resend Email Setup Guide

## ✅ MIGRATION COMPLETED: SendGrid → Resend

Your marketplace has been successfully migrated from SendGrid to Resend! Here's what changed and how to get it working:

## 🔄 What Was Changed

1. **Email Service**: Switched from SendGrid to Resend
2. **Configuration**: Updated environment variables
3. **Code**: New `/src/lib/resend.ts` replaces SendGrid implementation
4. **Authentication**: Updated NextAuth.js to use Resend
5. **Dependencies**: Removed `@sendgrid/mail`, kept `resend`

## 📋 Setup Steps

### 1. Get Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month!)
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `re_`)

### 2. Update Environment Variables

In your `.env` file, replace the placeholder:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### 3. Test Email Service

Once you have your API key:

1. Update the `.env` file
2. Visit: `http://localhost:3000/api/test-email` (GET request)
3. Or send POST to `/api/test-email` with `{"email": "your@ug.bilkent.edu.tr"}`

### 4. Test Authentication

1. Go to `http://localhost:3000/auth/signin`
2. Enter a `@ug.bilkent.edu.tr` email
3. Check your email for the sign-in link

## 🎯 Why Resend?

- **Higher Free Tier**: 3,000 emails/month vs SendGrid's 100/day
- **Better Developer Experience**: Modern API, excellent documentation
- **Easier Setup**: No complex sender authentication required
- **Custom Domain Ready**: Better support for custom domains
- **Built for Developers**: Created specifically for modern web apps

## 🔧 Current Configuration

- **Email Service**: Resend API
- **From Address**: `marketplace@bilkent-marketplace.tugrulmert.me`
- **Authentication**: Email-only (NextAuth.js)
- **Restriction**: Only `@ug.bilkent.edu.tr` emails allowed
- **Custom Domain**: `bilkent-marketplace.tugrulmert.me`

## 🐛 Troubleshooting

### Build Issues
If you encounter TypeScript build errors:
1. Try: `rm -rf .next && npm run build`
2. Check: All imports are correct
3. Ensure: Resend package is installed

### Email Not Working
1. ✅ Check API key is correct in `.env`
2. ✅ Verify the email domain (`@ug.bilkent.edu.tr`)
3. ✅ Check console logs for error messages
4. ✅ Test with `/api/test-email` endpoint first

### Development vs Production
- **Development**: Uses `localhost:3000`
- **Production**: Uses your Vercel domain
- **Custom Domain**: `bilkent-marketplace.tugrulmert.me`

## 🚀 Next Steps

1. **Get Resend API Key** (most important!)
2. **Test Email Authentication**
3. **Deploy to Production** (will auto-deploy via GitHub)
4. **Connect Sell Form to Database**
5. **Implement Purchase Requests**

## 📝 Optional: Custom Domain for Emails

For even better email deliverability, you can:
1. Add your domain to Resend
2. Set up DNS records
3. Use `noreply@bilkent-marketplace.tugrulmert.me`

But this is optional - Resend works great with their default domain too!

---

Your marketplace is ready! Just add the Resend API key and start testing. 🎉
