# Next.js Project - HR Panel

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js: v20.18.0
- npm, yarn, pnpm, or bun (choose your preferred package manager)

### Clone the Repository

```bash
git clone https://github.com/Harry-blue/hr-panel.git
cd hr-panel
```

## Set Up Environment Variables

Create a .env file in the root directory and add the following variables:

```bash
DATABASE_URL="mysql://root:dolphine@localhost:3306/devin"
JWT_SECRET=your_secret_key_here
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Replace your_secret_key_here and your-generated-secret-key with secure values.

### Installation dependency

```bash
npm install
```

### Setup prisma

```bash
npx prisma generate
```

### Run Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
