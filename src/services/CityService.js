import { db } from "../../database.js";
import joi from "joi";

const getCities = async () => {
  try {
    const result = await db.select().from("cities");
    for (const element of result) {
      const country = await db
        .select()
        .from("countries")
        .where("coun_id", element.coun_id)
        .first();
      element.coun_name = country ? country.coun_name : null;
    }
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getCity = async (id) => {
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
      .from("cities")
      .where("city_id", id)
      .first();
    const country = await db
      .select()
      .from("countries")
      .where("coun_id", result.coun_id)
      .first();
      result.coun_name = country ? country.coun_name : null;
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createCity = async (body) => {
  try {
    const rules = joi.object({
      city_name: joi.string().required(),
      coun_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("cities").insert({
      city_name: body.city_name,
      coun_id: body.coun_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateCity = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        city_name: joi.string().required(),
        coun_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("cities").where("city_id", id).update({
      city_name: body.city_name,
      coun_id: body.coun_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteCity = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("cities").where("city_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getCities, getCity, createCity, updateCity, deleteCity };
