"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { ShoppingBag, Users, Shield, Mail } from "lucide-react"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    // Redirect authenticated users to marketplace
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome back, {session.user?.name || "Student"}!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ready to buy or sell something today?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Browse Items
            </Link>
            <Link
              href="/sell"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              Sell Something
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bilkent University Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A trusted platform for Bilkent University students to buy and sell 
          second-hand books, supplies, and other items safely within our community.
        </p>
        <Link
          href="/auth/signin"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium inline-block"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure & Trusted</h3>
          <p className="text-gray-600">
            Only verified Bilkent University students with @ug.bilkent.edu.tr emails can join.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
          <p className="text-gray-600">
            List your items quickly and browse what others are selling with our simple interface.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Campus Community</h3>
          <p className="text-gray-600">
            Connect directly with fellow students and arrange meetups on campus.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Direct Contact</h3>
          <p className="text-gray-600">
            Send purchase requests and get seller contact info to arrange transactions.
          </p>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Register with your Bilkent University email address (@ug.bilkent.edu.tr)
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Browse or Sell</h3>
            <p className="text-gray-600">
              List your items for sale or browse what other students are offering
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Connect & Meet</h3>
            <p className="text-gray-600">
              Send purchase requests and arrange to meet on campus for the exchange
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
