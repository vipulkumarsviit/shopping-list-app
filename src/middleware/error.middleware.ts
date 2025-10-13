import { Request, Response, NextFunction } from "express";
import { error } from "../utils/http";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Minimal, safe error normalization
  const message = err instanceof Error ? err.message : "Unexpected error";
  res.status(500).json(error("INTERNAL_ERROR", message));
}
