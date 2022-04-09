import {Router} from "express";
const router = Router();

import verifyAuth from "../middleware/verifyAuth";
import {addChat, getChats} from "../controllers/chat.controller";

router.get("/get", verifyAuth, getChats);
router.post( "/send", verifyAuth, addChat );

export default router;