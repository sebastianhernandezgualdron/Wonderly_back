import { db } from "../../database.js";
import joi from "joi";
import { getUser } from "./UserService.js";
import { getHotelRoom } from "./HotelRoomService.js";
import { getCity } from "./CityService.js";
import { getHotel } from "./HotelService.js";
import moment from "moment";
import { getHotelCities, getHotelCity } from "./HotelCityService.js";

const getHotelReservations = async () => {
  try {
    const result = await db.select().from("room_reservation");
    for (const element of result) {
      element.room_res_start = moment(element.room_res_start).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      element.room_res_end = moment(element.room_res_end).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      const user = await getUser(element.use_id);
      const hotelRoom = await getHotelRoom(element.hot_roo_id);
      const { use_id, per_name, per_lastname, per_document } = user;
      const {
        room_id,
        room_code,
        hot_city_address,
        hot_city_rating,
        city_name,
        city_id,
        coun_name,
        coun_id,
        hot_id,
        hot_name,
      } = hotelRoom;

      Object.assign(element, {
        room_id,
        room_code,
        use_id,
        per_name,
        per_lastname,
        per_document,
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
const getHotelReservation = async (id) => {
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
      .from("room_reservation")
      .where("room_res_id", id)
      .first();
    if (result == null) {
      return null;
    }
    result.room_res_start = moment(result.room_res_start).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    result.room_res_end = moment(result.room_res_end).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const user = await getUser(result.use_id);
    const hotelRoom = await getHotelRoom(result.hot_roo_id);
    const { use_id, per_name, per_lastname, per_document } = user;
    const {
      room_id,
      room_code,
      hot_city_address,
      hot_city_rating,
      city_name,
      city_id,
      coun_name,
      coun_id,
      hot_id,
      hot_name,
    } = hotelRoom;

    Object.assign(result, {
      room_id,
      room_code,
      use_id,
      per_name,
      per_lastname,
      per_document,
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

const createHotelReservation = async (body) => {
  try {
    const rules = joi.object({
      room_res_start: joi.date().iso().required(),
      room_res_end: joi.date().iso().required(),
      use_id: joi.number().integer().positive().required(),
      hot_roo_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const roomResStartUTC = new Date(body.room_res_start).toISOString();
    const roomResEndUTC = new Date(body.room_res_end).toISOString();
    const result = await db("room_reservation").insert({
      room_res_start: roomResStartUTC,
      room_res_end: roomResEndUTC,
      room_res_status: 1,
      use_id: body.use_id,
      hot_roo_id: body.hot_roo_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelReservation = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        room_res_start: joi.date().iso().required(),
        room_res_end: joi.date().iso().required(),
        use_id: joi.number().integer().positive().required(),
        hot_roo_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }
    const result = await db("room_reservation")
      .where("room_res_id", id)
      .update({
        room_res_start: new Date(body.room_res_start),
        room_res_end: new Date(body.room_res_end),
        room_res_status: body.room_res_status,
        use_id: body.use_id,
        hot_roo_id: body.hot_roo_id,
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelReservation = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("room_reservation")
      .where("room_res_id", id)
      .delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getHotelsByCity = async (id) => {
  try {
    const result = await db.select().from("hotel_cities").where("city_id", id);
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

const getHotelReservationsByUser = async (id) => {
  try {
    const result = await db
      .select()
      .from("room_reservation")
      .where("use_id", id);
    for (const element of result) {
      element.room_res_start = moment(element.room_res_start).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      element.room_res_end = moment(element.room_res_end).format(
        "YYYY-MM-DD HH:mm:ss"
      );

      const user = await getUser(element.use_id);
      const hotelRoom = await getHotelRoom(element.hot_roo_id);
      const hotelCity = await getHotelCity(hotelRoom.hot_city_id);
      const {
        hot_city_address,
        hot_city_rating,
        hot_city_img,
        hot_city_desc,
        city_name,
        city_id,
        coun_name,
        hot_id,
        hot_name,
      } = hotelCity;

      const { use_id, per_name, per_lastname, per_document } = user;
      const {
        room_id,
        room_code,
        hot_city_id,
        hot_roo_desc,
        hot_roo_price,
        hot_roo_capacity,
      } = hotelRoom;

      Object.assign(element, {
        hot_city_address,
        hot_city_rating,
        hot_city_img,
        hot_city_desc,
        city_name,
        city_id,
        coun_name,
        hot_id,
        hot_name,
        use_id,
        per_name,
        per_lastname,
        per_document,
        room_id,
        room_code,
        hot_city_id,
        hot_roo_desc,
        hot_roo_price,
        hot_roo_capacity,
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export {
  getHotelReservations,
  getHotelReservation,
  createHotelReservation,
  updateHotelReservation,
  deleteHotelReservation,
  getHotelsByCity,
  getHotelReservationsByUser,
};
