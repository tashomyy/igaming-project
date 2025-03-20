# Monkey Casino

Money Casino is an interactive and dynamic gaming platform where users can explore a vast collection of online casino games. Built with React, TypeScript, Tailwind CSS, and Redux Toolkit, this app provides seamless category-based navigation, infinite scrolling, and a smooth user experience.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (LTS recommended)
- npm or yarn
- Docker (if using the Docker setup)

## Installation & Running Locally

Clone the Repository:

```
git clone https://github.com/tashomyy/igaming-project.git
cd igaming-project
```

Install Dependencies:

```
npm install
```

Start the Development Server:

```
npm run dev
```

The app will be available at http://localhost:8080.

## Building & Running in Production Mode

To build and preview the production build:

```
npm run build
npm run preview
```

This will serve the app at http://localhost:8080.

## Running with Docker

To run the application using Docker:

```
docker run -d -p 8080:8080 tashomy/igaming-project:8
```

The app will be accessible at http://localhost:8080.

## Deployment

The application is also deployed and can be accessed at:
[Monkey Casino Production](https://igaming-project-production.up.railway.app/)

## Scripts Overview

- npm run dev - Starts the development server with Vite.

- npm run build - Builds the production-ready version.

- npm run preview - Serves the built project on port 8080.

## Technologies Used

- React 19

- Vite

- TailwindCSS

- Axios

- Redux Toolkit

- React Router

- React Toastify
