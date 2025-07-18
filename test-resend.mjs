import { Resend } from 'resend'

// Simple test script to verify Resend API key
async function testResendKey() {
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  console.log('🔑 API Key loaded:', process.env.RESEND_API_KEY ? 'YES' : 'NO')
  console.log('🔑 API Key starts with re_:', process.env.RESEND_API_KEY?.startsWith('re_'))
  console.log('🔑 API Key length:', process.env.RESEND_API_KEY?.length)
  
  try {
    // Test with a simple API call
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's verified domain for testing
      to: ['test@ug.bilkent.edu.tr'],
      subject: 'Test from Bilkent Marketplace',
      html: '<p>API key test successful!</p>',
    })

    if (error) {
      console.error('❌ Resend Error:', error)
      return { success: false, error }
    }

    console.log('✅ Success! Email ID:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Exception:', error)
    return { success: false, error }
  }
}

export { testResendKey }
