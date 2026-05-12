import { prisma } from "@/app/prisma";
import { Prisma } from "@/generated/prisma";

export async function getGoods(params: any) {
  const { keyword, sortBy, sort, limit, page } = params;
  const offset = (Number(page) - 1) * limit;

  const where = {
    OR: [
      { barcode: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
      { name: { contains: keyword, mode: Prisma.QueryMode.insensitive } },
    ],
  };

  const total = await prisma.goods.count({ where });
  const res = await prisma.goods.findMany({
    where,
    orderBy: { [sortBy]: sort },
    ...(limit > 0 && { take: limit, skip: offset }),
  });
  const data = res.map((item) => ({
    ...item,
    purchaseprice: Number(item.purchaseprice),
    sellingprice: Number(item.sellingprice),
  }));
  const pages = Math.ceil(total / limit);
  return { data, total, pages, page };
}
