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
  // Substitua estes IDs pelos seus IDs reais do Linkvertise
  const urls = [
    "https://linkvertise.com/YOUR_ID/1",
    "https://linkvertise.com/YOUR_ID/2",
    "https://linkvertise.com/YOUR_ID/3"
  ];
  
  // Adiciona o parâmetro step para ajudar na detecção de conclusão do redirecionamento
  const url = new URL(urls[step] || "");
  url.searchParams.append('redirectto', `${window.location.origin}?step=${step + 1}`);
  
  return url.toString();
}
