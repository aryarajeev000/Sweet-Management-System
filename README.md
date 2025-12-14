# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using **Node.js, Express, MongoDB, React, and TypeScript**.  
The application supports authentication, inventory management, and purchasing sweets with a clean UI and tested APIs.

---

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes

### Sweets Management
- View all available sweets
- Search sweets by name, category, or price range
- Purchase sweets (inventory decreases automatically)
- Disable purchase when stock is zero

### Inventory
- Quantity maintained at backend
- Real-time update after purchase

### Frontend
- Modern React UI (pure CSS)
- Protected routes
- Axios interceptor for JWT handling

### Testing
- API tests using **Jest + Supertest**
- Tests for auth and sweets routes
- Real database testing (no in-memory DB)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Jest + Supertest

### Frontend
- React + TypeScript (Vite)
- Axios
- React Router
- Pure CSS

---

## 📂 Project Structure

```txt
backend/
 ├── src/
 │   ├── modules/
 │   │   ├── auth/
 │   │   └── sweets/
 │   ├── middleware/
 │   ├── config/
 │   └── tests/
 └── package.json

frontend/
 ├── src/
 │   ├── api/
 │   ├── auth/
 │   ├── pages/
 │   └── components/
 └── package.json


## ⚙️ Setup Instructions
1️⃣ Backend Setup
cd backend
npm install
npm run dev


Create .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_secret_key

## 2️⃣ Frontend Setup
cd frontend
npm install
npm run dev


## Frontend runs at:

http://localhost:5173


## Backend runs at:

http://localhost:5000

## 🧪 Running Tests
cd backend
npm test


✔ Auth routes tested
✔ Sweets routes tested
✔ Inventory logic tested

## 🔐 Authentication Flow

User logs in

Backend returns JWT

Frontend stores JWT in localStorage

Axios interceptor sends token in Authorization header

Backend middleware validates token

## 🤖 My AI Usage

I used AI tools (ChatGPT,Curser and Claude) during development for:

Designing backend architecture

Generating initial boilerplate code

Writing and debugging Jest test cases

Understanding ESM + Jest configuration issues

##
Rajeev Sutrakar
Software Developer