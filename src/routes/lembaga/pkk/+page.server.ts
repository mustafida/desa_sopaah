import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan, galeri } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'lembaga_pkk_struktur')).limit(1);
	
	let struktur = {
		ketua: 'Ketua TP PKK',
		wakil: 'Wakil Ketua',
		sekretaris: 'Sekretaris',
		bendahara: 'Bendahara',
		deskripsi: 'PKK Desa Sopaah bertujuan untuk memberdayakan keluarga dalam mencapai kesejahteraan keluarga. Kegiatan ini difokuskan pada peran wanita sebagai penggerak kesejahteraan di tingkat keluarga maupun lingkungan desa.\n\nKami aktif melakukan pembinaan ke seluruh dusun melalui wadah Dasawisma dan Posyandu untuk memastikan tercapainya keluarga yang beriman, berakhlak mulia, sehat jasmani dan rohani.',
		gambarUrl: '',
		pokja1: 'Membidangi Penghayatan & Pengamalan Pancasila serta Gotong Royong.',
		pokja2: 'Membidangi Pendidikan, Keterampilan, dan Pengembangan Berkoperasi (UP2K).',
		pokja3: 'Membidangi Pangan, Sandang, Perumahan & Tata Laksana Rumah Tangga.',
		pokja4: 'Membidangi Kesehatan, Kelestarian Lingkungan Hidup, dan Perencanaan Sehat.'
	};
	
	if (data.length > 0 && data[0].nilai) {
		try {
			const parsed = JSON.parse(data[0].nilai);
			// Only update if not empty to fallback properly if not set yet
			if (parsed.ketua) struktur.ketua = parsed.ketua;
			if (parsed.wakil) struktur.wakil = parsed.wakil;
			if (parsed.sekretaris) struktur.sekretaris = parsed.sekretaris;
			if (parsed.bendahara) struktur.bendahara = parsed.bendahara;
			if (parsed.deskripsi) struktur.deskripsi = parsed.deskripsi;
			if (parsed.gambarUrl) struktur.gambarUrl = parsed.gambarUrl;
			if (parsed.pokja1) struktur.pokja1 = parsed.pokja1;
			if (parsed.pokja2) struktur.pokja2 = parsed.pokja2;
			if (parsed.pokja3) struktur.pokja3 = parsed.pokja3;
			if (parsed.pokja4) struktur.pokja4 = parsed.pokja4;
		} catch (e) {
			console.error("Failed to parse JSON for lembaga_pkk_struktur");
		}
	}

	const dokumentasi = await db.select().from(galeri).where(eq(galeri.kategori, 'PKK')).orderBy(desc(galeri.createdAt));

	return { struktur, dokumentasi };
};
