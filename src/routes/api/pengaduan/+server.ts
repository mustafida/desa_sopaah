import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { pengaduan } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { nama, noHp, isiLaporan } = data;

		if (!nama || !isiLaporan) {
			return json({ success: false, error: 'Nama dan Pesan harus diisi.' }, { status: 400 });
		}

		await db.insert(pengaduan).values({
			nama,
			noHp: noHp || '',
			isiLaporan,
			kategori: 'Umum',
			status: 'Menunggu'
		});

		return json({ success: true, message: 'Pesan berhasil dikirim!' });
	} catch (error) {
		console.error('Error in pengaduan API:', error);
		return json({ success: false, error: 'Terjadi kesalahan sistem saat mengirim pesan.' }, { status: 500 });
	}
};
