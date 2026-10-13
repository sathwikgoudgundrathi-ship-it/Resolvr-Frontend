const configuredApiBase = import.meta.env.VITE_API_BASE_URL as string | undefined;

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    const apiBase = (configuredApiBase ?? `${typeof window === "undefined" ? "http://localhost" : window.location.origin.replace(/:\d+$/, "")}:8082/api`).replace(/\/$/, "");
    response = await fetch(`${apiBase}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch {
    throw new Error("Cannot reach the Resolvr backend. Start the Spring Boot API and try again.");
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message ?? body?.error ?? `Request failed (${response.status})`);
  }
  return body as T;
}
