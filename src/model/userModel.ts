import mongoose, { Schema } from "mongoose"

export interface UserAttributes {
  email: string;
  firstName: string;
  userName: string;
  password: string;
}
 

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id,
          delete ret._id,
          delete ret.password,
          delete ret.__v;
      },
    },
  }
);

const User = mongoose.model<UserAttributes>("User", UserSchema);
export default User;