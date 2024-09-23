# Notes App

A full-stack Notes application built using **React** for the frontend and **Node.js** for the backend. This app allows users to create, view, edit, and delete personal notes.

## Features

- **Create and Manage Notes**: Add, edit, and delete notes with a clean UI.
- **Search**: Quickly find notes through search functionality.
- **Responsive Design**: Mobile-first design, ensuring a great user experience on any device.
- **Real-time Updates**: Notes are updated in real-time without the need to refresh the page.
- **RESTful API**: Built using Node.js and Express.
  
## Tech Stack

### Frontend

- **React.js**: UI built using React with functional components.
- **React Router**: For navigation and routing between pages.
- **Axios**: To make HTTP requests to the backend.
- **React Context API**: For managing global state across components.

### Backend
- **Node.js**: Backend server built with Node.js.
- **Express.js**: Framework used to create RESTful APIs.
## Important Note: Socket Functionality

If you wish to enable real-time communication using **WebSockets**, you will need to set this up **locally** or on a server that fully supports WebSockets. **Vercel does not support WebSockets** natively on live deployments.

### Prerequisites

- [Node.js](https://nodejs.org/)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/kibo94/notes_app.git
    cd notes_app
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    # Frontend dependencies
    cd client
    npm install
    
    # Backend dependencies
    cd ../server
    npm install
    ```

3. Set up environment variables:
   
   In the `server` folder, create a `.env` file:
   ```bash
   touch .env
