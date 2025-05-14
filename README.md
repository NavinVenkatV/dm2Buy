# Code Snippet Keeper with Real-Time Collaboration

A full-stack web application that allows users to save, update, and manage code snippets, with real-time collaboration features using Socket.IO (currently being implemented). The app supports authentication, secure routes, and a responsive UI.

## Live Link (Coming Soon)
The live deployment link will be updated once the real-time Socket.IO features are fully integrated and tested.

## Tech Stack

### Frontend:
- React with TypeScript
- Tailwind CSS
- Axios
- Monaco Editor
- React Router DOM
- Framer Motion

### Backend:
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Socket.IO (integration in progress)

## Features

- User registration and login with JWT authentication
- Passwords hashed securely with bcrypt
- CRUD operations for code snippets (create, read, update, delete)
- Monaco Editor integration for editing code with syntax highlighting
- Clean and responsive UI
- Real-time collaboration with Socket.IO (to be completed within one day)

## Folder Structure

- /client - React frontend
- /server - Express backend
- /controllers
- /models
- /routes
- /middleware
- /utils

## Setup Instructions

### 1. Clone the Repository

- git clone https://github.com/navinvenkat/code-snippet-keeper.git
- cd code-snippet-keeper
- ## Setup Instructions

### 2. Backend Setup

- cd backend
- npm install
- npm run dev

Create a `.env` file inside the server directory and add the following:

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- PORT=3000

### 3. Frontend Setup

- cd client
- npm install
- npm run dev

## Real-Time Collaboration (In Progress)

Real-time editing features using Socket.IO are currently being implemented. These features will allow users to:

- Collaborate live on the same code snippet
- See changes from other users in real time
- View active users in a session

The Socket.IO functionality will be completed and pushed live within one day.

## Contact

Navin Venkat  
Email: navinvenkat.dev@gmail.com  
LinkedIn: https://linkedin.com/in/navinvenkat  
Portfolio: https://navinvenkat.xyz

## License

This project is licensed under the MIT License.
