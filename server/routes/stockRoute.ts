import {
  getStockController,
  createStockController,
  getStocksController,
} from "../controllers/stockController";
import { Router } from "express";

const route = Router();

route
  .get("/", getStocksController)
  .get("/:id", getStockController)
  .post("/", createStockController);

export { route as stockRoute };
