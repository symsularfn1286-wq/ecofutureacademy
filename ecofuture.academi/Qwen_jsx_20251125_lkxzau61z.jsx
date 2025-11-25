import { useEffect, useState } from 'react';

const initialPrices = {
  botol: 2500,
  kardus: 1500,
  minyak_jelantah: 3000,
  plastik: 2000,
  kertas: 1800
};

export default function PriceTicker() {
  const [prices, setPrices] = useState(initialPrices);

  // Simulasi harga dinamis (dalam real app: ambil dari API)
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        ...prev,
        botol: prev.botol + Math.floor(Math.random() * 100) - 50,
        kardus: Math.max(1000, prev.kardus + Math.floor(Math.random() * 80) - 40)
      }));
    }, 30000); // update tiap 30 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white mx-3 p-3 rounded-lg shadow mb-4 overflow-x-auto">
      <h3 className="font-bold text-sm text-green-700 mb-2">Harga Sampah Hari Ini</h3>
      <div className="flex space-x-4 whitespace-nowrap">
        {Object.entries(prices).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-xs capitalize">{key.replace('_', ' ')}</p>
            <p className="font-bold text-green-600">Rp{value}/kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}