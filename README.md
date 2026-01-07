# Job Application Tracker API

A robust RESTful API built with **Node.js**, **Express**, and **MySQL** that helps users track job applications, manage companies, and monitor application statuses efficiently.

This project was built as a **hands-on back-end learning project**, focusing on real-world API design, authentication, and clean architecture.

---

## Features

- **Authentication**

  - Secure user registration & login
  - JWT-based authentication
  - Password hashing using bcrypt

- **Companies Management**

  - Add companies
  - Retrieve all companies

- **Job Applications Tracking**

  - Create job applications
  - Retrieve all applications
  - Update application status
  - Delete applications

- **Search & Filters**
- Filter applications by status (Interview, Offer, Rejected, etc.)
- Search by company name or job title

- **Security & Validation**
- Protected routes using JWT middleware
- Request validation using express-validator

- **Error Handling**
- Centralized error handling
- Consistent API responses

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MySQL
- **Query Tool:** MySQL2
- **Authentication:** JWT (jsonwebtoken)
- **Security:** bcryptjs
- **Validation:** express-validator

---

## Project Structure

````text
src/
 ├─ controllers/
 ├─ routes/
 ├─ models/
 ├─ middleware/
 ├─ config/
 └─ app.js
````
---

## Getting Started

1. **Clone the repository**: git clone https://github.com/Omar-Allaham25/Job-Tracker.git
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Variables**:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=job_tracker
JWT_SECRET=your_jwt_secret
4. **Run the server**:npm run dev

**The API will be running at**:
http://localhost:5000

---

## API Testing (Postman)

This project includes a **Postman Collection** for testing all available API endpoints.

🔗 **Postman Collection:**
[Download Postman Collection](postman/Job-Tracker-API.postman_collection.json)

---

## 🔗 Available Endpoints

###  Users
- Register
- Login

### Companies
- Add company
- Get all companies

### Applications
- Create application
- Get applications
- Update application
- Delete application

---

### Authorization Header Example

```http
Authorization: Bearer {{token}}
```
---

##  Learning Outcomes

Through this project, I gained hands-on experience with:

- Building RESTful APIs from scratch
- Implementing authentication & authorization
- Designing relational databases
- Structuring scalable back-end applications
- Handling validation and centralized error management

---

## Author

**Omar Allahham**
Backend Developer | Software Engineering Student

🔗 GitHub: https://github.com/Omar-Allaham25


````
