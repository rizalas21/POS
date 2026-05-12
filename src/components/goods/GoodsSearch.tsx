import { useRouter, useSearchParams } from "next/navigation";
export default function GoodsSearch({
  page,
  pages,
  total,
}: {
  page: number;
  pages: number;
  total: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (name === "limit" || (name === "keyword" && page === pages)) {
      params.set(name, value);
      params.set("page", "1");
    } else {
      params.set(name, value);
    }

    router.push(`?${params}`);
  };
  return (
    <div className="flex justify-between items-center mb-5 px-2">
      <div className="w-[17%] flex justify-between items-center">
        <p>Show</p>
        <input
          className="border border-slate-300 w-2/6 px-1.5"
          title="show-data"
          type="number"
          name="limit"
          min={1}
          max={total}
          defaultValue={3}
          onChange={(e) => handleChange(e)}
        />
        <p>entries</p>
      </div>
      <div className="flex w-4/12 justify-evenly items-center">
        <p>Search: </p>
        <input
          className="border-2 border-slate-300 px-2 py-1 h-8"
          title="search"
          type="text"
          name="keyword"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
}
