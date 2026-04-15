'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Mengirim ke Cloud...');
    
    const formData = new FormData(e.target);
    const res = await fetch('/api/reports', { method: 'POST', body: formData });
    
    if (res.ok) {
      setStatus('✅ Laporan berhasil terkirim!');
      e.target.reset();
    } else {
      setStatus('❌ Gagal mengirim laporan.');
    }
  };

  return (
    <main className="p-8 max-w-lg mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">EcoCollect: Lapor Sampah</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="lokasi" placeholder="Lokasi (ex: Jl. Cikutra)" required className="border p-2 rounded" />
        <textarea name="deskripsi" placeholder="Deskripsi tumpukan sampah" required className="border p-2 rounded h-24" />
        <input type="file" name="image" accept="image/*" required className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white font-bold p-3 rounded hover:bg-green-700">
          Kirim Laporan
        </button>
      </form>
      <p className="mt-4 font-semibold text-center">{status}</p>
      
      <div className="mt-8 flex gap-4 justify-center">
        <Link href="/dashboard" className="text-blue-600 underline">Lihat Dashboard</Link>
        <Link href="/jadwal" className="text-blue-600 underline">Lihat Jadwal</Link>
      </div>
    </main>
  );
}