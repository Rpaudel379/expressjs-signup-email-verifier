import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export default (req, res) => {
  const token = req.cookies.jwtCookie;
  if (token) {
    jwt.verify(token, process.env.jwt_key, async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ noToken: true });
      } else {
        const userId = decodedToken.id;
        const getUser = await User.findById(userId);
        const user = {
          createdAt: getUser.createdAt,
          email: getUser.email,
          isVerified: getUser.isVerified,
          username: getUser.username,
          _id: getUser._id,
          updatedAt: getUser.updatedAt,
        };
        res.status(200).json({ user });
      }
    });
  } else {
    console.log("notoken");
    res.status(400).json({ noToken: true });
  }
};
