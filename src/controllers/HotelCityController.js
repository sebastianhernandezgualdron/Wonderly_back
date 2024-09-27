// import {personService} from '../services/PersonService.js';
import { db } from "../../database.js";
import * as HotelCityService from "../services/HotelCityService.js";

const Index = async (req, res) => {
  const result = await HotelCityService.getHotelCities();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles en ciudades"
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json({
      status: true,
      data: result.map(e=>{return{...e,hot_city_ubicacion:{x: parseFloat(String(e.hot_city_ubicacion.x).substring(0, 10)), y: parseFloat(String(e.hot_city_ubicacion.y).substring(0, 10))
      }}}),
    });
  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles en ciudades",
      sqlMessage: result.sqlMessage,
    });
  }
};

const Store = async (req, res) => {
  const result = await HotelCityService.createHotelCity(req.body);

  if (!result.sqlMessage && !result.message) {
    return res.status(200).json({ 
      message: `Hotel en ciudad creado correctamente`,
    });
  } else {
    return res.status(400).json({
      message: `Error al crear el hotel en ciudad`,
      sqlMessage: result.sqlMessage ? result.sqlMessage : result.message,
    });
  }
};

const Show = async (req, res) => {
  const result = await HotelCityService.getHotelCity(req.params.id);
  if (result != null) {
    return res
      .status(200)
      .json({data:result});
  } else {
    return res.status(400).json({
      message: `Error al obtener el hotel en ciudad`,
      sqlMessage: "No se encontró el hotel en ciudad",
    });
  }
};

const Amend = async (req, res) => {
  const result = await HotelCityService.updateHotelCity(req.params.id, req.body);
  if (!result.sqlMessage && !result.message && result != 0) {
    return res.status(200).json({
      status: true,
      message: `Hotel en ciudad actualizada correctamente`,
    });
  } else {
    return res.status(400).json({
      status: false,
      message: `Error al actualizar el hotel en ciudad`,
      sqlMessage: result.sqlMessage
        ? result.sqlMessage
        : result.message
        ? result.message
        : "No se encontró el hotel en ciudad",
    });
  }
};

const Delete = async (req, res) => {
  const result = await HotelCityService.deleteHotelCity
  (req.params.id);
  if (result != 0) {
    return res
      .status(200)
      .json(
        result.message
          ? { status: false, message: result.message }
          : { status: true, message: `Hotel en ciudad eliminado correctamente` }
      );
  } else {
    return res.status(400).json({
      message: `Error al obtener el hotel en ciudad`,
      sqlMessage: "No se encontró el hotel en ciudad",
    });
  }
};

const getHotelsColombia = async (req, res) => {

  const result = await HotelCityService.getHotelsColombia();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles en Colombia",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles en Colombia",
      sqlMessage: result.sqlMessage,
    });
  }
}

const getMostPopularHotels = async (req, res) => {
  const result = await HotelCityService.getMostPopularHotels();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles populares",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles populares",
      sqlMessage: result.sqlMessage,
    });
  }
}

const getLastHotels = async (req, res) => {
  const result = await HotelCityService.getLastHotels();
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles",
      sqlMessage: result.sqlMessage,
    });
  }
}

const searchHotelsByLocation = async (req, res) => {

  const result = await HotelCityService.searchHotelsByLocation(req.body);
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles en esa ubicación",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles en esa ubicación",
      sqlMessage: result.sqlMessage,
    });
  }

}

const searchAndFilterHotels = async (req, res) => {

  const result = await HotelCityService.searchAndFilterHotels(req.body);
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles con esos filtros",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles con esos filtros",
      sqlMessage: result.sqlMessage,
    });
  }
}

const getTypeHotels = async (req, res) => {

  const result = await HotelCityService.getTypeHotels(req.body);
  if (Array.isArray(result) && result.length === 0) {
    return res.status(200).json({
      message: "No hay hoteles de ese tipo",
    });
  } else if (result && !result.sqlMessage) {
    return res.status(200).json(result);

  } else {
    return res.status(400).json({
      message: "Error al obtener los hoteles de ese tipo",
      sqlMessage: result.sqlMessage,
    });
  }

}

export { Index, Store, Amend, Show, Delete ,getHotelsColombia, getMostPopularHotels, getLastHotels, searchHotelsByLocation, searchAndFilterHotels, getTypeHotels};
