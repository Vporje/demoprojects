import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (request, response, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(request.body.password, salt);

    const newUser = new User({
      userName: request.body.username,
      email: request.body.email,
      password: hash,
    });
    await newUser.save();
    response.status(201).send("New user is created!");
  } catch (error) {
    next(error);
  }
};

export const login = async (request, response, next) => {
  try {
    const user = await User.findOne({ userName: request.body.username });
    if (!user) {
      return next(createError(404, "User not found."));
    }

    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username"));
    }
    //token is created using JWT when the logging in user is present in database and put a correct password; and this token will have an object which hold the id and isAdmin boolean value for performing various operations or for gettting accessed to the restricted resources which are only available to only logged in users.
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT
    );
    //object destructuring is done, to only pass some data in response which is used in react applications
    const { password, isAdmin, ...otherDetails } = user._doc;
    //Along with response, the token is sent, which will be stored in the client's end in the cookies or in local storage (here in cookies) when the user hits the login route successfully and this token will acts as an identity card all the which the user have to show to get access to the restricted resources.
    response
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        data: {
          details: { ...otherDetails },
        },
      });
  } catch (error) {
    next(createError());
  }
};
