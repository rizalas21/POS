import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function PurchaseActions({
  handleSubmit,
  router,
}: {
  handleSubmit: () => Promise<void | null>;
  router: AppRouterInstance;
}) {
  return (
    <section className="flex w-full justify-start text-white font-thin rounded-[5px] text-center bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
      <button
        className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-green-600 cursor-pointer"
        // type="submit"
        // onClick={handleSubmit}
      >
        <FontAwesomeIcon
          className="rounded-l text-center bg-green-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white"
          icon={faPlus}
        />
        <p className="rounded-l text-center bg-green-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-green-700 h-full text-white font-medium">
          Finish
        </p>
      </button>
      <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-yellow-600">
        <FontAwesomeIcon
          className="rounded-l text-center bg-yellow-700 px-2.5 py-1.5 text-slate-300 w-1/5 text-white cursor-pointer"
          icon={faArrowLeft}
        />
        <p
          className="rounded-l text-center bg-yellow-500 px-2.5 py-1.5 text-slate-300 w-4/5 hover:bg-yellow-700 h-full text-white font-medium cursor-pointer"
          onClick={() => router.back()}
        >
          Back
        </p>
      </button>
    </section>
  );
}
