import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: mysql.Connection | undefined;
};

export const client =
  globalForDb.client ??
  (await mysql.createConnection({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
  }));
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
