// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as personService from "../services/PersonService.js";

const Index = async (req, res) => {
  const persons = await personService.getPersons();
  if (persons == null) {
    return res.status(200).json({
      message: "No hay personas",
    });
  } else if (!persons.sqlMessage) {
    return res.status(200).json(
      persons == 0
        ? {status: false, message: `No se encontraron personas` }
        : persons
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener las personas`,
      sqlMessage: persons.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await personService.createPerson(req.body);
  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({
      message: `Persona: ${req.body.per_name} creada correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear la persona`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const person = await personService.getPerson(req.params.id);
  if (person != null) {
    return res.status(200).json(
      person == 0
        ? {status: false, message: `No se encontró la persona` }
        : person
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener la persona`,
      sqlMessage: "No se encontró la persona",
    });
  }
};

const Amend = async (req, res) => {
  const result = await personService.updatePerson(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Persona actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar la persona`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró la persona",
    });
  }
};

const Delete = async (req, res) => {
  const result = await personService.deletePerson(req.params.id);
  if (result != 0) {
    return res.status(200).json(
      result.message
        ? {status: false, message: result.message }
        : {status: true, message: `Persona eliminada correctamente` }
    );
  } else {
    return res.status(400).json({
      message: `Error al obtener la persona`,
      sqlMessage: "No se encontró la persona",
    });
  }
};

export { Index, Store, Amend, Show, Delete };
