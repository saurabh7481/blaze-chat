import {Router} from "express";
const router = Router();

import {createGroup, addUser, getGroups} from "../controllers/group.controller"
import verifyAuth from "../middleware/verifyAuth";

router.post("/create", verifyAuth, createGroup);
router.post("/invite", verifyAuth, addUser);
router.get("/get", verifyAuth, getGroups);

export default router;