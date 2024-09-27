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
        hot_city_img,
        hot_city_desc,
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
        hot_city_img,
        hot_city_desc,
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
    const hotelcity = await getHotelCity(result.hot_city_id);
    const { room_code, room_id } = room;
    const {
      hot_city_address,
      hot_city_rating,
      hot_city_img,
      hot_city_desc,
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
      hot_city_img,
      hot_city_desc,
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


const findHotelsRooms = async (body) => {

  try {
    const rules = joi.object({
      city_id: joi.number().integer().positive().required(),
      capacity: joi.number().integer().positive().required(),
      res_start: joi.date().required(),
      res_end: joi.date().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error.message;
    }

    const result = await db.select("hr.*", "hc.*", "c.*", "co.*", "h.*", "r.*")
    .from("hotel_rooms as hr")
    .join("hotel_cities as hc", "hr.hot_city_id", "hc.hot_city_id")
    .join("cities as c", "hc.city_id", "c.city_id")
    .join("countries as co", "c.coun_id", "co.coun_id")
    .join("hotels as h", "hc.hot_id", "h.hot_id")
    .join("rooms as r", "hr.room_id", "r.room_id")
    .where("c.city_id", body.city_id)
    .where("hr.hot_roo_capacity", body.capacity)
    for (const element of result) {
      element.room_imgs = [];
      const room_imgs = await db.select().from("room_imgs").where("hot_roo_id", element.hot_roo_id);
      for (const img of room_imgs) {
        element.room_imgs.push(img.roo_img_url);
      }
      const resStartDate = new Date(body.res_start);
      const resEndDate = new Date(body.res_end);
      const startHour = resStartDate.getHours();
      const endHour = resEndDate.getHours();
      const diffInMs = resEndDate - resStartDate;
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); 
      let totalPrice = diffInDays * element.hot_roo_price;
      if(startHour < endHour){
        totalPrice -= element.hot_roo_price;
      }
      element.total_price = totalPrice;
    }
    
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }

}

export {
  getHotelRooms,
  getHotelRoom,
  createHotelRoom,
  updateHotelRoom,
  deleteHotelRoom,
  findHotelsRooms
};
