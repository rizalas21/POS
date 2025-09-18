export interface Suppliers {
  supplierid: number;
  name: string;
  address: string;
  phone: string;
}

export interface SearchParams {
  keyword: string;
  sortBy: string;
  sort: string;
  page: string;
  limit: string;
}

export interface SuppliersState {
  suppliers: Suppliers[];
  page: number;
  pages: number;
  total: number;
  getSuppliers: (params: SearchParams) => void;
  addSuppliers: (data: Omit<Suppliers, "supplierid">) => void;
  deleteSuppliers: (supplierid: string) => void;
  updateSuppliers: (supplierid: string, data: Suppliers) => void;
}
