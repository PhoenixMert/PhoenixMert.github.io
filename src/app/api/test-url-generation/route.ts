import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log("🧪 Testing NextAuth URL generation");
    
    // Simulate a sign-in request to see what URL gets generated
    const testEmail = "test@ug.bilkent.edu.tr";
    
    return NextResponse.json({
      success: true,
      message: "Check Vercel logs for URL generation details",
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("❌ URL test error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}
