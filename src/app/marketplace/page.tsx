"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default function Marketplace() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/auth/signin")
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Redirecting
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">
            Browse items from fellow Bilkent University students
          </p>
        </div>
        <Link
          href="/sell"
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>List Item</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for books, supplies, electronics..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Categories</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="supplies">School Supplies</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Conditions</option>
            <option value="new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder items - these will be populated from the database */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sample Textbook
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Engineering Mathematics textbook in good condition...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">₺150</span>
              <span className="text-sm text-gray-500">Posted 2 days ago</span>
            </div>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>

        {/* More placeholder items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Study Lamp
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              LED desk lamp, perfect for late night studying...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">₺75</span>
              <span className="text-sm text-gray-500">Posted 1 week ago</span>
            </div>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Scientific Calculator
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              TI-84 Plus calculator, barely used...
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">₺300</span>
              <span className="text-sm text-gray-500">Posted 3 days ago</span>
            </div>
            <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg mb-4">No items found matching your search.</p>
        <p>Try adjusting your filters or be the first to list something!</p>
      </div>
    </div>
  )
}
