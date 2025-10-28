"use client";

import { useRouter } from "next/navigation";
import { usePurchasesStore } from "@/stores/purchasesStore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGoodsStore } from "@/stores/goodsStore";

import LoadingComponent from "@/components/Loading";

import PurchaseActions from "./SalesActions";
import PurchaseForm from "./SalesForm";
import PurchaseSummary from "./SalesSummary";
import PurchaseTable from "./SalesTable";
import { useSuppliersStore } from "@/stores/suppliersStore";
import axios from "axios";
import { useSalesStore } from "@/stores/salesStore";
import { Item } from "@/app/types/sales";
import { useCustomersStore } from "@/stores/customersStore";

export default function AddSales() {
  const router = useRouter();
  const { addSales } = useSalesStore();
  const { goods, getGoods } = useGoodsStore();
  const { customers, getCustomers } = useCustomersStore();
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

  const [customer, setCustomer] = useState({
    customerid: "",
    name: "",
    address: "",
    phone: "",
  });

  const [input, setInput] = useState<{
    invoice: string;
    time: Date;
    totalsum: number;
    pay: number;
    change: number;
    customer: number;
    operator: string;
    items: Item[];
  }>({
    invoice:
      "INV-" + new Date().toISOString().slice(0, 10).split("-").join("") + "-1",
    time: new Date(),
    totalsum: 0,
    pay: 0,
    change: 0,
    customer: 0,
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
    sellingprice: 0,
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
        totalsum: input.totalsum + item.sellingprice * item.quantity,
      });
      setItem({
        invoice: input.invoice,
        itemcode: "",
        quantity: 0,
        sellingprice: 0,
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
      const res = await addSales(dataWithoutItems, items);
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
          totalprice: stock * updatedItem.sellingprice,
        };
      } else {
        updatedItem = {
          ...updatedItem,
          quantity: qty,
          totalprice: qty * updatedItem.sellingprice,
        };
      }
    } else if (name === "sellingprice") {
      updatedItem = {
        ...updatedItem,
        sellingprice: newValue,
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
        getCustomers(params);
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
        customers={customers}
        customer={customer}
        setCustomer={setCustomer}
      />
      <PurchaseActions handleSubmit={handleSubmit} router={router} />
    </>
  );
}
