import { prisma } from "@/app/prisma";
import bcrypt from "bcrypt";

export async function Login(email: string, password: string) {
  if (!email || !password) {
    console.log("email or password is required");
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log("User not found");
      return null;
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      console.log("User not found");
      return null;
    }
    return {
      id: user.userid,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  } catch (err) {
    console.log("error when try to Login => ", err);
    return null;
  }
}
