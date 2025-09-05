import SideBar from "./SideBar";
import SearchBar from "./Navbar";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const hideNavbar = pathName === "/signin";

  return (
    <div className="flex">
      <div className="fixed w-1/5">{!hideNavbar && <SideBar />}</div>
      <div className="ml-[20%] w-4/5">
        {!hideNavbar && <SearchBar />}
        <div className="h-auto bg-white pt-[9%] pl-[2%]">{children}</div>
      </div>
    </div>
  );
}
