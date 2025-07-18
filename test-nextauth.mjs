// Test script to trigger NextAuth email sending
import fetch from 'node-fetch';

const testEmail = 'test@ug.bilkent.edu.tr';
const baseUrl = 'http://localhost:3000';

console.log('🧪 Testing NextAuth email flow...');
console.log('📧 Test email:', testEmail);

async function testNextAuthSignIn() {
  try {
    // Get CSRF token first
    console.log('\n1️⃣ Getting CSRF token...');
    const csrfResponse = await fetch(`${baseUrl}/api/auth/csrf`);
    const csrfData = await csrfResponse.json();
    console.log('✅ CSRF token received');

    // Submit sign-in form
    console.log('\n2️⃣ Submitting sign-in form...');
    const formData = new URLSearchParams();
    formData.append('email', testEmail);
    formData.append('csrfToken', csrfData.csrfToken);
    formData.append('callbackUrl', `${baseUrl}/`);

    const signInResponse = await fetch(`${baseUrl}/api/auth/signin/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': `${baseUrl}/auth/signin`,
      },
      body: formData,
      redirect: 'manual'
    });

    console.log('📊 Response status:', signInResponse.status);
    console.log('📊 Response headers:', Object.fromEntries(signInResponse.headers.entries()));
    
    if (signInResponse.status === 302) {
      const location = signInResponse.headers.get('location');
      console.log('✅ Redirected to:', location);
      
      if (location && location.includes('verify-request')) {
        console.log('🎉 Sign-in successful! Check terminal for email logs...');
      } else {
        console.log('⚠️ Unexpected redirect:', location);
      }
    } else {
      const responseText = await signInResponse.text();
      console.log('📄 Response body:', responseText);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNextAuthSignIn();
