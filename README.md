<h1 align="center">Delfosti Api Back</h1>

<p align="center">This backend for Delfosti system serves as the foundation for managing projects and tasks efficiently. It handles requests, manages data storage in PostgreSQL databases, and ensures secure authentication and authorization using JSON Web Tokens (JWT). With Node.js and Express.js, it provides robust functionality for creating, updating, and retrieving project and task information, enabling seamless integration with the frontend for a comprehensive project management solution.
    <br> 
</p>

URL Api: https://delfostiback.onrender.com

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Structure](#structure)
- [Features](#features)
- [Built Using](#built_using)
- [Deploy Using](#deploy_using)

## 🧐 About <a name = "about"></a>
- This backend API follows a three-layer architecture, enabling authenticated users to manage projects and tasks securely.
- It provides endpoints for creating, updating, and retrieving project and task information, ensuring data validation, authentication, and authorization.
- Developed using Node.js and Express, adhering to best practices in software architecture and design patterns.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites
You will need to have the following installed on your machine:
- [Node.js](https://nodejs.org/en/)
- [PostgreSql](https://www.postgresql.org)

### Installing
With the prerequisites installed, and with docker running, you can run the following commands to get the project up and running:

1. Clone the repository or download the zip file and extract it:
```bash
git clone https://github.com/iska1234/DelfostiBack.git
```

2. Install the dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:
```env
JWT_SECRET=

PGHOST=

PGPORT=

PGDATABASE=

PGUSER=

PGPASSWORD=
```

4. Start the database: create the database by querying the schema.sql file inside the schemas folder
```bash
schema.sql
```

5. In the main directory you will find a file called delfosti_back, you can restore the database to use it locally:


![image](https://github.com/iska1234/DelfostiBack/assets/119825666/2ce1fe21-8d8a-43ee-b5a0-b2a776ff97b2)


6. Start the server:
```bash
npm run dev
```

## 🏗️ Structure <a name = "structure"></a>
The project is structured as follows:
```
├── .github: folder where the project's GitHub actions are located.

├── src: folder where application files are located.

│    ├── controllers: folder where controllers for handling HTTP requests are located.

│   ├── data: folder where data access functions are located.

│   ├── db: folder where database configuration and connection functions are located.

│   ├── middlewares: folder where middleware functions are located.

│   ├── models: folder where data models and schemas are located.

│   ├── routers: folder where route handlers are located.

│   ├── services: folder where business logic services are located.

│   ├── tests: folder where test files are located.

│   ├── utils: folder where utility functions are located.

└── index.ts: file initializes an Express server, configures middleware for handling requests, defines routes for different endpoints, and starts the server to listen on a specified port.

```

## 🎈 Features <a name = "features"></a>

### FRs (Functional Requirements)

- [x] Users can create accounts with unique email addresses and provide necessary details.
- [x] Authentication is based on registered email and password, generating an authentication token upon success.
- [x] Access to functionalities depends on predefined user roles, each granting different levels of access.
- [x] Administrators can create projects and tasks, providing descriptive information for each entry.
- [x] Administrators can share projects and tasks with other users, maintaining metadata about sharing activities.
- [x] Users can retrieve their own projects and tasks, while administrators can access all entries, with support for filtering and searching.
- [x] The system handles errors gracefully, providing informative messages for various scenarios.


### BRs (Business Requirements)

- [x] Users can register with unique email addresses and provide necessary details like name and password.
- [x] Registered users can authenticate using their email and password to access the system.
- [x] Authentication tokens are issued upon successful login to access protected resources.
- [x] The system supports different user roles, including regular users and administrators, with distinct access privileges.
- [x] Administrators have additional capabilities, such as managing user accounts and sharing projects and tasks.
- [x] Users can create projects and tasks, providing descriptive information for each entry.
- [x] Administrators have the authority to share projects and tasks with other users, maintaining metadata about sharing activities.
- [x] Retrieval functionalities allow users to access their own projects and tasks and administrators to access all entries, with support for filtering and searching.
- [x] Access to system functionalities and resources is controlled based on user roles and permissions.
- [x] The system handles errors gracefully, providing informative error messages to users in case of failures.
- [x] Error logging mechanisms are implemented to record system errors for monitoring, debugging, and analysis purposes.
- [x] Comprehensive documentation is provided for the system, including API documentation covering endpoints, request/response formats, and authentication/authorization mechanisms.


### NFRs (Non-functional Requirements)

- [x]  User passwords are encrypted for security purposes.
- [x]  Application data is persisted in a PostgreSQL database for reliability and scalability.
- [x]  All data lists are paginated with 20 items per page to enhance user experience.
- [x]  Users are identified by a JSON Web Token (JWT) for secure authentication.
- [x]  Robust security measures are implemented to safeguard data against unauthorized access and breaches.
- [x]  The system is designed to handle expected workloads with minimal performance impact, ensuring responsiveness and efficiency.
- [x]  Scalability is incorporated into the system design to accommodate future growth and new features.
- [x]  System availability is maintained with minimal downtime to ensure uninterrupted service for users.
- [x]  Code maintainability is prioritized, ensuring ease of understanding and modification for future updates.
- [x]  An intuitive user interface is designed to cater to both technical and non-technical users, enhancing usability.
- [x]  Compatibility across various browsers, devices, and operating systems is ensured for seamless user experience.
- [x]  Compliance with relevant regulations and standards concerning data privacy and security is adhered to for legal and ethical integrity.


## 🎈 Usage <a name="usage"></a>
To use the API, you can use the following routes:

### Auth Routes
```
PATH: /auth

POST /register: Register a user

POST /login: Authenticate a user

POST /logout: Logout a user
```

### Admin Routes
```
PATH: /admin

GET /users/all: Get all users (Admin access required)

GET /users/projectId/:id Get projectId from user Id (Admin or Jefe_proyecto access required)

PATCH /asign-project/:id Asign a user for project(Admin access required)

PATCH /update/jefe/:id Assign a user the boss role (Admin access required)
```

### Projects Routes
```

PATH: /projects

POST /create: Upload saved data (Admin access required)

GET /all: Get All projects (Admin access required)

GET /details/:id Get project details from projectId (Admin access required)

GET /dates/:id Get project dates from projectId (Admin access required)
```

### Task Routes
```

PATH: /tasks 

POST /create: Add new Task (Admin access required)

GET /all-project/:projectId: Get all tasks from project by projectId (Admin or Jefe_proyecto access required)

GET /all-user/:userId: Get all tasks from user by projectId (Admin or User access required)

GET /details/:taskId: Get shared data by Shared Data ID (Admin, Jefe_proyecto or User access required)

PATCH /update/revision/:taskId: Update task status to revision (Admin or User access required)

PATCH /update/completed/:taskId: Update task status to Completed (Admin or Jefe_proyecto access required)

PATCH /update/declined/:taskId: Update task status to observation  (Admin or Jefe_proyecto access required)

```	

## ⛏️ Built Using <a name = "built_using"></a>
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)

## 🚀 Deploy Using <a name = "built_using"></a>
- [Render](https://render.com)
