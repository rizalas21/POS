import { Dispatch, SetStateAction } from "react";

export const modalDelete = (
  selectedUser: {
    userid: string;
    email: string;
  },
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  async function confirmDelete({ id }: { id: any }) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setShowModal(false);
    } else {
      console.error("Failed to delete the product");
      alert("Gagal menghapus produk. Silakan coba lagi.");
    }
  }

  return (
    <section className="flex w-screen h-screen inset-0 z-1000 fixed bg-black bg-opacity-40 justify-center py-20 ">
      <div className="flex flex-col gap-5 bg-white h-3/5 w-1/2 p-5">
        <div className="h-[32%]">
          <span
            className="text-gray-400 float-right font-size text-2xl font-bold hover:text-black hover:no-underline hover:cursor-pointer focus:text-black focus:no-underline focus:cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            &times;
          </span>
          <p className="text-xl">Hapus Data</p>
        </div>
        <h3 className="content-center font-thin h-[32%] border-y border-gray-300 ">
          Yakin ingin menghapus "{selectedUser.email}" ?
        </h3>
        <div className="h-[32%] flex justify-end items-end">
          <div className="flex justify-end items-end w-3/5">
            <button
              className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-gray-600 transition duration-300 ease-in-out hover:bg-gray-700"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="p-2.5 text-base cursor-pointer h-1/2 w-[35%] text-center mx-2.5 rounded text-white bg-blue-600 text-white border-none transition ease hover:bg-blue-700"
              onClick={() => confirmDelete({ id: selectedUser.userid })}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
