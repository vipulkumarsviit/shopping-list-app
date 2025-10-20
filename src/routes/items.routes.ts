import { Router } from "express";
import { env } from "../configs/env";
import { ItemsController } from "../controllers/items.controller";
import { InMemoryItemRepository, MongooseItemRepository } from "../repositories/items.repository";
import { ItemsService } from "../services/items.service";

const inMemoryItemRepository = new InMemoryItemRepository();
const mongooseItemRepository = new MongooseItemRepository();
const service = new ItemsService(env.MODE === 'in_memory' ? inMemoryItemRepository : mongooseItemRepository);
const controller = new ItemsController(service);

export const itemsRouter = Router();

itemsRouter.get("/", controller.list);
itemsRouter.post("/", controller.create);
itemsRouter.get("/:id", controller.get);
itemsRouter.put("/:id", controller.update);
itemsRouter.patch("/:id", controller.setPurchased);
itemsRouter.delete("/:id", controller.delete);
