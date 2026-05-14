import toRupiah from "@/lib/toRupiah";
import {
  faCalendar,
  faComments,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Cards({
  cards,
}: {
  cards: {
    purchases: number;
    sales: number;
    earnings: number;
    totalSales: number;
  };
}) {
  if (!cards) return null;
  return (
    <section className="grid grid-cols-4 gap-4 w-full bg-slate-100">
      <div className="flex justify-between items-center px-4 py-4 border-l-3 border-blue-700 rounded-md bg-white text-slate-900 shadow-lg">
        <div>
          <label className="text-sm text-blue-700 font-bold ">PURCHASES</label>
          <p className="text-lg font-bold">{toRupiah(cards.purchases)}</p>
        </div>
        <FontAwesomeIcon icon={faCalendar} className="text-4xl opacity-25" />
      </div>
      <div className="flex justify-between items-center px-4 py-4 border-l-3 border-green-600 rounded-md bg-white text-slate-900 shadow-lg">
        <div>
          <label className="text-sm text-green-600 font-bold ">SALES</label>
          <p className="text-lg font-bold">{toRupiah(cards.sales)}</p>
        </div>
        <FontAwesomeIcon icon={faDollarSign} className="text-4xl opacity-25" />
      </div>
      <div className="flex justify-between items-center px-4 py-4 border-l-3 border-cyan-500 rounded-md bg-white text-slate-900 shadow-lg">
        <div>
          <label className="text-sm text-cyan-500 font-bold ">EARNINGS</label>
          <p className="text-lg font-bold">{toRupiah(cards.earnings)}</p>
        </div>
        <FontAwesomeIcon icon={faDollarSign} className="text-4xl opacity-25" />
      </div>
      <div className="flex justify-between items-center px-4 py-4 border-l-3 border-yellow-500 rounded-md bg-white text-slate-900 shadow-lg">
        <div>
          <label className="text-sm text-yellow-500 font-bold ">
            TOTAL SALES
          </label>
          <p className="text-lg font-bold">{cards.totalSales}</p>
        </div>
        <FontAwesomeIcon icon={faComments} className="text-4xl opacity-25" />
      </div>
    </section>
  );
}
