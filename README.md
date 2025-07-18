# Bilkent University Marketplace

A trusted marketplace platform for Bilkent University students to buy and sell second-hand items safely within the campus community.

## Features

- **Secure Authentication**: Only verified Bilkent University students with @ug.bilkent.edu.tr emails can access the platform
- **Item Listings**: Students can list books, electronics, supplies, and other items for sale
- **Purchase Requests**: Buyers can send purchase requests to sellers instead of direct payments
- **Contact Facilitation**: Once a request is accepted, buyers get seller contact information to arrange meetups
- **Campus-Focused**: Designed specifically for the Bilkent University community

## Technology Stack

- **Frontend**: Next.js 15 with App Router
- **Authentication**: NextAuth.js with email verification
- **Database**: Prisma ORM with SQLite (development)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: For type safety

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and configure:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Email Configuration (for email verification)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@bilkentmarketplace.com
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # NextAuth.js API routes
│   ├── auth/              # Authentication pages
│   ├── marketplace/       # Main marketplace page
│   ├── profile/           # User profile page
│   ├── sell/              # Item listing page
│   └── ...
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
└── ...
```

## How It Works

1. **Sign Up**: Students register with their Bilkent University email address
2. **Email Verification**: Users receive a verification link via email
3. **Browse & List**: Users can browse existing items or list their own
4. **Purchase Requests**: Interested buyers send purchase requests to sellers
5. **Contact Exchange**: When a request is accepted, contact information is shared
6. **Meet & Exchange**: Students arrange to meet on campus for the transaction

## Development Roadmap

### Phase 1 (Current)
- [x] User authentication with Bilkent email restriction
- [x] Basic UI and navigation
- [x] Item listing form
- [x] Marketplace browsing page
- [ ] Database integration for items
- [ ] Purchase request system

### Phase 2 (Future)
- [ ] Image upload functionality
- [ ] Real-time messaging system
- [ ] Advanced search and filtering
- [ ] User ratings and reviews
- [ ] Email notifications
- [ ] Mobile responsive improvements

### Phase 3 (Advanced)
- [ ] Payment integration (if needed)
- [ ] Admin panel
- [ ] Analytics and reporting
- [ ] Mobile app
- [ ] Advanced security features

## Contributing

This is a student project for Bilkent University. Contributions from Bilkent students are welcome!

## Security & Privacy

- Only Bilkent University students can access the platform
- Email verification is required for all accounts
- No payment processing is handled on the platform initially
- Contact information is only shared after mutual agreement

## Support

For questions or support, contact the development team or create an issue in this repository.

## License

This project is created for educational purposes for Bilkent University students.
