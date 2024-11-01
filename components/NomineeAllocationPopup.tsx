'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NomineeAllocationPopupProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (allocations: { [key: string]: number }) => void
}

interface FamilyMember {
  id: number
  name: string
}

const dummyFamilyMembers: FamilyMember[] = [
  { id: 1, name: "Arun Sharma" },
  { id: 2, name: "Rupa Sharma" },
  { id: 3, name: "Jaya Sharma" },
  { id: 4, name: "Varun Sharma" }
]

export function NomineeAllocationPopup({ isOpen, onClose, onSubmit }: NomineeAllocationPopupProps) {
  const [selectedNominees, setSelectedNominees] = useState<number[]>([])
  const [allocations, setAllocations] = useState<{ [key: number]: number }>({})
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showAlert])

  const handleNomineeSelect = (id: number) => {
    setSelectedNominees(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
    if (!allocations[id]) {
      setAllocations(prev => ({ ...prev, [id]: 0 }))
    }
  }

  const handleAllocationChange = (id: number, value: string) => {
    setAllocations(prev => ({ ...prev, [id]: Number(value) || 0 }))
  }

  const handleSubmit = () => {
    const totalAllocation = Object.values(allocations).reduce((sum, value) => sum + value, 0)
    if (totalAllocation !== 100) {
      setShowAlert(true)
      return
    }
    onSubmit(allocations)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Allocate Nominees</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {dummyFamilyMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <Checkbox
                id={`nominee-${member.id}`}
                checked={selectedNominees.includes(member.id)}
                onCheckedChange={() => handleNomineeSelect(member.id)}
              />
              <Label htmlFor={`nominee-${member.id}`}>{member.name}</Label>
              {selectedNominees.includes(member.id) && (
                <Input
                  type="number"
                  placeholder="Allocation %"
                  value={allocations[member.id] || ''}
                  onChange={(e) => handleAllocationChange(member.id, e.target.value)}
                  className="w-24"
                />
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Submit Allocations</Button>
        </div>
        {showAlert && (
          <Alert variant="destructive">
            <AlertDescription>
              Please ensure the total allocation is 100%.
            </AlertDescription>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  )
}