import { Request, Response } from "express"
import {v4 as uuidv4} from 'uuid'
import Movie from "../model/movieModel"
import { options, updateMovieSchema } from "../utils/utils";
import mongoose from 'mongoose'

export const AddMovie = async (req: Request | any, res:Response) => {   
    try {
        const verified = req.user;

        // const id = uuidv4()
        // const { title, description, image, price } = req.body

        const movie = new Movie({
            ...req.body,
            userId: verified.id
        })

        await movie.save()
        
        return res.status(201).json({
            msg: "You have successfully added a movie",
            movie
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Internal server error" });
    }
}

// export const AddMovie = async (req: Request | any, res:Response) => {   
//     try {
//         const verified = req.user;

//         // Generate a new ObjectId
//         const movieId = new mongoose.Types.ObjectId();

//         const movie = new Movie({
//             ...req.body,
//             _id: movieId, // Use a different field name for the _id field
//             userId: verified.id // Store the user ID in a different field
//         })

//         await movie.save()
        
//         return res.status(201).json({
//             msg: "You have successfully added a movie",
//             movie
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: "Internal server error" });
//     }
// }


export const getMovies = async(req:Request, res:Response) => {
    try {


    const getAllMovies = await Movie.find({
        // limit:limit,
        // offset:offset
    });

    // return res.render("layout", {movielist: getAllMovies})
    return res.status(200).json({
        msg: "You have successfully gotten all movies",
        getAllMovies
    })

    } catch (error) {
        console.log(error)
    }
}

