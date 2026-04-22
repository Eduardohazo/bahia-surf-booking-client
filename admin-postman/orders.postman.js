// ORDERS REQUESTS

// // GET ORDER
// const getOrder = async (id) => {
//   const response = await fetch(`http://localhost:3000/api/order/get-order/${id}`);
//   // response.then();
//   response.json().then((res) => console.log(res));
// }

// getOrder('69cda97d8af22af0e065d779');

// // GET ALL ORDERS
// const getAllOrders = async () => {
//   const response = await fetch(`http://localhost:3000/api/order/get-all-orders`);
//   // response.then();
//   response.json().then((res) => console.log(res));
// }

// getAllOrders();

// POST 

async function createOrderMVP() {
  const url = "http://localhost:3000/api/order/create-order";
  
  // La fecha que el usuario eligió en el calendario del frontend
  const selectedDate = new Date("2026-04-10T00:00:00.000Z");

  const orderData = {
    // 1. Quien compra
    name: "Angel Jasso",
    email: "angel@example.com",
    phone: "3312345678",

    // 2. Qué y Cuándo (Lo que el búnker necesita saber)
    reservationDate: selectedDate, // Se convierte a Date real en el server
    schedule: "09:30-11:30",       // El bloque de tiempo elegido

    paymentMethod: {
      method: "paypal"
    },

    // 3. El item basado en tu ProductSchema simplificado
    items: [
      {
        productId: "SURF-CLASS", // El ID único que definiste
        title: "Surf Class - 2 hours",
        price: 10.00
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ ORDEN CREADA");
      console.log("ID Interno:", result.data.id_order);
      console.log("Expira en (Server Time):", result.data.expiresAt);
    } else {
      console.error("❌ ERROR:", result.message);
    }
  } catch (error) {
    console.error("❌ FALLO DE RED:", error.message);
  }
}

createOrderMVP();
