import { db } from "../../database.js";
import joi from "joi";
import { getHotelService } from "./HotelServicesService.js";
import { getHotelCity } from "./HotelCityService.js";

const getHotelCityServices = async () => {
  try {
    const result = await db.select().from("hotel_cities_services");
    for (const element of result) {
      const hotelservice = await getHotelService(element.hot_ser_id);
      const hotelcity = await getHotelCity(element.hot_city_id);
      const { hot_ser_name, hot_ser_desc } = hotelservice;
      const {
        hot_city_address,
        hot_city_rating,
        city_name,
        city_id,
        coun_name,
        coun_id,
        hot_id,
        hot_name,
      } = hotelcity;

      Object.assign(element, {
        hot_ser_name,
        hot_ser_desc,
        hot_city_address,
        hot_city_rating,
        city_name,
        city_id,
        coun_name,
        coun_id,
        hot_id,
        hot_name,
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getHotelCityService = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error.message;
    }
    const result = await db
      .select()
      .from("hotel_cities_services")
      .where("hot_cit_ser_id", id)
      .first();
    if (result == null) {
      return null;
    }
    const hotelservice = await getHotelService(result.hot_ser_id);
    const hotelcity = await getHotelCity(result.hot_city_id);
    const { hot_ser_name, hot_ser_desc } = hotelservice;
    const {
      hot_city_address,
      hot_city_rating,
      city_name,
      city_id,
      coun_name,
      coun_id,
      hot_id,
      hot_name,
    } = hotelcity;

    Object.assign(result, {
      hot_ser_name,
      hot_ser_desc,
      hot_city_address,
      hot_city_rating,
      city_name,
      city_id,
      coun_name,
      coun_id,
      hot_id,
      hot_name,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createHotelCityService = async (body) => {
  try {
    const rules = joi.object({
      hot_ser_id: joi.number().integer().positive().required(),
      hot_city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("hotel_cities_services").insert({
      hot_ser_id: body.hot_ser_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelCityService = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        hot_ser_id: joi.number().integer().positive().required(),
        hot_city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_cities_services").where("hot_cit_ser_id", id).update({
      hot_ser_id: body.hot_ser_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelCityService = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_cities_services").where("hot_cit_ser_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getHotelCityServices,
  getHotelCityService,
  createHotelCityService,
  updateHotelCityService,
  deleteHotelCityService,
};
