import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { pengaduan } from '$lib/server/db/schema';
import { saveUploadedFile } from '$lib/server/upload';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const nama = formData.get('nama')?.toString().trim();
		const nik = formData.get('nik')?.toString().trim() || null;
		const noHp = formData.get('no_hp')?.toString().trim() || null;
		const kategori = formData.get('kategori')?.toString().trim();
		const isiLaporan = formData.get('isi_laporan')?.toString().trim();
		const lampiranFile = formData.get('lampiran') as File | null;

		if (!nama || !kategori || !isiLaporan) {
			return fail(400, { error: 'Mohon lengkapi semua data wajib yang ditandai bintang (*).' });
		}

		let lampiranUrl = null;
		if (lampiranFile && lampiranFile.size > 0) {
			try {
				lampiranUrl = await saveUploadedFile(lampiranFile);
			} catch (e) {
				return fail(500, { error: 'Gagal mengunggah foto lampiran.' });
			}
		}

		try {
			await db.insert(pengaduan).values({
				nama,
				nik,
				noHp,
				kategori,
				isiLaporan,
				lampiranUrl
			});

			return { success: true };
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Terjadi kesalahan sistem saat menyimpan laporan Anda.' });
		}
	}
};
