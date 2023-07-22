import express from "express"
import { getaAuthenticatedUser, login, signUp } from "../controllers/users";
const router = express.Router();

router.get("/",getaAuthenticatedUser)
router.post("/signup", signUp)
router.post("/login", login)

export default router