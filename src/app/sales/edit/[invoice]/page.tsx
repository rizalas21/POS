import AddPurchase from "@/components/purchases/add/AddPurchase";
import EditPurchase from "@/components/purchases/edit/UpdatePurchase";

export default function Page() {
  return (
    <main className="space-y-3">
      <h2 className="text-2xl text-gray-700">Sales</h2>
      <div className="flex flex-col shadow-2xl h-full bg-white gap-5">
        <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center px-2 py-2">
          <p className="text-4xl text-slate-400 font-bold">Transaction</p>
        </div>
        <EditPurchase />
      </div>
    </main>
  );
}
