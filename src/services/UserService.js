import { db } from "../../database.js";
import joi from "joi";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const getUsers = async () => {
  try {
    const result = await db.select().from("users");
    for (const element of result) {
      const person = await db
        .select()
        .from("persons")
        .where("per_id", element.per_id)
        .first();
      element.per_name = person ? person.per_name : null;
      element.per_lastname = person ? person.per_lastname : null;
      element.per_document = person ? person.per_document : null;
      element.per_telephone = person ? person.per_telephone : null;
    }
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const getUser = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error.message;
    }
    const result = await db.select().from("users").where("use_id", id).first();
    const person = await db
      .select()
      .from("persons")
      .where("per_id", result.per_id)
      .first();
    result.per_name = person ? person.per_name : null;
    result.per_lastname = person ? person.per_lastname : null;
    result.per_document = person ? person.per_document : null;
    result.per_telephone = person ? person.per_telephone : null;
    return result;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const createUser = async (body) => {
  try {
      const rules = joi.object({
      per_name: joi.string().required(),
      per_lastname: joi.string().required(),
      per_document: joi.string().required(),
      per_telephone: joi.string().required(),
      use_mail: joi.string().email().required(),
      use_password: joi
        .string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
        .required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }
    const person = await db("persons").insert({
      per_name: body.per_name,
      per_lastname: body.per_lastname,
      per_document: body.per_document,
<<<<<<< Updated upstream
      per_telephone: body.per_telephone,
      
=======
      per_telephone: body.per_telephone
>>>>>>> Stashed changes
    });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.use_password, saltRounds);
    const result = await db("users").insert({
      use_mail: body.use_mail,
      use_password: hashedPassword,
      use_img: "peppa.jpg",
      per_id: person[0],
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateUsers = async (id, body) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
      body: {
        use_mail: joi.string().email().required(),
        use_password: joi
          .string()
          .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/
          )
          .required(),
        per_id: joi.number().integer().positive().required(),
      },
    });

    const validation = rules.validate({ id: id, body: body });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("users").where("use_id", id).update({
      use_mail: body.use_mail,
      use_password: body.use_password,
      per_id: body.per_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteUsers = async (id) => {
  try {
    const rules = joi.object({
      id: joi.number().integer().positive().required(),
    });
    const validation = rules.validate({ id: id });
    if (validation.error) {
      return validation.error;
    }

    const result = await db("users").where("use_id", id).delete();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const login = async (body, res) => {
  try {
    const rules = joi.object({
      use_mail: joi.string().email().required(),
      use_password: joi.string().required(),
    });

    const validation = rules.validate(body);
    if (validation.error) {
      return validation.error;
    }

    const user = await db
      .select()
      .from("users")
      .where("use_mail", body.use_mail)
      .first();
    if (!user) {
      return { message: "Usuario no encontrado" };
    }
    const validPassword = await bcrypt.compare(
      body.use_password,
      user.use_password
    );
    if (!validPassword) {
      return { message: "Contraseña incorrecta" };
    }

    const token = sign({ id: user.use_id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: true,
      message: "Usuario logueado correctamente",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const logout = async (res) => {
  try {
    return res.status(200).json({
      status: true,
      message: "Usuario deslogueado correctamente",
      token: null,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export { getUsers, getUser, createUser, updateUsers, deleteUsers, login };
