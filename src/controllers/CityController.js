// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as CityService from "../services/CityService.js";

const Index = async (req, res) => {
  const result = await CityService.getCities();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay ciudades",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json({
      status: true,
      data: result,
    });
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de ciudades",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await CityService.createCity(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Ciudad: ${req.body.city_name} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la ciudad`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await CityService.getCity(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener la ciudad`,
      sqlMessage: "No se encontró la ciudad",
    });
  }
};

const Amend = async (req, res) => {
  const result = await CityService.updateCity(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Ciudad actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la ciudad`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la ciudad",
    });
  }
};

const Delete = async (req, res) => {
  const result = await CityService.deleteCity
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Ciudad eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener la ciudad`,
      sqlMessage: "No se encontró la ciudad",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
