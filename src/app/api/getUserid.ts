import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export default async function getUserid() {
  const session = await getServerSession(authOptions);
  return session?.user.id;
}
