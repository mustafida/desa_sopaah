import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { galeri } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const fotoGaleri = await db.select().from(galeri).orderBy(desc(galeri.createdAt));
	return { fotoGaleri };
};
