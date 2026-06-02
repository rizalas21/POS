"use client";

import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterDashboard({
  sp,
}: {
  sp: { startDate?: string; endDate?: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const lastDate = new Date(year, now.getMonth() + 1, 0)
    .getDate()
    .toString()
    .padStart(2, "0");

  const [date, setDate] = useState({
    startDate: "2026-01-01",
    endDate: `${year}-${month}-${lastDate}`,
  });

  const handleQuery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    params.set("startDate", date.startDate);
    params.set("endDate", date.endDate);

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    setDate({
      startDate: "2020-01-01",
      endDate: `${year}-${month}-${lastDate}`,
    });
  };

  return (
    <form
      className="shadow-lg h-auto border border-slate-500/25 rounded text-slate-900"
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
            value={date.startDate}
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
          />
        </fieldset>
        <fieldset className="space-y-2 flex flex-col w-2/5">
          <label className="text-slate-500">End Date</label>
          <input
            className="border rounded py-1 px-2 border-slate-500/50"
            name="endDate"
            type="date"
            value={`${date.endDate}`}
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
        <Link
          href={`/dashboard?startDate=2020-01-01&endDate=${year}-${month}-${lastDate}`}
          className="flex w-[8vw] h-auto justify-between items-center bg-yellow-600 cursor-pointer rounded"
        >
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
        </Link>
      </div>
    </form>
  );
}
