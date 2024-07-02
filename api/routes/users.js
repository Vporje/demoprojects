import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

//verifying the token and assign the user a property named as user which will have payload object attached while signing the token 
// router.get("/verifyAuthentication", verifyToken, (request, response, next)=>{
//     response.send("Hello user, you are logged in successfully")
// })

// // while deleting or updating the user
// router.get("/checkUser/:id", verifyUser, (request, response, next)=>{
//     response.send("Hello user, you are logged in successfully and you can delete your account")
// })

// router.get("/checkAdmin/:id", verifyAdmin, (request, response, next)=>{
//     response.send("Hello Admin, you are logged in successfully and you can delete all accounts")
// })

//Get user
router.get("/:id", verifyUser, getUser)

//Get all Users
router.get("/", verifyAdmin, getUsers)

//Update User
router.put("/:id", verifyUser, updateUser)

//Delete User
router.delete("/:id", verifyUser, deleteUser)

export default router;  