'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkUserAccounts } from "@/app/actions/user-actions"

type UserStatus = 'new' | 'existing'

export function LandingPage() {
  const router = useRouter()
  const [userStatus, setUserStatus] = useState<UserStatus>('new')
  const [hasVisitedFinancialAccounts, setHasVisitedFinancialAccounts] = useState(false)
  const [isAddFamilyMemberOpen, setIsAddFamilyMemberOpen] = useState(false)
  const [newFamilyMember, setNewFamilyMember] = useState({ name: '', relationship: '' })
  const [isConsentDialogOpen, setIsConsentDialogOpen] = useState(false)

  useEffect(() => {
    const storedStatus = localStorage.getItem('userStatus') as UserStatus
    if (storedStatus) {
      setUserStatus(storedStatus)
    } else {
      localStorage.setItem('userStatus', 'new')
    }

    const visitedFinancialAccounts = localStorage.getItem('visitedFinancialAccounts')
    setHasVisitedFinancialAccounts(visitedFinancialAccounts === 'true')
  }, [])

  const handleFinancialAccountsClick = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      console.error('User ID not found')
      return
    }

    const hasAccounts = await checkUserAccounts(userId)

    if (!hasAccounts) {
      setIsConsentDialogOpen(true)
    } else {
      router.push('/financial-accounts')
    }
  }

  const handleConsentAccept = () => {
    setIsConsentDialogOpen(false)
    localStorage.setItem('visitedFinancialAccounts', 'true')
    setHasVisitedFinancialAccounts(true)
    router.push('/consent')
  }

  const handleFamilyTreeClick = () => {
    router.push('/family-tree')
  }

  const handleAddFamilyMember = () => {
    console.log('Adding family member:', newFamilyMember)
    setIsAddFamilyMemberOpen(false)
    setNewFamilyMember({ name: '', relationship: '' })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to IceBreaker</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleFinancialAccountsClick} className="w-full">
            Financial Accounts
          </Button>
          <Button onClick={handleFamilyTreeClick} className="w-full">
            Family Tree
          </Button>
          {userStatus === 'existing' && (
            <Button onClick={() => window.open('https://udgam.rbi.org.in/unclaimed-deposits/#/login', '_blank')} className="w-full">
              Check Unclaimed Accounts
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isAddFamilyMemberOpen} onOpenChange={setIsAddFamilyMemberOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Add Family Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name of Family Member</Label>
              <Input
                id="name"
                value={newFamilyMember.name}
                onChange={(e) => setNewFamilyMember({ ...newFamilyMember, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Select
                onValueChange={(value) => setNewFamilyMember({ ...newFamilyMember, relationship: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Brother">Brother</SelectItem>
                  <SelectItem value="Sister">Sister</SelectItem>
                  <SelectItem value="Children">Children</SelectItem>
                  <SelectItem value="Grandmother">Grandmother</SelectItem>
                  <SelectItem value="Grandfather">Grandfather</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddFamilyMember} className="w-full">Submit</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isConsentDialogOpen} onOpenChange={setIsConsentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>You will be redirected to Saafe, an RBI registered Account Aggregator, to securely fetch your financial data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Purpose and details of the consent for data fetching</h3>
            <div className="space-y-2">
              <p><strong>Purpose:</strong> Monitoring Accounts for missing nominee details</p>
              <p><strong>Data life:</strong> Past 1 year data</p>
              <p><strong>Data stored for:</strong> 1 year</p>
              <p><strong>Fetch periodicity:</strong> Periodic every month</p>
              <p><strong>Data types:</strong> Savings, Term deposits, Recurring Deposits</p>
            </div>
            <Button onClick={handleConsentAccept} className="w-full">Accept</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}