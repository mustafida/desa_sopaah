import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(inArray(pengaturan.kunci, ['data_kependudukan', 'data_pendidikan', 'data_pekerjaan']));
	
	let kependudukan = { totalJiwa: 2450, kepalaKeluarga: 720, lakiLaki: 1215, perempuan: 1235 };
	let pendidikan = [
		{ nama: 'SD / Sederajat', persentase: 40 },
		{ nama: 'SMP / Sederajat', persentase: 30 },
		{ nama: 'SMA / Sederajat', persentase: 20 },
		{ nama: 'Diploma / Sarjana', persentase: 10 }
	];
	let pekerjaan = [
		{ nama: 'Petani / Pekebun', persentase: 55 },
		{ nama: 'Wiraswasta / Pedagang', persentase: 20 },
		{ nama: 'Karyawan Swasta', persentase: 15 },
		{ nama: 'PNS / TNI / Polri', persentase: 10 }
	];

	data.forEach(row => {
		try {
			if (row.kunci === 'data_kependudukan') kependudukan = JSON.parse(row.nilai);
			if (row.kunci === 'data_pendidikan') pendidikan = JSON.parse(row.nilai);
			if (row.kunci === 'data_pekerjaan') pekerjaan = JSON.parse(row.nilai);
		} catch (e) {
			console.error("Failed to parse JSON for", row.kunci);
		}
	});

	return { kependudukan, pendidikan, pekerjaan };
};
