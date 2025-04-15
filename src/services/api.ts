
interface KeyResponse {
  key: string;
  expiresIn: number;
}

const API_URL = 'https://key-api.onrender.com/api/keys/generate';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2Fpb2FudHVuZXMiLCJpYXQiOjE3NDI0MDY2NTEsImV4cCI6MTc0MjQxMDI1MX0.Y0hs_VOBSKOiZELNu5H5Dx3FJmU0ndxOEZHoabsdtu0';

export async function generateKey(): Promise<KeyResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify({
        duration: 1 // duration in hours
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate key');
    }

    const data = await response.json();
    return {
      key: data.key,
      expiresIn: data.expiresIn
    };
  } catch (error) {
    console.error('Error generating key:', error);
    throw error;
  }
}

export function createLinkvertiseUrl(step: number): string {
  // Random Linkvertise URLs - you can replace these with your own
  const linkIds = [
    "388344",  // Replace with your Linkvertise ID
    "462923",  // Replace with your Linkvertise ID
    "271075"   // Replace with your Linkvertise ID
  ];
  
  // Random link numbers
  const linkNumbers = [
    Math.floor(Math.random() * 5) + 1,  // Random number between 1-5
    Math.floor(Math.random() * 5) + 1,  // Random number between 1-5
    Math.floor(Math.random() * 5) + 1   // Random number between 1-5
  ];
  
  // Base URL
  const baseUrl = `https://linkvertise.com/${linkIds[step]}/${linkNumbers[step]}`;
  
  // Create a proper redirect URL with a timestamp to prevent caching issues
  const timestamp = new Date().getTime();
  const redirectUrl = `${window.location.origin}/?step=${step + 1}&t=${timestamp}`;
  
  // Build the full URL with the redirect parameter
  const url = new URL(baseUrl);
  url.searchParams.append('o', '1'); // Optional: adds the 'o' parameter that Linkvertise sometimes uses
  url.searchParams.append('to', encodeURIComponent(redirectUrl));
  
  return url.toString();
}
