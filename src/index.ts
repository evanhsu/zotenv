import { config, DotenvConfigOptions } from 'dotenv';
import { AnyZodObject, z } from 'zod';

/**
 *
 * @throws Error
 */
function loadEnv<T extends AnyZodObject = AnyZodObject>(
  envSchema: T,
  loadOptions?: DotenvConfigOptions
) {
  const rawEnv = config(loadOptions ?? {});
  if (typeof rawEnv.error !== 'undefined') {
    throw rawEnv.error;
  }

  let parsedEnv;
  try {
    parsedEnv = envSchema.parse({ ...rawEnv, ...process.env });
  } catch (error /* ZodError */) {
    throw new Error(
      `Invalid configuration loaded. Check these values in your .env file: ${error}`
    );
  }

  return parsedEnv as z.infer<typeof envSchema>;
}

export { loadEnv };
