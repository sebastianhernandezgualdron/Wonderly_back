import { db } from "../../database.js";
import joi from "joi";
import { getUser } from "./UserService.js";
import { getHotelCity } from "./HotelCityService.js";

const getFavoriteHotels = async () => {
  try {
    const result = await db.select().from("favorite_hotels");
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
const getFavoriteHotel = async (id) => {
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
      .from("favorite_hotels")
      .where("fav_hot_id", id)
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

const createFavoriteHotel = async (body) => {
  try {
    const rules = joi.object({
      use_id: joi.number().integer().positive().required(),
      hot_city_id: joi.number().integer().positive().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("favorite_hotels").insert({
      use_id: body.use_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateHotelCityService = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        use_id: joi.number().integer().positive().required(),
        hot_city_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("favorite_hotels").where("fav_hot_id", id).update({
      use_id: body.use_id,
      hot_city_id: body.hot_city_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteFavoriteHotel = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }
    const result = await db("favorite_hotels").where("fav_hot_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFavoriteHotelsByUser = async (id) => {
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
      .from("favorite_hotels")
      .where("use_id", id);
      for (const element of result) {
        
        const hotelcity = await getHotelCity(element.hot_city_id);
        const {
          hot_city_address,
          hot_city_rating,
          hot_city_img,
          city_name,
          city_id,
          coun_name,
          coun_id,
          hot_id,
          hot_name,
        } = hotelcity;
  
        Object.assign(element, {
          hot_city_address,
          hot_city_rating,
          hot_city_img,
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


}

export {
  getFavoriteHotels,
  getFavoriteHotel,
  createFavoriteHotel,
  updateHotelCityService,
  deleteFavoriteHotel,
  getFavoriteHotelsByUser
};
