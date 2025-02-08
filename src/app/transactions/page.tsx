"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog"
import { EditTransactionDialog } from "@/components/transactions/edit-transaction-dialog"
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog"
import { BulkActionsMenu } from "@/components/transactions/bulk-actions-menu"
import { RecurringTransactions } from "@/components/transactions/recurring-transactions"
import { ImportExportMenu } from "@/components/transactions/import-export-menu"
import { InvoiceGenerator } from "@/components/transactions/invoice-generator"
import { mockTransactions } from "@/lib/mock-data"
import { Transaction, TransactionFilters as ITransactionFilters } from "@/lib/types"
import { toast } from "sonner"

const initialFilters: ITransactionFilters = {
  
  type: "all",
  category: "all",
  source: "all",
  status: "all",
  business: "all",
  dateRange: {
    from: undefined,
    to: undefined,
  },
}

export default function TransactionsPage() {
 
  const [filters, setFilters] = useState<ITransactionFilters>(initialFilters)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  
  const filteredTransactions = transactions.filter((transaction) => {
    if (filters.type !== "all" && transaction.type !== filters.type) return false
    if (filters.category !== "all" && transaction.category.toLowerCase() !== filters.category) return false
    if (filters.source !== "all" && transaction.source.toLowerCase() !== filters.source) return false
    if (filters.status !== "all" && transaction.status !== filters.status) return false
    if (filters.business !== "all" && transaction.business.toLowerCase() !== filters.business.toLowerCase()) return false
    
    if (filters.dateRange.from || filters.dateRange.to) {
      const transactionDate = new Date(transaction.date)
      if (filters.dateRange.from && transactionDate < filters.dateRange.from) return false
      if (filters.dateRange.to && transactionDate > filters.dateRange.to) return false
    }
    
    return true
  })

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev])
    toast.success("Transaction added successfully")
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsEditDialogOpen(true)
  }

  const handleDeleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDeleteDialogOpen(true)
  }

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    )
    toast.success("Transaction updated successfully")
  }

  const handleConfirmDelete = (transaction: Transaction) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transaction.id))
    setIsDeleteDialogOpen(false)
    toast.success("Transaction deleted successfully")
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        setTransactions(prev => prev.filter(t => !selectedTransactions.includes(t.id)))
        setSelectedTransactions([])
        toast.success("Selected transactions deleted")
        break
      case 'categorize':
        // Implement bulk categorization
        break
      case 'export':
        // Implement bulk export
        break
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <div className="flex items-center gap-4">
            <ImportExportMenu />
            <InvoiceGenerator />
            <AddTransactionDialog onTransactionAdd={handleAddTransaction} />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <TransactionFilters 
            filters={filters} 
            onChange={setFilters}
            onReset={() => setFilters(initialFilters)}
          />
          {selectedTransactions.length > 0 && (
            <BulkActionsMenu
              selectedCount={selectedTransactions.length}
              onAction={handleBulkAction}
            />
          )}
        </div>
      </div>
      
      <RecurringTransactions />
      
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionsTable 
            transactions={filteredTransactions}
            selectedIds={selectedTransactions}
            onSelectionChange={setSelectedTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </CardContent>
      </Card>

      <EditTransactionDialog
        transaction={selectedTransaction}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdateTransaction}
      />

      <DeleteTransactionDialog
        transaction={selectedTransaction}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}