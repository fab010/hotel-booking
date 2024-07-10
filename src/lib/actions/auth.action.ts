"use server";

import * as z from "zod";
import { signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/schemas";
import { getUserByEmail } from "@/lib/actions/user.action";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;


  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Wrong credentials!" };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
  });

};

export const handleLogout = async () => {
  await signOut({
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
  
};


