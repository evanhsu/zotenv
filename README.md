# zotenv

A type-safe env-loader with runtime validation

## Installing

    npm install @smirk/zotenv

## Usage

```typescript
// postgresConfig.ts
import { loadEnv } from '@smirk/zotenv';
import { z } from 'zod';

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
import { postgresConfig, PostgresConfig } from 'postgresConfig.ts';
import { Client } from 'pg';

async function connectToPostgres(config: PostgresConfig) {
  const postgresClient = new Client({
    host: postgresConfig.PG_HOST,
    port: postgresConfig.PG_PORT,
  });

  await postgresClient.connect();
  return postgresClient;
}
```

```env
# .env

PG_HOST=localhost
PG_PORT=5432
```
