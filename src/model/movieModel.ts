import mongoose, { Schema } from "mongoose"
import { UserAttributes } from "./userModel";

export interface MovieAttributes {
  title: string;
  description: string;
  image: string;
  price: number;
  userId: UserAttributes | any;
}


const MovieSchema = new Schema (
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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

const Movie = mongoose.model<MovieAttributes>("Movie", MovieSchema);

export default Movie;

