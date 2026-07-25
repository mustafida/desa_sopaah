import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita, pengaturan } from '$lib/server/db/schema';
import { desc, eq, and, ne, inArray } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	// Get featured berita (excluding announcements)
	const featuredList = await db
		.select()
		.from(berita)
		.where(and(eq(berita.isFeatured, true), ne(berita.kategori, 'Pengumuman')))
		.orderBy(desc(berita.createdAt))
		.limit(1);

	// Get recent berita (excluding announcements)
	const recentList = await db
		.select()
		.from(berita)
		.where(ne(berita.kategori, 'Pengumuman'))
		.orderBy(desc(berita.createdAt))
		.limit(10);

	// Get recent announcements (kategori = 'Pengumuman')
	const announcementList = await db
		.select()
		.from(berita)
		.where(eq(berita.kategori, 'Pengumuman'))
		.orderBy(desc(berita.createdAt))
		.limit(5);

	// Get contact details for the popup modal
	const settingsData = await db
		.select()
		.from(pengaturan)
		.where(inArray(pengaturan.kunci, ['kepala_desa', 'struktur_pemerintahan', 'kontak_admin']));

	const kepalaDesa = settingsData.find((item) => item.kunci === 'kepala_desa')?.nilai || 'M. Hasan';
	const struktur = JSON.parse(
		settingsData.find((item) => item.kunci === 'struktur_pemerintahan')?.nilai || '{}'
	);

	const kontakAdmin = settingsData.find((item) => item.kunci === 'kontak_admin')?.nilai || '6281234567890';

	return {
		featured: featuredList[0] ?? null,
		recentBerita: recentList.filter((b) => !b.isFeatured).slice(0, 4),
		announcements: announcementList,
		kepalaDesa,
		struktur,
		kontakAdmin
	};
};
