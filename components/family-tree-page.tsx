'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FamilyMember {
  Name: string
  Relationship: string
}

export default function FamilyTreePage() {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {Name: "Arun Sharma", Relationship:"Father"},
    {Name: "Rupa Sharma", Relationship:"Mother"},
    {Name: "Jaya Sharma", Relationship:"Spouse"},
    {Name: "Varun Sharma", Relationship:"Child"}
  ])

  const [newMember, setNewMember] = useState<FamilyMember>({ Name: '', Relationship: '' })
  const [isOpen, setIsOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, Name: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setNewMember({ ...newMember, Relationship: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMember.Name && newMember.Relationship) {
      setFamilyMembers([...familyMembers, newMember])
      setNewMember({ Name: '', Relationship: '' })
      setIsOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Family Tree</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Family Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Family Member</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.Name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Grandmother">Grandmother</SelectItem>
                    <SelectItem value="Grandfather">Grandfather</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add Member</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {familyMembers.map((member, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{member.Name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Relationship: {member.Relationship}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}