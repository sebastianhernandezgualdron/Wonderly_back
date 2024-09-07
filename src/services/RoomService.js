import { db } from "../../database.js";
import joi from "joi";

const getRooms = async () => {
  try {
    const result = await db.select().from("rooms");
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getRoom = async (id) => {
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
      .from("rooms")
      .where("room_id", id)
      .first();
    return persons;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createRoom = async (body) => {
  try {
    const rules = joi.object({
      room_code: joi.string().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("rooms").insert({
      room_code: body.room_code,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateRoom = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        room_code: joi.string().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("rooms").where("room_id", id).update({
      room_code: body.room_code
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteRoom = async (id) => {
  try {

    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("rooms").where("room_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getRooms, getRoom, createRoom, updateRoom, deleteRoom };
