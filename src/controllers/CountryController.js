// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as CountryService from "../services/CountryService.js";

const Index = async (req, res) => {
  const result = await CountryService.getCountries();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay países",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener los países",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await CountryService.createCountry(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Pais: ${req.body.coun_name} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear el pais`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await CountryService.getCountry(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener el pais`,
      sqlMessage: "No se encontró el pais",
    });
  }
};

const Amend = async (req, res) => {
  const result = await CountryService.updateCountry(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Pais actualizado correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar el pais`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró el pais",
    });
  }
};

const Delete = async (req, res) => {
  const result = await CountryService.deleteCountry(req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `pais eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener el pais`,
      sqlMessage: "No se encontró el pais",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
