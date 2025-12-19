
Movie App – Local Setup Guide

This is a React-based movie browsing application with search, sorting, pagination, and a responsive UI built using Material UI.

---

Prerequisites

Make sure the following are installed on your system:

* Node.js (version 16 or higher)
* npm or yarn
* Backend API running locally or deployed

---

How to Run the Project Locally

Step 1: Clone the repository

git clone git@github.com:Rohan-developer028/frontend-movie.git
cd frontend-movie

---

Step 2: Install dependencies

npm install

OR

yarn install

---

Step 3: Setup environment variables

Create a file named .env in the root directory and add:

REACT_APP_API_URL=[http://localhost:5000](http://localhost:5000)

Note: Replace the URL with your backend API URL if it is different.

---

Step 4: Start the development server

npm start

OR

yarn start

The application will start at:

[http://localhost:3000](http://localhost:3000)

---

Build for Production

To create a production build:

npm run build

---

Netlify / CI Warning Fix (Optional)

If Netlify fails the build due to warnings being treated as errors, add the following environment variable in Netlify:

CI=false

(Use this only if necessary)

---

Tech Stack

* React
* Material UI (MUI)
* JavaScript
* REST API
* Netlify (Deployment)

---

Features

* Search movies
* Sort by name, rating, release date, duration
* Pagination support
* Responsive grid layout
* Fallback image handling
* Clean UI using Material UI

---

Notes

* Backend must support search, sorting, and pagination
* ESLint warnings can fail CI builds if not fixed
---

Author

Rohan Gupta\
