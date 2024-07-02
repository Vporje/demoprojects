import { createError } from "../utils/error.js";
import User from "./../models/User.js"

//Get User "GET"
export const getUser = async (request, response, next) => {
    try {
      const getUser = await User.findById(request.params.id);
      response.status(200).json({
        status: "success",
        message: {
          data: getUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

//Update User "PUT"
export const updateUser = async (request, response, next) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        request.params.id,
        { $set: request.body },
        { new: true }
      );
      return response.status(200).json({
        status: "success",
        message: {
          data: updateUser,
        },
      });
    } catch (error) {
        next(error);
      }
  }

//Delete User "DELETE"
export const deleteUser = async (request, response, next) => {
    try {
      await User.findByIdAndDelete(request.params.id);
      response.status(200).json({
        status: "success",
        message: `User with id ${request.params.id} deleted successfully!`,
      });
    } catch (error) {
      next(error)
    }
  }

//Get all Users "GET"
export const getUsers = async (request, response,next) => {
    try {
      const getAllUser = await User.find();
      response.status(200).json({
        status: "success",
        message: {
          data: getAllUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }