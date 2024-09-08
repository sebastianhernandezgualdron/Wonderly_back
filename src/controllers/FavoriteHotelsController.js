// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as FavoriteHotelsService from "../services/FavoriteHotelsService.js";

const Index = async (req, res) => {
  const result = await FavoriteHotelsService.getFavoriteHotels();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles favoritos",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las hoteles favoritos",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await FavoriteHotelsService.createFavoriteHotel(
    req.body
  );

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Hotel favorito añadido correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear las hoteles favoritos`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await FavoriteHotelsService.getFavoriteHotel(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener las hoteles favoritos`,
      sqlMessage: "No se encontró las hoteles favoritos",
    });
  }
};

const Amend = async (req, res) => {
  const result = await FavoriteHotelsService.updateHotelCityService(
    req.params.id,
    req.body
  );
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Hotel Favorito actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar las hoteles favoritos`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró las hoteles favoritos",
    });
  }
};

const Delete = async (req, res) => {
  const result = await FavoriteHotelsService.deleteFavoriteHotel(
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
      message: `Error al obtener las hoteles favoritos`,
      sqlMessage: "No se encontró las hoteles favoritos",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
