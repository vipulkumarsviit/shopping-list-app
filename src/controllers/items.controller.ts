import { Request, Response } from "express";
import { ItemsService } from "../services/items.service";
import { createItemSchema, updateItemSchema, purchasedSchema } from "../dto/items.dto";
import { ok, created, error } from "../utils/http";

export class ItemsController {
    constructor(private service: ItemsService) { }

    list = async (_req: Request, res: Response) => {
        const items = await this.service.list();
        res.status(200).json(ok(items));
    };

    get = async (req: Request, res: Response) => {
        const item = await this.service.get(req.params.id);
        if (!item) return res.status(404).json(error("NOT_FOUND", "Item not found"));
        res.status(200).json(ok(item));
    };

    create = async (req: Request, res: Response) => {
        const parsed = createItemSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(error("VALIDATION_ERROR", "Invalid payload", parsed.error.flatten()));
        }
        const item = await this.service.create(parsed.data);
        res.status(201).json(created(item));
    };

    update = async (req: Request, res: Response) => {
        const parsed = updateItemSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(error("VALIDATION_ERROR", "Invalid payload", parsed.error.flatten()));
        }
        const updated = await this.service.update(req.params.id, parsed.data);
        if (!updated) return res.status(404).json(error("NOT_FOUND", "Item not found"));
        res.status(200).json(ok(updated));
    };

    setPurchased = async (req: Request, res: Response) => {
        const parsed = purchasedSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(error("VALIDATION_ERROR", "Invalid payload", parsed.error.flatten()));
        }
        const updated = await this.service.setPurchased(req.params.id, parsed.data);
        if (!updated) return res.status(404).json(error("NOT_FOUND", "Item not found"));
        res.status(200).json(ok(updated));
    };

    delete = async (req: Request, res: Response) => {
        const deleted = await this.service.delete(req.params.id);
        if (!deleted) return res.status(404).json(error("NOT_FOUND", "Item not found"));
        res.status(204).send();
    };
}
