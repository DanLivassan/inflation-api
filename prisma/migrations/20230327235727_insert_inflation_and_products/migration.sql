-- AlterTable
ALTER TABLE "Product" ADD COLUMN "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Product" ADD COLUMN "gtin" TEXT;
ALTER TABLE "Product" ADD COLUMN "unit" TEXT;

-- CreateTable
CREATE TABLE "InflationRepresentation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "totalPrice" REAL NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);
