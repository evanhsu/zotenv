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

import { loadEnv } from '../src/index';

/**
 * It's recommended that you write the Schema definition for each Config
 * object in a separate module. It's helpful to have the module export a
 * Zod Schema and also a Typescript Type alias like this.
 */
import {
  PostgresConfig,
  postgresConfigSchema,
} from './configSchemas/postgresConfigSchema';

import {
  MailerConfig,
  mailerConfigSchema,
} from './configSchemas/mailerConfigSchema';

/**
 * Calling 'loadEnv()' will load and validate the values from your .env file
 * that are part of the mailer config schema. Notice in the log output that
 * the Postgres env vars (e.g. PG_HOST, PG_PORT) aren't included in the mailerConfig
 * object, even though they're defined in the same .env file.
 */
const mailerConfig = loadEnv(mailerConfigSchema, {
  path: './example/.env',
  debug: true,
});
console.log(
  'These values were loaded into the "mailerConfig" from your .env file and validated using the mailerConfigSchema:'
);
console.dir(mailerConfig);

const postgresConfig = loadEnv(postgresConfigSchema, {
  path: './example/.env',
});
console.log(
  'These values were loaded into the "postgresConfig" from your .env file and validated using the postgresConfigSchema:'
);
console.dir(postgresConfig);

/**
 * This function demonstrates how the PostgresConfig type can be used to
 */
function demonstrateStrongTypes(
  pgConfig: PostgresConfig,
  mailApiKey: MailerConfig['MAIL_API_KEY']
) {
  console.log(
    `\nNotice the strong typing on the config objects:\n`,
    `My PG_HOST is ${pgConfig.PG_HOST}, and the MAIL_API_KEY is ${mailApiKey}\n`
  );
}

/**
 * Try changing the function arguments to verify that the types are enforced.
 * You could try changing the first argument to 'mailerConfig' instead of the 'postgresConfig'.
 */
demonstrateStrongTypes(postgresConfig, mailerConfig.MAIL_API_KEY);
