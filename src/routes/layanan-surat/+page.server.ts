import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const data = await db.select().from(pengaturan).where(eq(pengaturan.kunci, 'kepala_desa')).limit(1);
	const kepalaDesa = data.length > 0 ? data[0].nilai : 'Cicik Ernawati';

	return { kepalaDesa };
};
