# AI Bey Business Portal

A Next.js-based business submission portal that allows businesses to register and get discovered by AI. This application provides both quick registration and detailed profile submission forms.

## Features

- **Quick Add Form**: Fast business registration with essential details
- **Detailed Profile Form**: Comprehensive business information submission
- **Modern UI**: Built with Tailwind CSS and Framer Motion animations
- **Database Integration**: Prisma ORM with database support
- **Form Validation**: Client-side and server-side validation
- **Success Notifications**: Toast notifications for user feedback

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Database**: Prisma ORM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd business-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your database connection string:
```env
DATABASE_URL="your-database-connection-string"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3005](http://localhost:3005) to view the application.

## Available Scripts

- `npm run dev` - Start development server on port 3005
- `npm run build` - Build for production
- `npm start` - Start production server on port 3005
- `npm run lint` - Run ESLint

## Project Structure

```
business-portal/
├── app/
│   ├── api/              # API routes
│   ├── detailed-profile/ # Detailed form page
│   ├── quick-add/        # Quick registration page
│   ├── success/          # Success page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── prisma/               # Database schema
├── public/               # Static assets
└── lib/                  # Utility functions
```

## Features Overview

### Quick Add Form
- Business name and category
- Contact information
- Basic business details
- Quick submission process

### Detailed Profile Form
- Comprehensive business information
- Multiple contact methods
- Business hours and location
- Social media links
- Detailed descriptions

## Deployment

This application can be deployed on:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

## License

MIT

## Support

For support, email support@aibey.ai or visit [https://aibey.ai](https://aibey.ai)
