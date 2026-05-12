export interface Customers {
  customerid: number;
  name: string;
  address: string;
  phone: string;
}

export interface searchParams {
  keyword: string;
  sortBy: string;
  sort: "asc" | "desc";
  page: number;
  limit: number;
}

export interface customersState {
  customers: Customers[];
  page: Number;
  pages: Number;
  total: Number;
  getCustomers: (params: searchParams) => void;
  addCustomers: (data: Omit<Customers, "customerid">) => void;
  deleteCustomers: (customerid: string) => void;
  updateCustomers: (customerid: string, data: Customers) => void;
}
