import { Router } from "express";
import * as UserCtrl from "../controllers/user.controller";

const router = Router();

router.post("/createUser", UserCtrl.createUser);

export default router;
