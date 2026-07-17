export default function GoodsTableFooter() {
  return (
    <tfoot className="w-full">
      <tr className="flex w-full justify-center text-slate-500">
        <th className="w-[9vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Barcode</h3>
        </th>
        <th className="w-[7vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Name</h3>
        </th>
        <th className="w-[7vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Stock</h3>
        </th>
        <th className="w-[7vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Unit</h3>
        </th>
        <th className="w-[12vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Purchase Price</h3>
        </th>
        <th className="w-[11vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Selling Price</h3>
        </th>
        <th className="w-[11vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Picture</h3>
        </th>
        <th className="w-[10vw] px-2 py-2 border border-gray-500/25">
          <h3 className="text-left">Action</h3>
        </th>
      </tr>
    </tfoot>
  );
}
