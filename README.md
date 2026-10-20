# KSHETRA — E-Commerce for the Modern World

Kshetra is a full-stack e-commerce web application developed as a college project using the MERN stack. It aims to provide a convenient online shopping experience through a user-friendly interface and organized product management.

## About the Project

Kshetra demonstrates the development of an e-commerce platform using modern web technologies. The project includes a frontend for user interaction and a backend for application logic, API handling, and database operations.

## Features

- Product browsing and category management
- Shopping cart functionality
- User authentication
- Admin dashboard and management functionality
- Product and data management
- MongoDB database integration
- Backend API development
- OpenAI API configuration for supported AI functionality

## Technologies Used

- **Frontend:** React.js, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Version Control:** Git and GitHub

## Project Structure

```text
kshetra-ecommerce/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
├── frontend/
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sona321-VL/kshetra-ecommerce.git
cd kshetra-ecommerce
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory and configure the environment variables required by the application.

Example:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/kshetra
JWT_SECRET=your_secure_random_secret
PORT=5000
OPENAI_API_KEY=your_openai_api_key
```

Replace the example values with your own local configuration. Never upload actual API keys, passwords, or secret values to GitHub.

### 4. Start the Backend

```bash
npm start
```

Use the start command defined in `backend/package.json`.

### 5. Install and Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Use the appropriate command specified in `frontend/package.json`.

## Security

- Environment files containing credentials must not be committed.
- API keys and passwords must be stored securely.
- The `.gitignore` file excludes environment files and dependency directories.

## Learning Outcomes

This project provides practical experience in full-stack web development, REST API integration, database management, authentication, and version control using Git and GitHub.

## Contributors

Developed by the Kshetra project team as part of an academic project.

## Future Improvements

- Enhanced product search and filtering
- Improved responsive design
- Additional shopping and order-management features
- Enhanced analytics and customer support functionality

---

**KSHETRA — E-Commerce for the Modern World**
