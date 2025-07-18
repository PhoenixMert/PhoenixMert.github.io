# SendGrid Setup Guide

## ✅ Completed
- SendGrid integration is fully configured in the codebase
- Old Resend dependencies have been removed
- Build is working successfully
- Email templates are ready

## 🔧 Next Steps to Complete Email Setup

### 1. Get SendGrid API Key

1. **Sign up for SendGrid**: Go to https://sendgrid.com
2. **Create free account**: 100 emails/day free tier (perfect for testing)
3. **Verify your email**: Check your inbox and click verification link
4. **Get API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access" permissions
   - Copy the API key (starts with "SG.")

### 2. Update Environment Variables

Update your `.env` file:
```bash
# Replace with your actual SendGrid API key
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
EMAIL_FROM=your-verified-email@yourdomain.com
```

### 3. Sender Authentication (Important!)

For production deployment, you need to verify your sender identity:

**Option A: Single Sender Verification (Easiest)**
1. Go to Settings → Sender Authentication → Single Sender Verification
2. Add your email address (e.g., noreply@yourdomain.com)
3. Check your email and click verification link

**Option B: Domain Authentication (Recommended for production)**
1. Go to Settings → Sender Authentication → Domain Authentication
2. Add your domain and follow DNS setup instructions

### 4. Test Email Functionality

Once you have the API key:

1. **Update .env**: Add your real SendGrid API key
2. **Start dev server**: `npm run dev`
3. **Test auth flow**: 
   - Go to http://localhost:3000/auth/signin
   - Enter a @ug.bilkent.edu.tr email
   - Check if verification email arrives
4. **Test API directly**: Visit http://localhost:3000/api/test-email

### 5. Deploy to Vercel

When ready for production:

1. **Push to GitHub**: Make sure your code is in a GitHub repository
2. **Connect to Vercel**: Import your repository to Vercel
3. **Set Environment Variables** in Vercel dashboard:
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your_production_secret_here
   DATABASE_URL=your_supabase_postgres_url_here
   ```
4. **Deploy**: Vercel will automatically deploy your app

## 🚨 Important Notes

- **Free Tier Limits**: SendGrid free tier allows 100 emails/day
- **Sender Verification**: Required for production use
- **Domain Setup**: For professional emails, set up your own domain
- **Environment Variables**: Never commit real API keys to Git

## 📧 Current Email Configuration

- **Service**: SendGrid (professional email service)
- **Templates**: Beautiful HTML email templates included
- **Restriction**: Only @ug.bilkent.edu.tr emails allowed
- **Ready for**: Immediate testing with API key

Your marketplace is now ready for email authentication! Just add the SendGrid API key and you're good to go! 🚀
