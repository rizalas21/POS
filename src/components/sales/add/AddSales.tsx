"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useGoodsStore } from "@/stores/goodsStore";

import LoadingComponent from "@/components/Loading";

import SalesActions from "./SalesActions";
import SalesForm from "./SalesForm";
import SalesSummary from "./SalesSummary";
import SalesTable from "./SalesTable";
import axios from "axios";
import { useSalesStore } from "@/stores/salesStore";
import { Item } from "@/types/sales";
import { useCustomersStore } from "@/stores/customersStore";
import Swal from "sweetalert2";
import { SearchParams } from "@/types/suppliers";

export default function AddSales() {
  const router = useRouter();
  const { addSales } = useSalesStore();
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
    saleitems: Item[];
  }>({
    invoice:
      "INV-PENJ" +
      new Date().toISOString().slice(0, 10).split("-").join("") +
      "-1",
    time: new Date(),
    totalsum: 0,
    pay: 0,
    change: 0,
    customer: 0,
    operator: data?.user.id as string,
    saleitems: [],
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

  const [params] = useState<SearchParams>({
    keyword: "",
    limit: 3,
    page: 1,
    sortBy: "",
    sort: "asc",
  });

  const handleAdd = async (e: React.FormEvent): Promise<void> => {
    try {
      e.preventDefault();
      setInput({
        ...input,
        saleitems: [...input.saleitems, item],
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
      const res = await addSales(input);
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

      if (qty === 0) {
        return Swal.fire({
          icon: "warning",
          title: "Quantity cannot be zero",
          text: "Please enter at least 1 item",
        });
      }

      if (qty < 0) {
        return Swal.fire({
          icon: "error",
          title: "Invalid input",
          text: "Quantity cannot be negative",
        });
      }

      if (isNaN(qty)) {
        return Swal.fire({
          icon: "error",
          title: "Invalid input",
          text: "Please enter a valid number",
        });
      }

      if (qty > stock) {
        Swal.fire({
          icon: "warning",
          title: "Insufficient stock",
          text: `Only ${stock} items available`,
        });

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
        const { data } = await axios.get(`/api/sales`, {
          params: { sortBy: "createdAt", sort: "desc", limit: 1 },
        });
        if (input.invoice <= data.data[0].invoice) {
          setInput({
            ...input,
            invoice:
              "INV-PENJ" +
              new Date().toISOString().slice(0, 10).split("-").join("") +
              "-" +
              (Number(data.data[0].invoice.slice(17)) + 1),
          });
          setItem({
            ...item,
            invoice:
              "INV-PENJ" +
              new Date().toISOString().slice(0, 10).split("-").join("") +
              "-" +
              (Number(data.data[0].invoice.slice(17)) + 1),
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
