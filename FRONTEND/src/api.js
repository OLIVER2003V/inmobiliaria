const BASE_URL = process.env.REACT_APP_API_URL; // CRA

// fetch con JSON por defecto y manejo básico de errores
export async function apiFetch(path, { method = "GET", body, token, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}), // cambia a Bearer si usas JWT
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // si esperas JSON:
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // opcional: lanza error con info del backend
    const msg = data?.message || res.statusText || "Request failed";
    throw new Error(msg);
  }
  return data;
}
