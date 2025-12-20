# Backend

## Technology used

1. Node.js
2. Hono
3. Postgres
4. Zod
5. OpenAPI
6. Drizzle
7. Stoker by w3cj

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **.env** file
- **docker running**

## Setup

1. Go to backend directory

```bash
cd backend
```

2. Install node modules

```bash
npm i
```

3. If there is no .env create one containing:

```bash
NODE_ENV=development
PORT=6969
LOG_LEVEL=debug
DATABASE_URL=postgresql://postgres:password@localhost:5432/product_catalog (make sure the database url corresponds with the config inside docker compose)
```

4. Run docker if not running
5. Run application

```bash
npm run dev
```

6. Open browser and navigate to the API documentation:

```bash
http://localhost:6969/scalar
```

---

# Frontend

## Technology used

1. Angular v21.0.4
2. Angular Material
3. Tailwind

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **Angular CLI**
- **backend running**

Install Angular CLI globally if not already installed:

```bash
npm install -g @angular/cli
```

## Setup

1. Go to frontend directory

```bash
cd frontend
```

2. Install node modules

```bash
npm i
```

3. Run application

```bash
ng serve
```

4. Open browser and navigate to:

```bash
http://localhost:4200/
```
