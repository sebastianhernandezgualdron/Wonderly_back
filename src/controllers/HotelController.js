// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelService from "../services/HotelService.js";

const Index = async (req, res) => {
  const result = await HotelService.getHotels();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelService.createHotel(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Hotel: ${req.body.hot_name} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear el hotel`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelService.getHotel(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener el hotel`,
      sqlMessage: "No se encontró el hotel",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelService.updateHotel(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Hotel actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar el Hotel`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró el Hotel",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelService.deleteHotel(req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Hotel eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener el Hotel`,
      sqlMessage: "No se encontró el Hotel",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
