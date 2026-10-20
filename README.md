# KSHETRA — E-Commerce for the Modern World

A MERN-stack e-commerce web application designed to make online shopping easier, more convenient, and user-friendly.

## About the Project

**Kshetra** is a full-stack e-commerce project built using the MERN stack. It provides an online platform for browsing products, managing shopping carts, and supporting administrative operations.

The project demonstrates the integration of a React frontend with a Node.js and Express backend, using MongoDB for data storage.

## Features

- **Product Browsing:** Explore products and product categories.
- **Shopping Cart:** Manage items selected for purchase.
- **User Authentication:** Support user registration and login.
- **Admin Management:** Backend functionality for administrative operations.
- **Dashboard and Analytics:** Administrative analytics and dashboard components.
- **Database Integration:** Store and manage application data using MongoDB.
- **AI Integration:** OpenAI API configuration for supported chatbot or AI functionality, where implemented.

*Note: Features depend on the functionality implemented in the current source code.*

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Node.js | Backend runtime |
| Express.js | Backend API and routing |
| MongoDB | Database |
| JavaScript | Application development |
| Git and GitHub | Version control and collaboration |

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
│   ├── package.json
│   └── .env.example
├── frontend/
│   └── React application
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sona321-VL/kshetra-ecommerce.git
cd kshetra-ecommerce
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a local `.env` file inside the `backend` directory using `.env.example` as a reference.

Configure the environment variables required by your application:

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/kshetra
JWT_SECRET=your_secure_random_secret
PORT=5000
OPENAI_API_KEY=your_api_key_if_required
```

Use your own local values. **Never commit your actual `.env` file, API keys, passwords, or other credentials to GitHub.**

### 3. Start the Backend

```bash
npm start
```

Check `backend/package.json` for the available scripts. If the project uses a development script, you may be able to run `npm run dev` instead.

### 4. Configure and Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the command supported by your frontend's `package.json`. If the project uses a different development server, follow its configured script.

## Environment Variables

Keep credentials in local environment files and ensure they are excluded by `.gitignore`.

The `.env.example` file should contain placeholders only. Update the variable names and values to match the configuration expected by your backend code.

## Future Enhancements

- Improve responsive design and accessibility.
- Add advanced product search and filtering.
- Enhance checkout and order-tracking workflows.
- Expand analytics and reporting.
- Improve chatbot capabilities and user support.

## Learning Outcomes

This project provides practical experience with:

- Full-stack web development using the MERN stack.
- REST API development and integration.
- Database connectivity and data management.
- Authentication and application security.
- Collaborative software development using Git and GitHub.

## Contributors

Developed as a college project by the Kshetra project team.

## License

No license has been specified yet. Please add an appropriate license if you intend to permit others to reuse or distribute this project.

---

**KSHETRA — E-Commerce for the Modern World**
