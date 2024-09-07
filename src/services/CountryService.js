import { db } from "../../database.js";
import joi from "joi";

const getCountries = async () => {
  try {
    const result = await db.select().from("countries");
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getCountry = async (id) => {
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
      .from("countries")
      .where("coun_id", id)
      .first();
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createCountry = async (body) => {
  try {
    const rules = joi.object({
      coun_name: joi.string().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("countries").insert({
      coun_name: body.coun_name,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateCountry = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        coun_name: joi.string().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("countries").where("coun_id", id).update({
      coun_name: body.coun_name
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteCountry = async (id) => {
  try {

    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("countries").where("coun_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getCountries, getCountry, createCountry, updateCountry, deleteCountry };
