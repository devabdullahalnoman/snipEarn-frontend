# snipEarn Frontend

This is the frontend application of **snipEarn**, a microtask-based coin-earning platform that connects buyers with workers. Buyers can create paid tasks and assign coin rewards, while workers complete submissions and earn coins based on approval. The application supports secure role-based access, visual storytelling, motion-enhanced interactions, and complete dashboard flows for all users.

Built with React (v19), Tailwind CSS (v4), and Vite, this frontend prioritizes conversion-ready UX and integration with the backend’s coin economy, Firebase authentication, and admin verification system.

---

### Site Link: https://snipearn-a8e63.web.app/

### Admin email: admin@snipearn.web.app

### Admin password: Aa1234

## Features

### Role-Based Flows

snipEarn supports three distinct roles with guarded access:

- **Buyer**

  - Post tasks with coin allocation
  - View and manage submissions
  - Track coin purchase history and spent coins

- **Worker**

  - Browse tasks and submit work
  - Earn coins upon approval
  - Submit withdrawal requests

- **Admin**
  - View total platform metrics (coins, users, payments)
  - Approve or reject withdrawal requests
  - Manage user roles and deletions
  - View task summary and perform admin deletions

Access to each dashboard and action is protected by Firebase authentication and role verification logic integrated via backend and frontend interceptors.

---

### Homepage Sections

The homepage is designed to attract new users with clarity and trust using motion-enhanced storytelling:

1. **Banner Section**

   - Swiper slider with animated headings and subheadings
   - Each slide highlights a core feature: earning coins, posting tasks, secure payouts
   - Uses `motion/react` for fade-up entry transitions

2. **Value Message**

   - Animated grid of platform benefits (fair payout, admin review, coin logging)
   - Each feature fades upward with a staggered delay
   - Uses consistent spacing (`py-16`, `px-10`, `gap-6`)

3. **Best Workers**

   - API-powered display of top 6 workers with highest coin counts
   - Profile images, names, and coin totals with motion entry

4. **How snipEarn Is Different**

   - Structured bullet-style layout with motion transitions
   - Highlights platform mechanics: role separation, coin tracking, admin-monitored submissions

5. **Trusted By Users**

   - Static testimonial slider using Swiper
   - Displays user avatars, names, and feedback with animated cards

6. **Start Earning CTA**
   - Bold call-to-action strip encouraging registration or task posting
   - Buttons link to registration or posting routes
   - Motion-enhanced fade-in and hover interactivity

All homepage sections share consistent vertical rhythm and spacing to maintain visual flow across breakpoints.

---

### Form Handling

- Uses `react-hook-form` v7 for controlled inputs and validation
- Integrated with Firebase login, user input forms, coin calculations, and withdrawal forms
- Includes SweetAlert2 popups for user confirmation, feedback, and error messages

---

### API Integration

- Axios requests are managed via a reusable `useAxios` hook
- React Query handles data fetching, mutation, caching, and loading states
- Backend routes are protected via Firebase token headers, verified by Axios interceptor
- Dynamic data displayed includes:
  - Top worker coin ranks
  - Admin metrics
  - Buyer task listings
  - Submission and withdrawal records

---

### Animation and Motion

- `motion/react` replaces Framer Motion for fade, slide, and stagger transitions across sections
- All key UI interactions (banner headings, card entries, testimonial appearance) are animated for engagement
- Animations follow viewport logic with `viewport: { once: true }` to prevent repetitive replay

---

### Design System

- Styled using Tailwind CSS v4 with DaisyUI component library
- Responsive layout achieved with `grid-cols`, `flex`, and breakpoint utilities
- Buttons, cards, alerts, badges, and avatars follow consistent visual language
- Custom spacing (`px-4`, `md:px-10`, `xl:px-24`, `py-16`) applied across every major component

---

### Routing and Navigation

- Implemented using `react-router` v7
- Dynamic route matching for buyer/worker/admin flows
- Route protection is conditionally rendered based on authenticated role
- Navigation links are dynamically hidden or shown based on user type

---

### Authentication

- Handled via Firebase Auth with custom claims
- User tokens are verified on every request
- Initial login data pulled from backend via secured endpoint
- Role assignment determines access to dashboards, routes, and API mutations

---

### Payments

- Stripe libraries included in preparation for full integration:
  - `@stripe/react-stripe-js`
  - `@stripe/stripe-js`
- Coin purchase flow is reflected in buyer dashboards (history, balance, spent)

---

## Dev Tools and Linting

- Built with **Vite** for fast development and build optimization
- Uses **ESLint v9** with `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Type safety via `@types/react` and `@types/react-dom`
- VSCode-friendly development environment with lint scripts and preview commands

```bash
npm run dev        # Starts local dev server
npm run build      # Builds production-ready app
npm run lint       # Runs eslint across codebase
npm run preview    # Previews built app
```

---

## Installation

```bash
git clone {Link comming Soon}
cd snipEarn-frontend
npm install
```

Create `.env` file with credentials:

```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_STRIPE_PUBLIC_KEY=
VITE_image_upload_key=
```

Start the server:

```bash
npm run dev
```

---

## Author

**Abdullah Al Noman**  
Fullstack MERN Developer — frontend obsessed, backend rigorous  
Dhaka, Bangladesh  
Email: nomanahnaf@gmail.com  
LinkedIn: [https://www.linkedin.com/in/dev-abdullah-al-noman/](https://www.linkedin.com/in/dev-abdullah-al-noman/)  
Open to remote frontend/React.js roles

---
