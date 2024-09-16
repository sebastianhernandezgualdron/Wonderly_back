// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as UserService from "../services/UserService.js";

const Index = async (req, res) => {
  const result = await UserService.getUsers();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay usuarios",

    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);
  } else {
    return res.status(400).json({
      message: "Error al obtener la lista de usuarios",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await UserService.createUser(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Usuario: ${req.body.use_mail} creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear el Usuario`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await UserService.getUser(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json(result);
  } else {
    return res.status(400).json({
      message: `Error al obtener el usuario`,
      sqlMessage: "No se encontró el usuario",
    });
  }
};

const Amend = async (req, res) => {
  const result = await UserService.updateUsers(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Usuario actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar el usuario`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró el usuario",
    });
  }
};

const Delete = async (req, res) => {
  const result = await UserService.deleteUsers
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Usuario eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener el usuario`,
      sqlMessage: "No se encontró el usuario",
    });
  }
};

const Login = async (req, res) => {

  const result = await UserService.login(req.body, res);
  if (result != null) {
    return res.json(result.message);
  } else {
    return res.status(400).json({
      message: `Error al obtener el usuario`,
      sqlMessage: "No se encontró el usuario",
    });
  }
}

export { Index, Store, Amend, Show, Delete, Login};
