import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import sendmail from "../sendmail.js";

export default (req, res) => {
  const token = req.cookies.jwtCookie;

  if (token) {
    jwt.verify(token, process.env.jwt_key, async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ error: "invalid token" });
      } else {
        const userId = decodedToken.id;
        const getUser = await User.findById(userId);

        sendmail(getUser, token);

        res.status(200).json({ success: true });
      }
    });
  } else {
    console.log("notoken");
    res.status(500).json({ error: "no token" });
  }
};
