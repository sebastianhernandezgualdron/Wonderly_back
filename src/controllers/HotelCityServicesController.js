// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelCityServicesService from "../services/HotelCityServicesService.js";

const Index = async (req, res) => {
  const result = await HotelCityServicesService.getHotelCityServices();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay servicios en hoteles",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener las servicios en hoteles",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelCityServicesService.createHotelCityService(
    req.body
  );

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Servicio en hotel creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear las servicios en hoteles`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelCityServicesService.getHotelCityService(
    req.params.id
  );
  if (result != null) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener las servicios en hoteles`,
      sqlMessage: "No se encontró las servicios en hoteles",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelCityServicesService.updateHotelCityService(
    req.params.id,
    req.body
  );
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Servicio en hotel actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar las servicios en hoteles`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró las servicios en hoteles",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelCityServicesService.deleteHotelCityService(
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
      message: `Error al obtener las servicios en hoteles`,
      sqlMessage: "No se encontró las servicios en hoteles",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
