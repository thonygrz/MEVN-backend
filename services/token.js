import jwt from "jsonwebtoken";
import models from "../models";

async function checkToken(token) {
  let new_id = null;
  try {
    const { _id } = await jwt.decode(token);
    new_id = _id;
  } catch (e) {
    return false;
  }

  const user = await models.User.findOne({ _id: new_id, status: 1 });
  if (user) {
    const token = jwt.sign({ _id: new_id }, "clavesecretaparagenerartoken", {
      expiresIn: "1d",
    });
    return {
      token,
      role: user.role,
    };
  } else {
    return false;
  }
}

export default {
  encode: async (_id, role, email) => {
    const token = jwt.sign(
      { _id, role, email },
      "clavesecretaparagenerartoken",
      { expiresIn: "1d" }
    );
    return token;
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, "clavesecretaparagenerartoken");
      const user = await models.User.findOne({ _id, status: 1 });

      if (user) return user;
      else return false;
    } catch (e) {
      const newToken = await checkToken(token);
      return newToken;
    }
  },
};
