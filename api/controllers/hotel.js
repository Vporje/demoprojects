import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//Create Hotel "POST"
export const createHotel = async (request, response, next) => {
  const newHotel = new Hotel(request.body);
  try {
    const savedHotel = await newHotel.save();
    return response.status(200).json({
      status: "success",
      message: {
        data: savedHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Get Hotel "GET"
export const getHotel = async (request, response, next) => {
  try {
    const getHotel = await Hotel.findById(request.params.id);
    response.status(200).json({
      status: "success",
      message: {
        data: getHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Update Hotel "PUT"
export const updateHotel = async (request, response, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );
    return response.status(200).json({
      status: "success",
      message: {
        data: updateHotel,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Delete Hotel "DELETE"
export const deleteHotel = async (request, response, next) => {
  try {
    await Hotel.findByIdAndDelete(request.params.id);
    response.status(200).json({
      status: "success",
      message: `Hotel with id ${request.params.id} deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
};

//Get all Hotels "GET"
export const getHotels = async (request, response, next) => {
  const { min, max, limit, ...others } = request.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min | 1, $lte: max || 1100 },
    }).limit(request.query.limit);
    response.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (request, response, next) => {
  const cities = request.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        //return Hotel.find({city:city}).length
        //above expression will return the count of each city from the Hotel collection, but being a lengthy process of finding the city in the collection and then count the length; we will use the mongoose query named as countDocuments
        return Hotel.countDocuments({ city: city });
      })
    );
    response.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (request, response, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cottageCount = await Hotel.countDocuments({ type: "Cottage" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });

    response.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Villa", count: villaCount },
      { type: "Cottage", count: cottageCount },
      { type: "Resort", count: resortCount },
      { type: "Apartment", count: apartmentCount },
    ]);
  } catch (error) {
    next(error);
  }
};

//Get hotel room
export const getHotelRooms = async (request, response, next) => {
  try {
    const hotel = await Hotel.findById(request.params.id);
    const listofRooms = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    response.status(200).json(listofRooms);
  } catch (error) {
    next(error);
  }
};
