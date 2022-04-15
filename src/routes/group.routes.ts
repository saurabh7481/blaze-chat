import {Router} from "express";
const router = Router();

import {createGroup, addUser, getGroups, removeUser, makeAdmin, addChat} from "../controllers/group.controller"
import verifyAuth from "../middleware/verifyAuth";

router.post("/create", verifyAuth, createGroup);
router.post("/invite", verifyAuth, addUser);
router.get("/get", verifyAuth, getGroups);
router.post("/remove", verifyAuth, removeUser)
router.post("/make-admin", verifyAuth, makeAdmin);
router.post("/addchat", verifyAuth, addChat)

export default router;