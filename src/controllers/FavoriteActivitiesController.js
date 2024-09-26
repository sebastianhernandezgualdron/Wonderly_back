// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as FavoriteActivitiesService from "../services/FavoriteActivitiesService.js";

const Index = async (req, res) => {
  const result = await FavoriteActivitiesService.getFavoriteActivities();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay actividades favoritas",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de actividades favoritas",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await FavoriteActivitiesService.createFavoriteActivity(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Actividad favorita añadida correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la actividad favorita`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await FavoriteActivitiesService.getFavoriteActivity(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad favorita`,
      sqlMessage: "No se encontró la actividad favorita",
    });
  }
};

const Amend = async (req, res) => {
  const result = await FavoriteActivitiesService.updateFavoriteActivity(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Actividad favorita actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la actividad favorita`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la actividad favorita",
    });
  }
};

const Delete = async (req, res) => {
  const result = await FavoriteActivitiesService.deleteFavoriteActivities
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Actividad favorita eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad favorita`,
      sqlMessage: "No se encontró la actividad favorita",
    });
  }
};

const FavoriteActivitiesByUser = async (req, res) => {
  const result = await FavoriteActivitiesService.getFavoriteActivitiesByUser(req.params.id);
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay actividades favoritas para este usuario",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json({
      status: true,
      data: result,
    });
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de actividades favoritas",
      sqlMessage: result.sqlMessage,
    });
  }
}

export { Index, Store, Amend, Show, Delete, FavoriteActivitiesByUser };
