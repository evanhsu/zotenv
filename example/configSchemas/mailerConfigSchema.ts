import { z } from 'zod';

export const mailerConfigSchema = z.object({
  MAIL_FROM: z.string(),
  MAIL_DOMAIN: z.string(),
  MAIL_API_KEY: z.string(),
});

export type MailerConfig = z.infer<typeof mailerConfigSchema>;
