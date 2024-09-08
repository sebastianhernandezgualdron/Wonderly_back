import { db } from "../../database.js";
import joi from "joi";
import { getCity } from "./CityService.js";
import { getHotel } from "./HotelService.js";

const getHotelCities = async () => {
  try {
    const result = await db.select().from("hotel_cities");
    for (const element of result) {
      const city = await getCity(element.city_id);
      const hotel = await getHotel(element.hot_id);
      const { city_name, city_id, coun_name, coun_id } = city;
      const { hot_id, hot_name } = hotel;

      Object.assign(element, {
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
const getHotelCity = async (id) => {
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
      .from("hotel_cities")
      .where("hot_city_id", id)
      .first();
    if (result == null) {
      return null;
    }
    const city = await getCity(result.city_id);
    const hotel = await getHotel(result.hot_id);
    const { city_name, city_id, coun_name, coun_id } = city;
    const { hot_id, hot_name } = hotel;

    Object.assign(result, {
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

const createHotelCity = async (body) => {
  try {
    const rules = joi.object({
      hot_city_address: joi.string().required(),
      hot_city_rating: joi.number().min(0).max(5).multiple(0.5).required(),
      hot_id: joi.number().integer().positive().required(),
      city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("hotel_cities").insert({
      hot_city_address: body.hot_city_address,
      hot_city_rating: body.hot_city_rating,
      hot_id: body.hot_id,
      city_id: body.city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelCity = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        hot_city_address: joi.string().required(),
        hot_city_rating: joi.number().min(0).max(5).multiple(0.5).required(),
        hot_id: joi.number().integer().positive().required(),
        city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_cities").where("hot_city_id", id).update({
      hot_city_address: body.hot_city_address,
      hot_city_rating: body.hot_city_rating,
      hot_id: body.hot_id,
      city_id: body.city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelCity = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_cities").where("hot_city_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getHotelCities,
  getHotelCity,
  createHotelCity,
  updateHotelCity,
  deleteHotelCity,
};
