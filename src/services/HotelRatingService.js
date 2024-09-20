import { db } from "../../database.js";
import joi from "joi";
import { getUser } from "./UserService.js";
import { getHotelCity } from "./HotelCityService.js";

const getHotelRatings = async () => {
  try {
    const result = await db.select().from("ratings");
    for (const element of result) {
      const hotelservice = await getUser(element.use_id);
      const hotelcity = await getHotelCity(element.hot_city_id);
      const { use_id, per_name } = hotelservice;
      const {
        hot_city_address,
        hot_city_rating,
        city_name,
        city_id,
        coun_name,
        coun_id,
        hot_id,
        hot_name,
      } = hotelcity;

      Object.assign(element, {
        use_id,
        per_name,
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
const getHotelRating = async (id) => {
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
      .from("ratings")
      .where("rat_id", id)
      .first();
    if (result == null) {
      return null;
    }
    const hotelservice = await getUser(result.use_id);
    const hotelcity = await getHotelCity(result.hot_city_id);
    const { use_id, per_name } = hotelservice;
    const {
      hot_city_address,
      hot_city_rating,
      city_name,
      city_id,
      coun_name,
      coun_id,
      hot_id,
      hot_name,
    } = hotelcity;

    Object.assign(result, {
      use_id,
      per_name,
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

const createHotelRating = async (body) => {
  try {
    const rules = joi.object({
      rat_rating: joi.number().min(0).max(5).multiple(0.5).required(),
      use_id: joi.number().integer().positive().required(),
      hot_city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
     await db("ratings").insert({
      rat_rating: body.rat_rating,
      use_id: body.use_id,
      hot_city_id: body.hot_city_id,
    });

    const ratings = await db('ratings').where('hot_city_id', body.hot_city_id);
    let promRate = 0;
    for (const element of ratings) {
      promRate += element.rat_rating;
    }
    promRate = promRate / ratings.length;
      await db('hotel_cities').where('hot_city_id', body.hot_city_id).update({
      hot_city_rating: promRate

    })
    return promRate;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelRating = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        rat_rating: joi.number().min(0).max(5).multiple(0.5).required(),
        use_id: joi.number().integer().positive().required(),
        hot_city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("ratings").where("rat_id", id).update({
      rat_rating: body.rat_rating,
      use_id: body.use_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteHotelRating = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("ratings").where("rat_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export {
  getHotelRatings,
  getHotelRating,
  createHotelRating,
  updateHotelRating,
  deleteHotelRating,
};
