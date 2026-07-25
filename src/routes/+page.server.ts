import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita, pengaturan, umkm } from '$lib/server/db/schema';
import { desc, count } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	// Ambil 3 berita terbaru
	const latestBerita = await db
		.select()
		.from(berita)
		.orderBy(desc(berita.createdAt))
		.limit(3);

	// Ambil data pengaturan untuk Sambutan Kepala Desa
	const semuaPengaturan = await db.select().from(pengaturan);
	
	// Konversi array pengaturan menjadi object dictionary
	const settings: Record<string, string> = {};
	for (const p of semuaPengaturan) {
		settings[p.kunci] = p.nilai;
	}

	// Ambil jumlah UMKM
	const umkmCountRes = await db.select({ value: count() }).from(umkm);
	const umkmCount = umkmCountRes[0].value;

	return {
		latestBerita,
		settings,
		umkmCount
	};
};
