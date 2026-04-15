'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/api/reports')
      .then(res => res.json())
      .then(data => { if (data.success) setReports(data.data) });
  }, []);

  return (
    <div className="p-8 font-sans">
      <Link href="/" className="text-blue-600 mb-4 inline-block">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold mb-4">Dashboard Laporan Masuk</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Lokasi</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Foto S3</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="border p-2">{r.lokasi}</td>
              <td className="border p-2 font-bold">{r.status}</td>
              <td className="border p-2">
                <a href={r.image_url} target="_blank" className="text-blue-600 underline">Buka Foto</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}