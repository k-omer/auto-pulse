# AutoScout Assistant Pro — Technical Specification

---

## 1. Project Overview

**AutoScout Assistant Pro** is a SaaS platform that scans AutoScout24 for underpriced used cars, estimates their real value, scores opportunities, and notifies users by email in real time. The platform is designed for car traders, auto-entrepreneurs, and investors seeking to identify and act on the best deals in the used car market.

---

## 2. Core Features (MVP)

- **Automated Scraping**: Scan AutoScout24 for listings matching user criteria.
- **Custom Search Criteria**: Brand, model, year, mileage, price, etc.
- **Market Value Estimation**: Basic algorithm to estimate real value and margin.
- **Opportunity Scoring**: Score based on price gap, estimated condition, and sale speed.
- **Real-Time Alerts**: Send notifications via email (Resend).
- **Dashboard**: View, tag, annotate, and export detected deals.
- **User Management**: Signup, login, subscription, and payment via Stripe (Supabase Auth).
- **Freemium Model**: Limited free alerts, paid plans for more.

---

## 3. System Architecture

- **Frontend**: Nuxt (Vue 3)
- **Backend**: Node.js/Express (or Nuxt server API)
- **Database & Auth**: Supabase (PostgreSQL + Auth)
- **Scraping**: Apify actor for AutoScout24
- **Notifications**: Email (Resend)
- **Payments**: Stripe

---

## 4. Data Flow

1. User sets search criteria in the dashboard.
2. Backend triggers Apify actor for AutoScout24 with criteria.
3. Apify scrapes and stores results.
4. Backend fetches results, estimates value, scores opportunities.
5. Backend stores results in Supabase, sends email notifications for good deals via Resend.
6. Frontend displays results and allows user actions.

---

## 5. Database Schema (Supabase/PostgreSQL)

### users (managed by Supabase Auth)
- `id` (UUID, PK)
- `email` (unique)
- `plan` (enum: free, premium, pro)
- `stripe_customer_id` (string, nullable)
- `notification_preferences` (JSONB: {frequency: 'instant'|'daily'|'weekly'})
- `created_at` (timestamp)

### search_criteria
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `brand` (string)
- `model` (string)
- `year_min` (int)
- `year_max` (int)
- `mileage_max` (int)
- `price_max` (int)
- `created_at` (timestamp)

### listings
- `id` (UUID, PK)
- `platform` (string, e.g., 'AutoScout24')
- `external_id` (string, unique per platform)
- `data` (JSONB, raw listing data)
- `price` (int)
- `score` (float)
- `status` (enum: new, seen, ignored, interested)
- `detected_at` (timestamp)
- `user_id` (UUID, FK → users.id)
- `criteria_id` (UUID, FK → search_criteria.id)

### alerts
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `criteria_id` (UUID, FK → search_criteria.id)
- `listing_id` (UUID, FK → listings.id)
- `sent_at` (timestamp)

### payments
- `id` (UUID, PK)
- `user_id` (UUID, FK → users.id)
- `plan` (enum)
- `stripe_info` (JSONB)
- `created_at` (timestamp)

---

## 6. API Endpoints

### Auth (Supabase)
- `POST /api/auth/signup` — Register new user
- `POST /api/auth/login` — Login
- `POST /api/auth/logout` — Logout

### Search & Listings
- `POST /api/search` — Create/update search criteria
- `GET /api/results` — Get latest results for user
- `POST /api/listings/tag` — Tag/annotate a listing
- `GET /api/listings/export` — Export deals (CSV)

### Alerts
- `POST /api/alerts` — Set/manage alert preferences

### Payments
- `POST /api/user/subscribe` — Stripe payment/plan management

---

## 7. Email Notification System (Resend)

- **Provider**: [Resend](https://resend.com/) (Node.js SDK or REST API).
- **Triggers**: When a new high-score deal is found, send an email with summary and link.
- **Preferences**: Users can opt for instant alerts or daily/weekly summaries.
- **Templates**: Use dynamic templates for deal alerts and summaries.
- **Tracking**: Optionally track delivery and open status via Resend.

**Example Node.js Integration:**
```js
import { Resend } from 'resend';

const resend = new Resend('RESEND_API_KEY');

async function sendDealAlertEmail(to, subject, html) {
  await resend.emails.send({
    from: 'alerts@yourdomain.com',
    to,
    subject,
    html,
  });
}
```

---

## 8. User Stories

### Registration & Onboarding
- As a new user, I want to sign up with my email and password so that I can access the platform.
- As a user, I want to set my email notification preferences.

### Search Criteria
- As a user, I want to define my search criteria (brand, model, price, etc.) so that I only get relevant car listings.
- As a user, I want to save multiple search profiles for different types of cars.

### Deal Discovery
- As a user, I want the system to automatically scan AutoScout24 for new listings matching my criteria.
- As a user, I want to see a list of detected deals in my dashboard, sorted by opportunity score.

### Notifications
- As a user, I want to receive an email when a high-potential deal is found so I can act quickly.
- As a user, I want to control how often I receive email notifications (immediately, daily, weekly).

### Deal Management
- As a user, I want to tag, annotate, or mark deals as "interested" or "not interested" in my dashboard.
- As a user, I want to export my list of deals to CSV.

### Subscription & Payments
- As a user, I want to see how many free alerts I have left this month.
- As a user, I want to upgrade my plan and pay via Stripe for more alerts.

### Account Management
- As a user, I want to update my email address and notification preferences.
- As a user, I want to delete my account and all associated data.

---

## 9. MVP Roadmap

1. Set up Supabase project and schema
2. Integrate Supabase Auth in Nuxt frontend
3. Stripe payment integration
4. Build Apify actor for AutoScout24 (or use existing)
5. Implement backend logic for triggering/fetching scrapes
6. Integrate email notifications (Resend)
7. Develop dashboard UI
8. Testing and launch

---

## 10. Appendix

- **Apify actor link/ID** (to be determined)
- **Example API payloads**
- **Email template examples (deal alert, summary)**
- **Supabase schema SQL**
- **Resend integration reference**
- **Stripe integration reference** 