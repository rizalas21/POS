# POS Dashboard App

This is a Point of Sales (POS) dashboard application built using **Next.js**, designed to visualize business performance such as sales, expenses, and earnings.

The dashboard provides an overview through **cards, charts, and tables**, allowing users to analyze data efficiently with filtering, sorting, and pagination features.

---

## 🚀 Features

### 📊 Dashboard Overview

- Total Sales
- Total Purchases
- Earnings (Profit)
- Total Transactions

### 📈 Chart Visualization

- Monthly revenue vs expense
- Earnings trend over time

### 📋 Data Table

- Monthly aggregated data
- Sorting (by month, revenue, expense, earning)
- Pagination
- Keyword search

### 🔍 Filtering

- Date range filtering (startDate & endDate)
- Keyword search (table & chart)

---

## 🧱 Tech Stack

- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: Zustand

---

## ⚙️ Getting Started

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🏗️ Project Structure

```
components → UI layer
hooks → business logic
zustand → global state
services → API calls
prisma → database access
```

---

## 🧠 Data Flow Architecture

All dashboard components (Cards, Chart, Table) share the same filtering source:

```
Filter (date, keyword)
        ↓
   Backend Query
   ↓      ↓      ↓
 Cards   Chart   Table
```

### Important Design Decisions:

- **Cards only use date filter** (summary data)
- **Table & Chart use keyword + date filter**
- Avoid coupling between UI components (e.g. Cards should not depend on Chart)

---

## ⚠️ PROBLEM SOLVE

## Challenges & Solutions

During the development of the dashboard feature, I encountered several challenges related to state management and React hooks behavior.

---

### 1. State Reset Issue When Using Custom Hooks

#### Problem

Initially, I implemented a custom hook `useDashboard` that contained local states using `useState`, such as:

- `params`
- `date`

These states were used to control:

- table sorting
- pagination
- date filtering

However, the state frequently reset unexpectedly.

---

#### Investigation

The hook was used across multiple components:

- `DashboardFilter`
- `EarningsTable`

Each component created its own state instance.

---

#### Root Cause

React hooks create **independent state per component**.

```
Dashboard
 ├── DashboardFilter (useDashboard)
 └── EarningsTable (useDashboard)
```

This caused:

- duplicated states
- inconsistent data
- unexpected resets

---

#### Solution

I moved shared state into a **Zustand global store**.

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

Then used it inside the hook:

```javascript
const { params, setParams } = useDashboardStore();
```

---

#### Result

- State is centralized
- No more unexpected resets
- Consistent behavior across components
- Cleaner architecture

---

## 💡 Key Insights

- Global state is essential when multiple components share the same data
- Avoid duplicating state inside custom hooks
- Separate concerns clearly:
  - UI → Components
  - Logic → Hooks
  - State → Store
  - Data → API

---

## 🚀 Future Improvements

- Add product-based filtering (for better keyword usage)
- Add authentication & role-based access
- Improve chart interaction (drill-down data)
- Export report feature

---

## 📌 Notes

This project focuses on:

- clean architecture
- scalable state management
- real-world dashboard logic

---

## 📬 Author

Rizal Anggara Sudrajat
