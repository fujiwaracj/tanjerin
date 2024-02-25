import { User, Session } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from ".";

// @ts-ignore WIP
const handleValidateRequest = async (): Promise<{ user: User; session: Session; }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)

}

export const validateRequest = cache(handleValidateRequest)
