import { model, Schema } from "mongoose";
import argon2 from "argon2";
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const hashedPassword = await argon2.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    console.log(error);
  }
};
const User = model("User", userSchema);
export default User;
