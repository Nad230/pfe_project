"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TransactionForm } from "./transaction-form";

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onSubmit,
}) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          transaction={transaction}
          onSubmit={(updatedTransaction) => {
            onSubmit({ ...updatedTransaction, id: transaction.id });
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
