'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Jadwal() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadSchedules = () => {
    fetch('/api/schedules').then(res => res.json()).then(data => setSchedules(data.data || []));
  };

  useEffect(() => { loadSchedules(); }, []);

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const res = await fetch('/api/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      e.target.reset();
      loadSchedules();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-green-600 p-4 text-white shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">EcoCollect</Link>
          <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Jadwal Pengangkutan Sampah</h1>

        {/* Form Tambah Jadwal */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <h2 className="text-lg font-bold mb-4">Tambah Rute Baru</h2>
          <form onSubmit={handleAddSchedule} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input name="rute" placeholder="Rute (ex: Gedung Senat)" required className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
            <input name="hari" placeholder="Hari (ex: Senin)" required className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
            <input name="jam" placeholder="Jam (ex: 08:00 WIB)" required className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500" />
            <button disabled={loading} className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition">
              {loading ? 'Simpan...' : 'Tambah Jadwal'}
            </button>
          </form>
        </div>

        {/* List Jadwal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schedules.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-2 text-green-800">{s.rute}</h3>
              <p className="text-gray-600 text-sm">📅 {s.hari}</p>
              <p className="text-gray-600 text-sm font-semibold">⏰ {s.jam}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}