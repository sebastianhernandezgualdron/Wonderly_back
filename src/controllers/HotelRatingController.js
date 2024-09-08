// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelRatingService from "../services/HotelRatingService.js";

const Index = async (req, res) => {
  const result = await HotelRatingService.getHotelRatings();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay Ratings",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las Ratings",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelRatingService.createHotelRating(
    req.body
  );

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Rating añadido correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear las Ratings`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelRatingService.getHotelRating(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener las Ratings`,
      sqlMessage: "No se encontró las Ratings",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelRatingService.updateHotelRating(
    req.params.id,
    req.body
  );
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Rating actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar las Ratings`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró las Ratings",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelRatingService.deleteHotelRating(
    req.params.id
  );
  if (result != 0) {
    return res.status(200).json(
      result.message
        ? { status: false, message: result.message }
        : {
            status: true,
            message: `Servicio en hotel eliminado correctamente`,
          }
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener las Ratings`,
      sqlMessage: "No se encontró las Ratings",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
