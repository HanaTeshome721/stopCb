import { Router } from "express";
import { getAlluser,createUser } from "../controllers/user_controller";
const router = Router();

router.get('/test',getAlluser)
router.post('/user',createUser)

export default router;