import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import RecyclingCalculator from '../components/RecyclingCalculator';
import PriceTicker from './PriceTicker';
import LevelBadge from './LevelBadge';
import TransactionHistory from './TransactionHistory';
import Marketplace from './Marketplace';

export default function DashboardHome() {
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="bg-green-50 min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">Bank SampahKu</h1>
        <LevelBadge level={user.level} />
      </header>

      {/* Saldo & Dampak Lingkungan */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-white mx-3 rounded-lg shadow mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Saldo</p>
          <p className="font-bold text-green-600">Rp{user.balance.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Poin</p>
          <p className="font-bold text-blue-600">{user.points}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Berat Sampah</p>
          <p className="font-bold text-orange-600">{user.totalWeight} kg</p>
        </div>
      </div>

      {/* Harga Pasar Terkini */}
      <PriceTicker />

      {/* Akses Cepat */}
      <div className="flex justify-around p-4">
        <button
          onClick={() => setActiveTab('setor')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Setor Sampah
        </button>
        <button
          onClick={() => setActiveTab('tukar')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        >
          Tukar Hadiah
        </button>
      </div>

      {/* Konten Dinamis */}
      {activeTab === 'home' && (
        <div className="p-4">
          <TransactionHistory />
        </div>
      )}
      {activeTab === 'setor' && <RecyclingCalculator />}
      {activeTab === 'tukar' && <Marketplace />}
    </div>
  );
}