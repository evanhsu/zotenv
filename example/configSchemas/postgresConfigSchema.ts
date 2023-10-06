import { z } from "zod";

export const postgresConfigSchema = z.object({
  PG_HOST: z.string(),
  // Use Zod's .coerce helper for numeric values, since all .env values are interpreted as strings
  PG_PORT: z.coerce.number().gte(1024).lte(65535).default(5432),
});

export type PostgresConfig = z.infer<typeof postgresConfigSchema>;
