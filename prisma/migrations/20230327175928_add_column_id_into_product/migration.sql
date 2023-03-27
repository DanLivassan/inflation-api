/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Product` table. All the data in the column will be lost.
  - The required column `id` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `productCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productCode" TEXT NOT NULL,
    "ncm" BIGINT NOT NULL,
    "ncmGroup" TEXT,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "picture" TEXT NOT NULL
);
INSERT INTO "new_Product" ("description", "ncm", "ncmGroup", "picture", "price") SELECT "description", "ncm", "ncmGroup", "picture", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
