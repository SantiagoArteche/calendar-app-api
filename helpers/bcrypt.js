import bcrypt from "bcryptjs";
import "dotenv/config";

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT)); //Number of password characters

export const encryptPassword = (password) => bcrypt.hashSync(password, salt);

export const validEncryptPassword = (password, passwordDB) =>
  bcrypt.compareSync(password, passwordDB);
