import { createError } from "../utils/error.js";
import Room from "./../models/Room.js";
import Hotel from "./../models/Hotel.js";

//Create Room
export const createRoom = async (request, response, next) => {
  const hotelId = request.params.hotelId;
  const newRoom = new Room(request.body);

  try {
    //Saving the new Room
    const savedRoom = await newRoom.save();
    try {
      //Pushing the created room into a hotel whose id is passed to URL
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });

      response.status(201).json(savedRoom);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

//Get Room "GET"
export const getRoom = async (request, response, next) => {
  try {
    const getRoom = await Room.findById(request.params.id);
    response.status(200).json({
      status: "success",
      message: {
        data: getRoom,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Update Room "PUT"
export const updateRoom = async (request, response, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    return response.status(200).json({
      status: "success",
      message: {
        data: updateRoom,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Update availabilityRoom "PUT"
export const updateAvailabilityRoom = async (request, response, next) => {
  try {
    //updating rooms
    await Room.updateOne({"roomNumbers._id":request.params.id},{
      $push:{
        //below is one of the way of updating nested properties
        "roomNumbers.$.nonAvailabilityRooms":request.body.dates,  
      },
    })
    
    response.status(200).json("Room status has been updated.");
  } catch (error) {
    next(error);
  }
};

//Delete Room "DELETE"
export const deleteRoom = async (request, response, next) => {
  const hotelId = request.params.hotelId;
  try {
    await Room.findByIdAndDelete(request.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: request.params.id }, //$pull operator is used to remove item from an array without without having to retrieve and modify the entire document.
      });

      response.status(200).json({
        status:"success",
        message:"Room deleted"
      });
    } catch (error) {
      next(error);
    }
    response.status(200).json({
      status: "success",
      message: `Hotel with id ${request.params.id} deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

//Get all Rooms "GET"
export const getRooms = async (request, response, next) => {
  try {
    const getAllRooms = await Room.find();
    response.status(200).json({
      status: "success",
      message: {
        data: getAllRooms,
      },
    });
  } catch (error) {
    next(error);
  }
};
