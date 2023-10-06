/**
 * This example demonstrates the recommended pattern for constructing
 * multiple "config" objects from the values in a single .env file.
 *
 * Run the example script with:
 *   npm run example
 *
 * Then read the docblocks in this example script to learn about some
 * of the usage features.
 */

import { loadEnv } from "../src/index";

/**
 * It's recommended that you write the Schema definition for each Config
 * object in a separate module. It's helpful to have the module export a
 * Zod Schema and also a Typescript Type alias like this.
 */
import {
  PostgresConfig,
  postgresConfigSchema,
} from "./configSchemas/postgresConfigSchema";

import {
  MailerConfig,
  mailerConfigSchema,
} from "./configSchemas/mailerConfigSchema";

/**
 * Calling 'loadEnv()' will load and validate the values from your .env file
 * that are part of the mailer config schema. Notice in the log output that
 * the Postgres env vars (e.g. PG_HOST, PG_PORT) aren't included in the mailerConfig
 * object, even though they're defined in the same .env file.
 */
const mailerConfig = loadEnv(mailerConfigSchema, {
  path: "./example/.env",
  debug: true,
});
console.log(
  'These values were loaded into the "mailerConfig" from your .env file and validated using the mailerConfigSchema:'
);
console.dir(mailerConfig);

/**
 * We're calling 'loadEnv()' a 2nd time here, but passing a different Zod schema.
 * Only the values included in the provided Zod schema will be extracted and validated
 * from the .env file, which in this case are the Postgres-related config values.
 */
const postgresConfig = loadEnv(postgresConfigSchema, {
  path: "./example/.env",
});
console.log(
  'These values were loaded into the "postgresConfig" from your .env file and validated using the postgresConfigSchema:'
);
console.dir(postgresConfig);

/**
 * This function demonstrates how the PostgresConfig type can be used to typehint specific config values
 * throughout your codebase.
 *
 * Try changing the the `PG_HOST` value to be something invalid in the .env file.
 */
function demonstrateStrongTypes(
  pgConfig: PostgresConfig,
  mailApiKey: MailerConfig["MAIL_API_KEY"]
) {
  console.log(
    `\nNotice the strong typing on the config objects:\n`,
    `My MAIL_API_KEY is ${mailApiKey} and the PG_PORT (currently ${pgConfig.PG_PORT}) should never be greater than 65535`
  );
}

/**
 * Try changing the function arguments to verify that the types are enforced.
 * You could try changing the first argument to 'mailerConfig' instead of the 'postgresConfig'.
 */
demonstrateStrongTypes(postgresConfig, mailerConfig.MAIL_API_KEY);
