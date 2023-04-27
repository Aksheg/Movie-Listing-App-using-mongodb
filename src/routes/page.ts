import express, { NextFunction, Response, Request } from "express";
import { auth } from "../middlewares/auth";
import { v4 as uuidv4 } from "uuid";
import Movie from "../model/movieModel";
import User from "../model/userModel";
import { options, updateMovieSchema } from "../utils/utils";
import movieModel from "../model/movieModel";
import mongoose from "mongoose";

const router = express.Router();

// Pages

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1; 
    const limit = 6;
    const skip = (page - 1) * limit; 

    const movieCount = await Movie.estimatedDocumentCount({}).maxTimeMS(30000)
    const totalPages = Math.ceil(movieCount / limit); // calculate total number of pages

    const getAllMovies = await Movie.find({}).skip(skip).limit(limit); 

  
    res.render("layout", {
      movielist: getAllMovies,
      currentPage: page,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null, 
      nextPage: page < totalPages ? page + 1 : null, 
    });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/", async (req: Request, res: Response) => {
//   try {
//     // const limit = req.query?.limit as number | undefined;
//     // const offset = req.query?.offset as number | undefined;
//     // sequelize findAll or findAndCountAll

//     // const getAllMovies = await MovieInstance.findAll();
//     const getAllMovies = await Movie.find({
//       // limit:limit,
//       // offset:offset
//     });

//     const movielist = getAllMovies.map((movie) => movie.toObject());
//     // console

//     return res.render("layout", { movielist: movielist || [] });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.render("Register");
});

//Display Home page
router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const { id } = req.user;

    const movie = (await Movie.find({ userId: id })) as unknown as any;

    return res.render("user", {
      movielist: movie,
      user: res.locals.user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.render("Login");
});

// api Create movie with ejs
router.post("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
    const verified = req.user;

    const movieRecord = new Movie({
      ...req.body,
      userId: verified.id,
    });

    await movieRecord.save();

    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});




// router.get("/dashboard/:id", auth, async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const record = await Movie.findByIdAndDelete({ id });
//     if (!record) {
//       return res.render("user", { error: "Cannot find any movie" });
//     }
//     // await record.destroy();
//     return res.redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/delete/:id", auth, async (req: Request | any, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await movieModel.findByIdAndRemove(id);

    if (!movie) {
      return res.render("Dashboard", { message: "Movie not found" });
    }

    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// export default router;

router.post("/update/:id", auth, async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { id } = req.params;
    // const { title, description, image, price } = req.body;
    const validationResult = updateMovieSchema.validate(req.body, options);

    if (validationResult.error) {
      res.render("Dashboard", {
        error: validationResult.error.details[0].message,
      });
    }

    const film = await movieModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
      },
      { new: true }
    );
    if (!film) {
      res.render("dashboard", { message: "Movie not found" });
    }
    await film?.save();
    return res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// router.post('/dashboard/:id', auth, async (req: Request | any, res: Response) => {
//   try {
//     const verified = req.user;

//     const movieId = req.body.id; // Extract the movie ID from the form data
//     const movieDataToUpdate = { // Extract the updated movie data from the form data
//       title: req.body.title,
//       description: req.body.description,
//       price: req.body.price
//     };

//     // Find the movie record by ID and user ID
//     const movieRecord = await MovieInstance.findOne({
//       where: { id: movieId, userId: verified.id }
//     });

//     if (movieRecord) {
//       // Update the movie record with the new data
//       movieRecord.title = movieDataToUpdate.title;
//       movieRecord.description = movieDataToUpdate.description;
//       movieRecord.price = movieDataToUpdate.price;

//       // Save the updated movie record
//       const updatedMovie = await movieRecord.save();

//       return res.redirect("/dashboard");
//     } else {
//       // Movie record not found, handle error
//       return res.status(404).json({ error: 'Movie not found' });
//       // ...
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// Get movie owned by a user
//    router.get('/dashboard', auth,  async(req:Request | any, res:Response)=>{
//     try{
//        const { id } = req.user
//        const {movie} = await UserInstance.findOne({where:{id}, include:{
//         model:MovieInstance,
//         as:"movie"
//        }}) as unknown as any

//        res.status(200).json(movie);

//        return res.render("Home", {
//         movielist :movie
//        })

//     }catch(err){
//      console.log(err)
//     }
//    } )

export default router;
