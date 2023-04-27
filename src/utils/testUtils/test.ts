import User from "../../model/userModel";
import { dbConnect, dbDisconnect, dbDropCollection } from "./testUtils";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import Movie from "../../model/movieModel";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("User Model Test Suite", () => {
  test("should create a User data successfully", async () => {
    const UserData = {
      email: "segun@gmail.com",
      firstName: "Segun",
      userName: "Shegs",
      password: "1234",
    };
    
    const newUserData = new User(UserData);
    await newUserData.save();
    expect(newUserData._id).toBeDefined();
    expect(newUserData.email).toBe(UserData.email);
    expect(newUserData.firstName).toBe(UserData.firstName);
    expect(newUserData.userName).toBe(UserData.userName);
    expect(newUserData.password).toBe(UserData.password);
  });

  test("should fail for User data without email field", async () => {
    const invalidUserData = {
      userName: "Shegs",
      password: "1234",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.email).toBeDefined();
    }
  });

  test("should fail for User data without username and password fields", async () => {
    const invalidUserData = {
      email: "segun@gmail.com",
      firstName: "Segun",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.userName).toBeDefined();
      expect(err.errors?.password).toBeDefined();
    }
  });

  test("should fail for User data without firstname field", async () => {
    const invalidUserData = {
      email: "segun@gmail.com",
      userName: "Shegs",
      password: "1234",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.firstName).toBeDefined();
      expect(err.errors?.email).toBeUndefined();
    }
  });
});

describe("Movie Model Test Suite", () => {
  test("should create a Movie data successfully", async () => {
    const MovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "The Walking Dead",
      description: "It is very Interesting",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
      price: 2000,
    };

    const newMovieData = new Movie({
      userId: new mongoose.Types.ObjectId(MovieData.userId),
      title: MovieData.title,
      description: MovieData.description,
      image: MovieData.image,
      price: MovieData.price,
    });

    await newMovieData.save();

    expect(newMovieData._id).toBeDefined();
    expect(newMovieData.userId).toEqual(MovieData.userId);
    expect(newMovieData.title).toEqual(MovieData.title);
    expect(newMovieData.description).toEqual(MovieData.description);
    expect(newMovieData.image).toEqual(MovieData.image);
    expect(newMovieData.price).toEqual(MovieData.price);
  });

  test("should fail for Movie data without required fields", async () => {
    const invalidMovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "The Walking Dead",
      description: "It is very Interesting",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
      price: 2000,
    };

    try {
      const newMovieData = new Movie(invalidMovieData);
      await newMovieData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.userId).toBeDefined();
    }
  });

  test("should update a Movie successfully", async () => {
    const newMovieData = {
        userId: new mongoose.Types.ObjectId(),
        title: "The Walking Dead",
        description: "A thrilling TV show",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
        price: 2000,
    };
    const createdMovie = await Movie.create(newMovieData);

    const updatedData = {
        title: "The Walking Dead - Updated",
        description: "Updated description",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
        price: 2500,
    };

    const updatedMovie = await Movie.findByIdAndUpdate(createdMovie._id, updatedData, { new: true });

    expect(updatedMovie).not.toBeNull();
    expect(updatedMovie?.userId).toEqual(newMovieData.userId);
    expect(updatedMovie?.title).toEqual(updatedData.title);
    expect(updatedMovie?.description).toEqual(updatedData.description);
    expect(updatedMovie?.image).toEqual(updatedData.image);
    expect(updatedMovie?.price).toEqual(updatedData.price);
});


test("should fail to update a non-existent Movie", async () => {
  const nonExistentMovieId = new mongoose.Types.ObjectId();
  const updatedData = {
      title: "The Walking Dead - Updated",
      description: "Updated description",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
      price: 2500,
  };

  const updatedMovie = await Movie.findByIdAndUpdate(nonExistentMovieId, updatedData);

  expect(updatedMovie).toBeNull();
});



  test("should delete a Movie successfully", async () => {
    const MovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "The Walking Dead",
      description: "It is very Interesting",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwall.alphacoders.com%2Fby_sub_category.php%3Fid%3D146203%26name%3DThe%2BWalking%2BDead%2BWallpapers&psig=AOvVaw3eMkZB-xWZ9rTzrqAciy7J&ust=1682378335381000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKj3mOqRwf4CFQAAAAAdAAAAABAJ",
      price: 2000,
    };

    const newMovieData = new Movie({
      userId: new mongoose.Types.ObjectId(MovieData.userId),
      title: MovieData.title,
      description: MovieData.description,
      image: MovieData.image,
      price: MovieData.price,
    });

    await newMovieData.save();

    const deleteResult = await Movie.deleteOne({ _id: newMovieData._id });

    expect(deleteResult.deletedCount).toEqual(1);
  });

  test("should fail to delete a non-existent Movie", async () => {
    const nonExistentMovieId = new mongoose.Types.ObjectId();
    const deleteResult = await Movie.deleteOne({ _id: nonExistentMovieId });

    expect(deleteResult.deletedCount).toEqual(0);
  });
});
