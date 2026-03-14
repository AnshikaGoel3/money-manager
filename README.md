#  Money Manager – Full Stack Application

A modern **Money Management Web Application** that helps users track **income, expenses, categories, and financial summaries** securely using **JWT authentication**.

Built with **React + Spring Boot + MongoDB**, deployed on **Vercel & Render**.

---

##  Live Demo

- **Frontend (Vercel):**  
  https://money-manager-frontend-pi.vercel.app

- **Backend (Render):**  
  https://money-manager-backend1.onrender.com

---

##  Tech Stack

### Frontend
- React (Vite)
- Material UI (MUI)
- Axios
- React Router
- Vercel (Deployment)

### Backend
- Spring Boot
- Spring Security (JWT)
- MongoDB Atlas
- Maven
- Docker
- Render (Deployment)

---

##  Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Secure protected routes

### 💸 Transactions
- Add Income & Expense
- Categorize transactions
- View all transactions
- Secure per-user data handling

### 📊 Dashboard
- Income vs Expense summary
- Category-wise breakdown
- Financial insights

### ⚙️ Security
- JWT filter-based authentication
- Stateless backend
- CORS configured for production
- Passwords encrypted using BCrypt

---

##  Application Flow

1. User registers or logs in
2. Backend returns a **JWT token**
3. Token stored in browser `localStorage`
4. Axios automatically attaches token to every request
5. Spring Security validates token using `JwtAuthFilter`
6. User accesses protected APIs

---

## 🔑 API Endpoints

### Authentication
POST /api/auth/register
POST /api/auth/login


### Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/{id}
DELETE /api/transactions/{id}


### Dashboard
GET /api/dashboard/summary

---

## 🖼️ Screenshots

###  Login Page
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/108ec9d7-2c34-47a2-a2bb-1b501cb005f3" />


###  Register Page
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/964c6614-83cc-4eb3-bcc7-9a26ed76975d" />


###  Dashboard
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/b70b6089-9d17-4b73-984f-3e88610a14b8" />


###  Add Transaction
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/9fd4b072-728b-46d0-8d23-1cf3d5b17c98" />


---

## ⚙️ Environment Variables

### Frontend (`.env`)
VITE_API_BASE_URL=https://money-manager-backend1.onrender.com/api


### Backend (`application.properties`)
spring.data.mongodb.uri=YOUR_MONGODB_ATLAS_URI
jwt.secret=YOUR_SECRET_KEY


---

## 🐳 Docker Support (Backend)

The backend is fully Dockerized.

```bash
docker build -t money-manager-backend .
docker run -p 8080:8080 money-manager-backend
```

## 📁 Project Structure
```
money-manager/
│
├── money-manager-frontend/
│ ├── src/
│ ├── public/
│ └── vite.config.js
│
├── money-manager-backend/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ ├── security/
│ └── MoneyManagerBackendApplication.java
```

---

##  Key Learnings

- Implemented **JWT Authentication** from scratch
- Integrated **Spring Security filter chain**
- Solved real-world **CORS & API path issues**
- Built a **production-style full stack application**
- Deployed frontend & backend **independently**

---

## 🏁 Future Improvements

- Refresh token support
- Monthly analytics & charts
- User profile management
- Export transactions to CSV
- Dark mode UI

---

## 👩‍💻 Author

**Anshika Goel**  
Full Stack Developer  

- GitHub: https://github.com/AnshikaGoel3










