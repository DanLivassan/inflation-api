/*
  Warnings:

  - You are about to alter the column `ncm` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "ncm" BIGINT NOT NULL,
    "ncmGroup" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "picture" TEXT NOT NULL
);
INSERT INTO "new_Product" ("_id", "description", "ncm", "ncmGroup", "picture", "price") SELECT "_id", "description", "ncm", "ncmGroup", "picture", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
