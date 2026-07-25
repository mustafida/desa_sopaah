import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaduan } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
	const pendingCountResult = await db
		.select({ count: sql<number>`count(*)` })
		.from(pengaduan)
		.where(eq(pengaduan.isRead, false));
		
	const unreadPengaduanCount = pendingCountResult[0]?.count || 0;

	return {
		user: locals.user,
		unreadPengaduanCount
	};
};
