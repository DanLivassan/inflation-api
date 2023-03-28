-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productCode" TEXT NOT NULL,
    "ncm" BIGINT NOT NULL,
    "ncmGroup" TEXT,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "unit" TEXT DEFAULT '',
    "gtin" TEXT DEFAULT ''
);
INSERT INTO "new_Product" ("createdAt", "description", "gtin", "id", "ncm", "ncmGroup", "picture", "price", "productCode", "unit") SELECT "createdAt", "description", "gtin", "id", "ncm", "ncmGroup", "picture", "price", "productCode", "unit" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
