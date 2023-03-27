-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "ncm" BIGINT NOT NULL,
    "ncmGroup" TEXT,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "picture" TEXT NOT NULL
);
INSERT INTO "new_Product" ("_id", "description", "ncm", "ncmGroup", "picture", "price") SELECT "_id", "description", "ncm", "ncmGroup", "picture", "price" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
