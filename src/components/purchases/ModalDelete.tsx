import { useGoodsStore } from "@/stores/goodsStore";
import { useUsersStore } from "@/stores/usersStore";
import { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";

export const ModalDeletePurchases = ({
  selectedPurchases,
  setShowModal,
}: {
  selectedPurchases: {
    invoice: string;
    time: string;
    totalsum: number;
    supplier: number;
    operator: string;
  };
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { deleteGoods } = useGoodsStore();

  async function confirmDelete({ id }: { id: any }) {
    const res = await deleteGoods(selectedPurchases.invoice);
    setShowModal(false);
    return Swal.fire({
      icon: "success",
      title: "Delete PselectedPurchases Successful",
      text: `${selectedPurchases.invoice}`,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  return (
    <section className="flex w-screen h-screen inset-0 z-1000 fixed bg-gray-900/50 bg-opacity-40 justify-center py-20 ">
      <div className="flex flex-col gap-5 bg-white h-3/5 w-1/2 p-5">
        <div className="h-[32%]">
          <span
            className="text-gray-400 float-right font-size text-2xl font-bold hover:text-black hover:no-underline hover:cursor-pointer focus:text-black focus:no-underline focus:cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            &times;
          </span>
          <p className="text-xl">Deleted Confirmation</p>
        </div>
        <h3 className="content-center font-thin h-[32%] border-y border-gray-300 ">
          Are you sure, you want delete it?
        </h3>
        <div className="h-[32%] flex justify-end items-end">
          <div className="flex justify-end items-end w-3/5">
            <button
              className="p-2 text-base cursor-pointer h-1/2 w-[15%] text-center mx-1 rounded text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              onClick={() => setShowModal(false)}
            >
              No
            </button>
            <button
              className="p-2 text-base cursor-pointer h-1/2 w-[15%] text-center mx-1 rounded text-white bg-blue-600 text-white border-none transition ease hover:bg-blue-700"
              onClick={() => confirmDelete({ id: selectedPurchases.invoice })}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
