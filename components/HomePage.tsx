import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Financial Management App</h1>
          <div>
            <Link href="/signup" passHref>
              <Button variant="outline" className="mr-2">Sign Up</Button>
            </Link>
            <Link href="/login" passHref>
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Rs 78,200 crore is lying unclaimed with the RBI.
          </h2>
          <p className="mt-5 text-xl text-gray-500">
            Are you sure your accounts are not a part of this?
          </p>
          <div className="mt-8">
            <Link href="/signup" passHref>
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}