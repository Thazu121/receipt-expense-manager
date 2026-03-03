# 💰 Receipt Expense Manager

A modern and responsive Receipt & Expense Management Web Application built with **React, Redux Toolkit, and Tailwind CSS**.

Track expenses, manage receipts, categorize transactions, and monitor spending in a clean dashboard interface.

---

## 🚀 Features

- 📊 Dashboard with total spending & analytics
- 🔍 Search expenses by merchant
- 🧾 Add, edit, and delete receipts
- 🏷 Categorize transactions
- ✅ Toggle status (Pending / Verified / Rejected)
- 🌙 Dark & Light theme support
- 📱 Fully responsive design
- 🧠 State management with Redux Toolkit
- 💾 Persistent data handling

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM

---

## 📂 Project Structure

receipt-expense-manager/
│
├── public/
│
├── src/
│ ├── assets/
│
│ ├── components/
│ │ ├── dashboard/
│ │ │ ├── CategoriesCard.jsx
│ │ │ ├── Header.jsx
│ │ │ ├── SpendingChart.jsx
│ │ │ ├── StatCard.jsx
│ │ │ └── TransactionTables.jsx
│ │ │
│ │ ├── expenses/
│ │ │ ├── ExpenseFilters.jsx
│ │ │ ├── ExpenseHeader.jsx
│ │ │ ├── ExpenseRow.jsx
│ │ │ ├── ExpenseStats.jsx
│ │ │ └── ExpenseTable.jsx
│ │ │
│ │ ├── Insight/
│ │ │ ├── CashFlowCard.jsx
│ │ │ ├── CategoryPerformanceCard.jsx
│ │ │ ├── DateFilter.jsx
│ │ │ ├── FinancialOverviewCard.jsx
│ │ │ ├── InsightsHeader.jsx
│ │ │ ├── OverspendingCard.jsx
│ │ │ └── TrendBreakdown.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── AuthNav.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── LandingNav.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── SideNavbar.jsx
│ │ │
│ │ ├── pages/
│ │ │ ├── AddExpense.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Expense.jsx
│ │ │ ├── ForgotPassword.jsx
│ │ │ ├── Landing.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── ReceiptGallery.jsx
│ │ │ ├── ReceiptScanner.jsx
│ │ │ ├── Report.jsx
│ │ │ ├── setting.jsx
│ │ │ └── SignUp.jsx
│ │ │
│ │ ├── receipt/
│ │ │ ├── ReceiptCard.jsx
│ │ │ ├── ReceiptFilters.jsx
│ │ │ ├── ReceiptGrid.jsx
│ │ │ └── ReceiptPreviewModal.jsx
│ │ │
│ │ ├── scan/
│ │ │ ├── ExtractedDetailsCard.jsx
│ │ │ ├── FileUploadCard.jsx
│ │ │ ├── ScanCameraCard.jsx
│ │ │ ├── ScanHeader.jsx
│ │ │ └── ScanTab.jsx
│ │ │
│ │ ├── Logout.jsx
│ │ └── ProtectRoute.jsx
│
│ ├── Layouts/
│ │ ├── AuthLayout.jsx
│ │ ├── LandLayout.jsx
│ │ └── RootLayout.jsx
│
│ ├── redux/
│ │ ├── features/
│ │ │ ├── authSlice.jsx
│ │ │ ├── receiptSlice.jsx
│ │ │ ├── scanSlice.jsx
│ │ │ ├── settingSlice.jsx
│ │ │ └── themeSlice.jsx
│ │ │
│ │ └── store.js
│
│ ├── services/
│ │ └── OcrService.js
│
│ ├── utils/
│ │ └── formatCurrency.js
│
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
│
├── package.json
└── README.md


---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Thazu121/receipt-expense-manager.git
cd receipt-expense-manager

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


App runs on:

http://localhost:5173

📊 Key Modules
🔐 Authentication

Login / Signup

Password validation

Protected Routes

Logout

Account delete option

📷 Receipt Scanner

Upload image

OCR extraction

Auto-fill expense details

📈 Dashboard

Total Expenses

Spending Chart

Category Cards

Recent Transactions

📊 Insights

Cash Flow Analysis

Category Performance

Overspending Detection

Trend Breakdown

Financial Overview

🌙 Theme Support

Light Mode

Dark Mode

Theme stored in Redux

Fully responsive across devices

📦 Redux Slices

authSlice

receiptSlice

scanSlice

settingSlice

themeSlice

📱 Responsive Design

Mobile

Tablet

Desktop

Modern clean UI

Optimized spacing and layout
