import { Schema, model } from "mongoose";
interface Account {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  isGuest: boolean;
  contact: string;
  avatarUrl: string;
}

const accountSchema = new Schema<Account>(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isGuest: { type: Boolean, required: true, default: false },
    contact: { type: String },
    avatarUrl: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dueldevdc/image/upload/v1674442128/magic-ball_o0emaj.png",
    },
  },
  { timestamps: true }
);

const Account = model<Account>("Account", accountSchema);

export default Account;
