export const ProductSchema = {
  required: ["id_class", "title", "description", "price"],
  types: {
    id_class: "string",
    title: "string",
    description: "string",
    price: "number",
  },
  defaults: {
    price: 10,
  }
};




