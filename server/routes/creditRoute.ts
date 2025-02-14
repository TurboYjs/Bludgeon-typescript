import {
  createCreditController,
  deleteCreditController,
  getCreditsController,
  updateCreditController,
} from "../controllers/creditController";
import { Router } from "express";

const route = Router();

route
  .get("/", getCreditsController)
  .get("/:id", updateCreditController)
  .post("/", createCreditController)
  .delete("/:id", deleteCreditController);

export { route as creditRoute };
