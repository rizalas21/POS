"use client";

import useDashboard from "@/hooks/useDashboard";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function FilterDashboard() {
  const { year, month, lastDate, params, setParams } = useDashboard();

  const [date, setDate] = useState({
    startDate: "2020-01-01",
    endDate: `${year}-${month}-${lastDate}`,
  });

  const handleQuery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParams({ ...params, ...date });
  };

  const handleReset = () => {
    setDate({
      startDate: "2020-01-01",
      endDate: `${year}-${month}-${lastDate}`,
    });

    setParams({
      ...params,
      startDate: "2020-01-01",
      endDate: `${year}-${month}-${lastDate}`,
      page: 1,
    });
  };

  return (
    <form
      className="shadow-lg h-auto border border-slate-500/25 rounded"
      onSubmit={handleQuery}
    >
      <header className="w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pl-2 py-2 flex justify-start items-center bg-slate-100">
        <h2 className="text-blue-600 font-bold">Date Settings</h2>
      </header>
      <section className="flex justify-between px-4 py-4 w-full bg-white border-y border-slate-500/50">
        <fieldset className="space-y-2 flex flex-col w-2/5">
          <label className="text-slate-500">Start Date</label>
          <input
            name="startDate"
            type="date"
            className="border rounded py-1 px-2 border-slate-500/50"
            defaultValue={date.startDate}
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
          />
        </fieldset>
        <fieldset className="space-y-2 flex flex-col w-2/5">
          <label className="text-slate-500">End Date</label>
          <input
            name="endDate"
            type="date"
            className="border rounded py-1 px-2 border-slate-500/50"
            defaultValue={`${year}-${month}-${lastDate}`}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
          />
        </fieldset>
      </section>
      <div className="w-full h-[8vh] pl-2 flex justify-start items-center bg-slate-100 gap-2">
        <button
          className="flex w-[8vw] h-auto justify-between items-center bg-green-600 cursor-pointer rounded"
          type="submit"
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
            onClick={handleReset}
          >
            Reset
          </p>
        </button>
      </div>
    </form>
  );
}
