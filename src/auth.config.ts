import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig  } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "@/lib/schemas";
import connectToDb from "@/lib/db";
import User from "@/models/user";
// import { getUserByEmail } from "@/lib/actions/user.action";

const getUserByEmail = async (email: string) => {
    try {
      await connectToDb();
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      return null;
    }
  };

export default {
    providers: [
        GitHub,
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { 
              token.id = user.id;
            }
            return token;
          },
          session({ session, token }) {
            if(token) {
                session.user.id = token.id as string;
            }
            return session;
          },
    },

} satisfies NextAuthConfig