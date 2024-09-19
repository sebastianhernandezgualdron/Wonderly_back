import { db } from "../../database.js";
import joi from "joi";
import * as ActivityController from "../services/ActivityService.js";
import * as UserController from "../services/UserService.js";

const getActivitiesReservations = async () => {
  try {
    const result = await db.select().from("activities_reservation");
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
const getActivityReservation = async (id) => {
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
      .from("activities_reservation")
      .where("act_res_id", id)
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

const createActivityReservation = async (body) => {
  try {
    const rules = joi.object({
      act_res_date: joi.date().iso().required(),
      use_id: joi.number().integer().positive().required(),
      act_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("activities_reservation").insert({
      act_res_date: body.act_res_date,
      act_res_status: 1,
      use_id: body.use_id,
      act_id: body.act_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateActivityReservation = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        act_res_date: joi.date().iso().required(),
        act_res_status: joi.number().valid(0, 1),
        use_id: joi.number().integer().positive().required(),
        act_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("activities_reservation")
      .where("act_res_id", id)
      .update({
        act_res_date: body.act_res_date,
        act_res_status: body.act_res_status,
        use_id: body.use_id,
        act_id: body.act_id,
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteActivityReservation = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }
    const reser = await getActivityReservation(id);
    if (!reser) {
      return { message: "Reserva no encontrada" };
    }
    reser.act_res_status = reser.act_res_status === 1 ? 0 : 1;
    const result = await db("activities_reservation")
      .where("act_res_id", id)
      .update({
        act_res_status: reser.act_res_status,
      });
    return reser.act_res_status;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getActivitiesReservationsByUser = async (id) => {
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
      .from("activities_reservation")
      .where("use_id", id);
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
        city_name,
        coun_id,
        coun_name,
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
        city_name,
        coun_id,
        coun_name,
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

export {
  getActivitiesReservations,
  getActivityReservation,
  createActivityReservation,
  updateActivityReservation,
  deleteActivityReservation,
  getActivitiesReservationsByUser,
};
