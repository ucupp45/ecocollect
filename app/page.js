'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sedang mengirim laporan...');
    const formData = new FormData(e.target);
    const res = await fetch('/api/reports', { method: 'POST', body: formData });
    if (res.ok) {
      setStatus('✅ Laporan sukses terkirim!');
      e.target.reset();
    } else {
      setStatus('❌ Gagal mengirim laporan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 text-white shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">EcoCollect</h1>
          <div className="space-x-4 text-sm font-medium">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/jadwal" className="hover:underline">Jadwal</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto py-12 px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">Lapor Sampah</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Bantu kami menjaga kebersihan lingkungan Itenas</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1">Lokasi Kejadian</label>
              <input name="lokasi" placeholder="Contoh: Depan Gedung Rektorat" required 
                className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Keterangan</label>
              <textarea name="deskripsi" placeholder="Deskripsi singkat tumpukan sampah..." required 
                className="w-full border border-gray-200 p-3 rounded-lg h-28 focus:ring-2 focus:ring-green-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Foto Bukti</label>
              <input type="file" name="image" accept="image/*" required 
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95">
              Kirim Laporan Sekarang
            </button>
          </form>
          {status && <p className="mt-6 text-center font-medium animate-pulse">{status}</p>}
        </div>
      </main>
    </div>
  );
}