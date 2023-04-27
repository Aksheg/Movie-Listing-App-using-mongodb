import { Request, Response } from "express";
import User from "../model/userModel";
import { v4 as uuidv4 } from "uuid";
import { registerUserSchema, options, loginUserSchema } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Movie  from "../model/movieModel";

const jwtsecret = process.env.JWT_SECRET as string;

/* ======================USER API============================*/
// export const Register = async (req: Request, res: Response) => {
//   try {
//     const { email, firstName, userName, password, confirm_password } = req.body;
//     // Validate with Joi or Zod
//     const validationResult = registerUserSchema.validate(req.body, options);

//     if (validationResult.error) {
//       return res
//         .status(400)
//         .json({ Error: validationResult.error.details[0].message});
//     }

//     // Hash password
//     const passwordHash = await bcrypt.hash(password, 8);

//     // Create user
//     // -check if user exist
//     const user = await User.findOne({
//       email,
//     });

//     if (!user) {
//       let newUser = new User({
//         email,
//         firstName,
//         userName,
//         password: passwordHash,
//       });
//       await newUser.save()

//       // Generate token for user
//       const user = (await User.findOne({
//         email,
//       })) as unknown as { [key: string]: string };

//       const { id } = user;

//       const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30mins" });

//     //   res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})

//       // otp

//       // Email

//       return res.status(201).json({
//         msg: "user created successfully",
//         newUser,
//         token,
//       });

//     }

//     res.status(409).json({
//         error:"email already taken"
//     })

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ Error: "Internal server error" });
//   }
// };

// // export const Login = async (req: Request, res: Response) => {
// //   try {
// //     const { email, password } = req.body;
// //     // Validate with Joi or Zod
// //     const validationResult = loginUserSchema.validate(req.body, options);

// //     if (validationResult.error) {
// //       return res
// //         .status(400)
// //         .json({ Error: validationResult.error.details[0].message});
// //     }

// //     const User = (await UserInstance.findOne({
// //       where: { email: email },
// //     })) as unknown as { [key: string]: string };

// //     const { id } = User;

// //     const token = jwt.sign({ id }, jwtsecret, { expiresIn: "30d" });

// //     // res.cookie('token', token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})

// //     const validUser = await bcrypt.compare(password, User.password);

// //     if (validUser) {
// //       return res.status(201).json({
// //         msg: "You have successfully logged in",
// //         User,
// //         token,
// //       });
// //     }

// //     return res.status(400).json({Error:"Invalid email/password"})
    
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ Error: "Internal server error" });
// //   }
// // };


// export const Login = async (req: Request, res: Response) => {
//   try {
//       const {email, password} = req.body;
//       //validate with Joi 
//       const validationResult = loginUserSchema.validate(req.body, options)

//       if(validationResult.error){
//           return res.status(400).json({error: validationResult.error.details[0].message})
//       }
      
//       const user = await User.findOne({
//        email,
//       }) as unknown as {[key : string]:string}

//       if (!User) {
//           return res.status(400).json({error:"Invalid email/password"})
//       }

//       const {id} = user

//       const token = jwt.sign({id}, jwtsecret, {expiresIn:"30d"})
//       res.cookie("token", token, {httpOnly: true, maxAge:30 * 24 * 60 * 60 * 1000})

//       const validUser = await bcrypt.compare(password, user.password)

//       if(validUser){
//           return res.status(201).json({
//               message: "User logged in successfully",
//               user,
//               token
//           })
//       }

//       return res.status(400).json({error:"Invalid email/password"})
//   } catch (error) {
//       console.log(error)
//   }
// }


// export const getUserAndMovie = async(req:Request, res:Response)=>{
//     try {
//     // sequelize findAll or findAndCountAll

//     const getAllUser = await User.find({
   
//     });

//     return res.status(200).json({
//         msg: "You have successfully retrieved all data",
//     //     count: getAllUser.count,
//     //     movie: getAllUser.rows
//         getAllUser
//     })
//     } catch (error) {
//         console.log(error)
//     }
// }



/* =========================EJS API===========================*/

export const Register = async (req: Request, res: Response) => {
    try {
      const { email, firstName, userName, password, confirm_password } = req.body;

      // Validate with Joi or Zod
      const validationResult = registerUserSchema.validate(req.body, options);
  
      if (validationResult.error) {
        return res.render("Register", {error: validationResult.error.details[0].
        message})
      }
  
      // Hash password
      const passwordHash = await bcrypt.hash(password, 8);
  
      // Create user
      // -check if user exist
      const user = await User.findOne({
       email,
      });
  
      if (!user) {
        let newUser = new User({
          email,
          firstName,
          userName,
          password: passwordHash,
        });

        await newUser.save()
  
        // Generate token for user
        const user = (await User.findOne({
          email,
        })) as unknown as { [key: string]: string };
  
        const { _id } = user;
  
        const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "30mins" });
  
        // res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})
  
        // otp
  
        // Email
  
        return res.redirect("/login")
      }
  
     return res.render("Register", {error:"email is already taken"})
  
    } catch (error) {
      console.log(error);
    }
  };
  
  export const Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      // Validate with Joi or Zod
      const validationResult = loginUserSchema.validate(req.body, options);
  
      if (validationResult.error) {
        return res.render("Login", {error:validationResult.error.details[0].message})
      }
  
      const user = await User.findOne({
        email,
      })
    
      

      if (!user) {
        res.render("login", {error:"Invalid email/password"})
      }
    
  
      const token = jwt.sign({ id:user?._id}, jwtsecret, { expiresIn: "30d" });
  
  
       res.cookie('token', token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})
  
      const validUser = await bcrypt.compare(password, user?.password || "");
  
      if (validUser) {
        return res.redirect('/dashboard')
      }
  
      res.render("Login", {error:"Invalid email/password"})
      
    } catch (error) {
      console.log(error);
    //   res.status(500).json({ Error: "Internal server error" });
    }
  };



  // import { ObjectId } from "mongoose";

// import { ObjectId } from "mongodb";

// export const Login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     // Validate with Joi or Zod
//     const validationResult = loginUserSchema.validate(req.body, options);

//     if (validationResult.error) {
//       return res.render("Login", { error: validationResult.error.details[0].message });
//     }

//     const userId = req.params.id;
//     if (!ObjectId.isValid(userId)) {
//       return res.render("Login", { error: "Invalid user ID" });
//     }

//     const user = await User.findOne({
//       _id: new ObjectId(userId),
//     });

//     if (!user) {
//       return res.render("Login", { error: "Invalid email/password" });
//     }

//     const validPassword = await bcrypt.compare(password, user?.password || "");

//     if (validPassword) {
//       const token = jwt.sign({ id: user?.id }, jwtsecret, { expiresIn: "30d" });

//       res.cookie("token", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

//       return res.redirect("/dashboard");
//     }

//     res.render("Login", { error: "Invalid email/password" });

//   } catch (error) {
//     console.log(error);
//     // res.status(500).json({ Error: "Internal server error" });
//   }
// };

  
  
  export const getUserAndMovie = async(req:Request, res:Response)=>{
      try {
      // sequelize findAll or findAndCountAll
  
      const getAllUser = await User.find({
          include:[{
              model:Movie,
              as:"movie"
          }]
      });
  
      return res.status(200).json({
          msg: "You have successfully retrieved all data",
          // count: getAllUser.count,
          // movie: getAllUser.rows
      })
      } catch (error) {
          console.log(error)
      }
  }


  export const Logout = async (req:Request, res:Response) => {
    
    res.clearCookie('token');
    res.redirect('/login')
}


