interface AuthUser {
  id: string;
  email: string;
  username?: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
}
