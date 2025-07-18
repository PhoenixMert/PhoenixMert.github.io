import Link from "next/link"
import { Mail, CheckCircle } from "lucide-react"

export default function VerifyRequest() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
          <p className="text-gray-600 mt-2">
            We&apos;ve sent a verification link to your Bilkent University email address.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-sm text-blue-800">
            Click the link in your email to sign in to your account.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <p>The link will expire in 24 hours for security reasons.</p>
          <p>
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700">
              try again
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
