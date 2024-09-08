import { db } from "../../database.js";
import joi from "joi";
import { getRoom } from "./RoomService.js";
import { getHotelCity } from "./HotelCityService.js";

const getHotelRooms = async () => {
  try {
    const result = await db.select().from("hotel_rooms");
    for (const element of result) {
      const room = await getRoom(element.room_id);
      const hotelcity = await getHotelCity(element.hot_city_id);
      const { room_code, room_id } = room;
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
        room_code,
        room_id,
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
const getHotelRoom = async (id) => {
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
      .from("hotel_rooms")
      .where("hot_roo_id", id)
      .first();
    if (result == null) {
      return null;
    }
    const room = await getRoom(result.city_id);
    const hotelcity = await getHotelCity(result.hot_id);
    const { room_code, room_id } = room;
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
      room_code,
      room_id,
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

const createHotelRoom = async (body) => {
  try {
    const rules = joi.object({
      room_id: joi.number().integer().positive().required(),
      hot_city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("hotel_rooms").insert({
      room_id: body.room_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelRoom = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        room_id: joi.number().integer().positive().required(),
        hot_city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_rooms").where("hot_roo_id", id).update({
      room_id: body.room_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelRoom = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_rooms").where("hot_roo_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getHotelRooms,
  getHotelRoom,
  createHotelRoom,
  updateHotelRoom,
  deleteHotelRoom,
};
