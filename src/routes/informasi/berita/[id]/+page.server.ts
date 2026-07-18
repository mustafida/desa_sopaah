import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita } from '$lib/server/db/schema';
import { eq, desc, ne, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);
	if (isNaN(id)) {
		throw error(404, 'Berita tidak ditemukan');
	}

	const articleList = await db.select().from(berita).where(eq(berita.id, id)).limit(1);

	if (articleList.length === 0) {
		throw error(404, 'Berita tidak ditemukan');
	}

	// Get other recent news for the sidebar recommendations (excluding announcements)
	const recentList = await db
		.select()
		.from(berita)
		.where(and(ne(berita.id, id), ne(berita.kategori, 'Pengumuman')))
		.orderBy(desc(berita.createdAt))
		.limit(5);

	return {
		article: articleList[0],
		recentBerita: recentList
	};
};
