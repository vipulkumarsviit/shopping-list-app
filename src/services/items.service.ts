import { ObjectId } from "mongodb";
import { CreateItemDTO, PurchasedDTO, UpdateItemDTO } from "../dto/items.dto";
import { Item, ItemId } from "../models/item.model";
import { ItemRepository } from "../repositories/items.repository";

export class ItemsService {
  constructor(private repo: ItemRepository) {}

  async list(): Promise<Item[]> {
    return this.repo.list();
  }

  async get(id: ItemId): Promise<Item | null> {
    return this.repo.getById(id);
  }

  async create(dto: CreateItemDTO): Promise<Item> {
    const now = new Date().toISOString();
    const item: Item = {
      id: new ObjectId(),
      name: dto.name,
      quantity: dto.quantity,
      unit: dto.unit,
      notes: dto.notes,
      purchased: false,
      createdAt: now,
      updatedAt: now
    };
    return this.repo.create(item);
  }

  async update(id: ItemId, dto: UpdateItemDTO): Promise<Item | null> {
    // Only allow known fields
    const updatePayload: Partial<Item> = {
      name: dto.name,
      quantity: dto.quantity,
      unit: dto.unit,
      notes: dto.notes,
      purchased: dto.purchased
    };
    return this.repo.update(id, updatePayload);
  }

  async setPurchased(id: ItemId, dto: PurchasedDTO): Promise<Item | null> {
    return this.repo.update(id, { purchased: dto.purchased });
  }

  async delete(id: ItemId): Promise<boolean> {
    return this.repo.delete(id);
  }
}
