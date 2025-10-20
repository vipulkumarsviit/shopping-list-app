import { model, Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String },
    notes: { type: String },
    purchased: { type: Boolean, default: false }
  },
  {
    timestamps: true // auto-manages createdAt and updatedAt
  }
);

// Optional alias if you want `id` instead of `_id`
ItemSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
ItemSchema.set("toJSON", { virtuals: true });

export const ItemModel = model("Item", ItemSchema);
