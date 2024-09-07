// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelServicesService from "../services/HotelServicesService.js";

const Index = async (req, res) => {
  const result = await HotelServicesService.getHotelServices();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay servicios de Hotel",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener los servicios de Hotel",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelServicesService.createHotelService(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Servicio de hotel: ${req.body.hot_ser_name} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear el servicio de hotel`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelServicesService.getHotelService(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener el servicio de hotel`,
      sqlMessage: "No se encontró el servicio de hotel",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelServicesService.updateHotelService(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Servicio de hotel actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar el servicio de hotel`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró el servicio de hotel",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelServicesService.deleteHotelService(req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Servicio de hotel eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener el servicio de hotel`,
      sqlMessage: "No se encontró el servicio de hotel",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
