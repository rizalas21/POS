import { Customers } from "@/app/types/customers";
import { Item } from "@/app/types/sales";
import { Suppliers } from "@/app/types/suppliers";
import { Dispatch, SetStateAction } from "react";

export default function SalesSummary({
  input,
  setInput,
  customers,
  customer,
  setCustomer,
}: {
  input: {
    invoice: string;
    time: Date;
    totalsum: number;
    pay: number;
    change: number;
    customer: number;
    operator: string;
    items: Item[];
  };
  setInput: Dispatch<
    SetStateAction<{
      invoice: string;
      time: Date;
      totalsum: number;
      pay: number;
      change: number;
      customer: number;
      operator: string;
      items: Item[];
    }>
  >;
  customers: Customers[];
  customer: {
    customerid: string;
    name: string;
    address: string;
    phone: string;
  };
  setCustomer: Dispatch<
    SetStateAction<{
      customerid: string;
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
          value={String(customer.customerid)}
          onChange={(e) => {
            const selectedSupplierid = e.target.value;
            const selectedItem = customers.find(
              (item) => String(item.customerid) === selectedSupplierid
            );
            if (selectedItem) {
              setCustomer({
                customerid: String(selectedItem.customerid),
                name: selectedItem.name,
                address: selectedItem.address,
                phone: selectedItem.phone,
              });
              setInput({ ...input, customer: selectedItem.customerid });
            }
          }}
        >
          <option value="">Choose Goods</option>
          {customers.length > 0
            ? customers.map((item) => (
                <option key={item.customerid} value={item.customerid}>
                  {item.name}
                </option>
              ))
            : ""}
        </select>
      </div>
    </section>
  );
}
