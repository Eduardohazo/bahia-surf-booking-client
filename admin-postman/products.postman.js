// POSTMAN REQUESTS

// let newClasses = [
//   {
//     id_class: "SURF-CLASS",       
//     title: "Surf Class - 2 hours",
//     description: "2 hours surf class.",
//     price: 10.00,               
//   }
// ];

// // GET
// async function getAllProducts() {
//   try {
//     const response = await fetch("http://localhost:3000/api/product/get-all-products");

//     console.log(response);

//     const data = await response.json();
//     console.log("Response:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// getAllProducts();

// // POST
// async function createProduct(newProduct) {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/product/create-product",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newProduct),
//       },
//     );

//     const data = await response.json();
//     console.log("Status:", response.status, "Response:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// // Ejecutar la carga
// newClasses.forEach((item) => {
//   createProduct(item);
// });


// PUT

// DELETE


