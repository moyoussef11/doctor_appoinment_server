# Doctor Appointment System – Backend

This repository contains the backend server for the Doctor Appointment System.

Admins can add doctors by specialization; users can register, book or cancel appointments; doctors accept or reject them via their dashboards; and users can edit their profiles.

---

##  Tech Stack

- Node.js & Express.js
- MongoDB (via Mongoose)
- JWT-based authentication
- Role-based access control (Admin, Doctor, User)
- Body validation and error handling
- CORS for handling cross-origin requests

---

##  Key Features

- **Authentication & Authorization**:
  - Secure login/signup using JWT
  - Role-based access controls (admin/doctor/user)
- **Admin Endpoints**:
  - Add, update, and list doctors by specialization
- **User Endpoints**:
  - Register/login
  - Book, cancel, and view appointments
  - Update user profile
- **Doctor Endpoints**:
  - View incoming appointment requests
  - Accept or reject appointments
- **Protected Routes**:
  - Route-level protection based on user role
- **Error Handling**:
  - Consistent error structure and validation feedback


##  Project Structure 

src/
├── controllers/ # Business logic for each route (auth, appointments, doctors)
├── models/ # Mongoose schemas (User, Doctor, Appointment)
├── routes/ # Route definitions & middleware
├── middlewares/ # Auth, errorHandler, validation, etc.
├── utils/ # Helper functions (e.g., token creation)
├── config/ # Environment variables, DB connection
└── server.js # App entry point


---

##  Installation & Running

```bash
git clone https://github.com/moyoussef11/doctor_appoinment_server.git
cd doctor_appoinment_server
npm install
npm run dev


