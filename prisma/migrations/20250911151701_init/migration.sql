-- CreateTable
CREATE TABLE "public"."Goods" (
    "barcode" VARCHAR(20) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "stock" INTEGER NOT NULL,
    "purchaseprice" DECIMAL(19,2) NOT NULL,
    "sellingprice" DECIMAL(19,2) NOT NULL,
    "unit" VARCHAR(10) NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Goods_pkey" PRIMARY KEY ("barcode")
);

-- AddForeignKey
ALTER TABLE "public"."Goods" ADD CONSTRAINT "Goods_unit_fkey" FOREIGN KEY ("unit") REFERENCES "public"."Units"("unit") ON DELETE RESTRICT ON UPDATE CASCADE;
