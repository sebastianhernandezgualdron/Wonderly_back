import { db } from "../../database.js";
import joi from "joi";

const getActivities = async () => {
  try {
    const result = await db.select().from("activities");
    for (const element of result) {
      const city = await db
        .select()
        .from("cities")
        .where("city_id", element.city_id)
        .first();
      element.city_name = city ? city.city_name : null;
      element.coun_id = city ? city.coun_id : null;
      const country = await db
        .select()
        .from("countries")
        .where("coun_id", element.coun_id)
        .first();
      element.coun_name = country ? country.coun_name : null;

      element.act_date = new Date(element.act_date).toISOString().split("T")[0];
    }
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getActivity = async (id) => {
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
      .from("activities")
      .where("act_id", id)
      .first();
      if(result == null){
        return null;
      }
    const city = await db
      .select()
      .from("cities")
      .where("city_id", result.city_id)
      .first();
    result.city_name = city ? city.city_name : null;
    result.coun_id = city ? city.coun_id : null;
    const country = await db
      .select()
      .from("countries")
      .where("coun_id", result.coun_id)
      .first();
    result.coun_name = country ? country.coun_name : null;
    result.act_date = new Date(result.act_date).toISOString().split("T")[0];
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createActivity = async (body) => {
  try {
    const rules = joi.object({
      act_name: joi.string().required(),
      act_desc: joi.string().required(),
      act_address: joi.string().required(),
      act_date: joi.date().required(),
      act_time: joi
        .string()
        .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
        .required(),
      act_price: joi.number().positive().precision(2).required(),
      city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("activities").insert({
      act_name: body.act_name,
      act_desc: body.act_desc,
      act_address: body.act_address,
      act_date: body.act_date,
      act_time: body.act_time,
      act_price: body.act_price,
      city_id: body.city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateActivity = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        act_name: joi.string().required(),
        act_desc: joi.string().required(),
        act_address: joi.string().required(),
        act_date: joi.date().iso().required(),
        act_time: joi
          .string()
          .pattern(/^([01]\d|2[0-3]):?([0-5]\d)$/)
          .required(),
        act_price: joi.number().positive().precision(2).required(),
        city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("activities").where("act_id", id).update({
      act_name: body.act_name,
      act_desc: body.act_desc,
      act_address: body.act_address,
      act_date: body.act_date,
      act_time: body.act_time,
      act_price: body.act_price,
      city_id: body.city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteActivity = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("activities").where("act_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
