// models/OrderModel.js
import { OrderSchema } from "../schemas/OrderSchema.js";

export class OrderModel {
  static createRequest(data) {
    // Validation Logic using the Schema
    OrderSchema.request.required.forEach((field) => {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`Field ${field} is required`);
      }
    });

    // Formatting Logic (Ensuring types match the "request.types" in server schema)
    return {
      name: String(data.name),
      email: String(data.email),
      phone: Number(data.phone),
      reservationDate: String(data.reservationDate),
      schedule: String(data.schedule),
      paymentMethod: {
        method: String(data.paymentMethod.method || data.paymentMethod),
      },
      items: Array.isArray(data.items) ? data.items : [],
    };
  }

  static validateResponse(response) {
    // 1. Get the actual order object (handle the 'data' wrapper)
    const order = response.data;

    // 2. Start with the required Request fields + Base Metadata
    let expectedFields = [
      ...OrderSchema.request.required,
      ...OrderSchema.response.base,
    ];

    // 3. ONLY expect payment fields if the status is PAID
    if (order.status === "PAID") {
      expectedFields = [...expectedFields, ...OrderSchema.response.payment];
    }

    // 4. Run the check
    const isComplete = expectedFields.every((field) =>
      Object.prototype.hasOwnProperty.call(order, field),
    );

    if (!isComplete) {
      // Log which specific field is missing to help you debug
      const missing = expectedFields.filter(
        (f) => !Object.prototype.hasOwnProperty.call(order, f),
      );
      console.warn("Validation Failed. Missing fields:", missing);
      return false;
    }

    return true;
  }
}
