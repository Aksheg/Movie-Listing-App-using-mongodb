"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = exports.AddMovie = void 0;
const movieModel_1 = __importDefault(require("../model/movieModel"));
const AddMovie = async (req, res) => {
    try {
        const verified = req.user;
        // const id = uuidv4()
        // const { title, description, image, price } = req.body
        const movie = new movieModel_1.default({
            ...req.body,
            userId: verified.id
        });
        await movie.save();
        return res.status(201).json({
            msg: "You have successfully added a movie",
            movie
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.AddMovie = AddMovie;
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
const getMovies = async (req, res) => {
    try {
        const getAllMovies = await movieModel_1.default.find({
        // limit:limit,
        // offset:offset
        });
        // return res.render("layout", {movielist: getAllMovies})
        return res.status(200).json({
            msg: "You have successfully gotten all movies",
            getAllMovies
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getMovies = getMovies;
