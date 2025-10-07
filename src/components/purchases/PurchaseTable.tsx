import { Goods } from "@/app/types/goods";
import { PurchaseItem } from "@/app/types/purchaseItem";

export default function PurchaseTable({
  input,
  goods,
}: {
  input: {
    invoice: string;
    time: Date;
    totalsum: number;
    supplier: number;
    operator: string;
    items: PurchaseItem[];
  };
  goods: Goods[];
}) {
  return (
    <table className="border-collapse table-auto px-10 w-full">
      <thead className="w-full px-10">
        <tr className="flex justify-center text-slate-500">
          <th className="flex justify-between w-2/12 px-2 py-2 border-y border-gray-500/25 text-center">
            <h3>No.</h3>
          </th>
          <th className="flex justify-between w-3/12 px-2 py-2 border-y  border-gray-500/25 text-center">
            <h3>Barcode</h3>
          </th>
          <th className="flex justify-between w-5/12 px-2 py-2 border-y  border-gray-500/25 text-center">
            <h3>Name</h3>
          </th>
          <th className="flex justify-between w-5/12 px-2 py-2 border-y  border-gray-500/25 text-center">
            <h3>Qty</h3>
          </th>
          <th className="flex w-2/12 px-2 py-2 border-y  border-gray-500/25 text-center">
            <h3>Price</h3>
          </th>
          <th className="flex w-2/12 px-2 py-2 border-y  border-gray-500/25 text-center">
            <h3>Total Price</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {input.items.length > 0 ? (
          input.items.map((data: PurchaseItem, index: any) => (
            <tr
              className={`flex w-full justify-center text-slate-500 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-100"
              }`}
              key={index}
            >
              <td className="w-2/12 px-2 py-2 text-center">{index + 1}</td>
              <td className="w-3/12 px-2 py-2 text-center">{data.invoice}</td>
              <td className="w-5/12 px-2 py-2 text-center">
                {goods.find((good) => good.barcode === data.itemcode)?.name ||
                  "-"}
              </td>
              <td className="w-5/12 px-2 py-2 text-center">{data.quantity}</td>
              <td className="w-2/12 px-2 py-2 text-center">
                {data.purchaseprice}
              </td>
              <td className="w-2/12 px-2 py-2 text-center">
                {data.totalprice}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="bg-slate-100 text-center py-6 text-gray-500 border-y border-slate-200 w-full"
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
