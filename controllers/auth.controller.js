import { userModel } from "../models/users.models.js";
import { encryptPassword, validEncryptPassword } from "../helpers/bcrypt.js";
import { generateJWT } from "../helpers/jwt.js";

export const getUsers = async (request, response) => {
  try {
    const users = await userModel.find();

    if (!users)
      return response.status(400).send({
        ok: true,
        msg: "Users not found",
      });
    response.status(200).send({
      ok: true,
      msg: "Users",
      payload: users,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const getUserById = async (request, response) => {
  const { uid } = request.params;

  try {
    const user = await userModel.findById(uid);

    if (!user)
      return response.status(400).send({
        ok: false,
        msg: "User not found",
      });

    response.status(200).send({
      ok: true,
      msg: "User found",
      payload: user,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const createUser = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    const user = await userModel.create({
      name,
      email,
      password,
    });

    user.password = encryptPassword(password);

    await user.save();

    const token = await generateJWT(user._id, user.name);

    response.status(201).send({
      ok: true,
      msg: "Register",
      payload: user,
      token,
    });
  } catch (error) {
    if (error.code === 11000)
      return response.status(400).send({
        ok: false,
        msg: "Email already in use",
      });

    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user)
      return response.status(400).send({
        ok: false,
        msg: "User doesn't exist with that email",
      });

    const validPassword = validEncryptPassword(password, user.password);

    if (!validPassword)
      return response.status(400).send({
        ok: false,
        msg: "Incorrect password",
      });

    const token = await generateJWT(user._id, user.name);
    response.status(200).send({
      ok: true,
      msg: "Login",
      payload: user,
      token,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};

export const revalidateToken = async (request, response) => {
  const uid = request.uid;
  const name = request.name;

  try {
    const token = await generateJWT(uid, name);

    response.status(200).send({
      ok: true,
      msg: token,
    });
  } catch (error) {
    response.status(500).send({
      ok: false,
      msg: error,
    });
  }
};
