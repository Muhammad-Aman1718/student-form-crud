### Student Management System (React + Node + Prisma)

Ye project ek full‑stack Student Management System hai jisme front‑end React (Vite + TypeScript) aur back‑end Express + Prisma (PostgreSQL) use hota hai. CRUD operations (create/read/update/delete) students ke liye available hain.

### Tech Stack / Tools
- **Front‑end**: React 19, TypeScript, Vite, Redux Toolkit, React Redux, Tailwind CSS 4, Lucide React, React Toastify
- **Back‑end**: Node.js, Express 5, Prisma ORM, @prisma/client
- **Database**: PostgreSQL (via `DATABASE_URL`)
- **Dev Tools**: ESLint, TypeScript, Nodemon, ts-node, Vite

### Project Structure
```
Student-Managment-System/
  Student-Front-end/   // React + Vite app
  Student-Back-end/    // Express API + Prisma
```

### Setup & Run

1) Clone repo and install dependencies
```
# Front-end
cd Student-Front-end
npm install

# Back-end
cd ../Student-Back-end
npm install
```

2) Configure environment (Back-end)
```
# Student-Back-end/.env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
```

3) Prisma migrate & generate (Back-end)
```
cd Student-Back-end
npx prisma migrate dev
npx prisma generate
```

4) Start development
```
# Start API (default: http://localhost:5000)
cd Student-Back-end
npm run dev

# Start Front-end (default: http://localhost:5173)
cd ../Student-Front-end
npm run dev
```

### API Overview (Back-end)
- Base URL: `http://localhost:5000`
- Routes under: `/api/students`
  - `GET /api/students` – saare students list
  - `POST /api/students` – naya student create (JSON body)
  - `PUT /api/students/:id` – student update by `id`
  - `DELETE /api/students/:id` – student delete by `id`

Prisma model: `Student` (fields: `id, name, fatherName, age, dateOfBirth, gender, grade, classSection, rollNumber, gpa, email, phoneNumber, status, address, subjects[], createdAt, updatedAt`).

### Front-end Overview
- Redux Toolkit store (`student` slice)
- Axios instance and utilities for API calls and toasts
- Tailwind CSS 4 styling

### Useful Scripts
- Front-end
  - `npm run dev` – Vite dev server
  - `npm run build` – type check + production build
  - `npm run preview` – preview build
- Back-end
  - `npm run dev` – nodemon + ts-node (hot reload)
  - `npm run build` – TypeScript build
  - `npm start` – run compiled server

### Notes
- Make sure PostgreSQL running ho aur `DATABASE_URL` sahi set ho.
- First time ke liye migrations run karna zaroori hai (see Prisma migrate).
