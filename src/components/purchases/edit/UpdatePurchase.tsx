"use client";

import { useParams, useRouter } from "next/navigation";
import { usePurchasesStore } from "@/stores/purchasesStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGoodsStore } from "@/stores/goodsStore";

import LoadingComponent from "../../Loading";

import PurchaseActions from "./PurchaseActions";
import PurchaseForm from "./PurchaseForm";
import PurchaseSummary from "./PurchaseSummary";
import PurchaseTable from "./PurchaseTable";
import { useSuppliersStore } from "@/stores/suppliersStore";
import axios from "axios";
import { Item } from "@/app/types/purchases";

export default function EditPurchase() {
  const router = useRouter();
  const paramsB = useParams();
  const invoice = paramsB.invoice as string;
  const { updatePurchases } = usePurchasesStore();
  const { goods, getGoods } = useGoodsStore();
  const { suppliers, getSuppliers } = useSuppliersStore();
  const { data, status } = useSession();

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
    purchaseitems: Item[];
  }>({
    invoice:
      "INV-" + new Date().toISOString().slice(0, 10).split("-").join("") + "-1",
    time: new Date(),
    totalsum: 0,
    supplier: 0,
    operator: data?.user.id as string,
    purchaseitems: [],
  });

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    input.time
  );
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
        purchaseitems: [...input.purchaseitems, item],
        totalsum:
          Number(input.totalsum) +
          Number(item.purchaseprice) * Number(item.quantity),
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
      const { purchaseitems, ...dataWithoutItems } = input;
      const res = await updatePurchases(
        input.invoice,
        dataWithoutItems,
        input.purchaseitems
      );
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
    const fetchInvoice = async () => {
      try {
        getGoods(params);
        getSuppliers(params);
        const { data } = await axios.get(`/api/purchases/${invoice}`, {
          params: { sortBy: "createdAt", sort: "desc", limit: 1 },
        });
        console.log("data invpoce nih: ", data);
        setInput({
          ...data,
          time: new Date(data.time),
          items: data.purchaseitems,
        });
        setSupplier({ ...supplier, supplierid: data.supplier });
      } catch (error) {
        console.log(error);
      }
    };

    setInput({ ...input, operator: data?.user.id as string });
    console.log("masuk tengah => ", input);

    fetchInvoice();
  }, [data]);

  if (status === "loading") return <LoadingComponent />;
  console.log(typeof input.time);

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
        input={{ ...input, purchaseitems: input.purchaseitems || [] }}
        setInput={setInput}
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
