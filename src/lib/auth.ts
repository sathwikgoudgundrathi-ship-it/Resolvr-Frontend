import { useSyncExternalStore } from "react";
import { apiRequest } from "@/lib/api";

export type UserRole = "public" | "worker" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  phone?: string;
  avatar?: string;
  createdAt: number;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

let currentUser: User | null = null;
const subscribers = new Set<() => void>();
let cachedUser: User | null | undefined;
let cachedSnapshot: { user: User | null; isAuthenticated: boolean } | undefined;

function getAuthSnapshot() {
  if (cachedSnapshot && cachedUser === currentUser) return cachedSnapshot;
  cachedUser = currentUser;
  cachedSnapshot = { user: currentUser, isAuthenticated: !!currentUser };
  return cachedSnapshot;
}

const serverAuthSnapshot = { user: null, isAuthenticated: false };

function notify() {
  subscribers.forEach((fn) => fn());
}

let initialized = false;
function initAuth() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  void apiRequest<AuthResponse>("/auth/session").then((result) => {
    currentUser = result.user ?? null;
  }).catch(() => {
    currentUser = null;
  }).finally(notify);
}

export function useAuth() {
  return useSyncExternalStore(
    (callback) => {
      initAuth();
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    () => {
      initAuth();
      return getAuthSnapshot();
    },
    () => serverAuthSnapshot,
  );
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
  initAuth();
  try {
    const result = await apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    if (!result.success || !result.user) return { success: false, error: result.message ?? "Sign in failed." };
    currentUser = result.user;
    notify();
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Sign in failed." };
  }
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  department?: string;
}): Promise<{ success: boolean; error?: string; user?: User }> {
  initAuth();
  try {
    const result = await apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ ...input, role: "PUBLIC" }),
    });
    if (!result.success || !result.user) return { success: false, error: result.message ?? "Registration failed." };
    currentUser = result.user;
    notify();
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Registration failed." };
  }
}

export async function logoutUser() {
  initAuth();
  try {
    await apiRequest<void>("/auth/logout", { method: "POST" });
  } finally {
    currentUser = null;
    notify();
  }
}
