import {Router} from "express";
const router = Router();
import os from "os";

import multer from "multer";
const upload = multer({ dest: os.tmpdir() });

import verifyAuth from "../middleware/verifyAuth";
import {addChat, getChats, uploadFile} from "../controllers/chat.controller";

router.get("/get", verifyAuth, getChats);
router.post( "/send", verifyAuth, addChat );
router.post("/upload", verifyAuth, upload.single("file"), uploadFile);

export default router;