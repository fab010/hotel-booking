"use server";

import { z } from "zod";
import { RegisterSchema } from "@/lib/schemas";
import connectToDb from "@/lib/db";
import User from "@/models/user";
import { auth } from "@/auth";


export const getUserByEmail = async (email: string) => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return null;
  }
};

export const saveUserProfile = async (name: string, email: string) => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({
        name,
        email
      });
      await newUser.save();
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user?.id) {
      return null;
  }
  try {
    await connectToDb();
    const user = await User.findById(session.user.id).select("-password");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
};


export const register = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { firstName, lastName, email, password } = validatedFields.data;
  try {
    await connectToDb();

    const user = await User.findOne({ email });
    if (user) {
      return { error: "User already exists!" };
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    return { success: "Registration Success!" };
  }
  catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }

};
