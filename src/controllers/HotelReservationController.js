// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelReservationService from "../services/HotelReservationService.js";

const Index = async (req, res) => {
  const result = await HotelReservationService.getHotelReservations();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay Reservaciones de hotel",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las Reservaciones de hotel",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelReservationService.createHotelReservation(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Reserva de hotel añadido correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear las Reservaciones de hotel`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelReservationService.getHotelReservation(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener las Reservaciones de hotel`,
      sqlMessage: "No se encontró las Reservaciones de hotel",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelReservationService.updateHotelReservation(
    req.params.id,
    req.body
  );

  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Reserva de hotel actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar las Reservaciones de hotel`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró las Reservaciones de hotel",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelReservationService.deleteHotelReservation(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(
      result.message
        ? { status: false, message: result.message }
        : {
            status: true,
            message: `Reservacion de hotel eliminado correctamente`,
            data: result,
          }
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener las Reservaciones de hotel`,
      sqlMessage: "No se encontró las Reservaciones de hotel",
    });
  }
};

const getHotelsByCity = async (req, res) => {
  const result = await HotelReservationService.getHotelsByCity(
    req.params.id
  );
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay Hoteles en esta ciudad"    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las Hoteles en esta ciudad",
      sqlMessage: result.sqlMessage,
    });
  }
};

const getHotelReservationsByUser = async (req, res) => {
  const result = await HotelReservationService.getHotelReservationsByUser(
    req.params.id
  );
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay Reservaciones de hotel para este usuario",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json({
      status: true,
      data: result,
    });
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de Reservaciones de hotel",
      sqlMessage: result.sqlMessage,
    });
  }

}

export { Index, Store, Amend, Show, Delete, getHotelsByCity, getHotelReservationsByUser };
