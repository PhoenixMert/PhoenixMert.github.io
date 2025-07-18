# PhoenixMert.github.io - Bilkent University Marketplace

A trusted marketplace platform for Bilkent University students to buy and sell second-hand items safely within the campus community.

**🌐 Live Demo:** [bilkent-marketplace.tugrulmert.me](https://bilkent-marketplace.tugrulmert.me) *(coming soon)*

## 🎯 Features

- **Secure Authentication**: Only verified Bilkent University students with @ug.bilkent.edu.tr emails can access the platform
- **Item Listings**: Students can list books, electronics, supplies, and other items for sale
- **Purchase Requests**: Buyers can send purchase requests to sellers instead of direct payments
- **Contact Facilitation**: Once a request is accepted, buyers get seller contact information to arrange meetups
- **Campus-Focused**: Designed specifically for the Bilkent University community

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Authentication**: NextAuth.js with email verification
- **Database**: Prisma ORM with SQLite (upgrading to PostgreSQL)
- **Email**: SendGrid for professional email delivery
- **Styling**: Tailwind CSS with responsive design
- **Icons**: Lucide React
- **Deployment**: Vercel with custom domain
- **TypeScript**: For type safety and better development experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/PhoenixMert/PhoenixMert.github.io.git
cd PhoenixMert.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# SendGrid Email Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
EMAIL_FROM=marketplace@tugrulmert.me
4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/          # NextAuth.js API routes
│   ├── api/test-email/    # Email testing endpoint
│   ├── auth/              # Authentication pages
│   ├── marketplace/       # Main marketplace page
│   ├── profile/           # User profile page
│   ├── sell/              # Item listing page
│   └── ...
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
└── types/                 # TypeScript type definitions
```

## 🔄 How It Works

1. **Sign Up**: Students register with their Bilkent University email address
2. **Email Verification**: Users receive a verification link via email
3. **Browse & List**: Users can browse existing items or list their own
4. **Purchase Requests**: Interested buyers send purchase requests to sellers
5. **Contact Exchange**: When a request is accepted, contact information is shared
6. **Meet & Exchange**: Students arrange to meet on campus for the transaction

## 🛣️ Development Status

### ✅ Phase 1 (Completed)
- [x] User authentication with Bilkent email restriction
- [x] Professional UI and responsive design
- [x] Item listing form with modern interface
- [x] Marketplace browsing page
- [x] User profile dashboard
- [x] Email verification system
- [x] Production deployment on Vercel
- [x] SendGrid email integration

### 🔄 Phase 2 (In Progress)
- [ ] Database integration for items
- [ ] Purchase request system
- [ ] Custom domain setup (bilkent-marketplace.tugrulmert.me)
- [ ] SendGrid API key configuration

### 🚀 Phase 3 (Future)
- [ ] Image upload functionality
- [ ] Real-time messaging system
- [ ] Advanced search and filtering
- [ ] User ratings and reviews
- [ ] Email notifications
- [ ] PostgreSQL database migration

## 🌐 Deployment

**Current Status**: Live on Vercel
- **Production URL**: [Vercel Domain](https://bilkent-marketplace-5i5ovhve9-phoenixmerts-projects.vercel.app)
- **Custom Domain**: bilkent-marketplace.tugrulmert.me *(in setup)*

## 🔧 Contributing

This is a student project for Bilkent University. Contributions from Bilkent students are welcome!

## 🔒 Security & Privacy

- Only Bilkent University students can access the platform
- Email verification is required for all accounts
- Secure authentication with NextAuth.js
- Professional email delivery with SendGrid
- HTTPS enabled by default

## 📞 Support

For questions or support:
- Create an issue in this repository
- Contact: PhoenixMert on GitHub

## 📜 License

This project is created for educational purposes for Bilkent University students.

---

**Built with ❤️ for the Bilkent University community**
