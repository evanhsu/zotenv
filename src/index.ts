import { config, DotenvConfigOptions } from "dotenv";
import { AnyZodObject, z } from "zod";

/**
 * Loads values from the .env file and validates them using the provided Zod schema.
 * Only values defined in the Zod schema will be returned from this function, even
 * if the .env file includes additional values.
 *
 * @throws Error
 */
function loadEnv<T extends AnyZodObject = AnyZodObject>(
  envSchema: T,
  loadOptions?: DotenvConfigOptions
) {
  // Read the entire env file.  Any keys that aren't included in the provided 'envSchema' will
  // be stripped out of the return value from this function below where we call Zod.parse()
  const rawEnv = config(loadOptions ?? {});
  if (typeof rawEnv.error !== "undefined") {
    throw rawEnv.error;
  }

  let parsedEnv;
  try {
    parsedEnv = envSchema.parse({ ...rawEnv, ...process.env });
  } catch (error /* ZodError */) {
    const envPath = loadOptions?.path ?? ".env";
    throw new Error(
      `Invalid configuration loaded. Check these values in your ${envPath} file: ${error}`
    );
  }

  return parsedEnv as z.infer<typeof envSchema>;
}

export { loadEnv };
