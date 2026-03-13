This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

PROBLEM SOLVE

## Challenges & Solutions

During the development of the dashboard feature, I encountered several challenges related to state management and React hooks behavior.

### 1. State Reset Issue When Using Custom Hooks

**Problem**

Initially, I implemented a custom hook `useDashboard` that contained local states using `useState`, such as:

- `params`
- `date`

These states were used to control:

- table sorting
- pagination
- date filtering

However, I noticed that the state values frequently returned to their default values unexpectedly.

Example symptoms:

- `date` filter resetting after interacting with another component
- `params` resetting when sorting or pagination changed

**Investigation**

To identify the issue, I traced how the hook was used across multiple components.
I discovered that the `useDashboard` hook was being called in several components, such as:

- `DashboardFilter`
- `EarningsTable`

Because React hooks create **separate state instances per component**, each component had its own copy of the local state.

This resulted in inconsistent behavior and unexpected resets.

**Root Cause**

Each time a component calls a hook that contains `useState`, React creates a **new independent state instance**.

Example structure:

```
Dashboard
 ├── DashboardFilter (useDashboard)
 └── EarningsTable (useDashboard)
```

This caused:

- multiple `params` states
- multiple `date` states
- state desynchronization between components

**Solution**

To solve this issue, I moved the query-related state (`params`) into a **Zustand store**, making it a global state shared across all components that require it.

New architecture:

```
components → UI
hooks → business logic
zustand store → global state
services → API requests
```

Example store structure:

```javascript
const useDashboardStore = create((set) => ({
  params: {
    keyword: "",
    limit: 3,
    page: 1,
    sortBy: "month",
    sort: "asc",
  },

  setParams: (newParams) =>
    set((state) => ({
      params: { ...state.params, ...newParams },
    })),
}));
```

The custom hook `useDashboard` was then simplified to focus only on **business logic**, while retrieving and updating the state from the Zustand store.

```javascript
const { params, setParams } = useDashboardStore();
```

This ensures that all components read and update the **same source of truth**.

**Result**

After refactoring:

- state is centralized and consistent
- sorting and pagination behave correctly
- state no longer resets across components
- the architecture is cleaner and more scalable

This change also improved the overall separation of concerns:

- **Components** handle UI
- **Hooks** handle business logic
- **Zustand store** manages shared state
- **Services** handle API communication
