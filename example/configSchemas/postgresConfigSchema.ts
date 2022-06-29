import { z } from 'zod';

export const postgresConfigSchema = z.object({
  PG_HOST: z.string(),
  PG_PORT: z.number().gte(1024).lte(65535).default(5432),
});

export type PostgresConfig = z.infer<typeof postgresConfigSchema>;
