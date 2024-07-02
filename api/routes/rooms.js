import express from "express";
import {
  createRoom,
  deleteRoom,
  updateRoom,
  getRoom,
  getRooms,
  updateAvailabilityRoom,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CRUD operations
//CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

//PUT, UPDATE
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateAvailabilityRoom);

//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

export default router;
