import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(inArray(pengaturan.kunci, ['data_kependudukan', 'data_pendidikan', 'data_pekerjaan']));
	
	let kependudukan = { totalJiwa: 0, kepalaKeluarga: 0, lakiLaki: 0, perempuan: 0 };
	
	const defaultPendidikan = [
		{ nama: 'Belum/Tidak Sekolah', persentase: 0 },
		{ nama: 'Belum Tamat SD/Sederajat', persentase: 0 },
		{ nama: 'Tamat SD/Sederajat', persentase: 0 },
		{ nama: 'SLTP/Sederajat', persentase: 0 },
		{ nama: 'SLTA/Sederajat', persentase: 0 },
		{ nama: 'Diploma I/II', persentase: 0 },
		{ nama: 'Akademi/Diploma III/S.Muda', persentase: 0 },
		{ nama: 'Diploma IV/Strata I (S1)', persentase: 0 },
		{ nama: 'Strata II (S2)', persentase: 0 },
		{ nama: 'Strata III (S3)', persentase: 0 }
	];

	const defaultPekerjaan = [
		{ nama: 'Belum/Tidak Bekerja', persentase: 0 },
		{ nama: 'Mengurus Rumah Tangga', persentase: 0 },
		{ nama: 'Pelajar/Mahasiswa', persentase: 0 },
		{ nama: 'Pensiunan', persentase: 0 },
		{ nama: 'Pegawai Negeri Sipil (PNS)', persentase: 0 },
		{ nama: 'TNI/POLRI', persentase: 0 },
		{ nama: 'Petani/Pekebun', persentase: 0 },
		{ nama: 'Nelayan/Perikanan', persentase: 0 },
		{ nama: 'Karyawan Swasta', persentase: 0 },
		{ nama: 'Wiraswasta', persentase: 0 }
	];

	let pendidikan: any[] = [];
	let pekerjaan: any[] = [];
	
	data.forEach(row => {
		try {
			if (row.kunci === 'data_kependudukan') kependudukan = JSON.parse(row.nilai);
			if (row.kunci === 'data_pendidikan') pendidikan = JSON.parse(row.nilai);
			if (row.kunci === 'data_pekerjaan') pekerjaan = JSON.parse(row.nilai);
		} catch (e) {
			console.error("Failed to parse JSON for", row.kunci);
		}
	});

	if (pendidikan.length === 0) pendidikan = defaultPendidikan;
	if (pekerjaan.length === 0) pekerjaan = defaultPekerjaan;

	return { kependudukan, pendidikan, pekerjaan };
};

export const actions: Actions = {
	simpan: async ({ request }) => {
		const formData = await request.formData();
		
		const kependudukanStr = formData.get('kependudukan')?.toString();
		const pendidikanStr = formData.get('pendidikan')?.toString();
		const pekerjaanStr = formData.get('pekerjaan')?.toString();

		if (!kependudukanStr || !pendidikanStr || !pekerjaanStr) {
			return fail(400, { error: 'Data tidak valid' });
		}

		try {
			// Validation parse
			JSON.parse(kependudukanStr);
			JSON.parse(pendidikanStr);
			JSON.parse(pekerjaanStr);
		} catch (e) {
			return fail(400, { error: 'Format data tidak valid' });
		}

		// Helper to save or update
		const saveSetting = async (kunci: string, nilai: string) => {
			const existing = await db.select().from(pengaturan).where(inArray(pengaturan.kunci, [kunci]));
			if (existing.length > 0) {
				await db.update(pengaturan).set({ nilai }).where(inArray(pengaturan.kunci, [kunci]));
			} else {
				await db.insert(pengaturan).values({ kunci, nilai });
			}
		};

		await saveSetting('data_kependudukan', kependudukanStr);
		await saveSetting('data_pendidikan', pendidikanStr);
		await saveSetting('data_pekerjaan', pekerjaanStr);

		return { success: true, message: 'Data Statistik Desa berhasil diperbarui!' };
	}
};
