import {Router} from "express";
const router = Router();

import verifyAuth from "../middleware/verifyAuth";
import {addChat} from "../controllers/chat.controller";

router.post( "/send", verifyAuth, addChat );

export default router;