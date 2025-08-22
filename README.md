# Movie Rating App

A simple and interactive movie rating application built with Vue.js, Tailwind CSS, and powered by a JSON server for data handling. Users can view, add, edit, delete, and rate movies.

![App Screenshot]
<img width="1280" height="620" alt="app1" src="https://github.com/user-attachments/assets/b331c37b-d31d-493c-932d-62d6cde1be57" />
<br/>
<br/>
<img width="1264" height="598" alt="app2" src="https://github.com/user-attachments/assets/ccc54341-eedd-4e3a-86fa-3d935ac43094" />

## Features

- **View Movies:** Fetches and displays a list of movies from the API.
- **Interactive Rating:** A 5-star system to rate and update movie ratings.
- **CRUD Operations:** Full functionality to **C**reate, **R**ead, **U**pdate, and **D**elete movies.
- **Form Validation:** Ensures data integrity when adding or editing movies.
- **Filtering & Searching:** Easily find movies by name, genre, or "In Theaters" status.
- **Pagination:** Smoothly navigate through a large collection of movies.

## Tech Stack

- **Frontend:** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend (Development):** [JSON Server](https://github.com/typicode/json-server)
- **Build Tool:** [Vite](https://vitejs.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (version 20.x or higher) and [pnpm](https://pnpm.io/) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/amr-ibrahim7/just-test.git
    cd movie_app
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the Development Servers:**
    You need to run two separate processes in two different terminal windows.
    - **Terminal 1: Start the JSON Server (Backend):**
      This command will start a mock API server on `http://localhost:3000`.

      ```bash
      pnpm server
      ```

    - **Terminal 2: Start the Vue App (Frontend):**
      This command will start the development server for the Vue app on `http://localhost:5173`.
      ```bash
      pnpm dev
      ```

4.  **Open the app:**
    Open your browser and navigate to `http://localhost:5173`. You should now see the application running!
