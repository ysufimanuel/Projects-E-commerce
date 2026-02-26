# Grand Stay Connect – Hospitality Web Application

Grand Stay Connect is a mobile and web-based hospitality application designed to demonstrate a modular, role-based, and scalable frontend architecture for modern digital services. The project focuses on user experience optimization, structured state handling, and clear separation between guest and administrative functionalities.

This application simulates a real-world hospitality platform by integrating accommodation management, digital commerce, and role-based authentication into a single cohesive system.

## 🌐 Live Demo
https://ysufimanuel.github.io/Projects-E-commerce/#

---

## 🎯 Technical Objective

The primary goal of this project is to showcase:
- Frontend architecture design for service-based platforms
- Role-based access simulation (User & Admin)
- UI-driven business logic without backend dependency
- Scalable structure suitable for future backend integration

---

## 🧩 Core Features

### 1. Booking & Accommodation Management
- User-facing interface for browsing and managing accommodation data
- State-driven UI updates for booking workflows
- Structured data handling to simulate reservation logic

**Technical focus:**
- Component-based layout
- Dynamic DOM manipulation
- Separation of UI logic and data logic

---

### 2. High-Efficiency Digital Marketplace
- Marketplace interface for accessing additional services
- Modular UI blocks for scalable product/service expansion
- Optimized interaction flow for service selection

**Technical focus:**
- Reusable UI components
- Clean CSS structuring
- Maintainable JavaScript logic

---

### 3. Role-Based Access (Demo Authentication)
The application simulates authentication and authorization logic using predefined credentials to demonstrate user role separation.

**Demo Accounts:**

**User**
- Email: `user@example.com`
- Password: `user123`

**Admin**
- Email: `admin@example.com`
- Password: `admin123`

**Role Capabilities:**
- User: Access guest features, bookings, and marketplace
- Admin: Access management-oriented interfaces

**Technical focus:**
- Conditional rendering based on role
- Client-side session simulation
- Clean access control logic

---

## 🧠 Architecture Overview

```text
/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── auth.js        # Role-based authentication logic
│   ├── app.js         # Core application logic
│   └── data.js        # Mock data and state handling
└── assets/
