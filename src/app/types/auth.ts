interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}
