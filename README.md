# Expense Tracker – Manage Your Finances Easily 💰

A simple yet functional web application to track your income and expenses. Built using **React.js** for the frontend and **Node.js + Express** for the backend, with **MongoDB** as the database.

---

## 🔗 Demo

**Live Application:** [https://expense-tracker-mu-lake.vercel.app](https://expense-tracker-mu-lake.vercel.app)

---

## 💡 What This Project Does

Expense Tracker allows users to:

- **Sign up and log in securely**
- **Track their income and expenses**
- **Categorize transactions**
- **View a summary of their financial activities**
- **Visualize data through charts**

It’s designed to be minimal, responsive, and easy to use — making personal finance management more accessible.

---

## 🛠️ Tech Stack

### 🔹 Frontend

- React.js
- React Router DOM
- Context API for state management
- Axios for API calls
- Tailwind CSS (or CSS Modules depending on your setup)

### 🔹 Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing

---

## 📁 Project Structure

```
expense-tracker/
├── client/                         # React frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Global state (auth, transactions)
│   │   ├── pages/                  # Screens (Login, Dashboard, etc.)
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── server/                         # Node.js backend
    ├── controllers/               # Business logic
    ├── models/                    # Mongoose schemas
    ├── routes/                    # API routes
    ├── middleware/                # Auth middleware
    ├── config/                    # DB config and environment setup
    ├── server.js


---

## 📡 API Endpoints

Below are the main API endpoints provided by the backend (`/server`):

### Authentication

- `POST /api/auth/register`  
  Register a new user.

- `POST /api/auth/login`  
  Log in and receive a JWT token.

### Transactions

- `GET /api/transactions`  
  Get all transactions for the authenticated user.

- `POST /api/transactions`  
  Add a new transaction.

- `PUT /api/transactions/:id`  
  Update an existing transaction.

- `DELETE /api/transactions/:id`  
  Delete a transaction.

### Categories

- `GET /api/categories`  
  Get all available categories.

---
