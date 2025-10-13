import { Item, ItemId } from "../models/item.model";

export interface ItemRepository {
  list(): Promise<Item[]>;
  getById(id: ItemId): Promise<Item | null>;
  create(item: Item): Promise<Item>;
  update(id: ItemId, update: Partial<Item>): Promise<Item | null>;
  delete(id: ItemId): Promise<boolean>;
}

export class InMemoryItemRepository implements ItemRepository {
  private store = new Map<ItemId, Item>();

  async list(): Promise<Item[]> {
    return Array.from(this.store.values());
  }

  async getById(id: ItemId): Promise<Item | null> {
    return this.store.get(id) ?? null;
  }

  async create(item: Item): Promise<Item> {
    this.store.set(item.id, item);
    return item;
  }

  async update(id: ItemId, update: Partial<Item>): Promise<Item | null> {
    const existing = this.store.get(id);
    if (!existing) return null;
    const updated: Item = { ...existing, ...update, updatedAt: new Date().toISOString() };
    this.store.set(id, updated);
    return updated;
  }

  async delete(id: ItemId): Promise<boolean> {
    return this.store.delete(id);
  }
}
