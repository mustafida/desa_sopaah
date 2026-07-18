import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { umkm } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import { saveUploadedFile } from '$lib/server/upload';

export const load: PageServerLoad = async () => {
	const allUmkm = await db.select().from(umkm).orderBy(desc(umkm.createdAt));

	return { umkmList: allUmkm };
};

export const actions: Actions = {
	tambah: async ({ request }) => {
		const formData = await request.formData();
		const namaUsaha = formData.get('nama_usaha')?.toString().trim();
		const pemilik = formData.get('pemilik')?.toString().trim();
		const deskripsi = formData.get('deskripsi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Lainnya';
		const noWhatsapp = formData.get('no_whatsapp')?.toString().trim() || null;
		const alamat = formData.get('alamat')?.toString().trim() || null;

		// Handle file upload
		const gambarFile = formData.get('gambar') as File | null;
		let gambarUrl: string | null = null;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		// Handle video upload
		const videoFile = formData.get('video') as File | null;
		let videoUrl: string | null = null;
		if (videoFile && videoFile.size > 0) {
			videoUrl = await saveUploadedFile(videoFile);
		}

		if (!namaUsaha || !pemilik || !deskripsi) {
			return fail(400, {
				error: 'Nama usaha, pemilik, dan deskripsi harus diisi',
				action: 'tambah'
			});
		}

		await db.insert(umkm).values({
			namaUsaha,
			pemilik,
			deskripsi,
			kategori,
			gambarUrl,
			noWhatsapp,
			alamat,
			videoUrl
		});

		return { success: true, message: 'UMKM berhasil ditambahkan!' };
	},

	edit: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const namaUsaha = formData.get('nama_usaha')?.toString().trim();
		const pemilik = formData.get('pemilik')?.toString().trim();
		const deskripsi = formData.get('deskripsi')?.toString().trim();
		const kategori = formData.get('kategori')?.toString().trim() || 'Lainnya';
		const noWhatsapp = formData.get('no_whatsapp')?.toString().trim() || null;
		const alamat = formData.get('alamat')?.toString().trim() || null;
		// Handle file upload - only update if new file is provided
		const gambarFile = formData.get('gambar') as File | null;
		const existingGambar = formData.get('existing_gambar')?.toString() || null;
		let gambarUrl = existingGambar;
		if (gambarFile && gambarFile.size > 0) {
			gambarUrl = await saveUploadedFile(gambarFile);
		}

		// Handle video upload - only update if new file is provided
		const videoFile = formData.get('video') as File | null;
		const existingVideo = formData.get('existing_video')?.toString() || null;
		let videoUrl = existingVideo;
		if (videoFile && videoFile.size > 0) {
			videoUrl = await saveUploadedFile(videoFile);
		}

		if (!id || !namaUsaha || !pemilik || !deskripsi) {
			return fail(400, { error: 'Data tidak lengkap', action: 'edit' });
		}

		await db
			.update(umkm)
			.set({ namaUsaha, pemilik, deskripsi, kategori, gambarUrl, noWhatsapp, alamat, videoUrl })
			.where(eq(umkm.id, id));

		return { success: true, message: 'UMKM berhasil diperbarui!' };
	},

	hapus: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));

		if (!id) {
			return fail(400, { error: 'ID UMKM tidak valid' });
		}

		await db.delete(umkm).where(eq(umkm.id, id));
		return { success: true, message: 'UMKM berhasil dihapus!' };
	}
};
