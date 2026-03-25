import { useSession } from "next-auth/react";
import AdminSideBar from "./sideBar/AdminSideBar";
import OperatorSideBar from "./sideBar/OperatorSideBar";

export default function SideBar() {
  const { data } = useSession();
  const roleUser = data?.user.role;

  return <>{roleUser === "admin" ? <AdminSideBar /> : <OperatorSideBar />}</>;
}

// IKON
/*
wrench = good utilities
link = suppliers
users = customers
user = users
table = purchase
chart area = sales

*/
