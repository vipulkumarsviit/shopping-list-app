import express from "express";
import cors from "cors";
import morgan from "morgan";
import { itemsRouter } from "./routes/items.routes";
import { errorHandler } from "./middleware/error.middleware";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
  app.use("/api/v1/items", itemsRouter);

  app.use(errorHandler);
  return app;
}
