import { Router } from "express";
import {
  getLogin,
  logout,
  postLogin,
  postRegister,
  updateUser,
} from "../controller/login.js";
import checkUser from "../middleware/checkUser.js";

const router = Router();

router.use("/login", checkUser);

router.route("/login").get(getLogin).post(postLogin);

router.post("/register", checkUser, postRegister);
router.get("/logout", logout);

//?  /updateuser route checks auth validity in its controller
router.post("/updateuser", updateUser);

export default router;
