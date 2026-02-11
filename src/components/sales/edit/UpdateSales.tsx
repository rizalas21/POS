"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGoodsStore } from "@/stores/goodsStore";

import LoadingComponent from "../../Loading";

import SalesActions from "./SalesActions";
import SalesForm from "./SalesForm";
import SalesSummary from "./SalesSummary";
import SalesTable from "./SalesTable";
import axios from "axios";
import { useSalesStore } from "@/stores/salesStore";
import { Item } from "@/app/types/sales";
import { useCustomersStore } from "@/stores/customersStore";

export default function EditSales() {
  const router = useRouter();
  const paramsB = useParams();
  const invoice = paramsB.invoice as string;
  const { updateSales } = useSalesStore();
  const { goods, getGoods } = useGoodsStore();
  const { customers, getCustomers } = useCustomersStore();
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
    saleitems: Item[];
  }>({
    invoice: invoice,
    time: new Date(),
    totalsum: 0,
    pay: 0,
    change: 0,
    customer: 0,
    operator: data?.user.id as string,
    saleitems: [],
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
      const newTotal =
        Number(input.totalsum) +
        Number(item.sellingprice) * Number(item.quantity);

      setInput({
        ...input,
        saleitems: [...input.saleitems, item],
        totalsum: newTotal,
        change: Number(input.pay) - newTotal,
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
      const res = await updateSales(input.invoice, input);
      router.push("/sales");
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
    const fetchInvoice = async () => {
      try {
        getGoods(params);
        getCustomers(params);
        const { data } = await axios.get(`/api/sales/${invoice}`, {
          params: { sortBy: "createdAt", sort: "desc", limit: 1 },
        });
        console.log("data invpoce nih: ", data);
        setInput({
          ...data,
          time: new Date(data.time),
        });
        setCustomer({ ...customer, customerid: data.customer });
      } catch (error) {
        console.log(error);
      }
    };

    setInput({ ...input, operator: data?.user.id as string });
    console.log("masuk tengah => ", input);

    fetchInvoice();
  }, [data]);

  if (status === "loading") return <LoadingComponent />;
  console.log(input);

  return (
    <>
      <SalesForm
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
      <SalesTable
        input={{ ...input, saleitems: input.saleitems || [] }}
        setInput={setInput}
        goods={goods}
      />
      <SalesSummary
        input={input}
        setInput={setInput}
        customers={customers}
        customer={customer}
        setCustomer={setCustomer}
      />
      <SalesActions handleSubmit={handleSubmit} router={router} />
    </>
  );
}
