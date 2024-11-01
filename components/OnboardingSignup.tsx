'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OnboardingSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    email: '',
    pan: '',
    aadhaar: '',
    classXRollNo: '',
    maritalStatus: '',
    numberOfChildren: '',
    marriageCertificateNumber: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to create the user
    // For now, we'll just simulate this and redirect
    console.log('Form submitted:', formData)
    router.push('/landing')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input id="mobileNumber" name="mobileNumber" type="tel" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="pan">PAN</Label>
              <Input id="pan" name="pan" type="text" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="aadhaar">Aadhaar</Label>
              <Input id="aadhaar" name="aadhaar" type="text" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="classXRollNo">Class X Roll No</Label>
              <Input id="classXRollNo" name="classXRollNo" type="text" required onChange={handleInputChange} />
            </div>

            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select name="maritalStatus" onValueChange={(value) => handleSelectChange('maritalStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.maritalStatus === 'married' && (
              <>
                <div>
                  <Label htmlFor="numberOfChildren">Number of Children</Label>
                  <Input id="numberOfChildren" name="numberOfChildren" type="number" onChange={handleInputChange} />
                </div>

                <div>
                  <Label htmlFor="marriageCertificateNumber">Marriage Certificate Number</Label>
                  <Input id="marriageCertificateNumber" name="marriageCertificateNumber" type="text" onChange={handleInputChange} />
                </div>
              </>
            )}

            <div>
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}