# zotenv

A type-safe env-loader with runtime validation built with [Zod](https://github.com/colinhacks/zod).

Use this library to perform validation of your .env values on application startup. For projects with
a large number of env vars, you can separate them into different runtime variables.

## Installing

    npm install @smirk/zotenv

## Getting Started

Explore the example for ideas on how to get started:

    npm run example

## Usage

```typescript
// postgresConfig.ts
import { loadEnv } from "@smirk/zotenv";
import { z } from "zod";

// Define the schema for your env vars using a Zod Schema
const postgresConfigSchema = z.object({
  PG_HOST: z.string(),
  PG_PORT: z.number().gte(1024).lte(65535).default(5432),
});

// Use Zod's infer helper to create a Typescript Type for the Config object
// that will be built from your env vars
type PostgresConfig = z.infer<typeof postgresConfigSchema>;

// Load and validate data from your .env file
const postgresConfig = loadEnv(postgresConfigSchema);

export { postgresConfig, PostgresConfig };
```

```typescript
// index.ts
import { postgresConfig, PostgresConfig } from "./postgresConfig";
import { Client } from "pg";

async function connectToPostgres(config: PostgresConfig) {
  const postgresClient = new Client({
    host: config.PG_HOST,
    port: config.PG_PORT,
  });

  await postgresClient.connect();
  return postgresClient;
}

connectToPostgres(postgresConfig);
```

```env
# .env

PG_HOST=localhost
PG_PORT=5432
```
