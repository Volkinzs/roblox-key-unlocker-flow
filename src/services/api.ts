
// Simulação de API para geração de keys

// Função para gerar uma key aleatória
export function generateRandomKey(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Formatando a key em grupos de 4 caracteres
  return key.match(/.{1,4}/g)?.join('-') || key;
}

// Função que simula uma chamada de API para geração de key
export async function generateKey(): Promise<{ key: string; expiresIn: number }> {
  // Simula o tempo de resposta de uma API real
  return new Promise((resolve) => {
    setTimeout(() => {
      // Gera uma key aleatória
      const key = generateRandomKey();
      
      // Define um tempo de expiração aleatório entre 30 minutos e 24 horas (em segundos)
      // Para teste, vamos reduzir para entre 1 e 5 minutos
      const expiresIn = Math.floor(Math.random() * (300 - 60 + 1)) + 60;
      
      resolve({ key, expiresIn });
    }, 800);
  });
}
