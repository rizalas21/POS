import UsersTable from "@/components/users/UsersTable";
import axios from "axios";
const params = {
  keyword: "",
  sortBy: "barcode",
  sort: "asc",
  page: "1",
  limit: "3",
};

const res = await axios.get("http://localhost:3000/api/goods", { params });
const users = res.data;

export default function PageUsers() {
  return (
    <main className="space-y-3">
      <h1 className="text-2xl text-gray-700">Users</h1>
      <p>This is data of Users</p>
      <UsersTable initialUsers={users} />
    </main>
  );
}
