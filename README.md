# 💼 Job Tracker

A modern **full-stack web application** that helps users organize and manage their job search in one place.

Job Tracker allows users to securely manage companies, track job applications, monitor application progress, and quickly search through their opportunities using a clean and responsive interface powered by a RESTful API.

This project was built to strengthen my full-stack development skills by combining a modern React frontend with a secure and scalable Node.js backend.

---

# ✨ Features

## 🔐 Authentication

* User registration and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Protected routes

---

## 💼 Job Applications

* Create job applications
* View all applications
* Update application details
* Change application status
* Delete applications

---

## 🏢 Company Management

* Add companies
* View all companies
* Associate applications with companies

---

## 🔍 Search & Filtering

* Search by:

  * Company name
  * Job title

* Filter by application status:

  * Applied
  * Interview
  * Offer
  * Rejected

---

## 🎨 User Interface

* Responsive design
* Modern dashboard
* Clean and intuitive user experience
* Client-side form validation
* Protected pages for authenticated users

---

## 🛡 Security & Validation

* JWT authentication
* Password hashing with bcrypt
* Request validation using Joi
* Centralized error handling
* Consistent API responses

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcryptjs
* Joi

## Database

* MySQL
* MySQL2

---

# 📁 Project Structure

```text
Job-Tracker/
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   └── ...
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/Omar-Allaham25/Job-Tracker.git

cd Job-Tracker
```

---

## Install dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_tracker

JWT_SECRET=your_jwt_secret
```

---

## Run the Application

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

# 📡 REST API

The frontend communicates with a RESTful API built using Express.js.

### Authentication

* POST `/register`
* POST `/login`

### Companies

* GET `/companies`
* POST `/companies`

### Applications

* GET `/applications`
* POST `/applications`
* PUT `/applications/:id`
* DELETE `/applications/:id`

Protected endpoints require the following header:

```http
Authorization: Bearer <your_token>
```

---

# 📮 API Testing

A Postman collection is included for testing all available API endpoints.

```text
jobTracker-API.postman_collection.json
```

---

# 🎯 Learning Outcomes

Building this project helped me gain practical experience with:

* Full-stack application development
* Building RESTful APIs
* Authentication and authorization using JWT
* Password security with bcrypt
* React application development
* State management and API integration
* Designing relational databases
* CRUD operations
* Form validation
* Error handling
* Layered backend architecture
* Building responsive user interfaces

---

# 🚀 Future Improvements

* Pagination
* Refresh token authentication
* Email verification
* Password reset
* User profile management
* Dashboard analytics
* Docker support
* Unit and integration testing
* CI/CD pipeline
* API documentation with Swagger

---

# 👨‍💻 Author

**Omar Allahham**

Software Engineering Graduate | Full-Stack Developer

* GitHub: https://github.com/Omar-Allaham25
* LinkedIn: *(Add your LinkedIn profile here)*
