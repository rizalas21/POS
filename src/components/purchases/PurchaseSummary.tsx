import { PurchaseItem } from "@/app/types/purchaseItem";
import { Suppliers } from "@/app/types/suppliers";
import { Dispatch, SetStateAction } from "react";

export default function PurchaseSummary({
  input,
  setInput,
  suppliers,
  supplier,
  setSupplier,
}: {
  input: {
    invoice: string;
    time: Date;
    totalsum: number;
    supplier: number;
    operator: string;
    items: PurchaseItem[];
  };
  setInput: Dispatch<
    SetStateAction<{
      invoice: string;
      time: Date;
      totalsum: number;
      supplier: number;
      operator: string;
      items: PurchaseItem[];
    }>
  >;
  suppliers: Suppliers[];
  supplier: {
    supplierid: string;
    name: string;
    address: string;
    phone: string;
  };
  setSupplier: Dispatch<
    SetStateAction<{
      supplierid: string;
      name: string;
      address: string;
      phone: string;
    }>
  >;
}) {
  return (
    <section className="px-10 space-y-5">
      <div className="flex justify-between items-center">
        <span>Total Summary</span>
        <input
          className="border rounded border-gray-300 w-4/5 min-h-8 bg-slate-200/25 cursor-not-allowed text-slate-800"
          type="text"
          name=""
          id=""
          value={input.totalsum + ".00"}
          disabled
        />
      </div>
      <div className="flex justify-between items-center">
        <label>Supplier</label>
        <select
          className="border rounded border-gray-300 w-4/5 min-h-8"
          name=""
          id=""
          required
          value={String(supplier.supplierid)}
          onChange={(e) => {
            const selectedSupplierid = e.target.value;
            const selectedItem = suppliers.find(
              (item) => String(item.supplierid) === selectedSupplierid
            );
            if (selectedItem) {
              setSupplier({
                supplierid: String(selectedItem.supplierid),
                name: selectedItem.name,
                address: selectedItem.address,
                phone: selectedItem.phone,
              });
            }
          }}
        >
          <option value="">Choose Goods</option>
          {suppliers.length > 0
            ? suppliers.map((item) => (
                <option key={item.supplierid} value={item.supplierid}>
                  {item.name}
                </option>
              ))
            : ""}
        </select>
      </div>
    </section>
  );
}
