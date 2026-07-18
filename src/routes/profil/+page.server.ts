import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db
		.select()
		.from(pengaturan)
		.where(inArray(pengaturan.kunci, ['kepala_desa', 'visi_misi', 'struktur_pemerintahan']));

	let kepalaDesa = 'Cicik Ernawati';
	let visiMisi = { visi: '', misi: [] };
	let struktur = {
		sekdes: 'APRILIYANTO WAHYUDI',
		kaurPerencanaan: 'LILIS SURYANI',
		kepalaTataUsaha: 'ISARI WAHIDAH PUSPA WARDANI',
		kepalaKeuangan: 'DECKI SURYA IRWANTO',
		kasiPemerintahan: 'MUNIRAH',
		kasiPelayanan: 'AHMAD FAUZI',
		kasunBarat: 'ACH MIMBAR SOFIYULLAH',
		kasunTimur: 'AGUS SALIM',
		fotoKepalaDesa: ''
	};

	data.forEach((row) => {
		if (row.kunci === 'kepala_desa') kepalaDesa = row.nilai;
		if (row.kunci === 'visi_misi') {
			try {
				visiMisi = JSON.parse(row.nilai);
			} catch (e) {}
		}
		if (row.kunci === 'struktur_pemerintahan') {
			try {
				struktur = { ...struktur, ...JSON.parse(row.nilai) };
			} catch (e) {}
		}
	});

	return { kepalaDesa, visiMisi, struktur };
};
