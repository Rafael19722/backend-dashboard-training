# Dashboard API 

A robust, scalable, and observability-focused API built with **NestJS**, designed to simulate a real production environment with Artificial Intelligence integration for dynamic data generation (Lazy Evaluation).

## Tech Stack 

This project was built using industry best practices and tools (DevOps, SRE, and AI):

- **Framework:** [NestJS](https://nestjs.com/) (Modular architecture and dependency injection)
- **Database:** [Prisma ORM](https://www.prisma.io/) with SQLite (seamless migration to PostgreSQL)
- **Documentation (DX):** [Scalar](https://scalar.com/) & OpenAPI (Replacing traditional Swagger with a modern UI)
- **Observability & Logs:** [Pino](https://getpino.io/) (Structured JSON logs for high-load environments)
- **Health Monitoring:** [Prometheus](https://prometheus.io/) (Exposing `/metrics` for Grafana scraping)
- **Security:** [Helmet](https://helmetjs.github.io/) (HTTP Headers) & [Throttler](https://docs.nestjs.com/security/rate-limiting) (Rate Limiting/Brute Force Prevention)
- **Artificial Intelligence:** [LangChain](https://js.langchain.com/) + Google Gemini (Flexible LLM orchestration)
- **Process Manager:** [PM2](https://pm2.keymetrics.io/) (Cluster Mode and Auto-Restart for Production)

## Key Features

- **Complete Product CRUD:** Isolated routes, validated via DTOs and `class-validator`.
- **AI Description Generation (Lazy Evaluation):** The system fetches data from the database. If a product description is missing, the API orchestrates a call to Google Gemini via LangChain, saves it to Prisma, and returns it to the front-end seamlessly, acting as a *Cache on Read*.
- **Custom Metrics:** Prometheus counters tracking business rules (e.g., total number of products created).
- **DoS Protection:** Global rate limiting configured for the API to prevent abuse.

## How to Run the Project

### Prerequisites
- Node.js (v18+)
- Package Manager (npm/yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/dashboard-api.git
cd dashboard-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:  
  Create a .env file in the root directory:
```bash
DATABASE_URL="file:./dev.db"
GOOGLE_API_KEY="your_google_ai_studio_key_here"
```

4. Set up the Database and run the Seed:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### Running in Development
```bash
npm run start:dev
```

### Running in Production (PM2 Simulation)
```
npm run build
npm install -g pm2
pm2 start ecosystem.config.js
pm2 logs
```

## API Documentation
with the server running, access the modern Scalar OpenAPI Reference interface:
http://localhost:3000/docs

## Monitoring
Metrics for Prometheus scraping are exposed at:
http://localhost:3000/metrics

*Developed with a focus on Software Architecture and Developer Experience (DX).*
