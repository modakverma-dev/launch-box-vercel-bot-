-- CreateTable
CREATE TABLE "Accounts" (
    "username" TEXT NOT NULL,
    "userId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_username_key" ON "Accounts"("username");

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
