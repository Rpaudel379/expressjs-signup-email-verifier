import path from "path";
import { pageDir } from "../index.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import sendmail from "../sendmail.js";

const maxAge = 3 * 24 * 60 * 60;
const createJWTToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_key, {
    expiresIn: maxAge,
  });
};

export const getLogin = (req, res) => {
  res.sendFile(path.join(pageDir, "login.html"));
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username.length > 20 || password.length > 20) {
      throw Error("fields must be less than 20 chars");
    }

    const user = await User.findOne({ username, password });
    if (!user) {
      throw Error("username or password incorrect");
    }

    const token = createJWTToken(user._id);

    res.cookie("jwtCookie", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ success: "redirecting" });
  } catch (err) {
    console.log(err.message);

    res.status(404).json({ error: err.message });
  }
};

export const postRegister = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });

    console.log(user);

    const token = createJWTToken(user._id);
    sendmail(user, token);

    res.cookie("jwtCookie", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(200)
      .json({ success: "user created and check your email to verify" });
  } catch (err) {
    console.log(err.message);
    const error = handleErrors(err);

    res.status(500).json({ error });
  }
};

export const logout = (req, res) => {
  res.cookie("jwtCookie", "", { maxAge: 1 });
  res.redirect("/");
};

export const updateUser = (req, res) => {
  const { value, type } = req.body;

  try {
    if (value.length < 3 || !type) {
      throw Error("length must be between 3 to 25");
    }

    const token = req.cookies.jwtCookie;

    if (token) {
      jwt.verify(token, process.env.jwt_key, async (err, decodedToken) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          if (type === "username") {
            await User.findByIdAndUpdate(decodedToken.id, {
              $set: {
                username: value,
              },
            });
          }
          if (type === "email") {
            await User.findByIdAndUpdate(decodedToken.id, {
              $set: {
                email: value,
              },
            });
          }

          res.status(200).json({ success: true });
        }
      });
    } else {
      throw Error("empty token");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const handleErrors = (err) => {
  if (err.message.includes("validation failed")) {
    return "please provide values between 3 to 20";
  } else if (err.message.includes("duplicate key")) {
    return "username or email already exists";
  }
};
