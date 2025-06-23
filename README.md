# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Frontend Screens (MVP Checklist)

Based on the technical specification, the following screens/pages should be created for the MVP:

1. **Auth Screens**
   - Signup
   - Login
   - Password reset (optional for MVP)

2. **Dashboard**
   - Overview of detected deals (main page after login)
   - Opportunity score sorting/filtering
   - Quick stats (number of alerts left, plan info)

3. **Search Criteria Management**
   - Create/edit/delete search profiles (brand, model, year, mileage, price, etc.)
   - List of saved search criteria

4. **Deal Details**
   - Detailed view for a single detected deal
   - Tagging, annotation, mark as interested/not interested

5. **Export**
   - Export deals to CSV (button or modal)

6. **Notifications Preferences**
   - Set email notification frequency (instant, daily, weekly)

7. **Subscription & Payments**
   - View current plan and usage
   - Upgrade plan (Stripe integration)
   - Payment history (optional for MVP)

8. **Account Management**
   - Update email
   - Update password
   - Delete account

This checklist will guide the creation of the Nuxt frontend. Each screen can be implemented as a Vue component or page under the `pages/` directory.
