// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as RoomService from "../services/RoomService.js";

const Index = async (req, res) => {
  const result = await RoomService.getRooms();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay Habitaciones",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las Habitaciones",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await RoomService.createRoom(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Habitacion: ${req.body.room_code} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la Habitacion`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await RoomService.getRoom(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener la Habitacion`,
      sqlMessage: "No se encontró la Habitacion",
    });
  }
};

const Amend = async (req, res) => {
  const result = await RoomService.updateRoom(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Habitacion actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la Habitacion`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la Habitacion",
    });
  }
};

const Delete = async (req, res) => {
  const result = await RoomService.deleteRoom(req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Habitacion eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener la Habitacion`,
      sqlMessage: "No se encontró la Habitacion",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
