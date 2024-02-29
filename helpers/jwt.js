import jwt from "jsonwebtoken";
import "dotenv/config";
export const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Can't generate token");
        }

        resolve(token);
      }
    );
  });
};
