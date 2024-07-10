import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "@/types";

const userSchema = new mongoose.Schema<UserType>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.models?.User || mongoose.model<UserType>("User", userSchema);
export default User;
