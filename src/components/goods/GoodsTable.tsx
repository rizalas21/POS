import toRupiah from "@/lib/toRupiah";
import { Goods } from "@/types/goods";
import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface Props {
  goods: Goods[];
  params: any;
  handleSort: (e: any) => void;
  setSelectedGoods: any;
  setShowModal: any;
  isLoading: boolean;
}

export default function GoodsTable({
  goods,
  params,
  handleSort,
  setSelectedGoods,
  setShowModal,
  isLoading,
}: Props) {
  const router = useRouter();

  if (isLoading) {
    return <p className="text-center py-6 text-gray-500">Loading...</p>;
  }

  return (
    <table className="w-auto flex flex-col">
      <thead className="w-full">
        <tr className="flex w-full justify-center text-slate-500">
          <th className="flex justify-between min-w-[9vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Barcode</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "barcode"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="barcode"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "barcode"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="barcode"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Name</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "name"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="name"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "name"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="name"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Stock</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "stock"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="stock"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "stock"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="stock"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-between min-w-[7vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Unit</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "unit"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="unit"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "unit"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="unit"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-between min-w-[12vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Purchase Price</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "purchasePrice"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="purchasePrice"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "purchasePrice"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="purchasePrice"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-between min-w-[11vw] px-2 py-2 border border-gray-500/25 items-center">
            <h3>Selling Price</h3>
            <div className="icon-thead flex">
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "sellingPrice"
                    ? "text-gray-700/50"
                    : params.sort === "asc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="sellingPrice"
                value="asc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowUp} size="xs" />
              </button>
              <button
                className={`text-sm cursor-pointer hover:text-gray-700 ${
                  params.sortBy !== "sellingPrice"
                    ? "text-gray-700/50"
                    : params.sort === "desc"
                      ? "text-gray-700"
                      : "text-gray-700/30"
                }`}
                name="sellingPrice"
                value="desc"
                onClick={handleSort}
              >
                <FontAwesomeIcon icon={faArrowDown} size="xs" />
              </button>
            </div>
          </th>

          <th className="flex justify-center items-center min-w-[11vw] px-1 py-2 border border-gray-500/25">
            <h3>Picture</h3>
          </th>

          <th className="flex justify-center items-center min-w-[10vw] px-1 py-2 border border-gray-500/25">
            <h3>Actions</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {goods.length > 0 ? (
          goods.map((g: Goods, index: any) => (
            <tr
              className="flex w-full justify-center text-slate-500"
              key={index}
            >
              <td className="min-w-[9vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {g.barcode}
              </td>
              <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {g.name}
              </td>
              <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {g.stock}
              </td>
              <td className="min-w-[7vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {g.unit}
              </td>
              <td className="min-w-[12vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {toRupiah(g.purchaseprice)}
              </td>
              <td className="min-w-[11vw] min-h-30 px-1 py-2 border border-gray-500/25 text-center">
                {toRupiah(g.sellingprice)}
              </td>
              <td className="min-w-[11vw] px-1 py-2 border border-gray-500/25 text-center">
                {g.picture ? (
                  <img
                    src={g.picture}
                    alt={g.name}
                    className="max-w-[9vw] max-h-[12vw] place-self-center"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>

              <td className="min-w-[10vw] px-1 py-2 border border-gray-500/25">
                <div className="flex gap-4">
                  <button
                    className="text-white hover:cursor-pointer bg-green-600 rounded-full lg:w-10 px-1 py-2 hover:bg-green-800"
                    onClick={() => router.push(`/goods/edit/${g.barcode}`)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </button>
                  <button
                    className="text-white hover:cursor-pointer bg-red-600 rounded-full lg:w-10 px-1 py-2 hover:bg-red-800"
                    onClick={() => {
                      setSelectedGoods(g);
                      setShowModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="text-center py-6 text-gray-500" colSpan={4}>
              No Goods Found.
            </td>
          </tr>
        )}
      </tbody>
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
    </table>
  );
}
