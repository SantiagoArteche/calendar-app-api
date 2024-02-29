import jwt from "jsonwebtoken";

export const validateJWT = (request, response, next) => {
  const token = request.header("jwt-token");

  if (!token) {
    return response.status(401).send({
      ok: false,
      msg: "The request don't have token",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    request.uid = uid;
    request.name = name;
  } catch (error) {
    return response.status(401).send({
      ok: false,
      msg: "Invalid token",
    });
  }
  next();
};
