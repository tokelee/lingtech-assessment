import {Router} from "express";
import TaskRoutes from "./task.route.js"
const router = Router();

const api_base_path = "/api";

router.use(api_base_path, TaskRoutes);


export default router;
