export default function PickupOptionModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white w-full p-4 rounded-t-lg">
        <h3 className="font-bold text-lg mb-2">Permintaan Penjemputan</h3>
        <p className="text-sm mb-4">Kurir akan menjemput sampah Anda dalam 24 jam.</p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}