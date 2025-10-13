import { Router } from "express";
import { ItemsController } from "../controllers/items.controller";
import { ItemsService } from "../services/items.service";
import { InMemoryItemRepository } from "../repositories/items.repository";

const repo = new InMemoryItemRepository();
const service = new ItemsService(repo);
const controller = new ItemsController(service);

export const itemsRouter = Router();

itemsRouter.get("/", controller.list);
itemsRouter.post("/", controller.create);
itemsRouter.get("/:id", controller.get);
itemsRouter.put("/:id", controller.update);
itemsRouter.patch("/:id", controller.setPurchased);
itemsRouter.delete("/:id", controller.delete);
