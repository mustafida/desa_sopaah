import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita, umkm } from '$lib/server/db/schema';
import { count, desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const [beritaCount] = await db.select({ value: count() }).from(berita);
	const [umkmCount] = await db.select({ value: count() }).from(umkm);

	const recentBerita = await db.select().from(berita).orderBy(desc(berita.createdAt)).limit(5);

	return {
		totalBerita: beritaCount.value,
		totalUmkm: umkmCount.value,
		recentBerita
	};
};
