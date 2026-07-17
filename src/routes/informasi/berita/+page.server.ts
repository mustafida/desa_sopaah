import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	// Get featured berita
	const featuredList = await db
		.select()
		.from(berita)
		.where(eq(berita.isFeatured, true))
		.orderBy(desc(berita.createdAt))
		.limit(1);

	// Get recent berita (non-featured)
	const recentList = await db
		.select()
		.from(berita)
		.orderBy(desc(berita.createdAt))
		.limit(10);

	return {
		featured: featuredList[0] ?? null,
		recentBerita: recentList.filter(b => !b.isFeatured).slice(0, 4)
	};
};
