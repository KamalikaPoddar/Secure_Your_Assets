'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { NomineeAllocationPopup } from './NomineeAllocationPopup'

interface Account {
  id: number
  BankName: string
  AccountType: string
  Nominee: string
}

const dummyAccounts: Account[] = [
  {id: 1, BankName: "ignosis", AccountType:"Savings", Nominee:"Registered"},
  {id: 2, BankName: "ignosis", AccountType:"Recurring-Deposit", Nominee:"Not Registered"}, 
  {id: 3, BankName: "ignosis", AccountType:"Term-Deposit", Nominee:"Not Registered"}, 
  {id: 4, BankName: "bankB", AccountType:"Savings", Nominee:"Not Registered"}
]

export default function FinancialAccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(dummyAccounts)
  const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])
  const [isNomineePopupOpen, setIsNomineePopupOpen] = useState(false)

  const handleSelectAll = () => {
    const unregisteredIds = accounts
      .filter(account => account.Nominee === "Not Registered")
      .map(account => account.id)
    setSelectedAccounts(unregisteredIds)
  }

  const handleSelectAccount = (id: number) => {
    setSelectedAccounts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleNomineeAllocation = (allocations: { [key: string]: number }) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        selectedAccounts.includes(account.id) 
          ? { ...account, Nominee: "Registering in progress" } 
          : account
      )
    )
    setSelectedAccounts([])
    setIsNomineePopupOpen(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Financial Accounts</h1>
      <div className="mb-4">
        <Button onClick={handleSelectAll}>Select All Unregistered</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card key={account.id} className={account.Nominee === "Not Registered" ? "border-red-500" : ""}>
            <CardHeader>
              <CardTitle>{account.BankName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Account Type: {account.AccountType}</p>
              <p>Nominee Status: {account.Nominee}</p>
              {account.Nominee === "Not Registered" && (
                <Checkbox
                  checked={selectedAccounts.includes(account.id)}
                  onCheckedChange={() => handleSelectAccount(account.id)}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedAccounts.length > 0 && (
        <div className="mt-4">
          <Button onClick={() => setIsNomineePopupOpen(true)}>Add Nominee</Button>
        </div>
      )}
      {isNomineePopupOpen && (
        <NomineeAllocationPopup 
          isOpen={isNomineePopupOpen}
          onClose={() => setIsNomineePopupOpen(false)}
          onSubmit={handleNomineeAllocation}
        />
      )}
    </div>
  )
}