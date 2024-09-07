import { db } from "../../database.js";
import joi from "joi";

const getHotelServices = async () => {
  try {
    const result = await db.select().from("hotel_services");
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getHotelService = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error.message;
    }
    const persons = await db
      .select()
      .from("hotel_services")
      .where("hot_ser_id", id)
      .first();
    return persons;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createHotelService = async (body) => {
  try {
    const rules = joi.object({
      hot_ser_name: joi.string().required(),
      hot_ser_desc: joi.string().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("hotel_services").insert({
      hot_ser_name: body.hot_ser_name,
      hot_ser_desc: body.hot_ser_desc,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelService = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        hot_ser_name: joi.string().required(),
        hot_ser_desc: joi.string().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_services").where("hot_ser_id", id).update({
      hot_ser_name: body.hot_ser_name,
      hot_ser_desc: body.hot_ser_desc,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelService = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotel_services").where("hot_ser_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getHotelServices,
  getHotelService,
  createHotelService,
  updateHotelService,
  deleteHotelService,
};
