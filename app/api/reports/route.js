import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/s3';
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const lokasi = formData.get('lokasi');
    const deskripsi = formData.get('deskripsi');

    if (!file) return NextResponse.json({ error: 'File wajib ada' }, { status: 400 });

    // 1. Lempar File ke AWS S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `reports/${fileName}`,
      Body: buffer,
      ContentType: file.type,
    }));

    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/reports/${fileName}`;

    // 2. Simpan URL dan Lokasi ke AWS RDS
    await pool.query(
      'INSERT INTO reports (lokasi, deskripsi, image_url) VALUES (?, ?, ?)',
      [lokasi, deskripsi, imageUrl]
    );

    return NextResponse.json({ success: true, message: 'Laporan sukses!' });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Gagal diproses' }, { status: 500 });
  }
}

// Untuk mengambil semua data laporan
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal ambil data' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    await pool.query('UPDATE reports SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Tambahkan ini di app/api/reports/route.js
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM reports WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}