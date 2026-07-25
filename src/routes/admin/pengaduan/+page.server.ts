import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { pengaduan } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load = async () => {
	// Ambil semua data pengaduan, urutkan dari yang terbaru
	const pengaduanList = await db.select().from(pengaduan).orderBy(desc(pengaduan.createdAt));

	return {
		pengaduanList
	};
};
export const actions = {
	markRead: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		if (id) {
			await db.update(pengaduan).set({ isRead: true }).where(eq(pengaduan.id, id));
		}
		return { success: true };
	},

	hapus: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID laporan tidak valid.' });
		}

		try {
			await db.delete(pengaduan).where(eq(pengaduan.id, id));
			return { success: true, message: 'Laporan berhasil dihapus.' };
		} catch (error) {
			console.error('Error deleting pengaduan:', error);
			return fail(500, { error: 'Gagal menghapus laporan.' });
		}
	}
};
