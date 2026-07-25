import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { pengaturan } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async () => {
	const settingsData = await db
		.select()
		.from(pengaturan)
		.where(eq(pengaturan.kunci, 'sosial_media'));

	let sosialMedia = {
		instagram: '',
		facebook: '',
		youtube: '',
		tiktok: ''
	};

	if (settingsData.length > 0) {
		try {
			sosialMedia = { ...sosialMedia, ...JSON.parse(settingsData[0].nilai) };
		} catch (e) {}
	}

	return {
		sosialMedia
	};
};
