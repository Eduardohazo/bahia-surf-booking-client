// src/api/api.js
import { apiGet, apiPost } from "../api/ApiAjax";

/* ================= PRODUCTS ================= */

// Get all products
export async function getProductsFromServer(ProductModel, signal) {
  try {
    const response = await apiGet("/product/get-all-products", signal);

    let data = response.data;

    if (ProductModel && data) {
      // Response data structure validation for single and several products
      if (Array.isArray(data)) {
        data = data.map((item) => {
          const model = new ProductModel(item).toPlainObject();
          return { ...model };
        });
      } else {
        data = new ProductModel(data);
      }
    }

    // Return full response but with validated data prop
    return {
      ...response,
      data,
    };
  } catch (err) {
    if (err.message === "AbortError") {
      console.log("Request aborted:", signal?.reason);
      throw err;
    }
    console.log("before throw error", err);
    throw err;
  }
}

// Get product by id
export async function getProduct(id) {
  try {
    return await apiGet(`/product/get-product/${id}`);
  } catch (err) {
    console.error("Error fetching product", err);
    return null;
  }
}

/* ================= ORDERS ================= */

// Create order
export async function createOrder(
  contact,
  date,
  schedule,
  paymentMethod,
  safeCart,
  OrderModel,
  signal,
) {
  // 1. ASSEMBLE & FORMAT REQUEST

  const rawOrder = {
    name: contact?.name,
    // email: "bad email :(",
    email: contact?.email,
    phone: contact?.phone,
    reservationDate: date?.reservationDate,
    schedule: schedule?.schedule,
    paymentMethod: paymentMethod,
    items: safeCart,
  };

  const newOrder = OrderModel.createRequest(rawOrder);

  console.log("NEW ORDER BEFORE CREATION:", newOrder);

  // 2. FETCH
  const response = await apiPost("/order/create-order", newOrder, signal);

  // 3. MODEL THE RESPONSE DATA
  if (response.data) {
    const isValid = OrderModel.validateResponse(response);

    if (!isValid) {
      // ALERT: The data is "broken" according to your schema
      console.error("CRITICAL: Backend returned an invalid order object!");
      // You can choose to throw an error here if you want to stop the app
      // throw new Error("Invalid Order Data");
    }
  }

  return response;
}

export async function getOrderFromServer(orderId, OrderModel, signal) {
  try {
    // This hits your Node.js backend
    const response = await apiGet(`/order/get-order/${orderId}`, signal);

    // Use your OrderModel to make sure the data is clean
    if (OrderModel && response) {
      const isValid = OrderModel.validateResponse(response);

      if (!isValid) {
        // ALERT: The data is "broken" according to your schema
        console.error("CRITICAL: Backend returned an invalid order object!");
        // You can choose to throw an error here if you want to stop the app
        // throw new Error("Invalid Order Data");
      }
    }

    return response;
  } catch (err) {
    console.error("Error fetching order from server:", err);
    throw err;
  }
}

// Create order
export async function createPaypalOrderAPI(id, signal) {
  // 1. ASSEMBLE & FORMAT REQUEST

  // 2. FETCH
  const response = await apiPost(
    "/payments/create-intent",
    { orderId: id },
    signal,
  );

  console.log("response after create paypal order >>> ", response);

  // Check for the approvalUrl inside response.data per your fetch logic
  if (response?.data?.approvalUrl) {
    return response;
    // window.location.href = response.data?.approvalUrl;
  } else {
    alert("Failed to create PayPal order");
  }

  return response;
}

/* ================= AUTH ================= */

// Login
export async function login(email, password) {
  try {
    const data = await apiPost("/user/login", { email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
      return { success: true };
    }

    return {
      success: false,
      error: "Credenciales incorrectas",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "Error al iniciar sesión",
    };
  }
}
