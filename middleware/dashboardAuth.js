import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies.jwtCookie;
  if (token) {
    jwt.verify(token, process.env.jwt_key, (err, decodedToken) => {
      if (err) {
        res.redirect("/auth/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/auth/login");
  }
};
