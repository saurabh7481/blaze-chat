import {Router} from "express";
const router = Router();

import checkUserDetails from "../middleware/checkUserDetals";
import {signUp, login} from "../controllers/auth.controller";

router.post( "/signup", checkUserDetails, signUp );
router.post( "/login", login );
// router.get("/logout", logout);

export default router;