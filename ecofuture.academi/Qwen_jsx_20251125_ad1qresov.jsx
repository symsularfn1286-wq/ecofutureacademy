import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import PickupOptionModal from './PickupOptionModal';

const PRICES = {
  botol: 2500,        // per kg
  kardus: 1500,
  minyak_jelantah: 3000,
  plastik: 2000,
  kertas: 1800
};

export default function RecyclingCalculator() {
  const { updateUser } = useContext(UserContext);
  const [type, setType] = useState('botol');
  const [weight, setWeight] = useState('');
  const [estimatedIncome, setEstimatedIncome] = useState(0);
  const [showPickup, setShowPickup] = useState(false);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const price = PRICES[type] || 0;
    setEstimatedIncome(w * price);
  };

  const handleSubmit = (pickup = false) => {
    const w = parseFloat(weight) || 0;
    const inc = estimatedIncome;
    updateUser({
      balance: inc,
      points: Math.floor(inc / 100),
      totalWeight: w,
      addTransaction: {
        type: 'setor',
        amount: inc,
        weight: w,
        method: pickup ? 'jemput' : 'antar',
        date: new Date().toISOString()
      }
    });
    alert(`Setor berhasil! Estimasi: Rp${inc.toLocaleString()}`);
    setWeight('');
    setEstimatedIncome(0);
  };

  return (
    <div className="p-4 bg-white mx-3 rounded-lg shadow">
      <h2 className="text-lg font-bold text-green-700 mb-4">Setor Sampah</h2>

      <div className="mb-3">
        <label className="block text-sm mb-1">Jenis Sampah</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="botol">Botol Plastik</option>
          <option value="kardus">Kardus</option>
          <option value="minyak_jelantah">Minyak Jelantah</option>
          <option value="plastik">Plastik Campur</option>
          <option value="kertas">Kertas Bekas</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Berat (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={calculate}
          className="w-full p-2 border rounded"
          placeholder="Contoh: 2.5"
        />
      </div>

      {estimatedIncome > 0 && (
        <div className="mb-4 p-3 bg-green-100 rounded text-center">
          Estimasi Pendapatan: <span className="font-bold text-green-700">Rp{estimatedIncome.toLocaleString()}</span>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => handleSubmit(false)}
          className="flex-1 bg-green-600 text-white py-2 rounded"
        >
          Antar Sendiri
        </button>
        <button
          onClick={() => setShowPickup(true)}
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Jemput Sampah
        </button>
      </div>

      {showPickup && (
        <PickupOptionModal
          onClose={() => setShowPickup(false)}
          onConfirm={() => {
            setShowPickup(false);
            handleSubmit(true);
          }}
        />
      )}
    </div>
  );
}