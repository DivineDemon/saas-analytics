# saas-analytics

A SaaS platform designed for SaaS companies, built with Next.js, providing insightful analytics and data visualization.


## 🚀 Badges

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)


## 📚 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)


## ✨ Features
- **Real-time Analytics:** Monitor key SaaS metrics as they happen.
- **Customizable Dashboards:** Tailor your view to focus on what matters most.
- **Event Tracking:** Log and analyze user interactions to understand behavior.
- **User Segmentation:** Group users based on demographics and behavior.
- **Subscription Management Integration:** Seamlessly integrate with payment gateways.
- **API Access:** Programmatically access your analytics data.
- **Secure Authentication:** Protect your data with robust authentication.


## 🛠️ Tech Stack
- **Language:** TypeScript
- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL (with Prisma ORM)
- **Styling:** Tailwind CSS
- **State Management:** React Context API, potentially Zustand or Jotai for complex states
- **UI Components:** Radix UI primitives, shadcn/ui
- **Deployment:** Vercel (recommended)


## 🚀 Installation

1.  **Clone the repository:**
```bash
git clone https://github.com/your-username/saas-analytics.git
cd saas-analytics
```

2.  **Install dependencies:**
    This project uses Bun as the package manager.

```bash
bun install
```

3.  **Set up environment variables:**
    Copy the `.env.example` file to `.env` and fill in your specific values.

```bash
cp .env.example .env
```
Edit the `.env` file with your database credentials, API keys, etc.

4.  **Generate Prisma client:**
    Ensure your database is running and accessible, then run:

```bash
bun run prisma migrate dev --name init
bun run prisma generate
```

5.  **Run the development server:**
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.


## 💡 Usage


### Landing Page

The landing page provides an overview of the SaaS analytics platform and its features.

**Access:** `http://localhost:3000/`


### Authentication

Users can sign up or sign in to access their dashboards.

**Sign Up:** `http://localhost:3000/sign-up`
**Sign In:** `http://localhost:3000/sign-in`


### Dashboard

The core of the application, where users can view their analytics.

**Access:** `http://localhost:3000/dashboard`

**Key Sections:**
- **Categories:** View and manage different event categories.
- `src/app/dashboard/category/[name]/page.tsx`
- **Account Settings:** Manage user profile and application settings.
- `src/app/dashboard/(settings)/account-settings/page.tsx`
- **API Key Management:** Generate and manage API keys for programmatic access.
- `src/app/dashboard/(settings)/api-key/page.tsx`
- **Upgrade Plan:** Information and options to upgrade subscription plans.
- `src/app/dashboard/(account)/upgrade/page.tsx`


### Sending Analytics Events (Example with API)

You can send events to the platform via the API.

**Endpoint:** `POST /api/v1/events`

**Example Payload:**

```json
{
  "event": "user_signed_up",
  "userId": "user-123",
  "properties": {
    "plan": "free",
    "signup_method": "google"
  }
}
```

Refer to `src/app/api/v1/events/route.ts` for detailed implementation.


## 📄 Configuration

The application uses environment variables for configuration. Please refer to the `.env.example` file for a list of required variables.

| Variable                 | Description                                                              | Example                     |
| :----------------------- | :----------------------------------------------------------------------- | :-------------------------- |
| `DATABASE_URL`           | The connection string for your PostgreSQL database.                      | `postgresql://user:pass@host:port/db` |
| `STRIPE_SECRET_KEY`      | Your Stripe secret API key for payment processing.                       | `sk_test_...`               |
| `STRIPE_WEBHOOK_SECRET`  | The secret for verifying Stripe webhook signatures.                      | `whsec_...`                 |
| `NEXTAUTH_SECRET`        | A secret used for NextAuth.js session management.                       | `a-long-random-string`      |
| `NEXTAUTH_URL`           | The URL of your NextAuth.js application.                                | `http://localhost:3000`     |
| `DISCORD_CLIENT_ID`      | Your Discord application's Client ID.                                    | `123456789012345678`        |
| `DISCORD_CLIENT_SECRET`  | Your Discord application's Client Secret.                                | `your_discord_secret`       |
| `DISCORD_REDIRECT_URI`   | The redirect URI configured in your Discord application settings.        | `http://localhost:3000/api/auth/callback/discord` |


## 🔌 API Documentation

The API follows a RESTful pattern.


### Events API
- **Endpoint:** `/api/v1/events`
- **Method:** `POST`
- **Description:** Record a new analytics event.
- **Request Body:**
```json
{
    "event": string,
    "userId": string,
    "properties"?: Record<string, any>
}
```
- **Response:** `200 OK` on success, `400 Bad Request` for validation errors.


### Webhooks API
- **Endpoint:** `/api/webhooks/stripe`
- **Method:** `POST`
- **Description:** Handles incoming webhooks from Stripe.
- **Note:** Ensure `STRIPE_WEBHOOK_SECRET` is set correctly in your `.env` file.


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature`).
3.  Make your changes and commit them (`git commit -am 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes relevant tests.


## 📜 License

This project is licensed under the MIT License - see the [LICENSE](#license) file for details.
