import type { Config } from "drizzle-kit"
import createJITI from 'jiti'
import { env } from "./env";
const jiti = createJITI(new URL(import.meta.url).pathname);

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti("./env");

export default {
    driver: 'pg',
    schema: './lib/db/schema.ts',
    dbCredentials: {
        connectionString: env.POSTGRES_URL,
    }
} satisfies Config;
