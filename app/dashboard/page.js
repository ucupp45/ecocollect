'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  const loadData = () => {
    fetch('/api/reports').then(res => res.json()).then(data => setReports(data.data || []));
  };

  useEffect(() => { loadData(); }, []);

  const updateStatus = async (id) => {
    await fetch('/api/reports', {
      method: 'PATCH',
      body: JSON.stringify({ id, status: 'Selesai' }),
      headers: { 'Content-Type': 'application/json' }
    });
    loadData();
  };

  const deleteReport = async (id) => {
    if (confirm('Yakin ingin menghapus laporan ini?')) {
      await fetch('/api/reports', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      });
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">Dashboard Monitor</h1>
          <Link href="/" className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-green-200 transition">
            &larr; Kembali ke Form
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((r) => (
            <div key={r.id} className="bg-white overflow-hidden rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <div className="relative">
                <img src={r.image_url} className="w-full h-56 object-cover" alt="Bukti" />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${r.status === 'Selesai' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}>
                  {r.status}
                </span>
              </div>
              
              <div className="p-6 flex-1">
                <div className="text-xs text-gray-400 mb-2">{new Date(r.created_at).toLocaleString('id-ID')}</div>
                <h3 className="font-extrabold text-xl capitalize text-gray-800 mb-2">{r.lokasi}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{r.deskripsi}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {r.status !== 'Selesai' ? (
                    <button onClick={() => updateStatus(r.id)} 
                      className="bg-green-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100">
                      Konfirmasi
                    </button>
                  ) : (
                    <div className="bg-gray-100 text-gray-400 text-sm font-bold py-3 rounded-xl text-center">Tuntas</div>
                  )}
                  <button onClick={() => deleteReport(r.id)} 
                    className="bg-red-50 text-red-600 text-sm font-bold py-3 rounded-xl hover:bg-red-100 transition border border-red-100">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}