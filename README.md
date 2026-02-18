# 🎬 Nextflix Clone — Frontend

A Netflix-inspired streaming UI built as a fully decoupled Single Page Application (SPA) powered by React and React Router v7.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

---

## 📖 Overview

This is the frontend client for the Nextflix Clone project. It communicates with the [Express.js backend](https://github.com/peterwambua-1998/nextflix-clone) which proxies the TMDB (The Movie Database) API. The app is completely decoupled from the server and runs as a client-side SPA.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **React Router v7** | File-based routing (framework mode, `ssr: false`) |
| **TypeScript** | Type safety across the codebase |
| **shadcn/ui** | Accessible UI component library (Radix UI + Tailwind CSS) |
| **Tailwind CSS v4** | Utility-first styling with CSS variables |
| **Vite** | Fast dev server and build tool |
| **Docker** | Containerized deployment |

---

## 📁 Project Structure

```
nextflix-clone-frontend/
├── app/                    # Application source code (routes, components, etc.)
├── public/                 # Static assets
├── components.json         # shadcn/ui component configuration
├── react-router.config.ts  # React Router framework configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── Dockerfile              # Docker build file
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- npm or yarn
- The [backend server](https://github.com/peterwambua-1998/nextflix-clone) running locally

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/peterwambua-1998/nextflix-clone-frontend.git
cd nextflix-clone-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create a `.env` file in the root of the project and set the backend API URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

4. **Start the development server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🏗️ Building for Production

```bash
npm run build
```

The production-ready files will be output to the `build/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 🐳 Docker

A `Dockerfile` is included for containerized deployment.

**Build the image:**

```bash
docker build -t nextflix-clone-frontend .
```

**Run the container:**

```bash
docker run -p 3000:3000 nextflix-clone-frontend
```

---

## 🔗 Related

- **Backend Repository:** [nextflix-clone](https://github.com/peterwambua-1998/nextflix-clone)

---

## 📄 License

This project is for educational purposes.
