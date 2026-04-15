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