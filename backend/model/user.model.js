import { model, Schema } from "mongoose";

const userSchema = new Schema({
  fullName: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
});

const User = model("User", userSchema);
export default User;
