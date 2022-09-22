import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies.jwtCookie;

  if (token) {
    jwt.verify(token, process.env.jwt_key, (err, decodedToken) => {
      if (err) {
        next();
      } else {
        res.redirect("/dashboard");
      }
    });
  } else {
    next();
  }
};
