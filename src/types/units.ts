export interface Units {
  unit: string;
  name: string;
  note: string;
}

export interface unitSearch {
  keyword?: string;
  sortBy?: string;
  sort?: string;
  page?: string;
  limit?: string;
}

export interface unitState {
  units: Units[];
  page: Number;
  pages: Number;
  total: Number;
  getUnits: (params: unitSearch) => void;
  addUnits: (data: Units) => void;
  deleteUnits: (unit: string) => void;
  updateUnits: (unit: string, data: Units) => void;
}
