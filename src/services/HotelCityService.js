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
      const hotel_type = await db
        .select()
        .from("hotel_type")
        .where("hot_typ_id", element.hot_typ_id)
        .first();
      const { hot_typ_id, hot_typ_accommodation } = hotel_type;
      const { city_name, city_id, coun_name, coun_id } = city;
      const { hot_id, hot_name } = hotel;

      Object.assign(element, {
        city_name,
        city_id,
        coun_name,
        coun_id,
        hot_id,
        hot_name,
        hot_typ_id,
        hot_typ_accommodation,
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
    const hotel_type = await db
      .select()
      .from("hotel_type")
      .where("hot_typ_id", result.hot_typ_id)
      .first();
    const { hot_typ_id, hot_typ_accommodation } = hotel_type;
    const { city_name, city_id, coun_name, coun_id } = city;
    const { hot_id, hot_name } = hotel;

    Object.assign(result, {
      city_name,
      city_id,
      coun_name,
      coun_id,
      hot_id,
      hot_name,
      hot_typ_id,
      hot_typ_accommodation,
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

const getHotelsColombia = async () => {
  try {
    const result = await db
      .select()
      .from("hotel_cities")
      .join("cities", "cities.city_id", "hotel_cities.city_id")
      .where("cities.coun_id", 4);
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

const getMostPopularHotels = async () => {

  try {
    const result = await db
      .select()
      .from("hotel_cities")
      .join("cities", "cities.city_id", "hotel_cities.city_id")
      .join("countries", "countries.coun_id", "cities.coun_id")
      .orderBy("hot_city_rating", "desc")
      .limit(5);
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

const getLastHotels = async () => {

  try {
    const result = await db
      .select()
      .from("hotel_cities")
      .join("cities", "cities.city_id", "hotel_cities.city_id")
      .join("countries", "countries.coun_id", "cities.coun_id")
      .orderBy("hot_city_id", "desc")
      .limit(5);
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export {
  getHotelCities,
  getHotelCity,
  createHotelCity,
  updateHotelCity,
  deleteHotelCity,
  getHotelsColombia,
  getMostPopularHotels,
  getLastHotels
};
