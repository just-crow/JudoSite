This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Competition Auto Sync (JudoManager)

Upcoming competitions can be imported automatically from JudoManager.

### Environment variables

Add these variables in your environment file:

```env
# Optional (defaults to the BIH calendar URL)
JUDOMANAGER_CALENDAR_URL=https://portal.judomanager.com/calendar?&mode=2&country=47

# Required for cron/API protection
JUDOMANAGER_SYNC_SECRET=your-strong-secret

# Optional when deploying on Vercel Cron (Bearer token support)
CRON_SECRET=your-strong-secret
```

### Manual admin sync

Go to `/admin/competitions` and click **Sync JudoManager**.

### Automatic daily sync

`vercel.json` includes a daily cron job targeting:

- `GET /api/competitions/sync`

The endpoint is protected and accepts:

- `Authorization: Bearer <secret>`
- `x-sync-secret: <secret>`
- `?secret=<secret>`

Only upcoming BIH events are imported, and records are upserted by `title + date + location`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
