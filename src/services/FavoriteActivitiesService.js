import { db } from "../../database.js";
import joi from "joi";
import * as ActivityController from "../services/ActivityService.js";
import * as UserController from "../services/UserService.js";

const getFavoriteActivities = async () => {
  try {
    const result = await db.select().from("favorite_activities");
    for (const element of result) {
      const user = await UserController.getUser(element.use_id);
      const activity = await ActivityController.getActivity(element.act_id);
      const {
        act_name,
        act_desc,
        act_address,
        act_date,
        act_time,
        act_price,
        city_id,
      } = activity;
      const { per_name, per_lastname, use_mail, per_telephone } = user;

      Object.assign(element, {
        act_name,
        act_desc,
        act_address,
        act_date,
        act_time,
        act_price,
        city_id,
        per_name,
        per_lastname,
        use_mail,
        per_telephone,
      });
    }
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getFavoriteActivity = async (id) => {
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
      .from("favorite_activities")
      .where("fav_act_id", id)
      .first();
    const user = await UserController.getUser(result.use_id);

    const activity = await ActivityController.getActivity(result.act_id);
    const {
      act_name,
      act_desc,
      act_address,
      act_date,
      act_time,
      act_price,
      city_id,
    } = activity;
    const { per_name, per_lastname, use_mail, per_telephone } = user;
    Object.assign(result, {
      act_name,
      act_desc,
      act_address,
      act_date,
      act_time,
      act_price,
      city_id,
      per_name,
      per_lastname,
      use_mail,
      per_telephone,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createFavoriteActivity = async (body) => {
  try {
    const rules = joi.object({
      use_id: joi.number().integer().positive().required(),
      act_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("favorite_activities").insert({
      use_id: body.use_id,
      act_id: body.act_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateFavoriteActivity = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        use_id: joi.number().integer().positive().required(),
        act_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("favorite_activities")
      .where("fav_act_id", id)
      .update({
        use_id: body.use_id,
        act_id: body.act_id,
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteFavoriteActivities = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("favorite_activities")
      .where("fav_act_id", id)
      .delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFavoriteActivitiesByUser = async (id) => {
  try{

    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate({id:id});

    if(validation.error){
      return validation.error.message;
    }

    const result = await db.select().from("favorite_activities").where("use_id",id);

    for(const element of result){
      const activity = await ActivityController.getActivity(element.act_id);

      const {act_name,act_desc,act_address,act_date,act_time,act_price,city_id} = activity;
      

      Object.assign(element,{act_name,act_desc,act_address,act_date,act_time,act_price,city_id});
    }

    return result;
  }catch(error){


  }


}

export {
  getFavoriteActivities,
  getFavoriteActivity,
  createFavoriteActivity,
  updateFavoriteActivity,
  deleteFavoriteActivities,
  getFavoriteActivitiesByUser
};
