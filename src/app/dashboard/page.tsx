import {
  faArrowLeft,
  faCalendar,
  faCheck,
  faComments,
  faDatabase,
  faDollarSign,
  faDownload,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function dashboard() {
  return (
    <main className="space-y-3">
      <header className="flex justify-between">
        <h1 className="text-2xl text-gray-700">Dashboard</h1>
        <button className="px-2 py-1 text-white bg-blue-600 rounded">
          <FontAwesomeIcon icon={faDownload} />
          <span>Generate Report</span>
        </button>
      </header>
      <section className="shadow-lg h-auto border border-slate-500/25 rounded">
        <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-2 flex justify-start items-center bg-slate-100">
          <h2 className="text-blue-600 font-bold">Date Settings</h2>
        </header>
        <form className="flex justify-between px-4 py-4 w-full bg-white border-y border-slate-500/50">
          <fieldset className="space-y-2 flex flex-col w-2/5">
            <label className="text-slate-500">Start Date</label>
            <input
              type="date"
              className="border rounded py-1 px-2 border-slate-500/50"
            />
          </fieldset>
          <fieldset className="space-y-2 flex flex-col w-2/5">
            <label className="text-slate-500">End Date</label>
            <input
              type="date"
              className="border rounded py-1 px-2 border-slate-500/50"
            />
          </fieldset>
        </form>
        <div className="w-full h-[8vh] pl-2 flex justify-start items-center bg-slate-100 gap-2">
          <button
            className="flex w-[8vw] h-auto justify-between items-center bg-green-600 cursor-pointer rounded"
            type="submit"
            // onClick={handleSubmit}
          >
            <FontAwesomeIcon
              className="rounded-l text-center bg-green-700 px-2 py-1 text-slate-300 w-1/5 text-white"
              icon={faCheck}
            />
            <p className="rounded-l text-center bg-green-500 px-2 py-1 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
              Query
            </p>
          </button>
          <button className="flex w-[8vw] h-auto justify-between items-center bg-yellow-600 cursor-pointer rounded">
            <FontAwesomeIcon
              className="rounded-l text-center bg-yellow-700 px-2 py-1 text-slate-300 w-1/5 text-white"
              icon={faArrowLeft}
            />
            <p
              className="rounded-l text-center bg-yellow-500 px-2 py-1 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
              // onClick={() => router.back()}
            >
              Reset
            </p>
          </button>
        </div>
      </section>
      <section className="grid grid-cols-4 gap-4 w-full bg-slate-100">
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-blue-700 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-xs text-blue-700 font-bold ">
              PURCHASES
            </label>
            <p className="text-lg font-bold">RP 715.000,00</p>
          </div>
          <FontAwesomeIcon icon={faCalendar} className="text-4xl opacity-25" />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-green-600 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-xs text-green-600 font-bold ">SALES</label>
            <p className="text-lg font-bold">RP 859.000,00</p>
          </div>
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-4xl opacity-25"
          />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-cyan-500 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-xs text-cyan-500 font-bold ">EARNINGS</label>
            <p className="text-lg font-bold">RP 144.000,00</p>
          </div>
          <FontAwesomeIcon
            icon={faDollarSign}
            className="text-4xl opacity-25"
          />
        </div>
        <div className="flex justify-between items-center px-4 py-4 border-l-3 border-yellow-500 rounded-md bg-white text-slate-900 shadow-lg">
          <div>
            <label className="text-xs text-yellow-500 font-bold ">
              TOTAL SALES
            </label>
            <p className="text-lg font-bold">4</p>
          </div>
          <FontAwesomeIcon icon={faComments} className="text-4xl opacity-25" />
        </div>
      </section>
    </main>
  );
}
