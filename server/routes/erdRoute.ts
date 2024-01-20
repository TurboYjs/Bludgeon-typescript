
import { Router } from "express";
import {getErdController} from "../controllers/erdController";

const route = Router();

route
  .get("/", getErdController)

export { route as erdRoute };
