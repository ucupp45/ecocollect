'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Jadwal() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetch('/api/schedules')
      .then(res => res.json())
      .then(data => { if (data.success) setSchedules(data.data) });
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto font-sans">
      <Link href="/" className="text-blue-600 mb-4 inline-block">&larr; Kembali</Link>
      <h1 className="text-2xl font-bold mb-6">Jadwal Pengangkutan</h1>
      <ul className="space-y-4">
        {schedules.map((s) => (
          <li key={s.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-lg">{s.rute}</h2>
            <p>Hari: {s.hari}</p>
            <p>Jam: {s.jam}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}