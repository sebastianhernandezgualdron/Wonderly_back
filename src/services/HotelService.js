import { db } from "../../database.js";
import joi from "joi";

const getHotels = async () => {
  try {
    const result = await db.select().from("hotels");
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getHotel = async (id) => {
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
      .from("hotels")
      .where("hot_id", id)
      .first();
    return persons;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createHotel = async (body) => {
  try {
    const rules = joi.object({
      hot_name: joi.string().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("hotels").insert({
      hot_name: body.hot_name,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotel = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        hot_name: joi.string().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotels").where("hot_id", id).update({
      hot_name: body.hot_name
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotel = async (id) => {
  try {

    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("hotels").where("hot_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getHotels, getHotel, createHotel, updateHotel, deleteHotel };
