import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Financial Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              <Link href="/financial-accounts" passHref>
                <Button className="h-32 w-full text-lg">Check Financial Accounts</Button>
              </Link>
              <Link href="/family-tree" passHref>
                <Button className="h-32 w-full text-lg">Check Family Tree</Button>
              </Link>
              <Link href="/add-family-member" passHref>
                <Button className="h-32 w-full text-lg">Add Family Member</Button>
              </Link>
              <Link href="/unclaimed-accounts" passHref>
                <Button className="h-32 w-full text-lg">Check Unclaimed Accounts</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}