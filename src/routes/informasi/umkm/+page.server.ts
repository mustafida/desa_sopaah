import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { umkm } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const allUmkm = await db.select().from(umkm).orderBy(desc(umkm.createdAt));

	// Get unique categories for filter
	const categories = [...new Set(allUmkm.map((u) => u.kategori))];

	return { umkmList: allUmkm, categories };
};
