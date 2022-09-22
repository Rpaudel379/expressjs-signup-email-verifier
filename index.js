import express from "express";
import mongoose from "mongoose";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
// import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import getUser from "./middleware/getUser.js";
import dashboardAuth from "./middleware/dashboardAuth.js";
import checkUser from "./middleware/checkUser.js";
import confirmEmail from "./controller/confirmEmail.js";
import verifyEmail from "./controller/verifyEmail.js";
export const pageDir = path.join(path.resolve(""), "pages");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/express-email-sender")
  .then((result) => {
    app.listen(5000, () => {
      console.log("connected to mongodb compass\nlistening to port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.use(cors({}));
dotenv.config();
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());

/* middleware for auth */
/* middleware for auth */

app.get("/getUser", getUser);

// for homepage
app.get("/", checkUser, (req, res) => {
  res.sendFile(path.join(pageDir, "index.html"));
});

app.get("/dashboard", dashboardAuth, (req, res) => {
  res.sendFile(path.join(pageDir, "dashboard.html"));
});


// redirect user to /auth/login when they go to /login
app.get("/login", (req, res) => {
  res.redirect("/auth/login");
});

app.get("/confirmation/:token", confirmEmail);
app.post("/verifyemail", verifyEmail);

// routes for login and signup both get and post
app.use("/auth", authRoutes);

// error page
app.use((req, res) => {
  res.sendFile(path.join(pageDir, "404.html"));
});
