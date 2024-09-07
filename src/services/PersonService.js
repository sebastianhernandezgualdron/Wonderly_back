import { db } from "../../database.js";
import joi from "joi";

const getPersons = async () => {
  try {
    const persons = await db.select().from("persons");
    return persons;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getPerson = async (id) => {
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
      .from("persons")
      .where("per_id", id)
      .first();
    return persons;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createPerson = async (body) => {
  try {
    const rules = joi.object({
      per_name: joi.string().required(),
      per_lastname: joi.string().required(),
      per_document: joi.string().required(),
      per_telephone: joi.string().required(),
      per_mail: joi.string().email().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const result = await db("persons").insert({
      per_name: body.per_name,
      per_lastname: body.per_lastname,
      per_document: body.per_document,
      per_telephone: body.per_telephone,
      per_mail: body.per_mail,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updatePerson = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        per_name: joi.string().required(),
        per_lastname: joi.string().required(),
        per_document: joi.string().required(),
        per_telephone: joi.string().required(),
        per_mail: joi.string().email().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("persons").where("per_id", id).update({
      per_name: body.per_name,
      per_lastname: body.per_lastname,
      per_document: body.per_document,
      per_telephone: body.per_telephone,
      per_mail: body.per_mail,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deletePerson = async (id) => {
  try {

    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("persons").where("per_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { getPersons, getPerson, createPerson, updatePerson, deletePerson };
