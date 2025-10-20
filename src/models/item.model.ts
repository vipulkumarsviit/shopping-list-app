import { Types } from "mongoose";

export type ItemId = string;

export interface Item {
  id: Types.ObjectId; // alias for _id
  name: string;
  quantity: number;
  unit?: string;
  notes?: string;
  purchased: boolean;
  createdAt: string;
  updatedAt: string;
}