import { ProductSchema } from "../schemas/ProductSchema.js";

export class ProductModel {
  constructor(data) {
    // Validating each product of all products response
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid product data");
    }

    // 1️ Validate required fields of each product
    ProductSchema.required.forEach((field) => {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    });

    // 2️ Validate types
    Object.entries(ProductSchema.types).forEach(([field, expectedType]) => {
      if (field in data && typeof data[field] !== expectedType) {
        console.log(data[field]);
        throw new Error(`Invalid type for ${field}. Expected ${expectedType}`);
      }
    });

    // 3️ Apply defaults + incoming data
    const merged = {
      ...ProductSchema.defaults,
      ...data,
    };

    Object.assign(this, merged);

    // 4️ Domain (business) logic/rules for Product
    if (this.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (this.stock_total < 0) {
      throw new Error("Total stock cannot be negative");
    }

    if (this.stock_reserved < 0) {
      throw new Error("Reserved stock cannot be negative");
    }

    if (this.stock_reserved > this.stock_total) {
      throw new Error("Reserved stock cannot exceed total stock");
    }

    if (this.size !== null && this.size <= 0) {
      throw new Error("Size must be greater than 0");
    }
  }

  toPlainObject() {
    return {
      id_class: this.id_class,
      price: this.price,
      description: this.description,
      title: this.title,
    };
  }
}
