import { Router } from "express";
import { getAlluser } from "../controllers/user_controller";
const router = Router();

router.get('/test',getAlluser)

export default router;