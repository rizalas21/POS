export interface Suppliers {
  supplierid: number;
  name: string;
  address: string;
  phone: string;
}

export interface SearchParams {
  keyword: string;
  sortBy: string;
  sort: "asc" | "desc";
  page: number;
  limit: number;
}

export interface SuppliersState {
  suppliers: Suppliers[];
  page: number;
  pages: number;
  total: number;
  getSuppliers: (params: SearchParams) => void;
  addSuppliers: (data: Omit<Suppliers, "supplierid">) => void;
  deleteSuppliers: (supplierid: string) => Promise<{
    success: boolean;
    message: string;
  }>;
  updateSuppliers: (
    supplierid: string,
    data: Omit<Suppliers, "supplierid">,
  ) => void;
}
