import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { model, Model, Schema, Types } from "mongoose";
import { env } from "../env";

// Type definition for the User model
type User = {
  name: string;
  email: string;
  password: string;
  emailverified: boolean;
  image?: string;
  shortlist: Types.ObjectId[];
};

// Define the type for the user methods
type UserMethods = {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateVerificationToken(): Promise<string>;
  generateResendToken(): Promise<string>;
};

// Define the type for the User model
type UserModel = Model<User, {}, UserMethods>;

// Define the schema
const UserSchema = new Schema<User, UserModel, UserMethods>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    emailverified: { type: Boolean, default: false },
    image: String,
    shortlist: [{ type: Schema.Types.ObjectId, ref: "Media" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  if (user.isModified("password")) {
    try {
      user.password = await hash(user.password, 10);
      return next();
    } catch (error) {
      if (error instanceof Error) return next(error);
      else next(new Error("An error occurred while hashing the password"));
    }
  }
});

// Provide a method to compare passwords
UserSchema.method(
  "comparePassword",
  async function (candidatePassword: string) {
    const user = this as User;
    return compare(candidatePassword, user.password);
  }
);

// Provide a method to generate a verification token
UserSchema.method("generateVerificationToken", async function () {
  const user = this as User;
  if (user.emailverified) throw new Error("Email already verified");

  return jwt.sign({ email: user.email }, env.JWT_SECRET, {
    expiresIn: "10m",
  });
});

// Provide a method to generate a resend token
UserSchema.method("generateResendToken", async function () {
  const user = this as User;
  if (user.emailverified) throw new Error("Email already verified");

  return jwt.sign({ email: user.email }, env.JWT_SECRET);
});

// Define the model
const User = model<User, UserModel>("User", UserSchema);

// Define the model
export default User;
