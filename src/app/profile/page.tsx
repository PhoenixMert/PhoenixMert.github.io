"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { User, Package, MessageSquare, Settings } from "lucide-react"

export default function Profile() {
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
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {session.user?.name || "Student"}
            </h1>
            <p className="text-gray-600">{session.user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* My Listed Items */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Listed Items</h2>
              <span className="text-sm text-gray-500">0 items</span>
            </div>
            
            <div className="text-center py-12 text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">No items listed yet</p>
              <p>Start selling by listing your first item!</p>
            </div>
          </div>

          {/* Purchase Requests */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Purchase Requests</h2>
              <span className="text-sm text-gray-500">0 requests</span>
            </div>
            
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg mb-2">No purchase requests yet</p>
              <p>Requests from buyers will appear here.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Items Listed</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items Sold</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Purchase Requests</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Package className="h-5 w-5 text-gray-400" />
                <span>List New Item</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <span>View Messages</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Settings className="h-5 w-5 text-gray-400" />
                <span>Account Settings</span>
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Success</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Add clear photos of your items</li>
              <li>• Write detailed descriptions</li>
              <li>• Price items competitively</li>
              <li>• Respond to requests quickly</li>
              <li>• Meet in safe campus locations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
