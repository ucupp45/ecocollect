import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM schedules');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil jadwal' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { rute, hari, jam } = await request.json();
    await pool.query('INSERT INTO schedules (rute, hari, jam) VALUES (?, ?, ?)', [rute, hari, jam]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}