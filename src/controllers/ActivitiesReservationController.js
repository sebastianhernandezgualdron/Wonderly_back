// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as ActivitiesReservationService from "../services/ActivitiesReservationService.js";

const Index = async (req, res) => {
  const result = await ActivitiesReservationService.getActivitiesReservations();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay actividades reservadas",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de actividades reservadas",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await ActivitiesReservationService.createActivityReservation(
    req.body
  );

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Actividad reservada registrada correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la actividad reservada`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await ActivitiesReservationService.getActivityReservation(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad reservada`,
      sqlMessage: "No se encontró la actividad reservada",
    });
  }
};

const Amend = async (req, res) => {
  const result = await ActivitiesReservationService.updateActivityReservation(
    req.params.id,
    req.body
  );
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Actividad reservada actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la actividad reservada`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la actividad reservada",
    });
  }
};

const Delete = async (req, res) => {
  const result = await ActivitiesReservationService.deleteActivityReservation(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(
      result.message
        ? { status: false, message: result.message }
        : {
            status: true,
            message: `Actividad reservada eliminado correctamente`,
            data: result,
          }
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener la actividad reservada`,
      sqlMessage: "No se encontró la actividad reservada",
    });
  }
};

const getActivitiesReservationsByUser = async (req, res) => {
  const result =
    await ActivitiesReservationService.getActivitiesReservationsByUser(
      req.params.id
    );
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay actividades reservadas",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de actividades reservadas",
      sqlMessage: result.sqlMessage,
    });
  }
};

export { Index, Store, Amend, Show, Delete, getActivitiesReservationsByUser };
