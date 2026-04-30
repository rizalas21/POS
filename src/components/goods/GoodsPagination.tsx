import { useRouter, useSearchParams } from "next/navigation";

export default function GoodsPagination({ page, pages, total, limit }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const overLimit = (Number(page) - 1) * Number(limit) + Number(limit);

  const setPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex p-2 justify-between">
      <p>
        showing {!total ? 0 : (Number(page) - 1) * Number(limit) + 1} to{" "}
        {overLimit >= Number(total) || limit === "0"
          ? Number(total)
          : overLimit}{" "}
        of {total.toString()} entries
      </p>
      <div className="flex border border-gray-500/50 rounded-sm">
        <button
          disabled={page === 1}
          className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
            page === 1
              ? "text-gray-500/50 cursor-default"
              : "cursor-pointer hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        {Array.from({ length: Number(pages) }).map((_, i) => (
          <button
            key={i}
            className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 cursor-pointer hover:text-white hover:bg-blue-500 ${
              i + 1 === page ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === pages}
          className={`bg-white-500 border-x border-gray-500/50 px-3 py-1 text-blue-500 ${
            page === pages
              ? "text-gray-500/50 cursor-default"
              : "cursor-pointer hover:bg-blue-500 hover:text-white"
          }`}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
