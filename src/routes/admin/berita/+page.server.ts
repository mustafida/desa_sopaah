import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { berita } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { saveUploadedFile } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const allBerita = await db.select().from(berita).orderBy(desc(berita.createdAt));

	return { beritaList: allBerita };
};

export const actions: Actions = {
	tambah: async ({ request }) => {
		const formData = await request.formData();
		const judul = formData.get('judul')?.toString().trim();
		const isi = formData.get('isi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Umum';
		const isFeatured = formData.get('is_featured') === 'on';

		const createdAtVal = formData.get('created_at')?.toString();
		const createdAt = createdAtVal ? new Date(createdAtVal) : new Date();

		// Handle file upload
		const gambarFile = formData.get('gambar') as File | null;
		let gambarUrl: string | null = null;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		if (!judul || !isi) {
			return fail(400, { error: 'Judul dan isi berita harus diisi', action: 'tambah' });
		}

		await db.insert(berita).values({
			judul,
			isi,
			kategori,
			gambarUrl,
			isFeatured,
			createdAt
		});

		return { success: true, message: 'Berita berhasil ditambahkan!' };
	},

	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const judul = formData.get('judul')?.toString().trim();
		const isi = formData.get('isi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Umum';
		const isFeatured = formData.get('is_featured') === 'on';

		const createdAtVal = formData.get('created_at')?.toString();
		const createdAt = createdAtVal ? new Date(createdAtVal) : undefined;

		// Handle file upload - only update if new file is provided
		const gambarFile = formData.get('gambar') as File | null;
		const existingGambar = formData.get('existing_gambar')?.toString() || null;
		let gambarUrl = existingGambar;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		if (!id || !judul || !isi) {
			return fail(400, { error: 'Data tidak lengkap', action: 'edit' });
		}

		await db
			.update(berita)
			.set({ judul, isi, kategori, gambarUrl, isFeatured, createdAt, updatedAt: new Date() })
			.where(eq(berita.id, id));

		return { success: true, message: 'Berita berhasil diperbarui!' };
	},

	hapus: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID berita tidak valid' });
		}

		await db.delete(berita).where(eq(berita.id, id));
		return { success: true, message: 'Berita berhasil dihapus!' };
	}
};
