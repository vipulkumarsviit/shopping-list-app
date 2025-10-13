export type ItemId = string;

export interface Item {
  id: ItemId;
  name: string;
  quantity: number;
  unit?: string;      // e.g., "kg", "pcs", "L"
  notes?: string;
  purchased: boolean; // default false
  createdAt: string;  // ISO string
  updatedAt: string;  // ISO string
}
