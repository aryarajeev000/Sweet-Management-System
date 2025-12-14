import Sweet, { ISweet } from "./sweet.model.js";

export class SweetService {
  static async createSweet(data: Partial<ISweet>) {
    return Sweet.create(data);
  }

  static async getAllSweets() {
    return Sweet.find();
  }

  static async searchSweets(query: any) {
    const filter: any = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    return Sweet.find(filter);
  }

  static async updateSweet(id: string, data: Partial<ISweet>) {
    const sweet = await Sweet.findByIdAndUpdate(id, data, { new: true });
    if (!sweet) throw new Error("Sweet not found");
    return sweet;
  }

  static async deleteSweet(id: string) {
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) throw new Error("Sweet not found");
    return sweet;
  }

  static async purchaseSweet(id: string, qty: number) {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error("Sweet not found");
    if (sweet.quantity < qty) throw new Error("Insufficient stock");

    sweet.quantity -= qty;
    return sweet.save();
  }

  static async restockSweet(id: string, qty: number) {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error("Sweet not found");

    sweet.quantity += qty;
    return sweet.save();
  }
}
