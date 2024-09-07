// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as ActivityService from "../services/ActivityService.js";

const Index = async (req, res) => {
  const result = await ActivityService.getActivities();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay actividades",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener la actividad",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await ActivityService.createActivity(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Actividad: ${req.body.act_name} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la actividad`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await ActivityService.getActivity(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad`,
      sqlMessage: "No se encontró la actividad",
    });
  }
};

const Amend = async (req, res) => {
  const result = await ActivityService.updateActivity(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Actividad actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la actividad`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la actividad",
    });
  }
};

const Delete = async (req, res) => {
  const result = await ActivityService.deleteActivity
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Actividad eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad`,
      sqlMessage: "No se encontró la actividad",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
