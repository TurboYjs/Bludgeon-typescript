import { errorResponse } from "../utils/error.handler";
import { Response, Request } from "express";
import { serializeBigInt } from "../utils/serializeBigInt";
import {
  createCredit,
  deleteCredit,
  getCredits,
  updateCredit,
} from "../database/repository/crediRepo";

export const createCreditController = async (req: Request, res: Response) => {
  const { Credit } = req.body.data;
  try {
    const row = await createCredit(Credit);
    res.status(200).json({
      row: serializeBigInt(row),
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 404, false);
  }
};

export const getCreditsController = async (req: Request, res: Response) => {
  try {
    const rows = await getCredits();
    res.status(200).json({
      rows: serializeBigInt(rows),
    });
  } catch (error) {
    errorResponse(res, error.message, 404, false);
  }
};

export const updateCreditController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Credit } = req.body.data;
  try {
    const row = await updateCredit(Number(id), Credit);
    res.status(200).json({
      row: serializeBigInt(row),
    });
  } catch (error) {
    errorResponse(res, error.message, 404, false);
  }
};

export const deleteCreditController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const row = await deleteCredit(Number(id));
    res.status(200).json({ row: row.id });
  } catch (error) {
    console.log(error);
    errorResponse(res, error.message, 404, false);
  }
};
