"use client";

import { useRouter } from "next/navigation";
import { usePurchasesStore } from "@/stores/purchasesStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PurchaseItem } from "@/app/types/purchaseItem";
import { useGoodsStore } from "@/stores/goodsStore";

import LoadingComponent from "@/components/Loading";

import PurchaseActions from "./PurchaseActions";
import PurchaseForm from "./PurchaseForm";
import PurchaseSummary from "./PurchaseSummary";
import PurchaseTable from "./PurchaseTable";
import { useSuppliersStore } from "@/stores/suppliersStore";
import axios from "axios";
import { Item } from "@/app/types/purchases";

export default function AddPurchase() {
  const router = useRouter();
  const { addPurchases } = usePurchasesStore();
  const { goods, getGoods } = useGoodsStore();
  const { suppliers, getSuppliers } = useSuppliersStore();
  const { data, status } = useSession();
  const [invoiceChecked, setInvoiceChecked] = useState(false);

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(now);

  const [supplier, setSupplier] = useState({
    supplierid: "",
    name: "",
    address: "",
    phone: "",
  });

  const [input, setInput] = useState<{
    invoice: string;
    time: Date;
    totalsum: number;
    supplier: number;
    operator: string;
    items: Item[];
  }>({
    invoice:
      "INV-" + new Date().toISOString().slice(0, 10).split("-").join("") + "-1",
    time: new Date(),
    totalsum: 0,
    supplier: 0,
    operator: data?.user.id as string,
    items: [],
  });

  const [goodsItem, setGoodsItem] = useState({
    barcode: "",
    name: "",
    stock: "",
  });

  const [item, setItem] = useState({
    invoice: input.invoice,
    itemcode: "",
    quantity: 0,
    purchaseprice: 0,
    totalprice: 0,
  });

  const [params] = useState({
    keyword: "",
    limit: "0",
    page: "",
    sortBy: "",
    sort: "",
  });

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      setInput({
        ...input,
        items: [...input.items, item],
        totalsum: input.totalsum + item.purchaseprice * item.quantity,
      });
      setItem({
        invoice: input.invoice,
        itemcode: "",
        quantity: 0,
        purchaseprice: 0,
        totalprice: 0,
      });
      setGoodsItem({ barcode: "", name: "", stock: "" });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleSubmit = async () => {
    try {
      const { items, ...dataWithoutItems } = input;
      const res = await addPurchases(items, dataWithoutItems);
      router.push("/purchases");
      return res;
    } catch (error) {
      return null;
    }
  };

  const handleChangeItem = (e: any) => {
    const { name, value } = e.target;
    const newValue = Number(value);
    let updatedItem = { ...item };
    if (name === "quantity") {
      const qty = Number(value);
      const stock = Number(goodsItem.stock);

      if (qty > stock) {
        updatedItem = {
          ...updatedItem,
          quantity: stock,
          totalprice: stock * updatedItem.purchaseprice,
        };
      } else {
        updatedItem = {
          ...updatedItem,
          quantity: qty,
          totalprice: qty * updatedItem.purchaseprice,
        };
      }
    } else if (name === "purchaseprice") {
      updatedItem = {
        ...updatedItem,
        purchaseprice: newValue,
        totalprice: updatedItem.quantity * newValue,
      };
    } else {
      updatedItem = { ...updatedItem, [name]: value };
    }

    setItem(updatedItem);
  };

  useEffect(() => {
    if (invoiceChecked) return;
    const fetchInvoice = async () => {
      try {
        getGoods(params);
        getSuppliers(params);
        const { data } = await axios.get(`/api/purchases`, {
          params: { sortBy: "createdAt", sort: "desc", limit: 1 },
        });
        if (input.invoice <= data.data[0].invoice) {
          setInput({
            ...input,
            invoice:
              "INV-" +
              new Date().toISOString().slice(0, 10).split("-").join("") +
              "-" +
              (Number(data.data[0].invoice.slice(13)) + 1),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    setInput({ ...input, operator: data?.user.id as string });

    fetchInvoice();
  }, [data]);

  if (status === "loading") return <LoadingComponent />;

  return (
    <>
      <PurchaseForm
        handleAdd={handleAdd}
        input={input}
        formattedDate={formattedDate}
        data={data}
        goodsItem={goodsItem}
        goods={goods}
        setGoodsItem={setGoodsItem}
        item={item}
        setItem={setItem}
        handleChangeItem={handleChangeItem}
      />
      <PurchaseTable
        input={{ ...input, items: input.items || [] }}
        goods={goods}
      />
      <PurchaseSummary
        input={input}
        setInput={setInput}
        suppliers={suppliers}
        supplier={supplier}
        setSupplier={setSupplier}
      />
      <PurchaseActions handleSubmit={handleSubmit} router={router} />
    </>
  );
}
