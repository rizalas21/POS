export interface Users {
  userid: string;
  email: string;
  name: string;
  role: string;
}

export interface SearchUsers {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface usersState {
  users: Users[];
  page: Number;
  pages: Number;
  total: Number;
  setUsers: (data: Users[]) => void;
  getUsers: (params: SearchUsers) => void;
  addUsers: (data: Omit<Users, "userid">) => void;
  deleteUsers: (userid: string) => void;
  updateUsers: (userid: string, data: Omit<Users, "userid">) => void;
}
