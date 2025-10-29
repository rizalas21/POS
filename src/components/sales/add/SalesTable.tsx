import { Goods } from "@/app/types/goods";
import { Item } from "@/app/types/sales";

export default function SalesTable({
  input,
  goods,
}: {
  input: {
    invoice: string;
    time: Date;
    totalsum: number;
    pay: number;
    change: number;
    customer: number;
    operator: string;
    saleitems: Item[];
  };
  goods: Goods[];
}) {
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="text-slate-500">
          <th className="px-2 py-2 text-center">
            <h3>No.</h3>
          </th>
          <th className="px-2 py-2 text-center">
            <h3>Barcode</h3>
          </th>
          <th className="px-2 py-2 text-center">
            <h3>Name</h3>
          </th>
          <th className="px-2 py-2 text-center">
            <h3>Qty</h3>
          </th>
          <th className="px-2 py-2 text-center">
            <h3>Price</h3>
          </th>
          <th className="px-2 py-2 text-center">
            <h3>Total Price</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {input.saleitems.length > 0 ? (
          input.saleitems.map((data: Item, index: any) => (
            <tr
              className={`text-slate-500 ${
                index % 2 === 0 ? "bg-slate-100" : "bg-white"
              }`}
              key={index}
            >
              <td className="px-2 py-2 text-center">{index + 1}</td>
              <td className="px-2 py-2 text-center">{data.invoice}</td>
              <td className="px-2 py-2 text-center">
                {goods.find((good) => good.barcode === data.itemcode)?.name ||
                  "-"}
              </td>
              <td className="px-2 py-2 text-center">{data.quantity}</td>
              <td className="px-2 py-2 text-center">{data.sellingprice}</td>
              <td className="px-2 py-2 text-center">{data.totalprice}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="bg-slate-100 text-center py-5 text-gray-500 border-y border-slate-200 w-full"
              colSpan={6}
            >
              no items
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
