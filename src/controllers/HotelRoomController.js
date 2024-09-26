// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelRoomService from "../services/HotelRoomService.js";

const Index = async (req, res) => {
  const result = await HotelRoomService.getHotelRooms();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay habitaciones en hoteles",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las habitaciones en hoteles",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelRoomService.createHotelRoom(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Habitacion en hotel creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear las habitaciones en hoteles`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelRoomService.getHotelRoom(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json({data:result});
  } else {
    return res.status(400).json({
      message: `Error al obtener las habitaciones en hoteles`,
      sqlMessage: "No se encontró las habitaciones en hoteles",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelRoomService.updateHotelRoom(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Habitacion en hotel actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar las habitaciones en hoteles`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró las habitaciones en hoteles",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelRoomService.deleteHotelRoom
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Habitacion en hotel eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener las habitaciones en hoteles`,
      sqlMessage: "No se encontró las habitaciones en hoteles",
    });
  }
};

const findHotelsRooms = async (req, res) => {

  const result = await HotelRoomService.findHotelsRooms(req.body);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener las habitaciones en hoteles`,
      sqlMessage: "No se encontró las habitaciones en hoteles",
    });
  }

}

export { Index, Store, Amend, Show, Delete, findHotelsRooms };
