import {Request, Response} from "express";
import {errorResponse} from "../utils/error.handler";
import {getDMMF} from "@prisma/internals";
import {renderDml} from "../utils/render-dml-to-mermaid";
import * as fs from "fs";
import * as path from "path";

export const getErdController = async (req: Request, res: Response) => {
    try {
        const datamodel = await fs.readFileSync(path.resolve('./prisma/schema.prisma'))
        const dmmf = await getDMMF({ datamodel: datamodel.toString() });
        const mermaid = renderDml(dmmf);
        res.status(200).json({
            mermaid: mermaid,
        });
    } catch (error) {
        errorResponse(res, error.message, 404, false);
    }
};