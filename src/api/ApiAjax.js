const BASE_URL = "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const { signal, ...customConfig } = options;
  const config = {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    ...customConfig,
    signal,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    console.log("ALL RESPONSES: ", res);

    // 1. Detectar si la respuesta es JSON o basura (HTML/Text)
    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    // 2. Extraer el cuerpo de forma segura
    const data = isJson ? await res.json() : null;

    // 3. Si la respuesta es OK (200-299), devolvemos el estándar
    if (res.ok) {
      return data;
    }

    // 4. Si es un error del servidor (400, 500), devolvemos el JSON del backend
    // Si no es JSON, fabricamos un error estándar
    console.log("DATA JSON JUST RECIEVED: ", data);

    throw (
      data || {
        status: "NETWORK_ERROR",
        message: `Error ${res.status}: El servidor no respondió con JSON`,
        code: res.status,
      }
    );
  } catch (err) {
    // 5. Errores de Red Reales (Sin internet, URL mal formada, AbortError)
    if (err.status) throw err; // Ya lo procesamos arriba
    console.log('before throw error');
    throw {
      status: "NETWORK_ERROR",
      message:
        err.name === "AbortError"
          ? "Request timed out"
          : "No se pudo conectar con el servidor",
      code: 0,
    };
  }
}

export const apiGet = (endpoint, signal) =>
  request(endpoint, { method: "GET", signal });

export const apiPost = (endpoint, body, signal) =>
  request(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    signal
  });

  
