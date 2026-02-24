const ADMIN_SESSION_KEY = "owl_admin_session";

export const ADMIN_PASSWORD = "Owlai@12345";

export function getAdminSession(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminSession(authenticated: boolean): void {
  try {
    if (authenticated) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch {
    // ignore
  }
}

export function login(password: string): boolean {
  const ok = password === ADMIN_PASSWORD;
  setAdminSession(ok);
  return ok;
}

export function logout(): void {
  setAdminSession(false);
}
