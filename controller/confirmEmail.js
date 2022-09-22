import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const maxAge = 3 * 24 * 60 * 60;

export default (req, res) => {
  console.log(req.params.token);

  const token = req.params.token;

  if (token) {
    jwt.verify(token, process.env.jwt_key, async (err, decodedToken) => {
      if (err) {
        res.status(400).end("<h1>invalid token</h1>");
      } else {
        try {
          const userId = decodedToken.id;
          await User.findByIdAndUpdate(userId, {
            $set: {
              isVerified: true,
            },
          });

          res.cookie("jwtCookie", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });

          res.status(200).redirect("/dashboard");
        } catch (error) {
          console.log(error);
          res.status(500).end("<h1>error</h1>");
        }
      }
    });
  } else {
    res.status(500).end("<h1>no token</h1>");
  }
};
